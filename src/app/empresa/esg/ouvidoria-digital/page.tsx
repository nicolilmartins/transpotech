import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

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
import { getFaqItems } from "@/sanity/queries/faq";
import { getSiteSettings } from "@/sanity/queries/site-settings";
import { getPage } from "@/sanity/queries/pages";
import { ouvidoriaPage } from "@/sanity/content/pages/ouvidoria";

export const metadata: Metadata = {
  title: "Ouvidoria Digital",
  description:
    "Ouvidoria Digital da TranspoTech: registre reclamações, sugestões, elogios, dúvidas e manifestações gerais sobre sua experiência. Queremos ouvir você.",
  openGraph: {
    ...baseOpenGraph,
    title: "Ouvidoria Digital | TranspoTech",
    description:
      "Canal para reclamações, sugestões, elogios, dúvidas e manifestações gerais.",
  },
};

export default async function OuvidoriaPage() {
  const [settings, faqItems, content] = await Promise.all([
    getSiteSettings(),
    getFaqItems("ouvidoria"),
    getPage(ouvidoriaPage),
  ]);

  return (
    <main>
      {/* Grupo claro 1 */}
      <div className="relative isolate bg-background">
        {/* Hero — malha grande que anda pelo fundo (sem cursor) */}
        <div className="relative">
          <DriftMesh className="pointer-events-none absolute inset-0 -z-10" />
          <OuvidoriaHeroSection content={content.hero} />
        </div>
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <ScopeSection content={content.scope} />
        </div>
      </div>

      {/* Bloco dark — Qual canal devo usar + Como funciona a Ouvidoria */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <ChannelChoiceSection
          ouvidorDigitalUrl={settings.ouvidorDigitalUrl}
          content={content.channelChoice}
        />
        <ProcessSection content={content.process} />
      </div>

      {/* Grupo claro 2 (malha só até o redirecionamento comercial) */}
      <div className="relative isolate bg-background pb-6">
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <ManifestacaoForm content={content.form} />
          <CommercialRedirectSection content={content.commercialRedirect} />
        </div>
        <FaqSection
          {...content.faq}
          items={faqItems}
        />
      </div>
    </main>
  );
}
