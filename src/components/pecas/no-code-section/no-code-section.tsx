"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Step = { number: string; title: string; description: string };

const steps: Step[] = [
  {
    number: "01",
    title: "Descreva o problema",
    description: "Explique o que está acontecendo com o equipamento.",
  },
  {
    number: "02",
    title: "Informe o equipamento",
    description: "Informe marca, modelo, capacidade ou número de série.",
  },
  {
    number: "03",
    title: "Receba orientação",
    description: "A equipe avalia as informações e direciona a solicitação.",
  },
];

export function NoCodeSection() {
  const wrapRef = useRef<HTMLOListElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Ao entrar na viewport, a linha laranja e os títulos "acendem" da esquerda
  // para a direita uma única vez; depois permanecem no estado final.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const n = steps.length;

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
        <h2 className="text-h2 font-normal text-neutral-50">
          Não sabe o código da peça?
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          Muitas solicitações começam com uma descrição do problema, uma foto ou
          os dados do equipamento. A TranspoTech ajuda a direcionar sua
          necessidade.
        </p>
      </div>

      {/* Passos — acendem da esquerda para a direita ao entrar na viewport */}
      <ol
        ref={wrapRef}
        className="grid w-full grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3"
      >
        {steps.map((step, i) => (
          <li key={step.number} className="flex w-full flex-col">
            <div className="flex flex-col gap-2">
              <span className="font-heading text-h6 font-bold text-primary-500">
                {step.number}
              </span>
              <h3
                ref={(el) => {
                  titleRefs.current[i] = el;
                }}
                className="font-heading text-h6 font-semibold text-neutral-500 transition-colors duration-300"
              >
                {step.title}
              </h3>
              <p className="truncate text-body-sm leading-[1.35] text-neutral-400">
                {step.description}
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

      <Button variant="primary" size="lg" href={ROUTES.ORCAMENTO}>
        Receber orientação
      </Button>
    </Section>
  );
}
