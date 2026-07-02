"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Phase = { number: string; title: string; description: string };

const phases: Phase[] = [
  {
    number: "01",
    title: "Fase 1 · Quick wins",
    description:
      "Automação pontual em recebimento, picking ou expedição. Payback típico em 12–24 meses.",
  },
  {
    number: "02",
    title: "Fase 2 · Escala",
    description:
      "Integração entre processos, expansão da automação e WMS/WCS unificados.",
  },
  {
    number: "03",
    title: "Fase 3 · Operação inteligente",
    description: "Camada de dados, IA aplicada e orquestração ponta a ponta.",
  },
];

export function PhasedSection() {
  const wrapRef = useRef<HTMLOListElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Ao entrar na viewport, a linha laranja e os títulos "acendem" da esquerda
  // para a direita uma única vez; depois permanecem no estado final.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const n = phases.length;

    const apply = (p: number) => {
      for (let i = 0; i < n; i++) {
        const frac = Math.min(1, Math.max(0, (p - i / n) / (1 / n)));
        const fill = fillRefs.current[i];
        if (fill) fill.style.width = `${(frac * 100).toFixed(2)}%`;
        const title = titleRefs.current[i];
        if (title) {
          const lit = frac > 0;
          title.classList.toggle("text-neutral-50", lit);
          title.classList.toggle("text-neutral-500", !lit);
        }
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }

    apply(0);
    const state = { p: 0 };
    const tween = gsap.to(state, {
      p: 1,
      duration: 1.8,
      ease: "sine.inOut",
      paused: true,
      onUpdate: () => apply(state.p),
    });
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });
    ScrollTrigger.refresh();
    return () => {
      st.kill();
      tween.kill();
    };
  }, []);

  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      {/* Cabeçalho — canto esquerdo */}
      <div className="flex max-w-[640px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Implantação faseada
        </p>
        <h2 className="text-h3 font-normal text-neutral-50">
          Comece pelo gargalo. Cresça com base em resultado.
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          Você não precisa automatizar tudo de uma vez. Estruturamos roadmaps que
          entregam valor em ondas.
        </p>
      </div>

      {/* Fases — acendem da esquerda para a direita ao entrar na viewport */}
      <ol
        ref={wrapRef}
        className="grid w-full grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3"
      >
        {phases.map((phase, i) => (
          <li key={phase.number} className="flex w-full flex-col">
            <div className="flex flex-col gap-2">
              <span className="font-heading text-h6 font-bold text-primary-500">
                {phase.number}
              </span>
              <h3
                ref={(el) => {
                  titleRefs.current[i] = el;
                }}
                className="font-heading text-h6 font-semibold text-neutral-500 transition-colors duration-300"
              >
                {phase.title}
              </h3>
              <p className="min-h-[3.4em] text-body-sm leading-[1.35] text-neutral-400">
                {phase.description}
              </p>
            </div>

            {/* Linha base + preenchimento laranja. 24px de distância do texto. */}
            <span className="relative mt-6 block h-0.5 w-full overflow-hidden rounded-full bg-white/15">
              <span
                ref={(el) => {
                  fillRefs.current[i] = el;
                }}
                className="absolute inset-y-0 left-0 rounded-full bg-primary-500"
                style={{ width: "0%" }}
              />
            </span>
          </li>
        ))}
      </ol>

      <Button
        variant="primary"
        size="lg"
        href={ROUTES.ORCAMENTO}
        className="self-start"
      >
        Avaliar minha operação
      </Button>
    </Section>
  );
}
