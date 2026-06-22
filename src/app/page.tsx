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
      <ClientsSection />
      <ExperienceSection />
      <SolutionsSection />
      <PortfolioSection />
      <BrandsSection />
      <EsgSection />
      <ServicesSection />
      <AutomationSection />
      <SegmentsSection />
      <TestimonialsSection />
      <WhyUsSection />
      <BlogSection />
      <CtaSection />
    </main>
  );
}
