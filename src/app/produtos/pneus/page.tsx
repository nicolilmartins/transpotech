import type { Metadata } from "next";

import { PneusHeroSection } from "@/components/pneus/hero-section/hero-section";
import { CategoriesSection } from "@/components/pneus/categories-section/categories-section";
import { ConsiderSection } from "@/components/pneus/consider-section/consider-section";
import { QuotationStepsSection } from "@/components/pneus/quotation-steps-section/quotation-steps-section";
import { WhyTranspotechSection } from "@/components/pneus/why-transpotech-section/why-transpotech-section";
import { BrandsSection } from "@/components/home/brands-section/brands-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqPneus } from "@/data/faq-pneus";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { ROUTES } from "@/lib/routes";
import michelin from "@/assets/Logos/logo-michelin.webp";
import camso from "@/assets/Logos/logo-camso.webp";

export const metadata: Metadata = {
  title: "Pneus para Empilhadeiras",
  description:
    "Pneus para empilhadeiras industriais. Sólidos, pneumáticos e de poliuretano para todas as marcas e modelos. Fornecimento e instalação.",
  openGraph: {
    title: "Pneus para Empilhadeiras | TranspoTech",
    description:
      "Pneus sólidos, pneumáticos e de poliuretano para empilhadeiras.",
  },
};

const partnerBrands = [
  { src: michelin, alt: "Michelin", mono: false },
  { src: camso, alt: "Camso", mono: false, className: "scale-[0.85]" },
];

export default function PneusPage() {
  return (
    <main>
      <PneusHeroSection />

      {/* Marcas parceiras */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <BrandsSection
          tone="light"
          eyebrow="Marcas parceiras"
          brands={partnerBrands}
        />
      </div>

      {/* Grupo claro 1 — Categorias */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <CategoriesSection />
      </div>

      {/* Bloco dark — O que considerar + Como funciona a cotação */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <ConsiderSection />
        <QuotationStepsSection />
      </div>

      {/* Grupo claro 2 — Por que TranspoTech */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <WhyTranspotechSection />
      </div>


      {/* Grupo claro 3 — FAQ (sem malha) */}
      <div className="bg-[#fdfdfd]">
        <FaqSection
          titleRegular="Dúvidas frequentes sobre "
          titleAccent="pneus"
          items={faqPneus}
        />
      </div>

      <CtaSection
        titleRegular="Precisa trocar ou cotar pneus para "
        titleAccent="sua operação?"
        description="Fale com a TranspoTech, envie os dados do equipamento e receba orientação para solicitar a cotação correta."
        ctaLabel="Solicitar cotação de pneus"
        ctaHref={ROUTES.ORCAMENTO}
      />
    </main>
  );
}
