import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { PecasHeroSection } from "@/components/pecas/hero-section/hero-section";
import { LeadFormSection } from "@/components/layout/lead-form-section/lead-form-section";
import { NeedsSection } from "@/components/pecas/needs-section/needs-section";
import { NoCodeSection } from "@/components/pecas/no-code-section/no-code-section";
import { RequestStepsSection } from "@/components/pecas/request-steps-section/request-steps-section";
import { InfoCardsSection } from "@/components/pecas/info-cards-section/info-cards-section";
import { WhyTranspotechSection } from "@/components/pecas/why-transpotech-section/why-transpotech-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { getFaqItems } from "@/sanity/queries/faq";
import { getPage } from "@/sanity/queries/pages";
import { pecasPage } from "@/sanity/content/pages/pecas";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";

export const metadata: Metadata = {
  title: "Peças para Empilhadeiras",
  description:
    "Peças originais e alternativas para empilhadeiras de todas as marcas. Estoque próprio, entrega ágil e suporte técnico especializado.",
  openGraph: {
    ...baseOpenGraph,
    title: "Peças para Empilhadeiras | TranspoTech",
    description:
      "Peças originais e alternativas para empilhadeiras de todas as marcas.",
  },
};

export default async function PecasPage() {
  const [faqItems, content] = await Promise.all([
    getFaqItems("pecas"),
    getPage(pecasPage),
  ]);

  return (
    <main>
      <PecasHeroSection content={content.hero} />

      {/* Grupo claro 1 — Captação (logo após a hero) + Qual é a sua necessidade.
          Uma única malha cobre tudo, sem cortes. */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <LeadFormSection
          id="solicitar-pecas"
          {...content.leadForm}
        />
        <NeedsSection content={content.needs} />
      </div>

      {/* Bloco dark — Não sabe o código + Como funciona + Informações que ajudam */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <NoCodeSection content={content.noCode} />
        <RequestStepsSection content={content.requestSteps} />
        <InfoCardsSection content={content.infoCards} />
      </div>

      {/* Grupo claro 3 — Por que TranspoTech + FAQ (malha só no Por que) */}
      <div className="relative isolate bg-background">
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <WhyTranspotechSection content={content.whyTranspotech} />
        </div>
        <FaqSection
          {...content.faq}
          items={faqItems}
        />
      </div>

      <CtaSection
        {...content.cta}
        ctaHref="#solicitar-pecas"
      />
    </main>
  );
}
