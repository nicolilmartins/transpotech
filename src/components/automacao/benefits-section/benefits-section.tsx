"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const countValue = (value: string, progress: number) =>
  value.replace(/\d+/, (digits) =>
    String(Math.round(parseInt(digits, 10) * progress))
  );

type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: "+60%", label: "produtividade média" },
  { value: "−70%", label: "erros de separação" },
  { value: "+40%", label: "uso do espaço vertical" },
  { value: "24/7", label: "operação contínua" },
  { value: "−30%", label: "custo operacional" },
  { value: "100%", label: "rastreabilidade do pedido" },
];

export function BenefitsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardElRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Card "ativo" no mobile: o que está passando pelo centro da viewport.
  // No desktop o blur segue o hover (este estado é ignorado em lg+).
  const [activeCard, setActiveCard] = useState(-1);

  // No mobile, o blur verde acende no card conforme o usuário o vê (scroll).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cardElRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx >= 0) setActiveCard(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    cardElRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    stats.forEach((s, i) => {
      const node = numberRefs.current[i];
      if (node) node.textContent = countValue(s.value, 0);
    });

    const counters = stats.map(() => ({ progress: 0 }));
    const tweens: gsap.core.Tween[] = [];

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        stats.forEach((s, i) => {
          tweens.push(
            gsap.to(counters[i], {
              progress: 1,
              duration: 1.6,
              ease: "power3.out",
              onUpdate: () => {
                const node = numberRefs.current[i];
                if (node)
                  node.textContent = countValue(s.value, counters[i].progress);
              },
            })
          );
        });
      },
    });

    return () => {
      trigger.kill();
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section data-header-dark className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[640px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-400">
          Benefícios
        </p>
        <h2 className="text-h2 font-normal text-neutral-50">
          O que muda quando a{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">
            operação é automatizada
          </span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          Indicadores típicos observados em projetos Dematic ao redor do mundo.
          <br />
          Resultados variam por operação.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            ref={(node) => {
              cardElRefs.current[i] = node;
            }}
            className="group relative flex flex-col gap-1 overflow-hidden rounded-xl bg-[rgba(251,251,251,0.05)] p-6"
          >
            {/* Blur verde no canto — hover (desktop) / card visível (mobile) */}
            <div
              aria-hidden
              className={`pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-secondary-500 blur-[70px] transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-50 ${
                activeCard === i ? "opacity-50" : "opacity-0"
              }`}
            />
            <div className="relative z-10 flex flex-col gap-1">
              <span
                ref={(node) => {
                  numberRefs.current[i] = node;
                }}
                className="font-heading text-h2 font-bold leading-[1.2] text-neutral-50"
              >
                {s.value}
              </span>
              <span className="text-body leading-[1.35] text-neutral-400">
                {s.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
