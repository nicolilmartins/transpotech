import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import iconTecnicos from "@/assets/images/stats/card-selo.webp";
import iconMultimarcas from "@/assets/images/stats/card-loja.webp";
import iconPresenca from "@/assets/images/stats/card-pin.webp";
import iconEstoque from "@/assets/images/stats/card-engrenagem.webp";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

// Ícone 3D (imagem) posicionado exatamente como no Figma (node 3593:3243).
// A caixa da arte é 204.438×153.328 e uma máscara radial (equivalente ao SVG
// do Figma) faz as bordas desvanecerem para fundir no card. `fill` = arte
// preenchendo a caixa (object-bottom); caso contrário usa o offset da imagem.
type IconArt = {
  src: StaticImageData;
  /** Offset da caixa da arte em relação ao card (px). */
  left: number;
  top: number;
  /** Deslocamento horizontal da máscara radial (px). */
  maskX: number;
  /** Deslocamento vertical da máscara radial (px). Default: MASK_Y. */
  maskY?: number;
  /** Espelhamento horizontal (flip do export do Figma). Default: true. */
  flip?: boolean;
  /** Posição da imagem dentro da caixa (Figma). `fill` cobre a caixa. */
  img: { left: string; top: string } | "fill";
};

// Ícone de cada card, na ordem dos cards editados no Studio.
type WhyUsCard = {
  icon: IconArt;
};

const ART_W = 204.438;
const ART_H = 153.328;
const MASK_SIZE = "149.517px 133.868px";
const MASK_Y = 12.819;
// Máscara EXATA do Figma (imgImage9 = radialGradient): elipse centrada
// (rx 74.7585, ry 66.9338) opaca no centro (0%) desvanecendo linearmente até
// transparente na borda (100%) — sem platô. Faz as bordas do ícone se
// dissolverem no card, igual ao render do Figma.
const MASK_IMAGE =
  "radial-gradient(74.7585px 66.9338px at 74.7585px 66.9338px, #000 0%, transparent 100%)";

const cardArts: WhyUsCard[] = [
  {
    icon: {
      src: iconTecnicos,
      left: -57.09,
      top: -23.16,
      maskX: 26.78,
      maskY: 10.819,
      flip: false,
      img: "fill",
    },
  },
  {
    icon: {
      src: iconMultimarcas,
      left: -57.09,
      top: -25.16,
      maskX: 26.78,
      flip: false,
      img: "fill",
    },
  },
  {
    icon: {
      src: iconPresenca,
      left: -57.5,
      top: -20,
      maskX: 27.265,
      maskY: 7.819,
      img: "fill",
    },
  },
  {
    icon: {
      src: iconEstoque,
      left: -57.5,
      top: -25,
      maskX: 22.141,
      maskY: 9.819,
      img: "fill",
    },
  },
];

function CardIcon({ icon }: { icon: IconArt }) {
  const maskY = icon.maskY ?? MASK_Y;
  const mask = {
    maskImage: MASK_IMAGE,
    WebkitMaskImage: MASK_IMAGE,
    maskSize: MASK_SIZE,
    WebkitMaskSize: MASK_SIZE,
    maskPosition: `${icon.maskX}px ${maskY}px`,
    WebkitMaskPosition: `${icon.maskX}px ${maskY}px`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    // Chrome trata o gradiente como luminance por padrão (esconde o preto);
    // forçar alpha faz o centro opaco aparecer e as bordas desvanecerem.
    maskMode: "alpha",
  } as const;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute select-none overflow-hidden [--icon-scale:0.82] lg:[--icon-scale:1]"
      style={{
        left: icon.left,
        top: icon.top,
        width: ART_W,
        height: ART_H,
        // scaleX(-1) = flip do Figma (opcional); scale(var) reduz no mobile.
        transform: `${icon.flip === false ? "" : "scaleX(-1) "}scale(var(--icon-scale, 1))`,
        ...mask,
      }}
    >
      <div
        className="absolute"
        style={
          icon.img === "fill"
            ? { inset: 0 }
            : { left: icon.img.left, top: icon.img.top, width: "100.23%", height: "100%" }
        }
      >
        <Image
          src={icon.src}
          alt=""
          fill
          sizes="210px"
          // lighten: o fundo escuro da arte (≈ tom do card) some e só o objeto,
          // mais claro, permanece — deixando a imagem mais sutil no card.
          style={{ mixBlendMode: "lighten" }}
          className={`max-w-none ${
            icon.img === "fill" ? "object-cover object-bottom" : "object-cover"
          }`}
        />
      </div>
    </div>
  );
}

type WhyUsContent = SectionContent<typeof homePage.sections.whyUs>;

export function WhyUsSection({ content }: { content: WhyUsContent }) {
  const cards = content.cards.map((card, i) => ({ ...card, ...cardArts[i] }));

  return (
    <Section
      data-header-dark
      className="relative isolate flex flex-col items-start gap-10 lg:gap-[67px]"
    >
      <div className="relative w-full">
        <h2 className="w-full text-center text-h2 text-neutral-200">
          <span className="lg:block font-normal">{content.titleRegular}</span>{" "}
          <span className="lg:block font-bold text-primary-500">
            {content.titleAccent}
          </span>
        </h2>
      </div>

      <div className="relative grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-surface-dark p-6 transition-shadow duration-300 hover:z-10 hover:shadow-glow-secondary lg:min-h-[299px]"
          >
            <CardIcon icon={card.icon} />
            <div className="relative mt-[124px] lg:mt-[140px] flex flex-col gap-4">
              <h3 className="w-full font-heading text-h6 font-semibold text-neutral-200 lg:w-[242px]">
                {card.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-400">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
