import type { Metadata } from "next";

import { PecasHeroSection } from "@/components/pecas/hero-section/hero-section";
import { LeadFormSection } from "@/components/layout/lead-form-section/lead-form-section";
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

      {/* Grupo claro 1 — Captação (logo após a hero) + Qual é a sua necessidade.
          Uma única malha cobre tudo, sem cortes. */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <LeadFormSection
          id="solicitar-pecas"
          titleTop="As peças que a"
          titleBottom="sua frota precisa"
          description="Informe o modelo e o item e a TranspoTech localiza a peça original ou multimarcas com o melhor prazo de entrega."
          messagePlaceholder="Modelo do equipamento, código ou descrição da peça e quantidade."
          submitLabel="Solicitar cotação de peças"
        />
        <NeedsSection />
      </div>

      {/* Bloco dark — Não sabe o código + Como funciona + Informações que ajudam */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <NoCodeSection />
        <RequestStepsSection />
        <InfoCardsSection />
      </div>

      {/* Grupo claro 3 — Por que TranspoTech + FAQ (malha só no Por que) */}
      <div className="relative isolate bg-[#fdfdfd]">
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <WhyTranspotechSection />
        </div>
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
        ctaHref="#solicitar-pecas"
      />
    </main>
  );
}
