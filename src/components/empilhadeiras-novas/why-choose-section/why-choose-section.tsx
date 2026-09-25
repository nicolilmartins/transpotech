import { Section } from "@/components/ui/section";
import {
  DarkArtCard,
  type DarkArtCardArt,
} from "@/components/layout/dark-art-card";
import type { SectionContent } from "@/sanity/content/fields";
import type { empilhadeirasNovasPage } from "@/sanity/content/pages/empilhadeiras-novas";
import iconBussola from "@/assets/images/stats/novas-icon-bussola.webp";
import iconSelo from "@/assets/images/stats/card-selo.webp";
import iconLoja from "@/assets/images/stats/card-loja.webp";
import iconChave from "@/assets/images/stats/novas-icon-chave.webp";
import iconPin from "@/assets/images/stats/card-pin.webp";
import iconEngrenagem from "@/assets/images/stats/card-engrenagem.webp";

// Geometria por card conforme o Figma (node 3603:3397). left/top alinham o
// objeto verticalmente ao texto. Na ordem dos cards editados no Studio.
type Reason = { art: DarkArtCardArt };

// Caixa padrão desta seção (204.438×153.328).
const BIG = { width: 204.438, height: 153.328 };

const arts: Reason[] = [
  {
    art: {
      src: iconBussola,
      width: 188.871,
      height: 141.654,
      maskX: 18.997,
      maskY: 4.145,
      left: -29,
      top: -16,
      flip: false,
    },
  },
  {
    art: { ...BIG, src: iconSelo, maskX: 26.78, maskY: 10.819, left: -37, top: -23, flip: false },
  },
  {
    art: { ...BIG, src: iconLoja, maskX: 26.78, maskY: 12.819, left: -37, top: -25, flip: false },
  },
  {
    art: {
      src: iconChave,
      width: 175.718,
      height: 131.789,
      maskX: 13.101,
      maskY: -1.04,
      left: -23,
      top: -11,
      flip: false,
    },
  },
  {
    art: { ...BIG, src: iconPin, maskX: 27.265, maskY: 7.819, left: -38, top: -20, flip: true },
  },
  {
    art: { ...BIG, src: iconEngrenagem, maskX: 22.141, maskY: 9.819, left: -43, top: -22, flip: true },
  },
];

type WhyChooseContent = SectionContent<typeof empilhadeirasNovasPage.sections.whyChoose>;

export function WhyChooseSection({ content }: { content: WhyChooseContent }) {
  return (
    <Section className="flex flex-col items-center gap-10 lg:gap-16">
      <h2 className="max-w-[560px] text-center text-h2 text-neutral-50">
        <span className="lg:block font-normal">{content.titleRegular}</span>{" "}
        <span className="lg:block font-bold text-primary-500">
          {content.titleAccent}
        </span>
      </h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.cards.map((card, i) => (
          <DarkArtCard key={card.title} {...card} {...arts[i]} />
        ))}
      </div>
    </Section>
  );
}
