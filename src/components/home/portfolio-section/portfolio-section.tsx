"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Sparkles, CircleDollarSign, Calendar, type LucideIcon } from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import novas from "@/assets/images/portfolio-novas.png";
import egv165 from "@/assets/images/empilhadeiras/egv-16-5.webp";
import linde from "@/assets/images/empilhadeiras/linde.webp";
import { gsap } from "@/lib/gsap";

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
    image: egv165,
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
    image: linde,
  },
];

export function PortfolioSection() {
  const [active, setActive] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Inicializa: card ativo com imagem aberta, demais fechadas
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, i === active
        ? { width: 270, marginLeft: 25, opacity: 1 }
        : { width: 0, marginLeft: 0, opacity: 0 }
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Anima ao mudar o card ativo
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        gsap.to(el, { width: 270, marginLeft: 25, opacity: 1, duration: 0.3, ease: "power1.out", overwrite: "auto" });
      } else {
        gsap.to(el, { width: 0, marginLeft: 0, opacity: 0, duration: 0.3, ease: "power1.out", overwrite: "auto" });
      }
    });
  }, [active]);

  return (
    <section
      data-header-dark
      className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-5 py-16 sm:px-6 lg:gap-[67px] lg:px-16 lg:py-20 2xl:px-30"
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
              className={`flex items-start overflow-hidden rounded-xl bg-white/5 p-6 transition-[flex-grow] duration-300 ease-out lg:h-[373px] lg:items-center ${
                open ? "lg:flex-[1_1_315px]" : "lg:flex-[0_0_315px]"
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-5 lg:h-full lg:justify-between lg:gap-0">
                <card.icon className="size-6 shrink-0 text-primary-400 lg:size-8" aria-hidden />
                <div className="flex flex-col gap-4 lg:w-[267px]">
                  <h3 className="min-h-[2.6em] font-heading text-[20px] font-semibold leading-[1.3] text-neutral-100 lg:text-[24px]">
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
                <TextLink className="text-left">{card.cta}</TextLink>
              </div>

              {/* Imagem — apenas no desktop, animada por GSAP */}
              <div
                ref={(node) => { imageRefs.current[index] = node; }}
                aria-hidden={!open}
                className="hidden h-[325px] shrink-0 overflow-hidden rounded-lg lg:block"
                style={{ width: 0, opacity: 0 }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="h-[325px] w-[270px] max-w-none object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
