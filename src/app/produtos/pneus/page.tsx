import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { PneusHeroSection } from "@/components/pneus/hero-section/hero-section";
import { LeadFormSection } from "@/components/layout/lead-form-section/lead-form-section";
import { CategoriesSection } from "@/components/pneus/categories-section/categories-section";
import { ConsiderSection } from "@/components/pneus/consider-section/consider-section";
import { QuotationStepsSection } from "@/components/pneus/quotation-steps-section/quotation-steps-section";
import { WhyTranspotechSection } from "@/components/pneus/why-transpotech-section/why-transpotech-section";
import { BrandsSection } from "@/components/layout/brands-section/brands-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { getFaqItems } from "@/sanity/queries/faq";
import { getPage } from "@/sanity/queries/pages";
import { pneusPage } from "@/sanity/content/pages/pneus";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import michelin from "@/assets/Logos/logo-michelin.webp";
import trelleborg from "@/assets/Logos/logo trelleborg.webp";
import continental from "@/assets/Logos/Logo Continental.webp";

export const metadata: Metadata = {
  title: "Pneus para Empilhadeiras",
  description:
    "Pneus para empilhadeiras industriais. Sólidos, pneumáticos e de poliuretano para todas as marcas e modelos. Fornecimento e instalação.",
  openGraph: {
    ...baseOpenGraph,
    title: "Pneus para Empilhadeiras | TranspoTech",
    description:
      "Pneus sólidos, pneumáticos e de poliuretano para empilhadeiras.",
  },
};

const partnerBrands = [
  { src: michelin, alt: "Michelin", mono: false },
  {
    // Lettering muito largo (5.5:1): o max-h recalcula a largura pela
    // proporção e evita que o logo domine a linha ao lado dos demais.
    src: continental,
    alt: "Continental",
    mono: false,
    className: "max-h-[22px] sm:max-h-[26px] lg:max-h-[44px]",
  },
  { src: trelleborg, alt: "Trelleborg", mono: false },
];

export default async function PneusPage() {
  const [faqItems, content] = await Promise.all([
    getFaqItems("pneus"),
    getPage(pneusPage),
  ]);

  return (
    <main>
      <PneusHeroSection content={content.hero} />

      {/* Grupo claro — Marcas parceiras + Captação. Malha única, sem cortes. */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <BrandsSection
          tone="light"
          eyebrow={content.brands.eyebrow}
          brands={partnerBrands}
        />
        <LeadFormSection
          id="solicitar-pneus"
          {...content.leadForm}
        />
      </div>

      {/* Grupo claro 1 — Categorias */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <CategoriesSection content={content.categories} />
      </div>

      {/* Bloco dark — O que considerar + Como funciona a cotação */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <ConsiderSection content={content.consider} />
        <QuotationStepsSection content={content.quotationSteps} />
      </div>

      {/* Grupo claro 2 — Por que TranspoTech */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <WhyTranspotechSection content={content.whyTranspotech} />
      </div>


      {/* Grupo claro 3 — FAQ (sem malha) */}
      <div className="bg-background">
        <FaqSection
          {...content.faq}
          items={faqItems}
        />
      </div>

      <CtaSection
        {...content.cta}
        ctaHref="#solicitar-pneus"
      />
    </main>
  );
}
