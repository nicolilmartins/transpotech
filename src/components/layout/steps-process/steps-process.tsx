"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type ProcessStep = {
  title: ReactNode;
  description: string;
  Icon: LucideIcon;
};

type StepsProcessProps = {
  /** Conteúdo interno do <h2> (ex.: spans normal + bold laranja). */
  title: ReactNode;
  description: string;
  steps: ProcessStep[];
  id?: string;
  /**
   * grid-template-columns aplicado no desktop. Padrão: colunas iguais
   * (repeat(n, minmax(0,1fr))). Use para larguras customizadas (ex.: Canal).
   */
  columnsTemplate?: string;
};

// Linha horizontal (desktop) + nós: camada base (cinza) sob a camada laranja,
// revelada por clip-path da esquerda para a direita conforme entra na viewport.
function LineMarkers({
  count,
  tone,
}: {
  count: number;
  tone: "base" | "fill";
}) {
  const isFill = tone === "fill";
  return (
    <div className="relative h-3">
      <div
        className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 ${
          isFill ? "bg-primary-500" : "bg-white/15"
        }`}
      />
      <div className="relative grid h-full [grid-template-columns:var(--cols)]">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center">
            <span
              className={`size-3 -translate-x-1/2 rounded-full ${
                isFill
                  ? "bg-primary-500 shadow-[0_0_12px_rgba(245,130,32,0.7)]"
                  : "bg-neutral-600"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Linha vertical (mobile) — mesma dupla de camadas: base cinza + laranja
// revelada por clip-path de cima para baixo. Os pontos ficam na altura do
// ícone de cada passo (posições medidas).
function VerticalLineMarkers({
  tone,
  dotTops,
}: {
  tone: "base" | "fill";
  dotTops: number[];
}) {
  const isFill = tone === "fill";
  return (
    <div className="absolute inset-y-0 left-0 w-3">
      <div
        className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 ${
          isFill ? "bg-primary-500" : "bg-white/15"
        }`}
      />
      {dotTops.map((top, i) => (
        <span
          key={i}
          style={{ top }}
          className={`absolute left-1/2 size-3 -translate-x-1/2 rounded-full ${
            isFill
              ? "bg-primary-500 shadow-[0_0_12px_rgba(245,130,32,0.7)]"
              : "bg-neutral-600"
          }`}
        />
      ))}
    </div>
  );
}

export function StepsProcess({
  title,
  description,
  steps,
  id,
  columnsTemplate,
}: StepsProcessProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const listWrapRef = useRef<HTMLDivElement>(null);
  const mobileFillRef = useRef<HTMLDivElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [dotTops, setDotTops] = useState<number[]>([]);

  const cols =
    columnsTemplate ?? `repeat(${steps.length}, minmax(0, 1fr))`;

  // Pontos alinhados aos divisores: o 1º no início da lista e os demais
  // centrados na borda superior (divisor) de cada passo seguinte.
  useEffect(() => {
    const wrap = listWrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const wr = wrap.getBoundingClientRect();
      setDotTops(
        liRefs.current.map((el, i) => {
          if (!el) return 0;
          const top = el.getBoundingClientRect().top - wr.top;
          return i === 0 ? top : top - 6;
        })
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // A linha laranja começa apagada e "carrega" uma única vez quando a seção
  // entra na viewport (desktop: esquerda → direita; mobile: cima → baixo).
  useEffect(() => {
    const wrap = listWrapRef.current;
    if (!wrap) return;
    const set = (p: number) => {
      const r = 1 - p;
      if (fillRef.current)
        fillRef.current.style.clipPath = `inset(-12px calc(${(r * 100).toFixed(2)}% + ${(r * 12).toFixed(1)}px) -12px -12px)`;
      if (mobileFillRef.current)
        mobileFillRef.current.style.clipPath = `inset(-12px -12px calc(${(r * 100).toFixed(2)}% + ${(r * 12).toFixed(1)}px) -12px)`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1);
      return;
    }
    set(0);
    const state = { p: 0 };
    const tween = gsap.to(state, {
      p: 1,
      duration: 1.8,
      ease: "sine.inOut",
      paused: true,
      onUpdate: () => set(state.p),
    });
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 90%",
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
    <Section id={id} data-header-dark className="flex flex-col gap-10 lg:gap-14">
      {/* Título em duas linhas + descrição (topo esquerdo) */}
      <div className="flex max-w-[560px] flex-col gap-4">
        <h2 className="text-h2 text-neutral-50">{title}</h2>
        <p className="text-body leading-[1.5] text-neutral-400">{description}</p>
      </div>

      <div
        className="flex flex-col gap-8"
        style={{ ["--cols" as string]: cols }}
      >
        {/* Mobile: linha vertical com pontos rente ao padding esquerdo +
            divisores horizontais entre os passos. Desktop: divisores verticais
            + linha horizontal de baixo. */}
        <div ref={listWrapRef} className="relative">
          <div className="lg:hidden">
            <VerticalLineMarkers tone="base" dotTops={dotTops} />
            <div
              ref={mobileFillRef}
              className="absolute inset-y-0 left-0 w-3"
              style={{
                clipPath: "inset(-12px -12px calc(100% + 12px) -12px)",
              }}
            >
              <VerticalLineMarkers tone="fill" dotTops={dotTops} />
            </div>
          </div>

          <ol className="grid grid-cols-1 pl-8 lg:pl-0 lg:[grid-template-columns:var(--cols)]">
            {steps.map((step, i) => (
              <li
                key={i}
                ref={(el) => {
                  liRefs.current[i] = el;
                }}
                className={`flex flex-col gap-4 lg:px-6 ${
                  i > 0
                    ? "border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pt-0"
                    : ""
                } ${i < steps.length - 1 ? "pb-8 lg:pb-0" : ""}`}
              >
                <step.Icon aria-hidden className="size-6 text-neutral-200" />
                <h3 className="font-heading text-h6 font-semibold text-neutral-50">
                  {step.title}
                </h3>
                <p className="text-body-sm leading-[1.4] text-neutral-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Linha de baixo (desktop) — cinza base + laranja que carrega no scroll */}
        <div ref={trackRef} className="relative hidden lg:block">
          <LineMarkers count={steps.length} tone="base" />
          <div
            ref={fillRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(-12px calc(100% + 12px) -12px -12px)" }}
          >
            <LineMarkers count={steps.length} tone="fill" />
          </div>
        </div>
      </div>
    </Section>
  );
}
