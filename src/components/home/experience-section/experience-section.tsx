"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { LineBreaks } from "@/components/ui/line-breaks";
import card1 from "@/assets/images/stats/card1.png";
import card2 from "@/assets/images/stats/card2.png";
import illoCar from "@/assets/images/stats/illustration-car.webp";
import illoMap from "@/assets/images/stats/map-illustration.webp";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

// Conta o número principal (primeiro grupo de dígitos), preservando
// prefixos/sufixos: "+3700", "+400", "+11".
const countValue = (value: string, progress: number) =>
  value.replace(/\d+/, (digits) =>
    String(Math.round(parseInt(digits, 10) * progress))
  );

type BoxArt = { width: number; height: number; right: number; top: number };

// Arte de cada card, na ordem dos números editados no Studio.
type StatArt = {
  labelWidth: number;
  image: StaticImageData;
  // "contain" = ilustração ancorada à direita (padrão desta seção);
  // "map" = mapa do Brasil, deslocado e ampliado;
  // BoxArt = caixa absoluta exata do Figma, igual à seção "A estrutura que
  // sustenta cada operação" (quem somos), ancorada pela direita.
  art: "contain" | "map" | BoxArt;
};

const statArts: StatArt[] = [
  { labelWidth: 178, image: card1, art: "contain" },
  { labelWidth: 165, image: illoMap, art: "map" },
  { labelWidth: 157, image: card2, art: "contain" },
  {
    labelWidth: 163,
    image: illoCar,
    art: { width: 236.4, height: 236.08, right: -42, top: -26 },
  },
];

type ExperienceContent = SectionContent<typeof homePage.sections.experience>;

export function ExperienceSection({ content }: { content: ExperienceContent }) {
  const stats = content.stats.map((stat, i) => ({ ...stat, ...statArts[i] }));
  const cardsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardElRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Card "ativo" no mobile: aquele que está passando pelo centro da viewport.
  // No desktop o blur/zoom seguem o hover (este estado é ignorado em lg+).
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cardElRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx >= 0) setActiveCard(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    cardElRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
            ease: "power3.out", // equivale ao easeOut cúbico original: 1 - (1-t)^3
            onUpdate: () => {
              const node = numberRefs.current[i];
              if (node) node.textContent = countValue(s.value, counters[i].progress);
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
    // content.stats vem do servidor e não muda depois da montagem.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section className="relative isolate flex flex-col items-start gap-10 overflow-hidden lg:gap-16">
      {/* Cabeçalho */}
      <div className="flex w-[680px] max-w-full flex-col gap-6">
        <div className="flex w-[660px] max-w-full flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            {content.eyebrow}
          </p>
          <h2 className="text-h2 font-normal text-neutral-800">
            <LineBreaks text={content.title} brClassName="hidden lg:inline" />{" "}
            <span className="font-bold text-primary-500">
              {content.titleAccent}
            </span>
          </h2>
        </div>
        <p className="w-[510px] max-w-full text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex">
        {stats.map((s, i) => (
          <div
            key={i}
            ref={(node) => {
              cardElRefs.current[i] = node;
            }}
            className="group relative flex min-h-[160px] flex-1 flex-col gap-1 overflow-hidden rounded-3xl bg-surface-muted p-4 lg:h-[172px] lg:p-5"
          >
            {/* Ilustração à direita — zoom no hover (desktop) / no card ativo (mobile) */}
            {typeof s.art === "object" ? (
              <div
                className={`pointer-events-none absolute select-none transition-transform duration-500 ease-out lg:scale-100 lg:group-hover:scale-105 ${
                  activeCard === i ? "scale-105" : "scale-100"
                }`}
                style={{
                  width: s.art.width,
                  height: s.art.height,
                  right: s.art.right,
                  top: s.art.top,
                }}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            ) : (
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className={`pointer-events-none origin-right select-none object-contain object-right transition-transform duration-500 ease-out ${
                  s.art === "map"
                    ? `translate-x-[37%] lg:scale-[1.28] lg:group-hover:scale-[1.35] ${
                        activeCard === i ? "scale-[1.35]" : "scale-[1.28]"
                      }`
                    : `lg:scale-100 lg:group-hover:scale-105 ${
                        activeCard === i ? "scale-105" : "scale-100"
                      }`
                }`}
              />
            )}

            {/* Glow laranja radial no rodapé — hover (desktop) / card ativo (mobile) */}
            <div
              aria-hidden
              className={`pointer-events-none absolute left-1/2 top-[165px] h-[66px] w-[162px] -translate-x-1/2 rounded-full bg-primary-500 blur-[77px] transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 ${
                activeCard === i ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="relative flex flex-col gap-0.5">
              <span
                ref={(node) => {
                  numberRefs.current[i] = node;
                }}
                className="font-heading text-h2 font-bold leading-[1.3] text-primary-500"
              >
                {s.value}
              </span>
              <span
                className="text-body leading-[1.35] text-neutral-600"
                style={{ maxWidth: s.labelWidth }}
              >
                <LineBreaks text={s.label} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" size="lg" href={ROUTES.CONTATO}>
        {content.buttonLabel}
      </Button>
    </Section>
  );
}
