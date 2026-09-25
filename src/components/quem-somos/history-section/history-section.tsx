"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { SectionContent } from "@/sanity/content/fields";
import type { quemSomosPage } from "@/sanity/content/pages/quem-somos";

type HistoryContent = SectionContent<typeof quemSomosPage.sections.history>;

// Linha horizontal + nós (mesmo padrão da seção "Como funciona a compra de
// usada"): camada base (cinza) sob a laranja, revelada por clip-path da
// esquerda para a direita conforme a seção entra na viewport.
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
      {/* Cada nó fica no início da coluna (mesmo x da divisória vertical), com
          -translate-x-1/2 para centralizar sobre a linha. */}
      <div className="relative grid h-full grid-cols-5">
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

export function HistorySection({ content }: { content: HistoryContent }) {
  const { milestones } = content;
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  // Mobile: trilho vertical à esquerda (mesma interação da régua do desktop)
  const railWrapRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [dotYs, setDotYs] = useState<number[]>([]);

  // Mede a posição vertical de cada marco para posicionar os pontos do trilho.
  useEffect(() => {
    const wrap = railWrapRef.current;
    if (!wrap) return;
    const build = () => {
      const top = wrap.getBoundingClientRect().top;
      setDotYs(
        liRefs.current.map((el) =>
          el ? el.getBoundingClientRect().top - top + 8 : 0
        )
      );
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Preenche o trilho vertical de laranja conforme o scroll (mobile).
  useEffect(() => {
    const wrap = railWrapRef.current;
    const fill = railFillRef.current;
    if (!wrap || !fill) return;
    const set = (p: number) => {
      fill.style.clipPath = `inset(-12px -12px ${((1 - p) * 100).toFixed(2)}% -12px)`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1);
      return;
    }
    set(0);
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 70%",
      end: "bottom 80%",
      scrub: true,
      onUpdate: (self) => set(self.progress),
    });
    ScrollTrigger.refresh();
    return () => st.kill();
  }, []);

  // A régua laranja "carrega" (esquerda → direita) uma única vez quando a seção
  // entra na viewport, em sincronia com a entrada dos demais elementos.
  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;
    const set = (p: number) => {
      const r = 1 - p;
      fill.style.clipPath = `inset(-12px calc(${(r * 100).toFixed(2)}% + ${(r * 12).toFixed(1)}px) -12px -12px)`;
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
      trigger: track,
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
    <Section data-header-dark className="flex flex-col gap-10 lg:gap-14">
      {/* Título em uma linha + descrição (topo esquerdo) */}
      <div className="flex max-w-[760px] flex-col gap-4">
        <h2 className="text-h2 text-neutral-50">
          <span className="font-normal">{content.titleRegular}</span>
          <span className="font-bold">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-400">
          {content.description}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Colunas — marco (ano) + título + descrição, divisores entre elas.
            Mobile: trilho vertical à esquerda com pontos por marco (base cinza
            + laranja que carrega no scroll, como a régua do desktop). */}
        <div ref={railWrapRef} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-3 sm:hidden"
          >
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/15" />
            {dotYs.map((y, i) => (
              <span
                key={i}
                className="absolute left-0 size-3 rounded-full bg-neutral-600"
                style={{ top: y }}
              />
            ))}
          </div>
          <div
            ref={railFillRef}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-3 sm:hidden"
            style={{ clipPath: "inset(-12px -12px 100% -12px)" }}
          >
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-primary-500" />
            {dotYs.map((y, i) => (
              <span
                key={i}
                className="absolute left-0 size-3 rounded-full bg-primary-500 shadow-[0_0_12px_rgba(245,130,32,0.7)]"
                style={{ top: y }}
              />
            ))}
          </div>

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {milestones.map((milestone, i) => (
              <li
                key={milestone.badge}
                ref={(el) => {
                  liRefs.current[i] = el;
                }}
                className={`flex flex-col gap-4 pl-10 sm:pl-0 lg:px-6 ${
                  i > 0 ? "lg:border-l lg:border-white/10" : ""
                }`}
              >
                <span className="inline-flex w-fit rounded-md bg-primary-500 px-3 py-1 text-body font-semibold uppercase tracking-wide text-neutral-50">
                  {milestone.badge}
                </span>
                <h3 className="font-heading text-h6 font-semibold text-neutral-50">
                  {milestone.title}
                </h3>
                <p className="text-body leading-[1.4] text-neutral-400">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Linha de baixo (desktop) — cinza base + laranja que carrega no scroll */}
        <div ref={trackRef} className="relative hidden lg:block">
          <LineMarkers count={milestones.length} tone="base" />
          <div
            ref={fillRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(-12px calc(100% + 12px) -12px -12px)" }}
          >
            <LineMarkers count={milestones.length} tone="fill" />
          </div>
        </div>
      </div>
    </Section>
  );
}
