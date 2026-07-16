import { StructureMapSection } from "@/components/layout/structure-map-section";

// A implementação (cards de estado + mapa interativo) vive em
// layout/structure-map-section — compartilhada com Quem Somos.
export function TechStructureSection() {
  return (
    <StructureMapSection
      titleTop="Estrutura técnica para"
      titleBottom="apoiar sua operação"
      accentBottom
      description="Escolha um estado e veja onde atuamos."
    />
  );
}
