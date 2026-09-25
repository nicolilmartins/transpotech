import { Section } from "@/components/ui/section";
import {
  DarkArtCard,
  type DarkArtCardArt,
} from "@/components/layout/dark-art-card";
import type { SectionContent } from "@/sanity/content/fields";
import type { locacaoPage } from "@/sanity/content/pages/locacao";
import iconGalpao from "@/assets/images/stats/card-galpao.webp";
import iconCarrinho from "@/assets/images/stats/card-carrinho.webp";
import iconFabrica from "@/assets/images/stats/card-fabrica.webp";
import iconCaminhao from "@/assets/images/stats/card-caminhao.webp";
import iconFloco from "@/assets/images/stats/loc-icon-floco.webp";

// Geometria por card conforme o Figma (node 3603:3365). left/top alinham o
// objeto ao texto. Na ordem dos cards editados no Studio.
const arts: { art: DarkArtCardArt }[] = [
  {
    art: {
      src: iconGalpao,
      width: 175.718,
      height: 131.789,
      maskX: 12.101,
      maskY: -1.04,
      left: -22,
      top: -11,
    },
  },
  {
    art: {
      src: iconCarrinho,
      width: 204.438,
      height: 153.328,
      maskX: 25.448,
      maskY: 9.73,
      left: -36,
      top: -22,
    },
  },
  {
    art: {
      src: iconFabrica,
      width: 178.49,
      height: 133.868,
      maskX: 14.487,
      maskY: 0,
      left: -25,
      top: -12,
    },
  },
  {
    art: {
      src: iconCaminhao,
      width: 176.465,
      height: 132.349,
      maskX: 16.244,
      maskY: -0.519,
      left: -27,
      top: -12,
    },
  },
  {
    art: {
      src: iconFloco,
      width: 178.49,
      height: 133.868,
      maskX: 14.487,
      maskY: 0,
      left: -25,
      top: -12,
    },
  },
];

type SegmentsContent = SectionContent<typeof locacaoPage.sections.segments>;

export function SegmentsSection({ content }: { content: SegmentsContent }) {
  const segments = content.items.map((item, i) => ({ ...item, ...arts[i] }));
  const [topRow, bottomRow] = [segments.slice(0, 3), segments.slice(3)];

  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-primary-500">
          {content.eyebrow}
        </p>
        <h2 className="text-h2 font-normal text-neutral-50">
          {content.titleRegular}{" "}
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          {content.description}
        </p>
      </div>

      {/* Bento — 3 cards em cima, 2 centralizados embaixo */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topRow.map((segment) => (
            <DarkArtCard
              key={segment.title}
              {...segment}
              titleClassName="w-[242px] max-w-full"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-auto lg:w-2/3">
          {bottomRow.map((segment) => (
            <DarkArtCard
              key={segment.title}
              {...segment}
              titleClassName="w-[242px] max-w-full"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
