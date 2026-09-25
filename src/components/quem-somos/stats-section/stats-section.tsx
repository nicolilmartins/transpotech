"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { quemSomosPage } from "@/sanity/content/pages/quem-somos";
import illoUser from "@/assets/images/stats/illustration-user.webp";
import illoCar from "@/assets/images/stats/illustration-car.webp";
import card1 from "@/assets/images/stats/card1.png";
import illoHangar from "@/assets/images/stats/illustration-hangar.webp";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Conta o número principal preservando prefixo e separador de milhar pt-BR:
// "+3.700" → "+" + (3700 × progress) formatado como "3.700".
const countValue = (value: string, progress: number) =>
  value.replace(/[\d.]+/, (num) => {
    const target = parseInt(num.replace(/\./g, ""), 10);
    return Math.round(target * progress).toLocaleString("pt-BR");
  });

type BoxArt = { width: number; height: number; right: number; top: number };

type StatArt = {
  image: StaticImageData;
  // "home" = mesmo tratamento do card 1 da home (object-contain à direita).
  // BoxArt = posição/tamanho exatos do Figma (node 3494:4030, card ref 316×144);
  // `right` = 316 − (left + width) do Figma, para ancorar pela direita e
  // funcionar com cards de largura fluida.
  art: BoxArt | "home";
};

// Ilustração de cada card, na ordem dos números editados no Studio.
const arts: StatArt[] = [
  {
    image: illoUser,
    art: { width: 217.41, height: 217.11, right: -69.57, top: -36.55 },
  },
  {
    image: illoCar,
    art: { width: 205.57, height: 205.29, right: -58.16, top: -22.64 },
  },
  { image: card1, art: "home" },
  {
    image: illoHangar,
    art: { width: 233.61, height: 233.28, right: -66.31, top: -61.28 },
  },
];

type StatsContent = SectionContent<typeof quemSomosPage.sections.stats>;

export function StatsSection({ content }: { content: StatsContent }) {
  const stats = content.items;
  const cardsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Zera todos os contadores antes de entrar na viewport
    stats.forEach((s, i) => {
      const node = numberRefs.current[i];
      if (node) node.textContent = countValue(s.value, 0);
    });

    const counters = stats.map(() => ({ progress: 0 }));
    const tweens: gsap.core.Tween[] = [];

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      once: true,
      onEnter: () => {
        stats.forEach((s, i) => {
          const tween = gsap.to(counters[i], {
            progress: 1,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => {
              const node = numberRefs.current[i];
              if (node)
                node.textContent = countValue(s.value, counters[i].progress);
            },
          });
          tweens.push(tween);
        });
      },
    });

    return () => {
      trigger.kill();
      tweens.forEach((t) => t.kill());
    };
  }, [stats]);

  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
          {content.eyebrow}
        </p>
        <h2 className="text-h2 text-neutral-800">
          <span className="lg:block font-normal">{content.titleTop}</span>{" "}
          <span className="lg:block font-bold text-primary-500">
            {content.titleAccent}
          </span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-600">
          {content.description}
        </p>
      </div>

      <div
        ref={cardsRef}
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex"
      >
        {stats.map((stat, i) => {
          const { image, art } = arts[i];
          return (
            <div
              key={stat.value}
              className="group relative flex min-h-[144px] flex-1 flex-col overflow-hidden rounded-3xl bg-surface-muted px-5 py-4 lg:h-[144px]"
            >
              {/* Ilustração: card "home" usa object-contain à direita;
                  demais seguem a caixa absoluta exata do Figma */}
              {art === "home" ? (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="320px"
                  className="pointer-events-none select-none object-contain object-right transition-transform duration-500 ease-out lg:group-hover:scale-105"
                />
              ) : (
                <div
                  className="pointer-events-none absolute select-none transition-transform duration-500 ease-out lg:group-hover:scale-105"
                  style={{
                    width: art.width,
                    height: art.height,
                    right: art.right,
                    top: art.top,
                  }}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Glow laranja radial — aparece no hover (Figma: Mask Shape) */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[79px] top-[169px] h-[66px] w-[162px] rounded-full bg-primary-500 opacity-0 blur-[77px] transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative flex flex-col gap-0.5">
                <span
                  ref={(node) => {
                    numberRefs.current[i] = node;
                  }}
                  className="font-heading text-h2 font-bold leading-[1.3] text-primary-500"
                >
                  {stat.value}
                </span>
                <span className="text-body leading-[1.35] text-neutral-600">
                  <LineBreaks text={stat.label} brClassName="hidden lg:inline" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
