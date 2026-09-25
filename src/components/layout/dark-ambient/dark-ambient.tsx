"use client";

import { useEffect, useRef } from "react";
import { scrubOnScroll } from "@/lib/motion";

const GREEN_OFFSET = 220;
const FACTOR = 0.6;

// Perfil radial de um círculo de 520px a 25% com filter: blur(160px), calculado
// numericamente (disco ⊛ gaussiana σ=160) em passos de 10% do raio de 740px
// (260 + 3σ). Substitui o filtro: blur grande em movimento no scroll é caro no
// mobile e o Safari do iOS deixava de pintar parte do bloco dark.
const GLOW_ALPHAS = [18.3, 17.4, 14.8, 11.2, 7.4, 4.2, 2.0, 0.8, 0.3, 0.1, 0];

function glowGradient(colorVar: string): string {
  const stops = GLOW_ALPHAS.map(
    (a, i) =>
      `color-mix(in srgb, var(${colorVar}) ${a}%, transparent) ${i * 10}%`,
  );
  return `radial-gradient(circle closest-side, ${stops.join(", ")})`;
}

type DarkAmbientProps = {
  /** Deslocamento vertical inicial do blur verde (px). Padrão: 220. */
  greenOffset?: number;
};

/**
 * Ambiência das seções dark: blur laranja (direita) e verde (esquerda, abaixo)
 * que "andam" para baixo com o scroll.
 */
export function DarkAmbient({
  greenOffset = GREEN_OFFSET,
}: DarkAmbientProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    const orange = orangeRef.current;
    const green = greenRef.current;
    if (!container || !orange || !green) return;

    // Antes do topo do bloco chegar ao topo da viewport o progresso está em 0
    // e os blurs ficam na posição inicial, que já vem no HTML. O scrub só
    // nasce quando o bloco se aproxima, em vez de todos medirem layout na
    // hidratação; criado depois, já assume o progresso do scroll atual.
    let disposeScrub: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Do topo do bloco no topo da viewport até o fundo dele no topo: os
        // blurs descem 60% da altura do bloco, linearmente.
        disposeScrub = scrubOnScroll(
          container,
          { startLine: 0, endLine: 0 },
          (progress, rect) => {
            const y = rect.height * FACTOR * progress;
            orange.style.transform = `translate(25%, ${y}px)`;
            green.style.transform = `translate(-25%, ${y + greenOffset}px)`;
          },
        );
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      disposeScrub?.();
    };
  }, [greenOffset]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Laranja — lado direito. A caixa de 520px segue sendo a referência
          de posição do scrub; o gradiente transborda 480px (3σ do blur antigo). */}
      <div
        ref={orangeRef}
        className="absolute right-0 top-0 size-[520px]"
        style={{ transform: "translate(25%, 0px)" }}
      >
        <div
          className="absolute -inset-[480px]"
          style={{ backgroundImage: glowGradient("--color-primary-500") }}
        />
      </div>
      {/* Verde — lado esquerdo, um pouco abaixo */}
      <div
        ref={greenRef}
        className="absolute left-0 top-0 size-[520px]"
        style={{ transform: `translate(-25%, ${greenOffset}px)` }}
      >
        <div
          className="absolute -inset-[480px]"
          style={{ backgroundImage: glowGradient("--color-secondary-600") }}
        />
      </div>
    </div>
  );
}
