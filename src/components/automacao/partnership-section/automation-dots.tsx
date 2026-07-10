"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { automationDots } from "./automation-dots.data";

// Cada bolinha usa um gradiente vertical (claro no topo → saturado embaixo),
// exatamente como no Figma — o que dá o aspecto suave/3D. Teal nos fluxos à
// esquerda, laranja nos que sobem/descem/vão à direita.
const DOT_FILL = {
  teal: "url(#automationDotTeal)",
  orange: "url(#automationDotOrange)",
} as const;

// Sobreposição de "bolinhas" sobre a ilustração. Ao entrar na viewport, cada
// linha é revelada do ponto conectado ao hub central em direção ao
// estabelecimento — uma bolinha por vez, seguindo a direção da própria linha.
export function AutomationDots() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // A ilustração é irmã do SVG dentro do mesmo wrapper (marcada como decorativa,
    // então o ScrollReveal global a ignora — revelamos aqui, um pouco antes das
    // bolinhas, no mesmo estilo das entradas de seção: fade + leve slide-up).
    const wrapper = svg.parentElement;
    const image = wrapper?.querySelector("img") ?? null;

    const circles = gsap.utils.toArray<SVGCircleElement>(
      svg.querySelectorAll("circle")
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(circles, { opacity: 1 });
      if (image) gsap.set(image, { opacity: 1, y: 0 });
      return;
    }

    if (image) gsap.set(image, { opacity: 0, y: 16 });
    // As bolinhas permanecem exatamente na posição — só a opacidade muda. Elas
    // acendem em cascata, do extremo interno (conectado ao hub) para as pontas.
    gsap.set(circles, { opacity: 0 });

    const imageTrigger = image
      ? ScrollTrigger.create({
          trigger: wrapper ?? svg,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(image, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            }),
        })
      : null;

    const dotsTrigger = ScrollTrigger.create({
      trigger: svg,
      start: "top 78%",
      once: true,
      onEnter: () => {
        circles.forEach((circle) => {
          const t = Number(circle.dataset.t) || 0;
          gsap.to(circle, {
            opacity: 1,
            duration: 0.35,
            delay: t * 1.8,
            ease: "power1.out",
          });
        });
      },
    });

    return () => {
      imageTrigger?.kill();
      dotsTrigger.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 860.381 486.706"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="automationDotTeal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#edfffd" />
          <stop offset="1" stopColor="#7caaa7" />
        </linearGradient>
        <linearGradient id="automationDotOrange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffebdb" />
          <stop offset="1" stopColor="#e4a478" />
        </linearGradient>
      </defs>
      {automationDots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          data-t={dot.t}
          fill={DOT_FILL[dot.c]}
        />
      ))}
    </svg>
  );
}
