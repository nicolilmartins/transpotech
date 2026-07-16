"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { ROUTES } from "@/lib/routes";
import iconRevisao from "@/assets/images/stats/why-buy-icon-revisao.webp";
import iconGarantia from "@/assets/images/stats/why-buy-icon-garantia.webp";
import iconEntrega from "@/assets/images/stats/why-buy-icon-entrega.webp";
import iconCobertura from "@/assets/images/stats/why-buy-icon-cobertura.webp";

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

type Card = {
  /** Título com o ponto de quebra definido: [linha de cima, linha de baixo]. */
  title: [string, string];
  description: string;
  art: Art;
};

const cards: Card[] = [
  {
    title: ["Revisão técnica", "completa"],
    description:
      "Cada equipamento passa por avaliação multipontos antes de entrar no estoque.",
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
    title: ["Garantia", "TranspoTech"],
    description: "6 a 12 meses de garantia conforme condição do equipamento.",
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
    title: ["Pronta entrega", "disponível"],
    description:
      "Equipamentos prontos pra operação após inspeção e ajustes técnicos.",
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
    title: ["Cobertura", "nacional"],
    description:
      "10 unidades em PR, SC, RS, SP e GO para suporte próximo da sua operação.",
    art: { src: iconCobertura, maskX: 14.486, maskW: 149.517, flip: true },
  },
];

export function WhyBuySection() {
  const gridRef = useRef<HTMLDivElement>(null);
  // Quando QUALQUER título não cabe em uma linha, todos quebram em duas
  // (no ponto definido nos dados); quando todos cabem, ficam em uma linha.
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
        Por que comprar seminova{" "}
        <br className="hidden lg:inline" />
        <span className="font-bold text-primary-500">com a TranspoTech</span>
      </h2>

      <div
        ref={gridRef}
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {cards.map((card) => (
          <div
            key={card.title.join(" ")}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:h-[280px]"
          >
            <CardImageIcon
              src={card.art.src}
              width={card.art.width ?? 178.49}
              height={card.art.height ?? 133.867}
              left={card.art.left ?? -35}
              top={card.art.top ?? -18}
              maskX={card.art.maskX}
              maskY={card.art.maskY ?? 0}
              maskW={card.art.maskW}
              maskH={card.art.maskH}
              flip={card.art.flip}
              objectFit={card.art.objectFit}
              objectPosition={card.art.objectPosition}
              scale={card.art.scale}
              mask={card.art.mask}
            />
            <div className="relative flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
                {card.title[0]}
                {twoLines ? <br /> : <Fragment> </Fragment>}
                {card.title[1]}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-600">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" size="lg" href={ROUTES.ORCAMENTO}>
        Consultar equipamentos
      </Button>
    </Section>
  );
}
