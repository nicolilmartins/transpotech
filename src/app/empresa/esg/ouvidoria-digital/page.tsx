import type { Metadata } from "next";

import { OuvidoriaHeroSection } from "@/components/ouvidoria-digital/hero-section/hero-section";
import { ScopeSection } from "@/components/ouvidoria-digital/scope-section/scope-section";
import { ChannelChoiceSection } from "@/components/ouvidoria-digital/channel-choice-section/channel-choice-section";
import { ProcessSection } from "@/components/ouvidoria-digital/process-section/process-section";
import { ManifestacaoForm } from "@/components/ouvidoria-digital/manifestacao-form/manifestacao-form";
import { CommercialRedirectSection } from "@/components/ouvidoria-digital/commercial-redirect-section/commercial-redirect-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DriftMesh } from "@/components/layout/drift-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { faqOuvidoria } from "@/data/faq-ouvidoria";

export const metadata: Metadata = {
  title: "Ouvidoria Digital",
  description:
    "Ouvidoria Digital da TranspoTech: registre reclamações, sugestões, elogios, dúvidas e manifestações gerais sobre sua experiência. Queremos ouvir você.",
  openGraph: {
    title: "Ouvidoria Digital | TranspoTech",
    description:
      "Canal para reclamações, sugestões, elogios, dúvidas e manifestações gerais.",
  },
};

export default function OuvidoriaPage() {
  return (
    <main>
      {/* Grupo claro 1 */}
      <div className="relative isolate bg-[#fdfdfd]">
        {/* Hero — malha grande que anda pelo fundo (sem cursor) */}
        <div className="relative">
          <DriftMesh className="pointer-events-none absolute inset-0 -z-10" />
          <OuvidoriaHeroSection />
        </div>
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <ScopeSection />
        </div>
      </div>

      {/* Bloco dark — Qual canal devo usar + Como funciona a Ouvidoria */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <ChannelChoiceSection />
        <ProcessSection />
      </div>

      {/* Grupo claro 2 (malha só até o redirecionamento comercial) */}
      <div className="relative isolate bg-[#fdfdfd] pb-6">
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <ManifestacaoForm />
          <CommercialRedirectSection />
        </div>
        <FaqSection
          titleRegular="Perguntas "
          titleAccent="frequentes"
          items={faqOuvidoria}
        />
      </div>
    </main>
  );
}
