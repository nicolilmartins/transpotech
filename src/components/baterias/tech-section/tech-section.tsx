"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import illoBattery from "@/assets/images/stats/illustration-battery.webp";
import illoChartDown from "@/assets/images/stats/card3.png";
import illoBatteryRoom from "@/assets/images/stats/illustration-battery-room.webp";

const cardImages = [illoBattery, illoChartDown, illoBatteryRoom];

// Conta o número principal (primeiro grupo de dígitos), preservando sufixos.
const countValue = (value: string, progress: number) =>
  value.replace(/\d+/, (digits) =>
    String(Math.round(parseInt(digits, 10) * progress))
  );

type Stat = {
  value: string;
  label: string;
  countdownFrom?: number;
  // Largura máx. do rótulo (força 2 linhas, como no Figma).
  labelWidth: number;
  // Posicionamento da ilustração (segue o Figma: card 1 centralizado,
  // cards 2 e 3 à direita, sangrando pela borda direita).
  imgScale: number;
  imgPos: string;
  imgOrigin: string;
};

const stats: Stat[] = [
  {
    value: "3x mais",
    label: "Mais vida útil do que baterias chumbo-ácidas",
    labelWidth: 185,
    imgScale: 1.7,
    imgPos: "92% 50%",
    imgOrigin: "center",
  },
  {
    value: "30%",
    label: "Redução no consumo de energia",
    labelWidth: 160,
    imgScale: 1.15,
    imgPos: "100% 50%",
    imgOrigin: "right center",
  },
  // Contador decrescente: parte de countdownFrom e chega a 0.
  {
    value: "0",
    label: "Salas de baterias necessárias",
    countdownFrom: 10,
    labelWidth: 160,
    imgScale: 1.6,
    imgPos: "128% 50%",
    imgOrigin: "right center",
  },
];

const displayValue = (s: Stat, progress: number) =>
  s.countdownFrom != null
    ? String(Math.round(s.countdownFrom * (1 - progress)))
    : countValue(s.value, progress);

export function TechSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardElRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Card "ativo" no mobile: aquele que passa pelo centro da viewport.
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cardElRefs.current.indexOf(entry.target as HTMLDivElement);
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
    const el = statsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    stats.forEach((s, i) => {
      const node = numberRefs.current[i];
      if (node) node.textContent = displayValue(s, 0);
    });

    const counters = stats.map(() => ({ progress: 0 }));
    const tweens: gsap.core.Tween[] = [];

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        stats.forEach((s, i) => {
          tweens.push(
            gsap.to(counters[i], {
              progress: 1,
              duration: 1.8,
              ease: "power3.out",
              onUpdate: () => {
                const node = numberRefs.current[i];
                if (node) node.textContent = displayValue(s, counters[i].progress);
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
    <Section className="flex flex-col gap-12 lg:gap-16">
      {/* Cabeçalho */}
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Tecnologia
        </p>
        <h2 className="text-h2 font-normal text-neutral-800">
          Especialistas em baterias
          <br />
          de Íons de Lítio
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Distribuidores autorizados das marcas líderes em carregadores e
          baterias tracionárias e de arranque. Tecnologia que reduz custo, libera
          espaço e elimina paradas para troca de bateria.
        </p>
      </div>

      {/* Estatísticas — cards com imagem no mesmo estilo da home */}
      <div ref={statsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            ref={(node) => {
              cardElRefs.current[i] = node;
            }}
            className="group relative flex min-h-[160px] flex-1 flex-col gap-1 overflow-hidden rounded-3xl bg-[#f9f9f9] p-4 lg:h-[172px] lg:p-5"
          >
            {/* Ilustração à direita — dimensionada como no Figma (canto direito,
                praticamente completa, com leve sangramento no topo). */}
            <Image
              src={cardImages[i]}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              style={{
                transform: `scale(${s.imgScale})`,
                transformOrigin: s.imgOrigin,
                objectPosition: s.imgPos,
              }}
              className="pointer-events-none select-none object-contain"
            />

            {/* Glow laranja radial no rodapé — hover (desktop) / card ativo (mobile) */}
            <div
              aria-hidden
              className={`pointer-events-none absolute left-1/2 top-[165px] h-[66px] w-[162px] -translate-x-1/2 rounded-full bg-primary-500 blur-[77px] transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 ${
                activeCard === i ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="relative flex flex-col gap-2">
              <span
                ref={(node) => {
                  numberRefs.current[i] = node;
                }}
                className="font-heading text-h2 font-bold leading-[1.3] text-secondary-600"
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
    </Section>
  );
}
