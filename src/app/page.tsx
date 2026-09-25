import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { HeroSection } from "@/components/home/hero-section/hero-section";
import { ExperienceSection } from "@/components/home/experience-section/experience-section";
import { SolutionsSection } from "@/components/home/solutions-section/solutions-section";
import { PortfolioSection } from "@/components/home/portfolio-section/portfolio-section";
import { BrandsSection } from "@/components/layout/brands-section/brands-section";
import { EsgSection } from "@/components/home/esg-section/esg-section";
import { ServicesSection } from "@/components/home/services-section/services-section";
import { AutomationSection } from "@/components/home/automation-section/automation-section";
import { SegmentsSection } from "@/components/home/segments-section/segments-section";
import { TestimonialsSection } from "@/components/home/testimonials-section/testimonials-section";
import { WhyUsSection } from "@/components/home/why-us-section/why-us-section";
import { BlogSection } from "@/components/home/blog-section/blog-section";
import { CompareSection } from "@/components/layout/compare-section/compare-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { ROUTES } from "@/lib/routes";
import { getHomeArticles } from "@/sanity/queries/articles";
import { getPage } from "@/sanity/queries/pages";
import { homePage } from "@/sanity/content/pages/home";

export const metadata: Metadata = {
  title: "TranspoTech | Empilhadeiras, Locação e Manutenção",
  description:
    "Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota funcionando, custo previsível e atendimento técnico 24h, tudo em um único parceiro.",
  openGraph: {
    ...baseOpenGraph,
    title: "TranspoTech | Empilhadeiras, Locação e Manutenção",
    description:
      "Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota funcionando, custo previsível e atendimento técnico 24h.",
    images: ["/og/home.jpg"],
  },
};

export default async function HomePage() {
  const [articles, content] = await Promise.all([
    getHomeArticles(),
    getPage(homePage),
  ]);

  return (
    <main>
      <HeroSection content={content.hero} />
      {/* Grupo claro 1 — Experiência. Malha livre cobrindo todo o fundo (sem
          silhueta): o hover revela a malha em qualquer área. */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ExperienceSection content={content.experience} />
      </div>
      {/* Bloco dark 1 — fundo neutral-900 + ambiência (blurs que andam no scroll) */}
      <div className="relative isolate bg-neutral-900">
        <DarkAmbient />
        <SolutionsSection content={content.solutions} />
        <PortfolioSection content={content.portfolio} />
        <BrandsSection {...content.brands} />
      </div>
      {/* Grupo claro 2 — Comparativo + ESG + Serviços + Automação + Segmentos */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <CompareSection
          ctaLabel={content.compare.ctaLabel}
          ctaHref={ROUTES.SIMULADOR}
        />
        <EsgSection content={content.esg} />
        <ServicesSection content={content.services} />
        <AutomationSection content={content.automation} />
        <SegmentsSection content={content.segments} />
      </div>
      {/* Bloco dark 2 — fundo neutral-900 + ambiência (blurs que andam no scroll) */}
      <div className="relative isolate bg-neutral-900">
        <DarkAmbient />
        <TestimonialsSection content={content.testimonials} />
        <WhyUsSection content={content.whyUs} />
      </div>
      {/* Grupo claro 3 — Blog (fundo neutral-50, branco mais escuro) */}
      <div className="relative isolate bg-neutral-50">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <BlogSection content={content.blog} articles={articles} />
      </div>
      <CtaSection {...content.cta} />
    </main>
  );
}
