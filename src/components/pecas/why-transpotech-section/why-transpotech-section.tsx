import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { ROUTES } from "@/lib/routes";
import iconPerson from "@/assets/images/stats/card-person.webp";
import iconBadge from "@/assets/images/stats/card-badge.webp";
import iconToolbox from "@/assets/images/stats/card-toolbox.webp";
import iconDocument from "@/assets/images/stats/card-document.webp";
import iconMagnifier from "@/assets/images/stats/card-magnifier.webp";
import iconCalendar from "@/assets/images/stats/pecas-icon-calendar.webp";
import iconGear from "@/assets/images/stats/pecas-icon-gear.webp";
import iconHouse from "@/assets/images/stats/card-house.webp";
import iconRecycle from "@/assets/images/stats/pecas-icon-recycle.webp";
import type { SectionContent } from "@/sanity/content/fields";
import type { pecasPage } from "@/sanity/content/pages/pecas";

// Geometria por card conforme o Figma (node 3603:3198). A maioria segue o
// padrão (caixa 178.49×133.867, flip); o selo tem caixa maior sem flip.
type Art = {
  src: StaticImageData;
  width: number;
  height: number;
  left: number;
  top: number;
  maskX: number;
  maskY: number;
  flip: boolean;
  objectPosition?: string;
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
  { ...STD, src: iconPerson },
  {
    src: iconBadge,
    width: 199.939,
    height: 149.954,
    left: -45.7,
    top: -26,
    maskX: 25.211,
    maskY: 8.043,
    flip: false,
  },
  { ...STD, src: iconToolbox },
  { ...STD, src: iconDocument, maskX: 12.486, maskY: 4 },
  { ...STD, src: iconMagnifier },
  { ...STD, src: iconCalendar, objectPosition: "bottom" },
  { ...STD, src: iconGear },
  { ...STD, src: iconHouse },
  { ...STD, src: iconRecycle },
];

type WhyTranspotechContent = SectionContent<typeof pecasPage.sections.whyTranspotech>;

export function WhyTranspotechSection({ content }: { content: WhyTranspotechContent }) {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        <span className="lg:block">{content.titleRegular}</span>{" "}
        <span className="lg:block font-bold text-primary-500">
          {content.titleAccent}
        </span>
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
              flip={art.flip}
              objectPosition={art.objectPosition}
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
