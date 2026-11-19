import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { OrcamentoHeroSection } from "@/components/simular-economia/hero-section/hero-section";
import { SimulatorSection } from "@/components/simular-economia/simulator-section/simulator-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { ROUTES } from "@/lib/routes";
import { getPage } from "@/sanity/queries/pages";
import { simularEconomiaPage } from "@/sanity/content/pages/simular-economia";

export const metadata: Metadata = {
  title: "Simulador de Economia",
  description:
    "Compare o custo de energia de uma empilhadeira a GLP com o de uma elétrica a lítio. Ajuste turnos, preço do cilindro e tarifa de kWh e veja o retorno do investimento.",
  openGraph: {
    ...baseOpenGraph,
    title: "Simulador de Economia — GLP × Elétrica | TranspoTech",
    description:
      "Compare custos por hora, mês, ano e 5 anos entre empilhadeira a GLP e elétrica a lítio, e descubra em quantos meses a elétrica se paga.",
  },
};

export default async function OrcamentoPage() {
  const content = await getPage(simularEconomiaPage);

  return (
    <main>
      <OrcamentoHeroSection content={content.hero} />
      <SimulatorSection content={content.simulator} />

      <CtaSection {...content.cta} ctaHref={ROUTES.CONTATO} />
    </main>
  );
}
