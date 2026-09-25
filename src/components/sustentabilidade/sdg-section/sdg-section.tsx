import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import type { SectionContent } from "@/sanity/content/fields";
import type { sustentabilidadePage } from "@/sanity/content/pages/sustentabilidade";
import ods3 from "@/assets/images/ods/ods-3.webp";
import ods4 from "@/assets/images/ods/ods-4.webp";
import ods5 from "@/assets/images/ods/ods-5.webp";
import ods6 from "@/assets/images/ods/ods-6.webp";
import ods7 from "@/assets/images/ods/ods-7.webp";
import ods8 from "@/assets/images/ods/ods-8.webp";
import ods9 from "@/assets/images/ods/ods-9.webp";
import ods10 from "@/assets/images/ods/ods-10.webp";
import ods11 from "@/assets/images/ods/ods-11.webp";
import ods12 from "@/assets/images/ods/ods-12.webp";
import ods13 from "@/assets/images/ods/ods-13.webp";

type Sdg = {
  number: number;
  label: string;
  icon: StaticImageData;
};

// Os 11 ODS com os quais a TranspoTech contribui (3 a 13). Cada webp é a
// arte oficial ONU completa (número + título pt-BR + pictograma), então o
// card só emoldura a arte — padrão do Figma (node 3555-3141): quadrado
// surface-muted arredondado com a arte centralizada e ~13% de respiro.
const sdgs: Sdg[] = [
  { number: 3, label: "Saúde e bem-estar", icon: ods3 },
  { number: 4, label: "Educação de qualidade", icon: ods4 },
  { number: 5, label: "Igualdade de gênero", icon: ods5 },
  { number: 6, label: "Água potável e saneamento", icon: ods6 },
  { number: 7, label: "Energia limpa e acessível", icon: ods7 },
  { number: 8, label: "Trabalho decente e crescimento econômico", icon: ods8 },
  { number: 9, label: "Indústria, inovação e infraestrutura", icon: ods9 },
  { number: 10, label: "Redução das desigualdades", icon: ods10 },
  { number: 11, label: "Cidades e comunidades sustentáveis", icon: ods11 },
  { number: 12, label: "Produção e consumo responsáveis", icon: ods12 },
  { number: 13, label: "Ação contra a mudança global do clima", icon: ods13 },
];

type SdgContent = SectionContent<typeof sustentabilidadePage.sections.sdg>;

export function SdgSection({ content }: { content: SdgContent }) {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
          {content.eyebrow}
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          {content.titleRegular}
          <span className="font-bold">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      {/* Cards centralizados — flex-wrap centraliza também a linha incompleta. */}
      <ul className="flex flex-wrap justify-center gap-3">
        {sdgs.map((sdg) => (
          <li
            key={sdg.number}
            className="flex aspect-square w-[calc((100%-24px)/3)] items-center justify-center rounded-2xl bg-surface-muted p-3 sm:w-[calc((100%-36px)/4)] sm:p-5 lg:w-[calc((100%-60px)/6)] lg:p-6"
          >
            <Image
              src={sdg.icon}
              alt={`ODS ${sdg.number}: ${sdg.label}`}
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 25vw, 33vw"
              className="h-full w-full object-contain object-left"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
