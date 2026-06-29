"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import team from "@/assets/images/esg-team.png";
import { gsap } from "@/lib/gsap";

type EsgItem = {
  title: string;
  description: string;
  link: string | null;
  barGradient: string;
};

const items: EsgItem[] = [
  {
    title: "Great Place To Work",
    description:
      "Pelo 4° ano consecutivo, a Transpotech foi reconhecida como Great Place To Work.",
    link: null,
    barGradient:
      "linear-gradient(180deg, rgba(20,107,85,1) 0%, rgba(73,112,74,0.81) 100%)",
  },
  {
    title: "Pessoas no centro da operação",
    description:
      "Programas de inclusão e desenvolvimento de talentos na área técnica.",
    link: "Canal de transparência",
    barGradient:
      "linear-gradient(180deg, rgba(73,112,74,0.81) 0%, rgba(126,118,63,0.62) 100%)",
  },
  {
    title: "Eficiência e operação mais limpa",
    description:
      "Foco em soluções e tecnologias que aumentam eficiência e reduzem impacto na operação.",
    link: "Saiba mais",
    barGradient:
      "linear-gradient(180deg, rgba(126,118,63,0.62) 0%, rgba(178,123,51,0.44) 100%)",
  },
  {
    title: "Ética, transparência e canais oficiais",
    description:
      "Canal de transparência para relatos e condutas (com seriedade e confidencialidade).",
    link: "Saiba mais",
    barGradient:
      "linear-gradient(180deg, rgba(178,123,51,0.44) 0%, rgba(231,128,40,0.25) 100%)",
  },
];

const STAGGER = 0.16;

export function EsgSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const itemContainerRefs = useRef<HTMLDivElement[]>([]);
  const gradientBarRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // Imagem
    tl.from(imageRef.current, { opacity: 0, y: 16, duration: 0.7, ease: "power1.out" }, 0);

    // Containers dos itens (500ms = 0.5s, stagger 160ms = 0.16s)
    tl.from(itemContainerRefs.current, {
      opacity: 0,
      y: 12,
      duration: 0.5,
      ease: "power1.out",
      stagger: STAGGER,
    }, 0);

    // Barras de gradiente (delay 300ms = 0.3s após início, stagger 160ms = 0.16s)
    tl.from(gradientBarRefs.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power1.out",
      stagger: STAGGER,
    }, 0.3);
  }, { scope: contentRef });

  return (
    <section
      data-reveal-skip
      className="relative isolate mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 overflow-hidden px-5 py-16 sm:px-6 lg:gap-[67px] lg:px-16 lg:py-20 2xl:px-30"
    >
      {/* Cabeçalho */}
      <div className="flex w-[641px] max-w-full flex-col gap-6">
        <div className="flex w-[613px] max-w-full flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            ESG E GOVERNANÇA
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-bold">ESG na prática,</span>{" "}
            <span className="font-normal">
              para uma intralogística mais responsável
            </span>
          </h2>
        </div>
        <p className="text-body leading-[1.35] text-neutral-600">
          Compromissos claros em Ambiental, Social e Governança com iniciativas
          alinhadas aos ODS da ONU e canais formais de transparência.
        </p>
      </div>

      {/* Conteúdo */}
      <div ref={contentRef} className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:gap-20">
        {/* Imagem */}
        <div
          ref={imageRef}
          className="order-last h-[300px] w-full shrink-0 overflow-hidden rounded-xl lg:order-none lg:h-[617px] lg:w-[720px]"
        >
          <Image
            src={team}
            alt="Equipe TranspoTech"
            className="h-full w-full object-cover"
            placeholder="blur"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {items.map((item, index) => (
            <div
              key={item.title}
              ref={(node) => {
                if (node) itemContainerRefs.current[index] = node;
              }}
              className="flex items-stretch gap-2 lg:gap-8"
            >
              {/* Barra: fundo neutro + overlay do gradiente animado por opacidade */}
              <div className="relative w-2 shrink-0 rounded-full bg-neutral-200">
                <div
                  ref={(node) => {
                    if (node) gradientBarRefs.current[index] = node;
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundImage: item.barGradient }}
                />
              </div>

              <div className="flex flex-col gap-5 py-3">
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                    {item.title}
                  </h3>
                  <p className="max-w-[560px] text-body leading-[1.35] text-neutral-600">
                    {item.description}
                  </p>
                </div>
                {item.link && (
                  <button className="flex items-center gap-2 text-body font-semibold leading-[1.35] text-neutral-600">
                    {item.link}
                    <ArrowRight className="size-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
