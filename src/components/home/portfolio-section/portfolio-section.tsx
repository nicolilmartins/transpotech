"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Sparkles, CircleDollarSign, Calendar, type LucideIcon } from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
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

  // Inicializa: card ativo com imagem aberta (gap fixo de 40px), demais fechadas.
  // A LARGURA da imagem é controlada por flex (preenche o espaço restante do
  // card, adaptando-se ao tamanho da tela); aqui só animamos o gap e a opacidade.
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, i === active
        ? { marginLeft: 40, opacity: 1 }
        : { marginLeft: 0, opacity: 0 }
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Anima ao mudar o card ativo
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        gsap.to(el, { marginLeft: 40, opacity: 1, duration: 0.3, ease: "power1.out", overwrite: "auto" });
      } else {
        gsap.to(el, { marginLeft: 0, opacity: 0, duration: 0.3, ease: "power1.out", overwrite: "auto" });
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

      {/* Cards — apenas um aberto por vez. Layout horizontal a partir de xl
          (≥1280px), onde cabe o texto fixo + imagem sem sobrepor; abaixo disso
          os cards empilham. */}
      <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-stretch">
        {cards.map((card, index) => {
          const open = index === active;
          return (
            <div
              key={card.title}
              onMouseEnter={() => setActive(index)}
              onFocusCapture={() => setActive(index)}
              className={`flex items-start overflow-hidden rounded-xl bg-white/5 p-6 transition-[flex-grow] duration-300 ease-out xl:h-[373px] xl:items-center ${
                open ? "xl:flex-[1_1_315px]" : "xl:flex-[0_0_315px]"
              }`}
            >
              {/* Coluna de texto com largura fixa (267px) no desktop: abre igual
                  a fechada, e a imagem entra sempre a 40px dela. overflow-hidden
                  como trava para o texto nunca invadir a imagem. */}
              <div className="flex flex-1 flex-col gap-5 overflow-hidden xl:h-full xl:w-[267px] xl:flex-none xl:justify-between xl:gap-0">
                <card.icon className="size-6 shrink-0 text-primary-400 lg:size-8" aria-hidden />
                <div className="flex flex-col gap-4">
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
                <TextLink className="whitespace-nowrap text-left">
                  {card.cta}
                </TextLink>
              </div>

              {/* Imagem — apenas no desktop largo. flex-1 preenche o espaço
                  restante do card (fica maior em telas grandes, menor nas
                  menores); o gap de 40px é o marginLeft animado por GSAP. */}
              <ParallaxFrame
                ref={(node) => { imageRefs.current[index] = node; }}
                aria-hidden={!open}
                className="hidden h-[325px] min-w-0 rounded-lg xl:block xl:flex-1"
                style={{ opacity: 0 }}
              >
                {/* A imagem preenche todo o espaço disponível (object-cover),
                    adaptando-se à largura do card em cada tela — sem faixas finas
                    nas telas grandes e com o mesmo padding em todos os cards. */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1280px) 40vw, 100vw"
                  className="rounded-lg object-cover"
                />
              </ParallaxFrame>
            </div>
          );
        })}
      </div>
    </section>
  );
}
