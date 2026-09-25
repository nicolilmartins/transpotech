import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { ServicosHeroSection } from "@/components/servicos/hero-section/hero-section";
import { LeadFormSection } from "@/components/layout/lead-form-section/lead-form-section";
import { MultibrandSection } from "@/components/servicos/multibrand-section/multibrand-section";
import { PortfolioSection } from "@/components/servicos/portfolio-section/portfolio-section";
import { Pm2pSection } from "@/components/servicos/pm2p-section/pm2p-section";
import { ProcessSection } from "@/components/servicos/process-section/process-section";
import { DifferentialsSection } from "@/components/servicos/differentials-section/differentials-section";
import { TechStructureSection } from "@/components/servicos/tech-structure-section/tech-structure-section";
import { SegmentsSection } from "@/components/servicos/segments-section/segments-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { getFaqItems } from "@/sanity/queries/faq";
import { getPage } from "@/sanity/queries/pages";
import { servicosPage } from "@/sanity/content/pages/servicos";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços especializados em empilhadeiras: planos de manutenção preventiva, manutenção corretiva e assistência técnica multimarcas. 380 técnicos em todo o Brasil.",
  openGraph: {
    ...baseOpenGraph,
    title: "Serviços | TranspoTech",
    description:
      "Manutenção preventiva, corretiva e assistência multimarcas para empilhadeiras.",
  },
};

export default async function ServicosPage() {
  const [faqItems, content] = await Promise.all([
    getFaqItems("servicos"),
    getPage(servicosPage),
  ]);

  return (
    <main>
      <ServicosHeroSection content={content.hero} />

      {/* Multimarcas — fundo branco, sem malha de fundo (grade própria com linhas
          finas + bolinhas nas interseções e blur verde no hover). */}
      <div className="bg-background">
        <MultibrandSection content={content.multibrand} />
      </div>

      {/* Bloco dark — Estrutura técnica (mapa de abrangência), logo após as
          marcas atendidas. */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <TechStructureSection content={content.techStructure} />
      </div>

      {/* Grupo claro 1 — Captação + Portfólio. Malha única, sem cortes. */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <LeadFormSection id="solicitar-servico" {...content.leadForm} />
        <PortfolioSection content={content.portfolio} />
      </div>

      {/* Bloco dark — PM2P */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <Pm2pSection content={content.pm2p} />
      </div>

      {/* Grupo claro 2 — Processo */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ProcessSection content={content.process} />
      </div>

      {/* Grupo claro 3 — Diferenciais */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <DifferentialsSection content={content.differentials} />
      </div>

      {/* Bloco dark — Segmentos */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <SegmentsSection content={content.segments} />
      </div>

      {/* Grupo claro 4 — FAQ (sem malha) */}
      <div className="bg-background">
        <FaqSection {...content.faq} items={faqItems} />
      </div>

      <CtaSection {...content.cta} ctaHref="#solicitar-servico" />
    </main>
  );
}
