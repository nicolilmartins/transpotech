import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { CanalHeroSection } from "@/components/canal-transparencia/hero-section/hero-section";
import { ScopeSection } from "@/components/canal-transparencia/scope-section/scope-section";
import { RedirectSection } from "@/components/canal-transparencia/redirect-section/redirect-section";
import { ProcessSection } from "@/components/canal-transparencia/process-section/process-section";
import { CommitmentsSection } from "@/components/canal-transparencia/commitments-section/commitments-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DriftMesh } from "@/components/layout/drift-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { getFaqItems } from "@/sanity/queries/faq";
import { getSiteSettings } from "@/sanity/queries/site-settings";
import { getPage } from "@/sanity/queries/pages";
import { canalTransparenciaPage } from "@/sanity/content/pages/canal-transparencia";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Canal da Transparência",
  description:
    "Canal da Transparência da TranspoTech: relate situações relacionadas à ética, integridade e conduta, com tratamento confidencial e possibilidade de anonimato.",
  openGraph: {
    ...baseOpenGraph,
    title: "Canal da Transparência | TranspoTech",
    description:
      "Relate situações de ética e conduta com confidencialidade e opção de anonimato.",
  },
};

export default async function CanalTransparenciaPage() {
  const [settings, faqItems, content] = await Promise.all([
    getSiteSettings(),
    getFaqItems("canal-transparencia"),
    getPage(canalTransparenciaPage),
  ]);

  return (
    <main>
      {/* Grupo claro 1 */}
      <div className="relative isolate bg-background">
        {/* Hero — malha grande que anda pelo fundo (sem cursor) */}
        <div className="relative">
          <DriftMesh className="pointer-events-none absolute inset-0 -z-10" />
          <CanalHeroSection
            ouvidorDigitalUrl={settings.ouvidorDigitalUrl}
            content={content.hero}
          />
        </div>
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <ScopeSection content={content.scope} />
          <RedirectSection content={content.redirect} />
        </div>
      </div>

      {/* Bloco dark — Como funciona o processo + Nossos compromissos */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <ProcessSection content={content.process} />
        <CommitmentsSection content={content.commitments} />
      </div>

      {/* Grupo claro 2 — FAQ (sem malha) */}
      <div className="bg-background">
        <FaqSection
          {...content.faq}
          items={faqItems}
        />
      </div>

      <CtaSection {...content.cta} titleBreak ctaHref={ROUTES.OUVIDORIA} />
    </main>
  );
}
