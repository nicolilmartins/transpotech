import { StructureMapSection } from "@/components/layout/structure-map-section";
import type { SectionContent } from "@/sanity/content/fields";
import type { quemSomosPage } from "@/sanity/content/pages/quem-somos";

type StructureContent = SectionContent<typeof quemSomosPage.sections.structure>;

// Mesma seção de abrangência nacional da página de serviços (indicadores +
// mapa do Brasil interativo), com o texto institucional de Quem Somos.
export function StructureSection({ content }: { content: StructureContent }) {
  return (
    <StructureMapSection
      eyebrow={content.eyebrow}
      titleTop={content.titleTop}
      titleBottom={content.titleAccent}
      accentBottom
      description={content.description}
      descriptionWidth="560px"
    />
  );
}
