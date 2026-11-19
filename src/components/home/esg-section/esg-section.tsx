"use client";

import { useRef } from "react";
import Image from "next/image";
import { IntentLink } from "@/components/ui/intent-link";
import { ArrowRight } from "lucide-react";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import gptw from "@/assets/images/gptw-badge.webp";
import { ROUTES } from "@/lib/routes";
import {
  cssEase,
  playOnScroll,
  prefersReducedMotion,
  prepareFrom,
  prepareFromEach,
} from "@/lib/motion";
import { useNearViewport } from "@/hooks/use-near-viewport";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

// Destino do link de cada item, na ordem dos itens editados no Studio; o link
// só aparece onde há destino e texto.
const itemHrefs: (string | null)[] = [
  null,
  null,
  ROUTES.SUSTENTABILIDADE,
  ROUTES.CANAL_TRANSPARENCIA,
];

const STAGGER = 0.16;

type EsgContent = SectionContent<typeof homePage.sections.esg>;

export function EsgSection({ content }: { content: EsgContent }) {
  const items = content.items.map((item, i) => {
    const href = itemHrefs[i];
    return {
      ...item,
      link: href && item.linkLabel ? { label: item.linkLabel, href } : null,
    };
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const itemContainerRefs = useRef<HTMLDivElement[]>([]);
  const gradientBarRefs = useRef<HTMLDivElement[]>([]);

  useNearViewport(contentRef, () => {
    const content = contentRef.current;
    if (!content || prefersReducedMotion()) return;

    const easing = cssEase.power1Out;
    return playOnScroll(content, 0.75, [
      // Imagem
      ...prepareFrom(imageRef.current, { opacity: 0, y: 16 }, { duration: 0.7, easing }),
      // Containers dos itens (500ms = 0.5s, stagger 160ms = 0.16s)
      ...prepareFromEach(
        itemContainerRefs.current,
        { opacity: 0, y: 12 },
        { duration: 0.5, easing, stagger: STAGGER }
      ),
      // Barras de gradiente (delay 300ms = 0.3s após início, stagger 160ms = 0.16s)
      ...prepareFromEach(
        gradientBarRefs.current,
        { opacity: 0 },
        { duration: 0.7, easing, delay: 0.3, stagger: STAGGER }
      ),
    ]);
  });

  return (
    <section
      data-reveal-skip
      className="relative isolate mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 overflow-hidden px-5 py-12 sm:px-6 lg:gap-[67px] lg:px-16 lg:py-20"
    >
      {/* Cabeçalho — selo GPTW à direita acompanha a altura do bloco de texto
          (proporção 500x639: a largura reservada define o teto de altura) */}
      <div className="flex w-full flex-col items-start gap-8 sm:flex-row sm:items-stretch sm:justify-between sm:gap-10 lg:gap-12">
        <div className="flex w-[641px] max-w-full flex-col gap-6">
          <div className="flex w-[613px] max-w-full flex-col gap-4">
            <p className="text-body font-semibold leading-[1.35] text-secondary-600">
              {content.eyebrow}
            </p>
            <h2 className="text-h2 text-neutral-800">
              <span className="font-bold">{content.titleBold}</span>{" "}
              <span className="font-normal">
                {content.titleRegular}
              </span>
            </h2>
          </div>
          <p className="text-body leading-[1.35] text-neutral-600">
            {content.description}
          </p>
        </div>

        <div className="relative h-[90px] w-[71px] shrink-0 self-start sm:h-auto sm:w-[110px] sm:self-stretch md:w-[135px] lg:w-[163px]">
          <Image
            src={gptw}
            alt={content.badgeAlt}
            fill
            sizes="(min-width: 1024px) 163px, (min-width: 768px) 135px, (min-width: 640px) 110px, 71px"
            className="object-contain object-right"
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div ref={contentRef} className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-20">
        {/* Imagem — no desktop acompanha a altura total dos cards ao lado */}
        <ParallaxFrame
          ref={imageRef}
          className="order-last h-[300px] w-full shrink-0 rounded-xl lg:order-none lg:h-auto lg:w-[720px]"
        >
          <Image
            src={content.image}
            alt={content.image.alt}
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
              key={index}
              ref={(node) => {
                if (node) itemContainerRefs.current[index] = node;
              }}
              className="flex items-stretch gap-4 lg:gap-8"
            >
              {/* Barra: começa cinza (apagada) e "acende" em laranja — overlay
                  laranja revelado por opacidade quando a seção entra na viewport. */}
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
                  <IntentLink
                    href={item.link.href}
                    className="flex items-center gap-2 text-body font-semibold leading-[1.35] text-neutral-600 transition-colors hover:text-primary-500"
                  >
                    {item.link.label}
                    <ArrowRight className="size-5" aria-hidden />
                  </IntentLink>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
