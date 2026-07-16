"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { ROUTES } from "@/lib/routes";
import { gsap } from "@/lib/gsap";
// PLACEHOLDER: trocar por foto real da equipe/ações ESG TranspoTech.
import team from "@/assets/images/transpotech-team.webp";

type EsgItem = {
  title: string;
  description: string;
  link: { label: string; href: string } | null;
};

const items: EsgItem[] = [
  {
    title: "Sustentabilidade",
    description:
      "Soluções e práticas que apoiam operações mais eficientes e conscientes.",
    link: { label: "Saiba mais", href: ROUTES.SUSTENTABILIDADE },
  },
  {
    title: "Inclusão",
    description:
      "Iniciativas voltadas à equidade, diversidade e desenvolvimento de pessoas.",
    link: { label: "Conheça as iniciativas", href: ROUTES.SUSTENTABILIDADE },
  },
  {
    title: "Comunidade",
    description:
      "Apoio a projetos sociais, esporte, educação e desenvolvimento comunitário.",
    link: { label: "Conheça os projetos", href: ROUTES.SUSTENTABILIDADE },
  },
  {
    title: "Governança",
    description:
      "Canais de transparência, ouvidoria digital e práticas de responsabilidade corporativa.",
    link: { label: "Canal de transparência", href: ROUTES.CANAL_TRANSPARENCIA },
  },
];

const STAGGER = 0.16;

export function EsgGovernanceSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const itemContainerRefs = useRef<HTMLDivElement[]>([]);
  const gradientBarRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(
        imageRef.current,
        { opacity: 0, y: 16, duration: 0.7, ease: "power1.out" },
        0
      );

      tl.from(
        itemContainerRefs.current,
        { opacity: 0, y: 12, duration: 0.5, ease: "power1.out", stagger: STAGGER },
        0
      );

      tl.from(
        gradientBarRefs.current,
        { opacity: 0, duration: 0.7, ease: "power1.out", stagger: STAGGER },
        0.3
      );
    },
    { scope: contentRef }
  );

  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-[67px]">
      {/* Cabeçalho */}
      <div className="flex max-w-[641px] flex-col gap-6">
        <div className="flex max-w-[613px] flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            ESG E GOVERNANÇA
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-normal">Crescimento com</span>{" "}
            <span className="font-bold">responsabilidade</span>
          </h2>
        </div>
        <p className="text-body leading-[1.35] text-neutral-600">
          A TranspoTech investe em iniciativas de responsabilidade social,
          inclusão, sustentabilidade e governança. Acreditamos que uma operação
          eficiente também deve contribuir para um futuro mais responsável.
        </p>
      </div>

      {/* Conteúdo */}
      <div
        ref={contentRef}
        className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-20"
      >
        {/* Imagem — no desktop estica até a altura da coluna de cards
            (fill absoluto para os cards definirem a altura da linha) */}
        <ParallaxFrame
          ref={imageRef}
          className="order-last h-[300px] w-full shrink-0 rounded-xl lg:order-none lg:h-auto lg:w-[720px] lg:self-stretch"
        >
          <Image
            src={team}
            alt="Equipe TranspoTech em ações ESG"
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
            placeholder="blur"
          />
        </ParallaxFrame>

        {/* Mobile: sem py nos itens (barra = altura exata do texto), então o
            gap da lista compensa para manter o mesmo ritmo visual */}
        <div className="flex flex-1 flex-col gap-10 lg:gap-4">
          {items.map((item, index) => (
            <div
              key={item.title}
              ref={(node) => {
                if (node) itemContainerRefs.current[index] = node;
              }}
              className="flex items-stretch gap-4 lg:gap-8"
            >
              {/* Barra: fundo neutro + overlay do gradiente animado por opacidade */}
              <div className="relative w-2 shrink-0 rounded-full bg-neutral-200">
                <div
                  ref={(node) => {
                    if (node) gradientBarRefs.current[index] = node;
                  }}
                  className="absolute inset-0 rounded-full bg-primary-500"
                />
              </div>

              <div className="flex flex-col gap-5 lg:py-3">
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                    {item.title}
                  </h3>
                  <p className="max-w-[560px] text-body leading-[1.35] text-neutral-600">
                    {item.description}
                  </p>
                </div>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="flex items-center gap-2 text-body font-semibold leading-[1.35] text-neutral-600 transition-colors hover:text-primary-500"
                  >
                    {item.link.label}
                    <ArrowRight className="size-5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
