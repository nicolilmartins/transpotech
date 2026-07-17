import type { Metadata } from "next";

import { OrcamentoHeroSection } from "@/components/orcamento/hero-section/hero-section";
import { SimulatorSection } from "@/components/orcamento/simulator-section/simulator-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Simulador de Economia",
  description:
    "Compare o custo de energia de uma empilhadeira a GLP com o de uma elétrica a lítio. Ajuste turnos, preço do cilindro e tarifa de kWh e veja o retorno do investimento.",
  openGraph: {
    title: "Simulador de Economia — GLP × Elétrica | TranspoTech",
    description:
      "Compare custos por hora, mês, ano e 5 anos entre empilhadeira a GLP e elétrica a lítio, e descubra em quantos meses a elétrica se paga.",
  },
};

export default function OrcamentoPage() {
  return (
    <main>
      <OrcamentoHeroSection />
      <SimulatorSection />

      <CtaSection
        titleRegular="Quer o número exato para "
        titleAccent="a sua operação?"
        description="Um especialista da TranspoTech dimensiona o equipamento certo e apresenta a proposta mais vantajosa, sem compromisso."
        ctaLabel="Falar com especialista"
        ctaHref={ROUTES.CONTATO}
      />
    </main>
  );
}
