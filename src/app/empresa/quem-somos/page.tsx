import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { QuemSomosHeroSection } from "@/components/quem-somos/hero-section/hero-section";
import { StatsSection } from "@/components/quem-somos/stats-section/stats-section";
import { UnitsGallerySection } from "@/components/quem-somos/units-gallery-section/units-gallery-section";
import { AboutSection } from "@/components/quem-somos/about-section/about-section";
import { StructureSection } from "@/components/quem-somos/structure-section/structure-section";
import { HistorySection } from "@/components/quem-somos/history-section/history-section";
import { CultureSection } from "@/components/quem-somos/culture-section/culture-section";
import { CareersSection } from "@/components/quem-somos/careers-section/careers-section";
import { EsgGovernanceSection } from "@/components/quem-somos/esg-section/esg-section";
import { WhyChooseSection } from "@/components/quem-somos/why-choose-section/why-choose-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { ROUTES } from "@/lib/routes";
import { getSiteSettings } from "@/sanity/queries/site-settings";
import { getUnits } from "@/sanity/queries/units";
import { getPage } from "@/sanity/queries/pages";
import { quemSomosPage } from "@/sanity/content/pages/quem-somos";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a TranspoTech: desde 2001 em soluções de intralogística, com +760 colaboradores, unidades em várias regiões e distribuição autorizada Linde, STILL e Baoli.",
  openGraph: {
    ...baseOpenGraph,
    title: "Quem Somos | TranspoTech",
    description:
      "Soluções em intralogística para manter operações em movimento. Estrutura, história, cultura e ESG da TranspoTech.",
  },
};

export default async function QuemSomosPage() {
  const [settings, units, content] = await Promise.all([
    getSiteSettings(),
    getUnits(),
    getPage(quemSomosPage),
  ]);

  return (
    <main>
      {/* Hero com foto (padrão dos produtos/serviços) */}
      <QuemSomosHeroSection content={content.hero} />

      {/* Grupo claro — números da estrutura */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <StatsSection content={content.stats} />
      </div>

      {/* Abrangência nacional (mapa) logo após os números — bloco dark
          próprio, com o mesmo fundo/ambient das demais dark sections. */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <StructureSection content={content.structure} />
      </div>

      {/* Grupo claro — galeria das unidades */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <UnitsGallerySection units={units} content={content.units} />
      </div>

      {/* Bloco dark contínuo — institucional e história. Um só DarkAmbient
          para os blurs laranja/verde percorrerem as seções de forma contínua
          (mesmo padrão das dark sections das outras páginas). */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <AboutSection content={content.about} />
        <HistorySection content={content.history} />
      </div>

      {/* Grupo claro — cultura, carreiras, ESG e por que escolher */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <CultureSection content={content.culture} />
        <CareersSection
          careersUrl={settings.careersUrl}
          content={content.careers}
        />
        <EsgGovernanceSection content={content.esg} />
        <WhyChooseSection content={content.whyChoose} />
      </div>

      <CtaSection
        {...content.cta}
        ctaHref={ROUTES.CONTATO}
        secondaryHref={`${ROUTES.CONTATO}#solicitacao`}
      />
    </main>
  );
}
