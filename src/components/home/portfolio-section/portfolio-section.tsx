"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Sparkles, CircleDollarSign, Calendar, type LucideIcon } from "lucide-react";
import novas from "@/assets/images/portfolio-novas.png";

type PortfolioCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  image: StaticImageData;
};

const cards: PortfolioCard[] = [
  {
    icon: Sparkles,
    title: "Empilhadeiras\nnovas",
    description:
      "Equipamentos de marcas reconhecidas para operações que exigem desempenho, segurança e confiabilidade no longo prazo.",
    cta: "Ver empilhadeiras novas",
    image: novas,
  },
  {
    icon: CircleDollarSign,
    title: "Empilhadeiras\nusadas",
    description:
      "Alternativo para quem busca disponibilidade rápida, revisão técnica e melhor adequação ao orçamento.",
    cta: "Ver empilhadeiras usadas",
    image: novas,
  },
  {
    icon: Calendar,
    title: "Locação de equipamentos",
    description:
      "Solução para operações que precisam de flexibilidade, previsibilidade de custo e resposta rápida à demanda.",
    cta: "Solicitar proposta",
    image: novas,
  },
];

export function PortfolioSection() {
  // Card aberto (estilo destaque com imagem). Inicia com o primeiro aberto;
  // o hover/foco em outro card o abre e fecha os demais.
  const [active, setActive] = useState(0);

  return (
    <section
      data-header-dark
      className="flex flex-col items-start gap-10 px-4 py-16 sm:px-8 lg:gap-[67px] lg:px-16 lg:py-20"
    >
      {/* Cabeçalho */}
      <div className="flex w-[641px] max-w-full flex-col gap-6">
        <div className="flex w-[535px] max-w-full flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-primary-400">
            PORTFÓLIO
          </p>
          <h2 className="text-h2 font-normal text-neutral-100">
            Equipamentos novos, usados e locação de frota
          </h2>
        </div>
        <p className="text-body leading-6 text-neutral-300">
          Da aquisição e locação ao suporte técnico e automação, a TranspoTech
          conecta as principais necessidades da movimentação e intralogística em
          uma estrutura integrada.
        </p>
      </div>

      {/* Cards — apenas um aberto por vez */}
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch">
        {cards.map((card, index) => {
          const open = index === active;
          return (
            <div
              key={card.title}
              onMouseEnter={() => setActive(index)}
              onFocusCapture={() => setActive(index)}
              className={`flex min-h-[200px] items-start overflow-hidden rounded-xl bg-white/5 p-6 transition-[flex-grow] duration-300 ease-out lg:h-[373px] lg:items-center ${
                open ? "lg:flex-[1_1_315px]" : "lg:flex-[0_0_315px]"
              }`}
            >
              <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
                <card.icon className="size-8 shrink-0 text-primary-400" aria-hidden />
                <div className="flex flex-col gap-4">
                  <h3 className="min-h-[2.6em] font-heading text-[24px] font-semibold leading-[1.3] text-neutral-100">
                    {card.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="text-body leading-[1.35] text-neutral-300">
                    {card.description}
                  </p>
                </div>
                <button className="text-left text-body font-semibold leading-[1.35] text-primary-400">
                  {card.cta}
                </button>
              </div>

              {/* Imagem — apenas no desktop, revelada suavemente ao abrir */}
              <div
                aria-hidden={!open}
                className={`hidden shrink-0 overflow-hidden rounded-lg transition-[width,margin-left,opacity] duration-300 ease-out lg:block ${
                  open ? "ml-[25px] h-[325px] w-[310px] opacity-100" : "ml-0 h-[325px] w-0 opacity-0"
                }`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="h-[325px] w-[310px] max-w-none object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
