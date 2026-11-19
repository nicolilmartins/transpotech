import { Section } from "@/components/ui/section";
import {
  DarkArtCard,
  type DarkArtCardArt,
} from "@/components/layout/dark-art-card";
import type { SectionContent } from "@/sanity/content/fields";
import type { servicosPage } from "@/sanity/content/pages/servicos";
import iconGalpao from "@/assets/images/stats/card-galpao.webp";
import iconFabrica from "@/assets/images/stats/card-fabrica.webp";
import iconCarrinho from "@/assets/images/stats/card-carrinho.webp";
import iconCaminhao from "@/assets/images/stats/card-caminhao.webp";
import iconEmpilhadeira from "@/assets/images/stats/serv-icon-empilhadeira.webp";
import iconTrator from "@/assets/images/stats/serv-icon-trator.webp";

// Geometria por card conforme o Figma (node 3603:3444), na ordem dos cards
// editados no Studio.
const segmentArt: DarkArtCardArt[] = [
  {
    src: iconGalpao,
    width: 175.718,
    height: 131.789,
    maskX: 12.101,
    maskY: -1.04,
    left: -22,
    top: -11,
  },
  {
    src: iconFabrica,
    width: 178.49,
    height: 133.868,
    maskX: 14.487,
    maskY: 0,
    left: -25,
    top: -12,
  },
  {
    src: iconCarrinho,
    width: 204.438,
    height: 153.328,
    maskX: 25.448,
    maskY: 9.73,
    left: -36,
    top: -22,
  },
  {
    src: iconCaminhao,
    width: 176.465,
    height: 132.349,
    maskX: 16.244,
    maskY: -0.519,
    left: -27,
    top: -12,
  },
  {
    src: iconEmpilhadeira,
    width: 194.667,
    height: 146,
    maskX: 22.575,
    maskY: 6,
    left: -33,
    top: -18,
  },
  {
    src: iconTrator,
    width: 178.345,
    height: 133.759,
    maskX: 14.78,
    maskY: 3.035,
    left: -25,
    top: -15,
  },
];

type SegmentsContent = SectionContent<typeof servicosPage.sections.segments>;

export function SegmentsSection({ content }: { content: SegmentsContent }) {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-primary-500">
          {content.eyebrow}
        </p>
        <h2 className="text-h2 font-normal text-neutral-50">
          {content.title}{" "}
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
      </div>

      {/* 6 cards — grade de 3 colunas (3 + 3) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.cards.map((segment, i) => (
          <DarkArtCard
            key={segment.title}
            {...segment}
            art={segmentArt[i]}
            titleClassName="whitespace-nowrap"
          />
        ))}
      </div>
    </Section>
  );
}
