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
import { faqAcessorios } from "@/data/faq-acessorios";
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

export default function AcessoriosPage() {
  return (
    <main>
      <AcessoriosHeroSection />

      {/* Grupo claro 1 — Marcas (logo após a hero) + Desafios de uma frota
          sem controle */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <BrandsSection
          tone="light"
          eyebrow="Soluções para empilhadeiras STILL, Linde, Baoli e outras marcas"
          brands={compatibleBrands}
        />
        <ChallengesSection />
      </div>

      {/* Bloco dark — Níveis de solução + Comparativo + KION ADAS, com o
          blur do DarkAmbient compartilhado para o fundo ficar contínuo */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <SolutionsSection />
        <ComparisonSection />
        <AdasSection />
      </div>

      {/* Grupo claro 2 — Acessórios de prateleira */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ShelfAccessoriesSection />
      </div>

      {/* Grupo claro 3 — Captação + FAQ */}
      <div className="relative isolate bg-[#fdfdfd]">
        <LeadFormSection
          id="solicitar-acessorios"
          titleTop="Encontre a solução"
          titleBottom="ideal para a sua frota"
          description="Conte quantas máquinas tem a sua frota e o que você precisa controlar. A TranspoTech indica a solução e apresenta a proposta."
          messagePlaceholder="Tamanho da frota, marcas e modelos, turnos e o que você quer controlar (acesso, impactos, check list, pedestres)."
          submitLabel="Solicitar avaliação"
        />
        <FaqSection
          titleRegular="Dúvidas frequentes sobre "
          titleAccent="acessórios e telemetria"
          items={faqAcessorios}
        />
      </div>

      <CtaSection
        titleRegular="Quer mais controle sobre a "
        titleAccent="sua frota?"
        description="Fale com a TranspoTech e descubra qual combinação de telemetria, check list e acessórios de segurança faz sentido para a sua operação."
        descriptionWidth="560px"
        ctaLabel="Falar com especialista"
        ctaHref="#solicitar-acessorios"
      />
    </main>
  );
}
