import { StructureMapSection } from "@/components/layout/structure-map-section";

// Mesma seção interativa de estrutura da página de serviços (cards de estado
// + mapa animado), com o texto institucional de Quem Somos.
export function StructureSection() {
  return (
    <StructureMapSection
      titleTop="Estrutura próxima para"
      titleBottom="atender sua operação"
      accentBottom
      description="Com unidades, hub administrativo, hub de rental, oficinas, estoque de peças e carros oficina, a TranspoTech oferece atendimento consultivo e suporte para empresas que precisam de agilidade, disponibilidade e confiança."
      descriptionWidth="560px"
    />
  );
}
