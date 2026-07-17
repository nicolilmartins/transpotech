import type { Metadata } from "next";

import { LocacaoHeroSection } from "@/components/locacao-de-empilhadeiras/hero-section/hero-section";
import { FleetTechSection } from "@/components/locacao-de-empilhadeiras/fleet-tech-section/fleet-tech-section";
import { ForkliftTypesSection } from "@/components/locacao-de-empilhadeiras/forklift-types-section/forklift-types-section";
import { ElectricFleetSection } from "@/components/locacao-de-empilhadeiras/electric-fleet-section/electric-fleet-section";
import { PlansSection } from "@/components/locacao-de-empilhadeiras/plans-section/plans-section";
import { ProcessSection } from "@/components/locacao-de-empilhadeiras/process-section/process-section";
import { StructureSection } from "@/components/locacao-de-empilhadeiras/structure-section/structure-section";
import { SegmentsSection } from "@/components/locacao-de-empilhadeiras/segments-section/segments-section";
import { RentVsBuySection } from "@/components/locacao-de-empilhadeiras/rent-vs-buy-section/rent-vs-buy-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqEmpilhadeiras } from "@/data/faq-empilhadeiras";
import { BrandsSection } from "@/components/home/brands-section/brands-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { ROUTES } from "@/lib/routes";
import still from "@/assets/Logos/Logo still.svg";
import linde from "@/assets/Logos/Logo Linde.svg";
import baoli from "@/assets/Logos/Logo Baoli.svg";

export const metadata: Metadata = {
  title: "Locação de Empilhadeiras",
  description:
    "Locação de empilhadeiras industriais com manutenção preventiva incluída. STILL, Linde e Baoli. Atendimento em todo o Brasil com 11 unidades próprias.",
  openGraph: {
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

export default function LocacaoPage() {
  return (
    <main>
      <LocacaoHeroSection />

      {/* Grupo claro 1 — Marcas + Frota & Tecnologia + Tipos de empilhadeira */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <BrandsSection tone="light" eyebrow="Dealer oficial" brands={dealerBrands} />
        <FleetTechSection />
        <ElectricFleetSection />
        <ForkliftTypesSection />
      </div>

      {/* Bloco dark 1 — Planos */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient greenOffset={520} />
        <PlansSection />
      </div>

      {/* Grupo claro 2 — Processo */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ProcessSection />
      </div>

      {/* Bloco dark 2 — Estrutura + Segmentos */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <StructureSection />
        <SegmentsSection />
      </div>

      {/* Grupo claro 3 — Locar vs. comprar + FAQ (malha só no Locar vs. comprar) */}
      <div className="relative isolate bg-[#fdfdfd]">
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <RentVsBuySection />
        </div>
        <FaqSection
          titleRegular="Perguntas frequentes sobre "
          titleAccent="locação de empilhadeiras"
          items={faqEmpilhadeiras}
        />
      </div>

      <CtaSection
        // Espaço não-quebrável entre "suporte" e "e" para o "e" não ficar órfão
        // no início de linha no mobile (fica "suporte e" / "previsibilidade?").
        titleRegular={"Sua operação precisa de disponibilidade, suporte e "}
        titleAccent="previsibilidade?"
        description="Fale com a TranspoTech e receba uma recomendação de locação conforme as necessidades da sua operação."
        ctaLabel="Falar com especialista"
        ctaHref={ROUTES.ORCAMENTO}
      />
    </main>
  );
}
