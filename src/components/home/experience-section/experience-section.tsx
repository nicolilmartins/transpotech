"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import card1 from "@/assets/images/stats/card1.png";
import card2 from "@/assets/images/stats/card2.png";
import card3 from "@/assets/images/stats/card3.png";
import card4 from "@/assets/images/stats/card4.png";

const cardImages = [card1, card2, card3, card4];

const COUNT_DURATION = 1800; // ms — todos contam juntos e terminam juntos
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Conta o número principal (primeiro grupo de dígitos), preservando
// prefixos/sufixos: "+3500", "34%", "24/7" → "/7" fica estático.
const countValue = (value: string, t: number) =>
  value.replace(/\d+/, (digits) =>
    String(Math.round(parseInt(digits, 10) * t))
  );

const stats = [
  {
    value: "+3500",
    label: "Empilhadeiras locadas operando ativamente em diversos segmentos",
    labelWidth: 178,
  },
  {
    value: "24/7",
    label: "Atendimento com manutenção preventiva e corretiva",
    labelWidth: 157,
  },
  {
    value: "34%",
    label: "Na redução do Imposto de Renda com modelo de locação",
    labelWidth: 163,
  },
  {
    value: "+24",
    label: "Anos de mercado com experiência consolidada no setor.",
    labelWidth: 170,
  },
];

export function ExperienceSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setProgress = (t: number) =>
      stats.forEach((s, i) => {
        const node = numberRefs.current[i];
        if (node) node.textContent = countValue(s.value, t);
      });

    setProgress(0); // começa zerado até entrar na viewport

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / COUNT_DURATION);
          setProgress(easeOut(t));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative isolate flex flex-col items-start gap-10 overflow-hidden px-4 py-16 sm:px-8 lg:gap-16 lg:px-16 lg:py-20">
      {/* Cabeçalho */}
      <div className="flex w-[641px] max-w-full flex-col gap-6">
        <div className="flex w-[400px] max-w-full flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            EXPERIÊNCIA
          </p>
          <h2 className="text-h2 font-normal text-neutral-800">
            Frota, equipe e cobertura nacional
          </h2>
        </div>
        <p className="w-[510px] max-w-full text-body leading-[1.35] text-neutral-600">
          Escala, equipe e infraestrutura para garantir disponibilidade,
          agilidade e suporte técnico em todo o Sul e Sudeste.
        </p>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex">
        {stats.map((s, i) => (
          <div
            key={s.value}
            className="group relative flex min-h-[160px] flex-1 flex-col gap-1 overflow-hidden rounded-3xl bg-[#f9f9f9] p-5 lg:h-[172px]"
          >
            {/* Ilustração à direita (tamanho do Figma) — leve zoom no hover */}
            <Image
              src={cardImages[i]}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="pointer-events-none origin-right select-none object-contain object-right transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Glow laranja radial no rodapé — visível apenas no hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[165px] h-[66px] w-[162px] -translate-x-1/2 rounded-full bg-primary-500 opacity-0 blur-[77px] transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative flex flex-col gap-2">
              <span
                ref={(node) => {
                  numberRefs.current[i] = node;
                }}
                className="font-heading text-[40px] font-bold leading-[1.3] text-primary-500"
              >
                {s.value}
              </span>
              <span
                className="text-body leading-[1.35] text-neutral-600"
                style={{ maxWidth: s.labelWidth }}
              >
                {s.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" size="lg">
        Quero reduzir meus custos
      </Button>
    </section>
  );
}
