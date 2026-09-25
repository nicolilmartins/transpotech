import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { AutomacaoHeroSection } from "@/components/automacao-intralogistica/hero-section/hero-section";
import { LeadFormSection } from "@/components/layout/lead-form-section/lead-form-section";
import { PartnershipSection } from "@/components/automacao-intralogistica/partnership-section/partnership-section";
import { BenefitsSection } from "@/components/automacao-intralogistica/benefits-section/benefits-section";
import { SolutionsSection } from "@/components/automacao-intralogistica/solutions-section/solutions-section";
import { ProcessSection } from "@/components/automacao-intralogistica/process-section/process-section";
import { SegmentsSection } from "@/components/automacao-intralogistica/segments-section/segments-section";
// Seção "O que nossos clientes dizem" temporariamente oculta a pedido do cliente.
// import { CasesSection } from "@/components/automacao-intralogistica/cases-section/cases-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { getFaqItems } from "@/sanity/queries/faq";
import { getPage } from "@/sanity/queries/pages";
import { automacaoPage } from "@/sanity/content/pages/automacao";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Automação Intralogística",
  description:
    "Soluções de automação intralogística com a Dematic. Sistemas automatizados de movimentação, armazenagem e distribuição para centros de distribuição e indústrias.",
  openGraph: {
    ...baseOpenGraph,
    title: "Automação Intralogística | TranspoTech",
    description:
      "Soluções de automação intralogística com a Dematic para CD e indústrias.",
  },
};

export default async function AutomacaoPage() {
  const [faqItems, content] = await Promise.all([
    getFaqItems("automacao"),
    getPage(automacaoPage),
  ]);

  return (
    <main>
      <AutomacaoHeroSection content={content.hero} />

      {/* Grupo claro 1 — Parceria TranspoTech + Dematic + Captação.
          Uma única malha cobre tudo, sem cortes (fundo surface-subtle). */}
      <div className="relative isolate bg-surface-subtle">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <PartnershipSection
          content={content.partnership}
          hotspots={content.hotspots}
        />
        <LeadFormSection id="avaliar-automacao" {...content.leadForm} />
      </div>

      {/* Bloco dark — Números */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <BenefitsSection content={content.benefits} />
      </div>

      {/* Grupo claro 2 — Soluções/Sistemas/AGV + Processo + Segmentos.
          Uma única malha cobre as três, sem cortes. */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <SolutionsSection
          content={content.solutions}
          tabs={[
            content.solutionsTab1,
            content.solutionsTab2,
            content.solutionsTab3,
          ]}
        />
        <ProcessSection content={content.process} />
        <SegmentsSection content={content.segments} />
      </div>

      {/* CasesSection segue oculta. Ela é dark (data-header-dark + cards com
          glow), então ao voltar precisa do próprio bloco #181616 com
          DarkAmbient — não cabe neste grupo claro. */}
      {/* <CasesSection /> */}

      {/* Grupo claro 4 — FAQ (sem malha) */}
      <div className="bg-background">
        <FaqSection {...content.faq} items={faqItems} />
      </div>

      <CtaSection
        {...content.cta}
        ctaHref="#avaliar-automacao"
        secondaryHref={ROUTES.CONTATO}
      />
    </main>
  );
}
