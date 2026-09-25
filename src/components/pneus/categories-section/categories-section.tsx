import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { TextLink } from "@/components/ui/text-link";
import { Section } from "@/components/ui/section";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { pneusPage } from "@/sanity/content/pages/pneus";
// Recortes com fundo transparente vindos do Figma (node 3705:3158), um por card.
import imgEmpilhadeira from "@/assets/images/pneus/pneu-empilhadeira.webp";
import imgOtr from "@/assets/images/pneus/pneu-otr.webp";
import imgAgricola from "@/assets/images/pneus/pneu-agricola.webp";
import imgFlorestal from "@/assets/images/pneus/pneu-florestal.webp";
import imgPortuario from "@/assets/images/pneus/pneu-portuario.webp";

/**
 * Sombra de contato sob as rodas ("Rectangle 1197" no Figma): elipse preta
 * desfocada e levemente inclinada. Medidas relativas à caixa da arte (0–1),
 * para acompanhar a máquina quando ela é redimensionada.
 */
type GroundShadow = {
  /** Centro da elipse. */
  x: number;
  y: number;
  width: number;
  /** Largura ÷ altura da elipse. */
  aspect: number;
  rotate: number;
  opacity: number;
  /** No Figma, algumas sombras ficam atrás da máquina e outras na frente. */
  behind?: boolean;
};

/**
 * Posição da arte no card, em `cqw` (% da largura do card). O Figma desenha o
 * card com 426px; aqui cada medida é a do Figma dividida por 426, então a arte
 * escala junto com o card em qualquer largura de tela e mantém a mesma
 * composição — incluindo o quanto ela "sai" pelo topo do card.
 */
type Art = {
  src: StaticImageData;
  alt: string;
  /** Distância do topo do slot ao topo da arte. */
  top: number;
  left: number;
  width: number;
  shadow?: GroundShadow;
  /**
   * Redução sobre a medida do Figma, ancorada na base e no centro da arte — a
   * máquina encolhe sem se afastar do texto nem sair do eixo. Usada para
   * equilibrar o peso visual entre os cards.
   */
  scale?: number;
  /** Sobe a arte (em cqw) depois da escala, garantindo que parte dela saia pelo topo. */
  lift?: number;
};

// Aplica `scale` mantendo fixos a base e o centro horizontal, depois `lift`.
function artBox({ src, top, left, width, scale = 1, lift = 0 }: Art) {
  const height = width * (src.height / src.width);
  const scaledWidth = width * scale;
  return {
    top: top + height * (1 - scale) - lift,
    left: left + (width - scaledWidth) / 2,
    width: scaledWidth,
  };
}

function shadowStyle(s: GroundShadow): CSSProperties {
  return {
    left: `${(s.x - s.width / 2) * 100}%`,
    top: `${s.y * 100}%`,
    width: `${s.width * 100}%`,
    aspectRatio: s.aspect,
    transform: `translateY(-50%) rotate(${s.rotate}deg)`,
    filter: "blur(2.228px)",
    background: `radial-gradient(closest-side, rgb(0 0 0 / ${s.opacity}), rgb(0 0 0 / 0))`,
  };
}

// Arte de cada card, na ordem dos cards editados no Studio.
type Category = { art: Art };

// Quanto a arte mais alta sai acima do card (46.338px no Figma). Todo slot
// reserva esse espaço no topo, então os cards de uma mesma linha ficam
// alinhados e cada arte sai pelo topo na medida exata do Figma.
const SLOT_TOP = "10.878cqw";

// Topo do texto dentro do card (210px no Figma): a área acima fica para a arte.
const TEXT_TOP = "49.296cqw";

