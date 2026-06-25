"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import team from "@/assets/images/esg-team.png";

type EsgItem = {
  title: string;
  description: string;
  link: string | null;
  // Fatia do degradê verde (#146B55) → laranja (#E78028) — o laranja com
  // opacidade bem clara. Juntas, as barras formam um único degradê na coluna.
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

const STAGGER = 160; // ms entre cada item da cascata

export function EsgSection() {
  const [revealed, setRevealed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Dispara a cascata quando o conteúdo entra na viewport.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-reveal-skip
      className="relative isolate flex flex-col items-start gap-10 overflow-hidden px-4 py-16 sm:px-8 lg:gap-[67px] lg:px-16 lg:py-20"
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
        {/* Imagem — aparece junto com o primeiro texto */}
        <div
          className="h-[300px] w-full shrink-0 overflow-hidden rounded-xl transition-all duration-700 ease-out lg:h-[617px] lg:w-[641px]"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "none" : "translateY(16px)",
          }}
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
              className="flex items-stretch gap-8 transition-all duration-500 ease-out"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "none" : "translateY(12px)",
                transitionDelay: `${index * STAGGER}ms`,
              }}
            >
              {/* Barra: começa cinza e recebe o degradê verde→laranja */}
              <div className="relative w-2 shrink-0 rounded-full bg-neutral-200">
                <div
                  className="absolute inset-0 rounded-full transition-opacity duration-700 ease-out"
                  style={{
                    backgroundImage: item.barGradient,
                    opacity: revealed ? 1 : 0,
                    transitionDelay: `${index * STAGGER + 300}ms`,
                  }}
                />
              </div>

              <div className="flex flex-col gap-5 py-3">
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                    {item.title}
                  </h3>
                  <p className="max-w-[401px] text-body leading-[1.35] text-neutral-600">
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
