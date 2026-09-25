"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { IntentLink } from "@/components/ui/intent-link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { ROUTES } from "@/lib/routes";
import {
  cssEase,
  playOnScroll,
  prefersReducedMotion,
  prepareFrom,
  prepareFromEach,
} from "@/lib/motion";
import type { SectionContent } from "@/sanity/content/fields";
import type { quemSomosPage } from "@/sanity/content/pages/quem-somos";

// Destino do link de cada tópico, na ordem dos tópicos editados no Studio.
const itemHrefs = [
  ROUTES.SUSTENTABILIDADE,
  ROUTES.SUSTENTABILIDADE,
  ROUTES.SUSTENTABILIDADE,
  ROUTES.CANAL_TRANSPARENCIA,
];

type EsgContent = SectionContent<typeof quemSomosPage.sections.esg>;

const STAGGER = 0.16;

export function EsgGovernanceSection({ content }: { content: EsgContent }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const itemContainerRefs = useRef<HTMLDivElement[]>([]);
  const gradientBarRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content || prefersReducedMotion()) return;

    const easing = cssEase.power1Out;
    return playOnScroll(content, 0.75, [
      ...prepareFrom(imageRef.current, { opacity: 0, y: 16 }, { duration: 0.7, easing }),
      ...prepareFromEach(
        itemContainerRefs.current,
        { opacity: 0, y: 12 },
        { duration: 0.5, easing, stagger: STAGGER }
      ),
      ...prepareFromEach(
        gradientBarRefs.current,
        { opacity: 0 },
        { duration: 0.7, easing, delay: 0.3, stagger: STAGGER }
      ),
    ]);
  }, []);

  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-[67px]">
      {/* Cabeçalho */}
      <div className="flex max-w-[641px] flex-col gap-6">
        <div className="flex max-w-[613px] flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            {content.eyebrow}
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-normal">{content.titleRegular}</span>{" "}
            <span className="font-bold">{content.titleAccent}</span>
          </h2>
        </div>
        <p className="text-body leading-[1.35] text-neutral-600">
          {content.description}
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
            src={content.image}
            alt={content.image.alt}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
            // Foto do CMS sem LQIP não tem blurDataURL; "blur" sem ele quebra.
            placeholder={content.image.blurDataURL ? "blur" : "empty"}
          />
        </ParallaxFrame>

        {/* Mobile: sem py nos itens (barra = altura exata do texto), então o
            gap da lista compensa para manter o mesmo ritmo visual */}
        <div className="flex flex-1 flex-col gap-10 lg:gap-4">
          {content.items.map((item, index) => (
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
                <IntentLink
                  href={itemHrefs[index]}
                  className="flex items-center gap-2 text-body font-semibold leading-[1.35] text-neutral-600 transition-colors hover:text-primary-500"
                >
                  {item.linkLabel}
                  <ArrowRight className="size-5" />
                </IntentLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
