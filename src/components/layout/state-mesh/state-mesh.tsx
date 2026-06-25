"use client";

import { useEffect, useRef } from "react";

// Polígono aproximado da região Sul/Sudeste (SP, PR, SC, RS), normalizado 0..1
// (norte em cima, litoral à direita). Sem bordas/texto — só define onde os
// pontos da malha existem.
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

const SPACING = 18; // distância entre pontos (malha mais fina/delicada)
const RADIUS = 160; // raio de revelação ao redor do cursor

/**
 * Malha de pontos + linhas. Invisível em repouso; ao aproximar o cursor, os
 * pontos e linhas próximos acendem.
 *
 * - `fill={false}` (padrão): a malha existe só dentro da silhueta SP/PR/SC/RS.
 * - `fill={true}`: a malha cobre toda a área do canvas (sem máscara de estados).
 *
 * Continuidade entre seções: distâncias são calculadas em coordenadas do
 * viewport (clientX / clientY), não relativas ao canvas. Isso garante que o
 * raio de 160 px abranja a borda entre duas seções adjacentes, dando a
 * impressão de uma única malha contínua através das seções claras.
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
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let points: { x: number; y: number }[] = [];
    let edges: [number, number][] = [];

    // Posição do canvas no viewport — atualizada a cada mousemove e resize.
    // Usada para converter pontos (canvas-relative) em coords do viewport
    // para o cálculo de distância compartilhado entre instâncias.
    let canvasLeft = 0;
    let canvasTop = 0;

    // Posição do cursor em coords do viewport (clientX / clientY).
    let vMx = -9999;
    let vMy = -9999;

    let active = false;
    let raf = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvasLeft = rect.left;
      canvasTop = rect.top;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = [];
      // Grade ancorada em coordenadas do documento: todas as instâncias usam a
      // mesma origem global, então as grades de seções/grupos adjacentes
      // coincidem — sem corte na malha entre uma seção e outra.
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
          // Conexões diagonais → malha em losango (linhas diagonais sutis)
          const downRight = grid[r + 1]?.[c + 1];
          const downLeft = grid[r + 1]?.[c - 1];
          if (downRight !== undefined && downRight >= 0) edges.push([a, downRight]);
          if (downLeft !== undefined && downLeft >= 0) edges.push([a, downLeft]);
        }
      }
    };

    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, width, height);
      if (!active) return;

      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const p1 = points[a];
        const p2 = points[b];
        // Ponto médio da aresta em coords do viewport
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
        // Ponto em coords do viewport
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

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (event: MouseEvent) => {
      // Atualiza a posição do canvas no viewport a cada movimento de mouse.
      // Isso garante que o cálculo de distância seja preciso mesmo após scroll.
      const rect = canvas.getBoundingClientRect();
      canvasLeft = rect.left;
      canvasTop = rect.top;

      vMx = event.clientX;
      vMy = event.clientY;

      const wasActive = active;
      active =
        vMx >= canvasLeft - RADIUS &&
        vMx <= canvasLeft + width + RADIUS &&
        vMy >= canvasTop - RADIUS &&
        vMy <= canvasTop + height + RADIUS;

      if (active || wasActive) schedule();
    };

    const onResize = () => {
      build();
      schedule();
    };

    build();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fill]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
