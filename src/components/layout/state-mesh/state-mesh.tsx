"use client";

import { useEffect, useRef } from "react";

const REGION: ReadonlyArray<readonly [number, number]> = [
  [0.32, 0.03],
  [0.96, 0.06],
  [1.0, 0.22],
  [0.9, 0.36],
  [0.93, 0.5],
  [0.78, 0.6],
  [0.82, 0.73],
  [0.62, 0.93],
  [0.36, 1.0],
  [0.1, 0.9],
  [0.02, 0.7],
  [0.18, 0.58],
  [0.1, 0.45],
  [0.16, 0.3],
  [0.22, 0.14],
];

const inside = (px: number, py: number) => {
  let c = false;
  for (let i = 0, j = REGION.length - 1; i < REGION.length; j = i++) {
    const [xi, yi] = REGION[i];
    const [xj, yj] = REGION[j];
    if (
      yi > py !== yj > py &&
      px < ((xj - xi) * (py - yi)) / (yj - yi) + xi
    ) {
      c = !c;
    }
  }
  return c;
};

const SPACING = 18;
const RADIUS = 160;

/**
 * Malha de pontos + linhas no canvas, revelada ao redor do cursor. Nada é
 * montado enquanto o CTA está longe da viewport, e o canvas só ganha tamanho
 * e grade no primeiro hover — no mobile, sem mouse, nunca aloca o buffer.
 */
export function StateMesh({
  className,
  fill = false,
}: {
  className?: string;
  fill?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let ctx: CanvasRenderingContext2D | null = null;
    let width = 0;
    let height = 0;
    let points: { x: number; y: number }[] = [];
    let edges: [number, number][] = [];
    let canvasLeft = 0;
    let canvasTop = 0;
    let vMx = -9999;
    let vMy = -9999;
    let active = false;
    let built = false;
    let raf = 0;

    const build = () => {
      ctx ??= canvas.getContext("2d");
      if (!ctx) return;
      built = true;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvasLeft = rect.left;
      canvasTop = rect.top;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = [];
      const docLeft = rect.left + window.scrollX;
      const docTop = rect.top + window.scrollY;
      const offsetX = (SPACING - (docLeft % SPACING)) % SPACING;
      const offsetY = (SPACING - (docTop % SPACING)) % SPACING;
      const cols = Math.ceil((width - offsetX) / SPACING);
      const rows = Math.ceil((height - offsetY) / SPACING);
      const grid: number[][] = [];

      for (let r = 0; r <= rows; r++) {
        grid[r] = [];
        for (let c = 0; c <= cols; c++) {
          const x = offsetX + c * SPACING;
          const y = offsetY + r * SPACING;
          if (fill || inside(x / width, y / height)) {
            grid[r][c] = points.length;
            points.push({ x, y });
          } else {
            grid[r][c] = -1;
          }
        }
      }

      edges = [];
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const a = grid[r][c];
          if (a < 0) continue;
          const downRight = grid[r + 1]?.[c + 1];
          const downLeft = grid[r + 1]?.[c - 1];
          if (downRight !== undefined && downRight >= 0) edges.push([a, downRight]);
          if (downLeft !== undefined && downLeft >= 0) edges.push([a, downLeft]);
        }
      }
    };

    const draw = () => {
      raf = 0;
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const p1 = points[a];
        const p2 = points[b];
        const viewMidX = canvasLeft + (p1.x + p2.x) / 2;
        const viewMidY = canvasTop + (p1.y + p2.y) / 2;
        const d = Math.hypot(viewMidX - vMx, viewMidY - vMy);
        if (d > RADIUS) continue;
        ctx.strokeStyle = `rgba(245,130,32,${(1 - d / RADIUS) * 0.06})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      for (const p of points) {
        const viewX = canvasLeft + p.x;
        const viewY = canvasTop + p.y;
        const d = Math.hypot(viewX - vMx, viewY - vMy);
        if (d > RADIUS) continue;
        ctx.fillStyle = `rgba(245,130,32,${(1 - d / RADIUS) * 0.22})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // O frame depende só do cursor e da posição do canvas, que mudam no
    // mousemove: desenha uma vez por frame em que algo mudou, não em todo tick.
    const scheduleDraw = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const deactivate = () => {
      if (!active) return;
      active = false;
      cancelAnimationFrame(raf);
      raf = 0;
      ctx?.clearRect(0, 0, width, height);
    };

    // A posição do canvas só muda com scroll ou mudança de layout: esses
    // eventos marcam a medida como velha e o mousemove relê uma vez, em vez de
    // forçar layout com getBoundingClientRect a cada movimento do mouse.
    let rectStale = true;
    const markStale = () => { rectStale = true; };

    const onMove = (event: MouseEvent) => {
      if (rectStale) {
        const rect = canvas.getBoundingClientRect();
        canvasLeft = rect.left;
        canvasTop = rect.top;
        width = rect.width;
        height = rect.height;
        rectStale = false;
      }

      vMx = event.clientX;
      vMy = event.clientY;

      const near =
        vMx >= canvasLeft - RADIUS &&
        vMx <= canvasLeft + width + RADIUS &&
        vMy >= canvasTop - RADIUS &&
        vMy <= canvasTop + height + RADIUS;

      if (!near) {
        deactivate();
        return;
      }
      if (!built) build();
      active = true;
      scheduleDraw();
    };

    // Redimensionar zera o buffer; a grade é refeita já se o cursor estiver
    // em cima, senão no próximo hover.
    const onResize = () => {
      built = false;
      markStale();
      if (active) {
        build();
        scheduleDraw();
      }
    };

    const layoutObserver = new ResizeObserver(markStale);
    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        markStale();
        layoutObserver.observe(document.documentElement);
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("scroll", markStale, { passive: true });
        window.addEventListener("resize", onResize);
      } else {
        deactivate();
        layoutObserver.disconnect();
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("scroll", markStale);
        window.removeEventListener("resize", onResize);
      }
    };

    // Margem = RADIUS: o cursor acende a malha até RADIUS fora do canvas.
    const viewport = new IntersectionObserver(
      ([entry]) => listen(entry.isIntersecting),
      { rootMargin: `${RADIUS}px` }
    );
    viewport.observe(canvas);

    // O tamanho do canvas pode mudar com o listener de resize desligado (CTA
    // fora da viewport); a grade montada fica inválida.
    const sizeObserver = new ResizeObserver(() => {
      if (!listening) built = false;
    });
    sizeObserver.observe(canvas);

    return () => {
      viewport.disconnect();
      sizeObserver.disconnect();
      listen(false);
    };
  }, [fill]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
