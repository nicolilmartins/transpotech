"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import illustration from "@/assets/images/stats/illustration-segment.webp";

type Marker = {
  title: string;
  description: string;
  color: "green" | "orange";
  side: "left" | "right";
  label: { left: string; top: string };
  line: { left: string; top: string; width: string };
  dot: { left: string; top: string };
  delay: number;
};

// Coordenadas em % relativas à composição do Figma (1281 × 449), traduzidas do
// frame 3247:2677. Mantém o posicionamento fiel ao design.
const markers: Marker[] = [
  {
    title: "Indústria",
    description:
      "Suporte para abastecimento de linha, movimentação interna e continuidade de produção.",
    color: "green",
    side: "left",
    label: { left: "6.1%", top: "5.67%" },
    line: { left: "7.6%", top: "14.48%", width: "31.19%" },
    dot: { left: "38.8%", top: "14.49%" },
    delay: 360,
  },
  {
    title: "Distribuição",
    description:
      "Soluções para armazenagem, fluxo, picking, expedição e produtividade operacional.",
    color: "green",
    side: "left",
    label: { left: "2.16%", top: "58.16%" },
    line: { left: "0%", top: "66.97%", width: "31.19%" },
    dot: { left: "31.08%", top: "66.98%" },
    delay: 450,
  },
  {
    title: "Varejo e atacado",
    description:
      "Apoio para movimentação eficiente em operações com alto giro e necessidade de ritmo constante.",
    color: "orange",
    side: "right",
    label: { left: "78.96%", top: "24.72%" },
    line: { left: "62.57%", top: "32.29%", width: "31.19%" },
    dot: { left: "62.85%", top: "32.24%" },
    delay: 540,
  },
  {
    title: "Logística",
    description:
      "Estrutura para operações que precisam de disponibilidade, resposta rápida e previsibilidade.",
    color: "orange",
    side: "right",
    label: { left: "78.18%", top: "73.5%" },
    line: { left: "64.37%", top: "82.41%", width: "31.19%" },
    dot: { left: "64.4%", top: "82.48%" },
    delay: 630,
  },
];

const baseTransition = "transition-all duration-700 ease-out";

export function SegmentsSection() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Dispara a cascata quando a seção entra na viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slideIn = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? "none" : "translateY(16px)",
    transitionDelay: `${delay}ms`,
  });
  const fadeIn = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transitionDelay: `${delay}ms`,
  });

  return (
    <section ref={ref} data-reveal-skip className="flex flex-col gap-10 px-4 py-16 sm:px-8 lg:gap-16 lg:px-[61px] lg:py-20">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex w-[626px] max-w-full flex-col items-center gap-4">
          <p
            className={`text-body font-semibold leading-[1.35] text-primary-500 ${baseTransition}`}
            style={slideIn(0)}
          >
            SEGMENTOS
          </p>
          <h2
            className={`w-[426px] max-w-full text-[40px] font-bold leading-[1.1] text-neutral-800 ${baseTransition}`}
            style={slideIn(80)}
          >
            Aplicações por setor
          </h2>
        </div>
        <p
          className={`w-[507px] max-w-full text-body leading-6 text-neutral-600 ${baseTransition}`}
          style={slideIn(160)}
        >
          A TranspoTech apoia empresas com necessidades distintas de
          movimentação, abastecimento interno, armazenagem e suporte técnico.
        </p>
      </div>

      {/* Mobile — grid simples de segmentos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {markers.map((m) => (
          <div
            key={m.title}
            className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-5"
          >
            <span
              className={`h-2 w-8 rounded-full ${
                m.color === "green" ? "bg-secondary-500" : "bg-primary-500"
              }`}
            />
            <h3 className="font-heading text-lg font-bold text-neutral-800">
              {m.title}
            </h3>
            <p className="text-body leading-6 text-neutral-600">
              {m.description}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop — composição: ilustração + marcadores por setor */}
      <div className="relative mx-auto hidden aspect-[1281/449] w-full max-w-[1281px] lg:block">
        {/* Ilustração do polo logístico */}
        <div
          className={`absolute ${baseTransition}`}
          style={{
            left: "21.46%",
            top: "0%",
            width: "57.5%",
            height: "92.34%",
            ...fadeIn(240),
          }}
        >
          <Image
            src={illustration}
            alt="Ilustração isométrica de um polo logístico com indústria, centros de distribuição, varejo e veículos em operação"
            fill
            sizes="58vw"
            className="object-contain"
          />
        </div>

        {markers.map((m) => {
          const dotColor =
            m.color === "green" ? "bg-secondary-500" : "bg-primary-500";
          const haloColor =
            m.color === "green" ? "bg-secondary-500/30" : "bg-primary-500/30";
          const lineGradient =
            m.side === "left"
              ? "bg-gradient-to-r from-transparent to-secondary-500/60"
              : "bg-gradient-to-r from-primary-500/60 to-transparent";

          return (
            <Fragment key={m.title}>
              {/* Linha conectora */}
              <div
                aria-hidden
                className={`absolute h-px ${lineGradient} ${baseTransition}`}
                style={{
                  left: m.line.left,
                  top: m.line.top,
                  width: m.line.width,
                  ...fadeIn(m.delay),
                }}
              />

              {/* Marcador (halo + núcleo) */}
              <div
                aria-hidden
                className={`absolute size-10 ${baseTransition}`}
                style={{
                  left: `calc(${m.dot.left} - 20px)`,
                  top: `calc(${m.dot.top} - 20px)`,
                  ...fadeIn(m.delay),
                }}
              >
                <span
                  className={`absolute inset-0 rounded-full blur-[5px] ${haloColor}`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${dotColor}`}
                />
              </div>

              {/* Rótulo */}
              <div
                className={`absolute flex w-[21%] flex-col gap-4 ${baseTransition}`}
                style={{ left: m.label.left, top: m.label.top, ...slideIn(m.delay) }}
              >
                <h3 className="whitespace-nowrap font-heading text-[24px] font-bold leading-[1.3] text-neutral-800">
                  {m.title}
                </h3>
                <p className="text-body leading-6 text-neutral-600">
                  {m.description}
                </p>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
