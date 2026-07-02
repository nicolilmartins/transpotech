import type { Metadata } from "next";

import { PecasHeroSection } from "@/components/pecas/hero-section/hero-section";
import { NeedsSection } from "@/components/pecas/needs-section/needs-section";
import { NoCodeSection } from "@/components/pecas/no-code-section/no-code-section";
import { RequestStepsSection } from "@/components/pecas/request-steps-section/request-steps-section";
import { InfoCardsSection } from "@/components/pecas/info-cards-section/info-cards-section";
import { WhyTranspotechSection } from "@/components/pecas/why-transpotech-section/why-transpotech-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqPecas } from "@/data/faq-pecas";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Peças para Empilhadeiras",
  description:
    "Peças originais e alternativas para empilhadeiras de todas as marcas. Estoque próprio, entrega ágil e suporte técnico especializado.",
  openGraph: {
    title: "Peças para Empilhadeiras | TranspoTech",
    description:
      "Peças originais e alternativas para empilhadeiras de todas as marcas.",
  },
};

export default function PecasPage() {
  return (
    <main>
      <PecasHeroSection />

      {/* Grupo claro 1 — Qual é a sua necessidade */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <NeedsSection />
      </div>

      {/* Bloco dark — Não sabe o código + Como funciona + Informações que ajudam */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <NoCodeSection />
        <RequestStepsSection />
        <InfoCardsSection />
      </div>

      {/* Grupo claro 3 — Por que TranspoTech + FAQ */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <WhyTranspotechSection />
        <FaqSection
          titleRegular="Dúvidas frequentes sobre "
          titleAccent="peças"
          items={faqPecas}
        />
      </div>

      <CtaSection
        titleRegular="Precisa de peça, mas não sabe "
        titleAccent="exatamente qual?"
        description="Descreva o problema, informe o equipamento e fale com a TranspoTech para direcionar sua cotação."
        ctaLabel="Solicitar cotação de peças"
        ctaHref={ROUTES.ORCAMENTO}
      />
    </main>
  );
}
