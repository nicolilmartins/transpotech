"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";

// Malha grande que "anda" sozinha pelo fundo (referência:
// terminal-industries.com/about). Mesmo desenho do HoverMesh (pontos +
// linhas laranja), mas em células bem maiores e revelada por blobs de
// máscara que vagam pela área — a malha aparece numa região, esvanece e
// surge em outra, sem depender do cursor.

// Célula da grade (HoverMesh usa 18px; aqui bem maior, como na referência).
const SPACING = 100;

// Blobs de revelação: raio + posição inicial (em % do container).
// Raios contidos para a união deles não cobrir a hero inteira — é o
// contraste entre região revelada e o resto que dá o efeito de "andar".
const BLOBS = [
  { r: 300, x: 22, y: 30 },
  { r: 240, x: 78, y: 22 },
  { r: 210, x: 55, y: 78 },
];

// Camada base: malha levemente visível em toda a área, mesmo fora dos blobs.
const BASE_VISIBILITY = 0.14;

export function DriftMesh({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Sem valor inicial explícito o GSAP parte de 0 (canto superior esquerdo),
    // ignorando o fallback do var() — então os blobs começam nas posições
    // definidas em BLOBS.
    BLOBS.forEach((b, i) => {
      el.style.setProperty(`--bx${i}`, `${b.x}%`);
      el.style.setProperty(`--by${i}`, `${b.y}%`);
    });

    // Cada blob vagueia para um alvo aleatório e re-sorteia ao chegar.
    BLOBS.forEach((_, i) => {
      const move = () => {
        gsap.to(el, {
          [`--bx${i}`]: `${gsap.utils.random(5, 95, 1)}%`,
          [`--by${i}`]: `${gsap.utils.random(8, 92, 1)}%`,
          duration: gsap.utils.random(3, 6),
          ease: "sine.inOut",
          onComplete: move,
        });
      };
      move();
    });

    return () => {
      gsap.killTweensOf(el);
    };
  }, []);

  const mask = [
    // União (default de múltiplas camadas de mask): base fraca + blobs.
    `linear-gradient(rgba(0,0,0,${BASE_VISIBILITY}), rgba(0,0,0,${BASE_VISIBILITY}))`,
    ...BLOBS.map(
      (b, i) =>
        `radial-gradient(circle ${b.r}px at var(--bx${i}, ${b.x}%) var(--by${i}, ${b.y}%), rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, transparent 75%)`
    ),
  ].join(", ");

  const half = SPACING / 2;
  const style: CSSProperties = {
    backgroundImage: [
      // Ponto na interseção das linhas (centro de cada célula).
      "radial-gradient(circle, rgba(255,148,72,0.5) 0 2px, transparent 3px)",
      `linear-gradient(to right, transparent 0 ${half - 0.5}px, rgba(255,148,72,0.2) ${half - 0.5}px ${half + 0.5}px, transparent ${half + 0.5}px)`,
      `linear-gradient(to bottom, transparent 0 ${half - 0.5}px, rgba(255,148,72,0.2) ${half - 0.5}px ${half + 0.5}px, transparent ${half + 0.5}px)`,
    ].join(", "),
    backgroundSize: `${SPACING}px ${SPACING}px`,
    maskImage: mask,
    WebkitMaskImage: mask,
  };

  return <div ref={ref} aria-hidden className={className} style={style} />;
}
