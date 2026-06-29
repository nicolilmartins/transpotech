"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  Gauge,
  ShieldCheck,
  Zap,
  Shuffle,
  Wifi,
  BadgeCheck,
  SlidersHorizontal,
  Wrench,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type {
  ResolvedForkliftDetail,
  DetailBlock,
  IconKey,
} from "@/data/forklift-details";

const ICONS: Record<IconKey, LucideIcon> = {
  gauge: Gauge,
  shield: ShieldCheck,
  zap: Zap,
  shuffle: Shuffle,
  wifi: Wifi,
  badge: BadgeCheck,
  sliders: SlidersHorizontal,
  wrench: Wrench,
  pin: MapPin,
};

type Card = { block: DetailBlock; image: StaticImageData; alt: string };

export function ModelExperienceSection({
  detail,
}: {
  detail: ResolvedForkliftDetail;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Um card por atributo do modelo (texto + imagem específica do equipamento).
  const cardImages = detail.media.cards;
  const cards: Card[] = detail.blocks.map((block, i) => {
    const { src, alt } = cardImages[i % cardImages.length];
    return { block, image: src, alt };
  });

  useEffect(() => {
    const root = rootRef.current;
    const intro = introRef.current;
    const zoom = zoomRef.current;
    if (!root || !intro || !zoom) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // sem animação: tudo estático

    const ctx = gsap.context(() => {
      // Entrada: a imagem surge (fade + sobe) ao entrar — aparece INTEIRA no
      // fundo branco antes de qualquer zoom.
      gsap.set(zoom, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: intro,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(zoom, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }),
      });

      // Pin + zoom (estilo Porsche): quando a imagem contida chega ao topo, ela é
      // fixada por um curto trecho e ampliada — mantendo-se centralizada — até
      // preencher a tela. Ao soltar, a seção dark entra. É o único jeito de a
      // imagem cobrir a tela inteira sem "derrapar" para cima durante o zoom.
      // offsetWidth/Height = tamanho base (não afetado pelo transform/scale).
      ScrollTrigger.create({
        trigger: intro,
        start: "top top",
        end: "+=90%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const w = zoom.offsetWidth || 1;
          const h = zoom.offsetHeight || 1;
          const target = Math.min(
            2,
            Math.max(window.innerWidth / w, window.innerHeight / h)
          );
          gsap.set(zoom, { scale: 1 + p * (target - 1) });
          gsap.set(titleRef.current, {
            opacity: gsap.utils.clamp(0, 1, 1 - p * 2),
          });
        },
      });

      // Cards (sem sobreposição): o FRAME da imagem sobe enquanto o card cruza a
      // viewport e DESCE de volta ao rolar para cima — a imagem fica estática
      // dentro do frame (igual à Porsche), ligado ao scroll (scrub). O texto
      // entra/sai em cascata (toggleActions reverse).
      const rows = gsap.utils.toArray<HTMLElement>("[data-exp-row]", root);
      rows.forEach((row) => {
        const parallax = row.querySelector<HTMLElement>("[data-exp-parallax]");
        const topics = gsap.utils.toArray<HTMLElement>("[data-exp-topic]", row);

        if (parallax) {
          gsap.fromTo(
            parallax,
            { yPercent: 12 },
            {
              yPercent: -12,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        gsap.fromTo(
          topics,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Intro — palco full-bleed, SEMPRE claro; a imagem dá zoom até preencher a tela.
          O dark nunca aparece aqui (é uma seção separada, abaixo). */}
      <div
        ref={introRef}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-[#fdfdfd] px-5 sm:px-6 lg:px-16 2xl:px-30"
      >
        {/* Card — começa contido (1312px, radius 24px) e cresce até preencher a tela */}
        <div
          ref={zoomRef}
          className="relative h-[58vh] w-full max-w-[1312px] origin-center overflow-hidden rounded-[24px] will-change-transform lg:h-[600px]"
        >
          <Image
            src={detail.media.hero.src}
            alt={detail.media.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
          {/* Overlay para legibilidade do título na base */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
          />
          {/* Título alinhado na base, a 48px da extremidade */}
          <h2
            ref={titleRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 text-center sm:p-10 lg:p-12"
          >
            <span className="font-heading text-h2 font-bold leading-[1.15] text-neutral-50">
              {detail.intro.title}
            </span>
          </h2>
        </div>
      </div>

      {/* Seção depois da imagem — dark mode (revelada ao rolar além da imagem) */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <Section
          data-header-dark
          data-reveal-skip
          className="flex flex-col gap-20 lg:gap-28"
        >
          {cards.map((card, i) => {
            const Icon = ICONS[card.block.icon];
            const imageRight = i % 2 === 0;
            return (
              <div
                key={card.block.title}
                data-exp-row
                className={`flex flex-col gap-8 lg:items-center lg:gap-16 ${
                  imageRight ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Imagem — o FRAME inteiro sobe/desce com o scroll; a imagem
                    fica estática dentro dele (igual à referência da Porsche). */}
                <div
                  data-exp-parallax
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl will-change-transform lg:w-1/2"
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Texto do atributo */}
                <div className="flex flex-1 flex-col gap-4">
                  <div
                    data-exp-topic
                    className="flex size-12 items-center justify-center rounded-2xl bg-primary-500/10"
                  >
                    <Icon aria-hidden className="size-6 text-primary-500" />
                  </div>
                  <h3
                    data-exp-topic
                    className="text-h4 font-semibold text-neutral-50"
                  >
                    {card.block.title}
                  </h3>
                  <p
                    data-exp-topic
                    className="max-w-[46ch] text-body leading-[1.45] text-neutral-300"
                  >
                    {card.block.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Section>
      </div>
    </div>
  );
}
