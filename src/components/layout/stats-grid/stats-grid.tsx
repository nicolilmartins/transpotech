"use client";

import { useEffect, useRef, useState } from "react";
import { ease, onScrollPast, prefersReducedMotion, tween } from "@/lib/motion";
import { useNearViewport } from "@/hooks/use-near-viewport";

export type Stat = { value: string; label: string };

// Conta o primeiro número do valor de 0 até o alvo, preservando prefixo e
// sufixo ("+60%", "24/7"). Números com milhar pt-BR ("+3.700") contam inteiros
// e são reformatados com o ponto de milhar.
const countValue = (value: string, progress: number) =>
  value.replace(/\d{1,3}(?:\.\d{3})+|\d+/, (digits) => {
    const target = parseInt(digits.replace(/\./g, ""), 10);
    const current = Math.round(target * progress);
    return digits.includes(".")
      ? current.toLocaleString("pt-BR")
      : String(current);
  });

type StatsGridProps = {
  stats: Stat[];
  /** Classes do grid (colunas/gap). */
  className?: string;
};

// Cards de indicadores do padrão "O que muda quando a operação é automatizada":
// fundo translúcido, número grande com contagem ao entrar na viewport e blur
// verde no canto (hover no desktop / card visível no mobile).
export function StatsGrid({
  stats,
  className = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
}: StatsGridProps) {
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
              entry.target as HTMLDivElement,
            );
            if (idx >= 0) setActiveCard(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    cardElRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Zera os números e cria o gatilho de scroll só quando a grade se aproxima da
  // viewport, fora da hidratação. Uma tela de margem: a troca para 0 acontece
  // antes de o card ficar visível.
  useNearViewport(gridRef, () => {
    const el = gridRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    stats.forEach((s, i) => {
      const node = numberRefs.current[i];
      if (node) node.textContent = countValue(s.value, 0);
    });

    const cancels: (() => void)[] = [];
    const stopTrigger = onScrollPast(el, 0.8, () => {
      stats.forEach((s, i) => {
        cancels.push(
          tween({
            duration: 1.6,
            ease: ease.power3Out,
            onUpdate: (p) => {
              const node = numberRefs.current[i];
              if (node) node.textContent = countValue(s.value, p);
            },
          }),
        );
      });
    });

    return () => {
      stopTrigger();
      cancels.forEach((cancel) => cancel());
    };
  });

  return (
    <div ref={gridRef} className={className}>
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
  );
}
