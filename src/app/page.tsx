import type { Metadata } from "next";

import { HeroSection } from "@/components/home/hero-section/hero-section";
import { ClientsSection } from "@/components/home/clients-section/clients-section";
import { ExperienceSection } from "@/components/home/experience-section/experience-section";
import { SolutionsSection } from "@/components/home/solutions-section/solutions-section";
import { PortfolioSection } from "@/components/home/portfolio-section/portfolio-section";
import { BrandsSection } from "@/components/home/brands-section/brands-section";
import { EsgSection } from "@/components/home/esg-section/esg-section";
import { ServicesSection } from "@/components/home/services-section/services-section";
import { AutomationSection } from "@/components/home/automation-section/automation-section";
import { SegmentsSection } from "@/components/home/segments-section/segments-section";
import { TestimonialsSection } from "@/components/home/testimonials-section/testimonials-section";
import { WhyUsSection } from "@/components/home/why-us-section/why-us-section";
import { BlogSection } from "@/components/home/blog-section/blog-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { HoverMesh } from "@/components/layout/hover-mesh";

export const metadata: Metadata = {
  title: "TranspoTech | Empilhadeiras, Locação e Manutenção",
  description:
    "Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota funcionando, custo previsível e atendimento técnico 24h — tudo em um único parceiro.",
  openGraph: {
    title: "TranspoTech | Empilhadeiras, Locação e Manutenção",
    description:
      "Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota funcionando, custo previsível e atendimento técnico 24h.",
    images: ["/og/home.jpg"],
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* Grupo claro 1 — Clients + Experiência. Malha livre cobrindo todo o
          fundo (sem silhueta): o hover revela a malha em qualquer área. */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ClientsSection />
        <ExperienceSection />
      </div>
      {/* Bloco dark 1 — fundo #181616 + ambiência (blurs que andam no scroll) */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <SolutionsSection />
        <PortfolioSection />
        <BrandsSection />
      </div>
      {/* Grupo claro 2 — ESG + Serviços + Automação + Segmentos */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <EsgSection />
        <ServicesSection />
        <AutomationSection />
        <SegmentsSection />
      </div>
      {/* Bloco dark 2 — fundo #181616 + ambiência (blurs que andam no scroll) */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <TestimonialsSection />
        <WhyUsSection />
      </div>
      {/* Grupo claro 3 — Blog */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <BlogSection />
      </div>
      <CtaSection />
    </main>
  );
}
