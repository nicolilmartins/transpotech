import type { Metadata } from "next";

import { AutomacaoHeroSection } from "@/components/automacao/hero-section/hero-section";
import { SolutionsSection } from "@/components/automacao/solutions-section/solutions-section";
import { BenefitsSection } from "@/components/automacao/benefits-section/benefits-section";
import { ReadinessSection } from "@/components/automacao/readiness-section/readiness-section";
import { ProcessSection } from "@/components/automacao/process-section/process-section";
import { PhasedSection } from "@/components/automacao/phased-section/phased-section";
import { FlowSection } from "@/components/automacao/flow-section/flow-section";
import { SegmentsSection } from "@/components/automacao/segments-section/segments-section";
import { PartnershipSection } from "@/components/automacao/partnership-section/partnership-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqAutomacao } from "@/data/faq-automacao";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Automação Intralogística",
  description:
    "Soluções de automação intralogística com a Dematic. Sistemas automatizados de movimentação, armazenagem e distribuição para centros de distribuição e indústrias.",
  openGraph: {
    title: "Automação Intralogística | TranspoTech",
    description:
      "Soluções de automação intralogística com a Dematic para CD e indústrias.",
  },
};

export default function AutomacaoPage() {
  return (
    <main>
      <AutomacaoHeroSection />

      {/* Grupo claro 1 — Soluções */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <SolutionsSection />
      </div>

      {/* Bloco dark — Benefícios + Checklist de prontidão */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <BenefitsSection />
        <ReadinessSection />
      </div>

      {/* Grupo claro 2 — Processo */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ProcessSection />
      </div>

      {/* Bloco dark — Implantação faseada + Fluxo intralogístico */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <PhasedSection />
        <FlowSection />
      </div>

      {/* Grupo claro 3 — Segmentos + Parceria + FAQ */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <SegmentsSection />
        <PartnershipSection />
        <FaqSection
          titleRegular="Perguntas que sempre recebemos "
          titleAccent="sobre automação"
          items={faqAutomacao}
        />
      </div>

      <CtaSection
        titleRegular="Vamos avaliar a automação certa "
        titleAccent="para sua operação?"
        description="Resposta em até 1 dia útil. Sem compromisso. Confidencialidade garantida."
        ctaLabel="Avaliar minha operação"
        ctaHref={ROUTES.ORCAMENTO}
        secondaryLabel="Falar com especialista"
        secondaryHref={ROUTES.CONTATO}
      />
    </main>
  );
}