const categories: Category[] = [
  {
    art: {
      src: imgEmpilhadeira,
      alt: "Empilhadeira STILL a combustão",
      top: 8.147,
      left: 12.779,
      width: 68.609,
    },
  },
  {
    art: {
      src: imgOtr,
      alt: "Retroescavadeira",
      top: 0,
      left: 16.445,
      width: 67.11,
      scale: 0.93,
      lift: 2,
      shadow: {
        x: 0.48204,
        y: 0.8191,
        width: 0.71068,
        aspect: 203.175 / 18.622,
        rotate: -6.62,
        opacity: 0.5,
      },
    },
  },
  {
    art: {
      src: imgAgricola,
      alt: "Trator agrícola",
      top: 0,
      left: 16.445,
      width: 67.11,
      scale: 0.93,
      lift: 2,
      shadow: {
        x: 0.52178,
        y: 0.85386,
        width: 0.90112,
        aspect: 257.618 / 23.737,
        rotate: -0.73,
        opacity: 0.35,
        behind: true,
      },
    },
  },
  {
    art: {
      src: imgFlorestal,
      alt: "Máquina florestal com garra",
      top: 0.87,
      left: 14.53,
      width: 65.567,
      scale: 0.93,
      lift: 2,
      shadow: {
        x: 0.55647,
        y: 0.82388,
        width: 0.92232,
        aspect: 257.618 / 23.737,
        rotate: -4.12,
        opacity: 0.3,
        behind: true,
      },
    },
  },
  {
    art: {
      src: imgPortuario,
      alt: "Reach stacker portuária",
      top: 1.549,
      left: 27.285,
      width: 52.446,
      shadow: {
        x: 0.38119,
        y: 0.9052,
        width: 0.75827,
        aspect: 169.413 / 23.737,
        rotate: 2.63,
        opacity: 0.3,
      },
    },
  },
];

type CategoriesContent = SectionContent<typeof pneusPage.sections.categories>;

export function CategoriesSection({ content }: { content: CategoriesContent }) {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[640px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-800">
          <LineBreaks text={content.title} brClassName="hidden lg:block" />{" "}
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          <LineBreaks text={content.description} brClassName="hidden lg:block" />
        </p>
      </div>

      {/* gap-y-7: somado ao topo reservado do slot, dá os 75px entre linhas
          do Figma. */}
      <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-7">
        {content.items.map(({ title, description, cta }, i) => {
          const { art } = categories[i];
          const box = artBox(art);
          return (
            // Slot = container de consulta: as medidas em cqw da arte e do
            // espaçamento interno são frações da largura deste card.
            <div
              key={title}
              className="group/card @container relative flex w-full flex-col hover:z-10 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
            >
              <div
                className="flex flex-1 flex-col"
                style={{ paddingTop: SLOT_TOP }}
              >
                <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 group-hover/card:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]">
                  <div
                    className="flex flex-1 flex-col justify-end gap-4 rounded-xl bg-surface-subtle px-6 pb-6"
                    style={{ paddingTop: TEXT_TOP }}
                  >
                    <h3 className="font-heading text-h5 font-bold text-neutral-700">
                      {title}
                    </h3>
                    <p className="min-h-[2.7em] text-body leading-[1.35] text-neutral-600">
                      {description}
                    </p>
                  </div>
                  {/* Todos os CTAs levam ao formulário de lead da própria página. */}
                  <TextLink
                    href="#solicitar-pneus"
                    className="w-full px-6 py-4 text-left"
                  >
                    {cta}
                  </TextLink>
                </div>
              </div>

              {/* Arte — fora do card (que tem overflow-hidden) para poder sair
                pelo topo dele, como no Figma. */}
              <div
                className="pointer-events-none absolute"
                style={{
                  top: `${box.top}cqw`,
                  left: `${box.left}cqw`,
                  width: `${box.width}cqw`,
                }}
              >
                {/* Sombra e imagem são posicionadas, então pintam na ordem do
                    DOM: a sombra "behind" vem antes da máquina, a outra depois. */}
                {art.shadow?.behind && (
                  <span
                    aria-hidden
                    className="absolute"
                    style={shadowStyle(art.shadow)}
                  />
                )}
                <Image
                  src={art.src}
                  alt={art.alt}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 34vw, 70vw"
                  className="relative h-auto w-full"
                />
                {art.shadow && !art.shadow.behind && (
                  <span
                    aria-hidden
                    className="absolute"
                    style={shadowStyle(art.shadow)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
