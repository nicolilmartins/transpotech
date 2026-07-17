import type { Metadata } from "next";

import { ServicosHeroSection } from "@/components/servicos/hero-section/hero-section";
import { MultibrandSection } from "@/components/servicos/multibrand-section/multibrand-section";
import { PortfolioSection } from "@/components/servicos/portfolio-section/portfolio-section";
import { Pm2pSection } from "@/components/servicos/pm2p-section/pm2p-section";
import { ProcessSection } from "@/components/servicos/process-section/process-section";
import { DifferentialsSection } from "@/components/servicos/differentials-section/differentials-section";
import { TechStructureSection } from "@/components/servicos/tech-structure-section/tech-structure-section";
import { SegmentsSection } from "@/components/servicos/segments-section/segments-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqServicos } from "@/data/faq-servicos";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços especializados em empilhadeiras: planos de manutenção preventiva, manutenção corretiva e assistência técnica multimarcas. 380 técnicos em todo o Brasil.",
  openGraph: {
    title: "Serviços | TranspoTech",
    description:
      "Manutenção preventiva, corretiva e assistência multimarcas para empilhadeiras.",
  },
};

export default function ServicosPage() {
  return (
    <main>
      <ServicosHeroSection />

      {/* Multimarcas — fundo branco, sem malha de fundo (grade própria com linhas
          finas + bolinhas nas interseções e blur verde no hover). */}
      <div className="bg-[#fdfdfd]">
        <MultibrandSection />
      </div>

      {/* Grupo claro 1 — Portfólio */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <PortfolioSection />
      </div>

      {/* Bloco dark — PM2P */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <Pm2pSection />
      </div>

      {/* Grupo claro 2 — Processo */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ProcessSection />
      </div>

      {/* Grupo claro 3 — Diferenciais */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <DifferentialsSection />
      </div>

      {/* Bloco dark único — Estrutura técnica + Segmentos.
          Um só DarkAmbient para os blurs percorrerem as duas seções de forma
          contínua (parecem uma seção só). */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <TechStructureSection />
        <SegmentsSection />
      </div>

      {/* Grupo claro 4 — FAQ (sem malha) */}
      <div className="bg-[#fdfdfd]">
        <FaqSection
          titleRegular="Perguntas frequentes sobre "
          titleAccent="serviços e manutenção"
          items={faqServicos}
        />
      </div>

      <CtaSection
        titleRegular="Solicite "
        titleAccent="atendimento técnico"
        description="Preencha os dados e um especialista da TranspoTech entrará em contato para entender sua necessidade e direcionar o atendimento."
        ctaLabel="Solicitar atendimento técnico"
        ctaHref={ROUTES.ORCAMENTO}
      />
    </main>
  );
}
