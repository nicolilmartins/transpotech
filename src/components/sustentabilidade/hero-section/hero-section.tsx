import { PhotoHero } from "@/components/layout/photo-hero";
import type { SectionContent } from "@/sanity/content/fields";
import type { sustentabilidadePage } from "@/sanity/content/pages/sustentabilidade";

type SustentabilidadeHeroContent = SectionContent<
  typeof sustentabilidadePage.sections.hero
>;

export function SustentabilidadeHeroSection({
  content,
}: {
  content: SustentabilidadeHeroContent;
}) {
  return (
    <PhotoHero
      image={content.image}
      // Gradiente sobe além do título para garantir a legibilidade sobre a imagem
      shadeStops={[40, 94]}
      contentClassName="max-w-[900px]"
      titleClassName="text-h2 text-neutral-50"
      // Duas linhas: quebra forçada antes da segunda parte
      titleSegments={[
        { text: content.titleTop, className: "font-normal", br: true },
        {
          text: content.titleAccent,
          className: "font-bold text-primary-500 lg:whitespace-nowrap",
        },
      ]}
      descriptionClassName="max-w-[480px]"
      description={content.description}
      cta={{ href: "#destaques", label: content.buttonLabel }}
    />
  );
}
