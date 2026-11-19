import { StructureMapSection } from "@/components/layout/structure-map-section";
import type { SectionContent } from "@/sanity/content/fields";
import type { servicosPage } from "@/sanity/content/pages/servicos";

type TechStructureContent = SectionContent<
  typeof servicosPage.sections.techStructure
>;

// A implementação (cards de estado + mapa interativo) vive em
// layout/structure-map-section — compartilhada com Quem Somos.
export function TechStructureSection({
  content,
}: {
  content: TechStructureContent;
}) {
  return (
    <StructureMapSection
      eyebrow={content.eyebrow}
      titleTop={content.titleTop}
      titleBottom={content.titleBottom}
      accentBottom
      description={content.description}
    />
  );
}
