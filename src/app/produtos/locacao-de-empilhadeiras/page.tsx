import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { LocacaoHeroSection } from "@/components/locacao-de-empilhadeiras/hero-section/hero-section";
import { LeadFormSection } from "@/components/layout/lead-form-section/lead-form-section";
import { FleetTechSection } from "@/components/locacao-de-empilhadeiras/fleet-tech-section/fleet-tech-section";
import { ForkliftTypesSection } from "@/components/locacao-de-empilhadeiras/forklift-types-section/forklift-types-section";
import { ElectricFleetSection } from "@/components/locacao-de-empilhadeiras/electric-fleet-section/electric-fleet-section";
import { PlansSection } from "@/components/locacao-de-empilhadeiras/plans-section/plans-section";
import { ProcessSection } from "@/components/locacao-de-empilhadeiras/process-section/process-section";
import { StructureSection } from "@/components/locacao-de-empilhadeiras/structure-section/structure-section";
import { SegmentsSection } from "@/components/locacao-de-empilhadeiras/segments-section/segments-section";
import { RentVsBuySection } from "@/components/locacao-de-empilhadeiras/rent-vs-buy-section/rent-vs-buy-section";
import { FleetManagerSection } from "@/components/locacao-de-empilhadeiras/fleet-manager-section/fleet-manager-section";
import { CompareSection } from "@/components/layout/compare-section/compare-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { getFaqItems } from "@/sanity/queries/faq";
import { getPage } from "@/sanity/queries/pages";
import { locacaoPage } from "@/sanity/content/pages/locacao";
import { BrandsSection } from "@/components/layout/brands-section/brands-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { HoverMesh } from "@/components/layout/hover-mesh";
import still from "@/assets/Logos/Logo still.svg";
import linde from "@/assets/Logos/Logo Linde.svg";
import baoli from "@/assets/Logos/Logo Baoli.svg";

export const metadata: Metadata = {
  title: "Locação de Empilhadeiras",
  description:
    "Locação de empilhadeiras industriais com manutenção preventiva incluída. STILL, Linde e Baoli. Atendimento em todo o Brasil com 11 unidades próprias.",
  openGraph: {
    ...baseOpenGraph,
    title: "Locação de Empilhadeiras | TranspoTech",
    description:
      "Locação de empilhadeiras industriais com manutenção preventiva incluída. STILL, Linde e Baoli.",
  },
};

const dealerBrands = [
  { src: still, alt: "STILL" },
  { src: linde, alt: "Linde" },
  { src: baoli, alt: "Baoli" },
];

export default async function LocacaoPage() {
  const [faqItems, content] = await Promise.all([
    getFaqItems("empilhadeiras"),
    getPage(locacaoPage),
  ]);

  return (
    <main>
      <LocacaoHeroSection content={content.hero} />

      {/* Grupo claro 1 — Marcas (Dealer oficial) + Captação + Frota & Tecnologia.
          Uma única malha cobre tudo, sem cortes. */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <BrandsSection
          tone="light"
          eyebrow={content.brands.eyebrow}
          brands={dealerBrands}
        />
        <LeadFormSection
          id="solicitar-locacao"
          {...content.leadForm}
          withRentalPeriod
        />
        <FleetTechSection content={content.fleetTech} />
        <CompareSection />
        <ElectricFleetSection content={content.electricFleet} />
        <ForkliftTypesSection content={content.forkliftTypes} />
      </div>

      {/* Bloco dark 1 — Planos */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient greenOffset={520} />
        <PlansSection content={content.plans} />
      </div>

      {/* Grupo claro 2 — Processo */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ProcessSection content={content.process} />
      </div>

      {/* Bloco dark 2 — Estrutura + Segmentos */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <StructureSection content={content.structure} />
        <SegmentsSection content={content.segments} />
      </div>

      {/* Grupo claro 3 — Locar vs. comprar + FleetManager + FAQ. Uma única
          malha cobre as duas primeiras seções, sem cortes; o FAQ fica de fora. */}
      <div className="relative isolate bg-background">
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <RentVsBuySection content={content.rentVsBuy} />
          <FleetManagerSection content={content.fleetManager} />
        </div>
        <FaqSection {...content.faq} items={faqItems} />
      </div>

      <CtaSection {...content.cta} ctaHref="#solicitar-locacao" />
    </main>
  );
}
