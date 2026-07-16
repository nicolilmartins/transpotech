import type { Metadata } from "next";

import { BateriasHeroSection } from "@/components/baterias/hero-section/hero-section";
import { TechSection } from "@/components/baterias/tech-section/tech-section";
import { NeedsSection } from "@/components/baterias/needs-section/needs-section";
import { BatteryTypesSection } from "@/components/baterias/battery-types-section/battery-types-section";
import { RequestStepsSection } from "@/components/baterias/request-steps-section/request-steps-section";
import { WhyTranspotechSection } from "@/components/baterias/why-transpotech-section/why-transpotech-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqBaterias } from "@/data/faq-baterias";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Baterias e Carregadores para Empilhadeiras",
  description:
    "Baterias de tração e carregadores para empilhadeiras elétricas. Soluções de alto desempenho para operações contínuas e eletrificação da frota.",
  openGraph: {
    title: "Baterias e Carregadores | TranspoTech",
    description:
      "Baterias de tração e carregadores para empilhadeiras elétricas.",
  },
};

export default function BateriasPage() {
  return (
    <main>
      <BateriasHeroSection />

      {/* Grupo claro 1 — Tecnologia + O que sua operação precisa */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <TechSection />
        <NeedsSection />
      </div>

      {/* Bloco dark — Tipos de baterias */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <BatteryTypesSection />
      </div>

      {/* Grupo claro 3 — Como funciona + Por que TranspoTech + FAQ */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <RequestStepsSection />
        <WhyTranspotechSection />
        <FaqSection
          titleRegular="Dúvidas frequentes sobre "
          titleAccent="baterias e carregadores"
          items={faqBaterias}
        />
      </div>

      <CtaSection
        titleRegular="Precisa melhorar a disponibilidade dos seus "
        titleAccent="equipamentos elétricos?"
        description="Fale com a TranspoTech e receba orientação para cotar baterias, carregadores ou avaliar a rotina de energia da operação."
        descriptionWidth="560px"
        ctaLabel="Solicitar cotação"
        ctaHref={ROUTES.ORCAMENTO}
      />
    </main>
  );
}
