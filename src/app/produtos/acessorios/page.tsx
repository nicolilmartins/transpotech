import type { Metadata } from "next";

import { AcessoriosHeroSection } from "@/components/acessorios/hero-section/hero-section";
import { ChallengesSection } from "@/components/acessorios/challenges-section/challenges-section";
import { SolutionsSection } from "@/components/acessorios/solutions-section/solutions-section";
import { ComparisonSection } from "@/components/acessorios/comparison-section/comparison-section";
import { AdasSection } from "@/components/acessorios/adas-section/adas-section";
import { ShelfAccessoriesSection } from "@/components/acessorios/shelf-accessories-section/shelf-accessories-section";
import { BrandsSection } from "@/components/layout/brands-section/brands-section";
import { LeadFormSection } from "@/components/layout/lead-form-section/lead-form-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { getPage } from "@/sanity/queries/pages";
import { acessoriosPage } from "@/sanity/content/pages/acessorios";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import still from "@/assets/Logos/Logo still.svg";
import linde from "@/assets/Logos/Logo Linde.svg";
import baoli from "@/assets/Logos/Logo Baoli.svg";

export const metadata: Metadata = {
  title: "Acessórios e Telemetria para Empilhadeiras",
  description:
    "Telemetria, check list eletrônico, sistema de detecção de pedestres (ADAS) e acessórios de segurança para empilhadeiras STILL, Linde, Baoli e outras marcas.",
  openGraph: {
    title: "Acessórios e Telemetria para Empilhadeiras | TranspoTech",
    description:
      "Telemetria, check list eletrônico, ADAS e acessórios de segurança para empilhadeiras.",
  },
};

const compatibleBrands = [
  { src: still, alt: "STILL" },
  { src: linde, alt: "Linde" },
  { src: baoli, alt: "Baoli" },
];

export default async function AcessoriosPage() {
  const content = await getPage(acessoriosPage);

  return (
    <main>
      <AcessoriosHeroSection content={content.hero} />

      {/* Grupo claro 1 — Marcas (logo após a hero) + Desafios de uma frota
          sem controle */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <BrandsSection
          tone="light"
          eyebrow={content.brands.eyebrow}
          brands={compatibleBrands}
        />
        <ChallengesSection content={content.challenges} />
      </div>

      {/* Bloco dark — Níveis de solução + Comparativo + KION ADAS, com o
          blur do DarkAmbient compartilhado para o fundo ficar contínuo */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <SolutionsSection content={content.solutions} />
        <ComparisonSection content={content.comparison} />
        <AdasSection content={content.adas} />
      </div>

      {/* Grupo claro 2 — Acessórios de prateleira */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ShelfAccessoriesSection content={content.shelfAccessories} />
      </div>

      {/* Grupo claro 3 — Captação + FAQ */}
      <div className="relative isolate bg-[#fdfdfd]">
        <LeadFormSection
          id="solicitar-acessorios"
          {...content.leadForm}
        />
        <FaqSection {...content.faq} />
      </div>

      <CtaSection
        {...content.cta}
        descriptionWidth="560px"
        ctaHref="#solicitar-acessorios"
      />
    </main>
  );
}
