"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const SPACING = 18; // distância entre pontos (malha fina)
const RADIUS = 160; // raio do "holofote" revelado ao redor do cursor
const FAR = -9999; // posição fora da tela → malha invisível em repouso

/**
 * Malha sutil (pontos + linhas diagonais) revelada apenas num círculo ao redor
 * do cursor — um "holofote" que acompanha o mouse, mostrando a malha só onde o
 * cursor passa. Sem `<canvas>`: usa gradientes CSS + `mask-image` posicionada
 * por variáveis CSS atualizadas no `mousemove`. Assim não há limite de tamanho
 * (cobre todo o fundo, por mais alto que seja o grupo) e o custo é mínimo.
 *
 * Use uma instância por grupo claro: `absolute inset-0 -z-10 pointer-events-none`.
 */
export function HoverMesh({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const near =
          event.clientX >= rect.left - RADIUS &&
          event.clientX <= rect.right + RADIUS &&
          event.clientY >= rect.top - RADIUS &&
          event.clientY <= rect.bottom + RADIUS;

        if (!near) {
          el.style.setProperty("--mx", `${FAR}px`);
          el.style.setProperty("--my", `${FAR}px`);
          return;
        }
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Holofote: só o círculo ao redor do cursor (--mx/--my) revela a malha.
  // Borda mais suave/transparente (fade longo até as extremidades).
  const mask = `radial-gradient(circle ${RADIUS}px at var(--mx, ${FAR}px) var(--my, ${FAR}px), rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 42%, transparent 80%)`;

  const style: CSSProperties = {
    // Quadriculado (linhas horizontais + verticais) com bolinhas nas interseções.
    // Cor laranja levemente mais clara (primary-400) e bem sutil.
    backgroundImage: [
      "radial-gradient(circle, rgba(255,148,72,0.5) 0 1px, transparent 1.6px)",
      "linear-gradient(to right, transparent 0 8.5px, rgba(255,148,72,0.12) 8.5px 9.5px, transparent 9.5px)",
      "linear-gradient(to bottom, transparent 0 8.5px, rgba(255,148,72,0.12) 8.5px 9.5px, transparent 9.5px)",
    ].join(", "),
    backgroundSize: `${SPACING}px ${SPACING}px`,
    maskImage: mask,
    WebkitMaskImage: mask,
  };

  return <div ref={ref} aria-hidden className={className} style={style} />;
}
