import type { Metadata } from "next";

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
import { faqCanalTransparencia } from "@/data/faq-canal-transparencia";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Canal da Transparência",
  description:
    "Canal da Transparência da TranspoTech: relate situações relacionadas à ética, integridade e conduta, com tratamento confidencial e possibilidade de anonimato.",
  openGraph: {
    title: "Canal da Transparência | TranspoTech",
    description:
      "Relate situações de ética e conduta com confidencialidade e opção de anonimato.",
  },
};

export default function CanalTransparenciaPage() {
  return (
    <main>
      {/* Grupo claro 1 */}
      <div className="relative isolate bg-[#fdfdfd]">
        {/* Hero — malha grande que anda pelo fundo (sem cursor) */}
        <div className="relative">
          <DriftMesh className="pointer-events-none absolute inset-0 -z-10" />
          <CanalHeroSection />
        </div>
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <ScopeSection />
          <RedirectSection />
        </div>
      </div>

      {/* Bloco dark — Como funciona o processo + Nossos compromissos */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <ProcessSection />
        <CommitmentsSection />
      </div>

      {/* Grupo claro 2 */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <FaqSection
          titleRegular="Perguntas "
          titleAccent="frequentes"
          items={faqCanalTransparencia}
        />
      </div>

      <CtaSection
        titleRegular="Tem uma manifestação que não é sobre "
        titleAccent="ética ou conduta?"
        titleBreak
        description="Use a Ouvidoria Digital para reclamações, sugestões, elogios, dúvidas ou solicitações gerais."
        ctaLabel="Acessar Ouvidoria"
        ctaHref={ROUTES.OUVIDORIA}
        secondaryLabel="Voltar para Sustentabilidade"
        secondaryHref={ROUTES.SUSTENTABILIDADE}
      />
    </main>
  );
}
