import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { ROUTES } from "@/lib/routes";
import iconBateria from "@/assets/images/stats/card-bateria.webp";
import iconLupa from "@/assets/images/stats/card-magnifier.webp";
import iconRaio from "@/assets/images/stats/baterias-icon-raio.webp";
import iconFerramentas from "@/assets/images/stats/card-toolbox.webp";
import iconDocumento from "@/assets/images/stats/card-document.webp";
import iconMoeda from "@/assets/images/stats/baterias-icon-moeda.webp";
import type { SectionContent } from "@/sanity/content/fields";
import type { bateriasPage } from "@/sanity/content/pages/baterias";

// Geometria por card conforme o Figma (node 3603:3202). Padrão: caixa
// 178.49×133.867 com flip. O raio é retrato (caixa própria) e a moeda tem
// caixa maior sem flip.
type Art = {
  src: StaticImageData;
  width: number;
  height: number;
  left: number;
  top: number;
  maskX: number;
  maskY: number;
  maskW?: number;
  maskH?: number;
  flip: boolean;
  scale?: number;
};

const STD = {
  width: 178.49,
  height: 133.867,
  left: -35,
  top: -18,
  maskX: 14.486,
  maskY: 0,
  flip: true,
};

// Arte de cada card, na ordem dos cards editados no Studio.
const arts: Art[] = [
  { ...STD, src: iconBateria, flip: false },
  { ...STD, src: iconLupa },
  // Raio é retrato (768×1024): caixa retrato mostra ele inteiro.
  {
    src: iconRaio,
    width: 105,
    height: 140,
    left: -5,
    top: -6,
    maskX: 0,
    maskY: 0,
    maskW: 105,
    maskH: 140,
    flip: false,
  },
  { ...STD, src: iconFerramentas },
  { ...STD, src: iconDocumento, maskX: 12.486, maskY: 4 },
  {
    src: iconMoeda,
    width: 210.402,
    height: 157.801,
    left: -51,
    top: -24,
    maskX: 30.442,
    maskY: 10.726,
    flip: false,
    scale: 0.85,
  },
];

type WhyTranspotechContent = SectionContent<typeof bateriasPage.sections.whyTranspotech>;

export function WhyTranspotechSection({ content }: { content: WhyTranspotechContent }) {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        {content.titleRegular}{" "}
        <br className="hidden lg:inline" />
        <span className="font-bold text-primary-500">{content.titleAccent}</span>
      </h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.cards.map((card, i) => {
          const art = arts[i];
          return (
          <div
            key={card.title}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:min-h-[280px]"
          >
            <CardImageIcon
              src={art.src}
              width={art.width}
              height={art.height}
              left={art.left}
              top={art.top}
              maskX={art.maskX}
              maskY={art.maskY}
              maskW={art.maskW}
              maskH={art.maskH}
              flip={art.flip}
              scale={art.scale}
            />
            <div className="relative mt-[124px] lg:mt-[140px] flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                {card.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-600">
                {card.description}
              </p>
            </div>
          </div>
          );
        })}
      </div>

      <Button variant="primary" size="lg" href={ROUTES.CONTATO}>
        {content.buttonLabel}
      </Button>
    </Section>
  );
}
