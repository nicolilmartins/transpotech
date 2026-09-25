"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { seminovasPage } from "@/sanity/content/pages/seminovas";
import iconRevisao from "@/assets/images/stats/why-buy-icon-revisao.webp";
import iconGarantia from "@/assets/images/stats/card-shield.webp";
import iconEntrega from "@/assets/images/stats/why-buy-icon-entrega.webp";
import iconCobertura from "@/assets/images/stats/card-pin-light.webp";

// Arte do card (Figma node 3603:3158): imagem + máscara radial. Valores por
// card conforme o Figma (mask-size/position e flip).
type Art = {
  src: StaticImageData;
  maskX: number;
  maskW: number;
  flip: boolean;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  /** Overrides da caixa/máscara (default: 178.49×133.867, left -35, maskY 0). */
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  maskY?: number;
  maskH?: number;
  /** Escala extra (reduz mantendo o centro). */
  scale?: number;
  /** Desliga a máscara radial (arte com fundo transparente). */
  mask?: boolean;
};

// Arte de cada card, na ordem dos cards editados no Studio.
const arts: { art: Art }[] = [
  {
    // Prancheta é retrato (768×1024) com fundo cinza: caixa retrato (mesma
    // proporção) mostra a arte inteira, centralizada, e a máscara vira a
    // vinheta suave (igual ao anexo). object-cover não corta (aspect casa).
    art: {
      src: iconRevisao,
      width: 105,
      height: 140,
      left: -5,
      top: -6,
      maskX: 0,
      maskY: 0,
      maskW: 105,
      maskH: 140,
      flip: false,
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  {
    art: {
      src: iconGarantia,
      maskX: 14.486,
      maskW: 149.517,
      flip: true,
      // Um pouco mais para baixo, parecido com o card 4.
      top: -6,
    },
  },
  {
    art: {
      src: iconEntrega,
      maskX: 14.486,
      maskW: 149.517,
      flip: false,
      objectPosition: "bottom",
      // Um pouco menor, mantendo a mesma altura aparente (escala pelo centro).
      scale: 0.88,
    },
  },
  {
    art: { src: iconCobertura, maskX: 14.486, maskW: 149.517, flip: true },
  },
];

type WhyBuyContent = SectionContent<typeof seminovasPage.sections.whyBuy>;

export function WhyBuySection({ content }: { content: WhyBuyContent }) {
  const gridRef = useRef<HTMLDivElement>(null);
  // Quando QUALQUER título não cabe em uma linha, todos quebram em duas
  // (entre as duas partes do título); quando todos cabem, ficam em uma linha.
  const [twoLines, setTwoLines] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const recalc = () => {
      const titles = Array.from(grid.querySelectorAll<HTMLElement>("h3"));
      // Probe: com nowrap, o scrollWidth revela se o texto caberia numa linha.
      let wraps = false;
      titles.forEach((el) => {
        el.style.whiteSpace = "nowrap";
        if (el.scrollWidth > el.clientWidth + 1) wraps = true;
        el.style.whiteSpace = "";
      });
      setTwoLines(wraps);

      // Descrições: equaliza pela maior altura natural, para os blocos de
      // texto (ancorados embaixo) abrirem alinhados entre os cards.
      const descriptions = Array.from(grid.querySelectorAll<HTMLElement>("p"));
      descriptions.forEach((el) => {
        el.style.minHeight = "";
      });
      const max = Math.max(
        ...descriptions.map((el) => el.getBoundingClientRect().height)
      );
      descriptions.forEach((el) => {
        el.style.minHeight = `${max}px`;
      });
    };

    recalc();
    // Webfont pode mudar as métricas (e as quebras) depois do primeiro paint.
    document.fonts?.ready.then(recalc);

    // Reage só a mudança de largura para não entrar em loop com os próprios
    // ajustes de min-height.
    let lastWidth = grid.clientWidth;
    const observer = new ResizeObserver(() => {
      if (grid.clientWidth === lastWidth) return;
      lastWidth = grid.clientWidth;
      recalc();
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        {content.titleRegular}{" "}
        <br className="hidden lg:inline" />
        <span className="font-bold text-primary-500">{content.titleAccent}</span>
      </h2>

      <div
        ref={gridRef}
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {content.cards.map((card, i) => {
          const { art } = arts[i];
          return (
            <div
              key={`${card.titleTop} ${card.titleBottom}`}
              className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:min-h-[280px]"
            >
              <CardImageIcon
                src={art.src}
                width={art.width ?? 178.49}
                height={art.height ?? 133.867}
                left={art.left ?? -35}
                top={art.top ?? -18}
                maskX={art.maskX}
                maskY={art.maskY ?? 0}
                maskW={art.maskW}
                maskH={art.maskH}
                flip={art.flip}
                objectFit={art.objectFit}
                objectPosition={art.objectPosition}
                scale={art.scale}
                mask={art.mask}
              />
              <div className="relative mt-[124px] lg:mt-[140px] flex flex-col gap-4">
                <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
                  {card.titleTop}
                  {twoLines ? <br /> : <Fragment> </Fragment>}
                  {card.titleBottom}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="primary" size="lg" href={ROUTES.SIMULADOR}>
        {content.buttonLabel}
      </Button>
    </Section>
  );
}
