import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { SustentabilidadeHeroSection } from "@/components/sustentabilidade/hero-section/hero-section";
import { PillarsSection } from "@/components/sustentabilidade/pillars-section/pillars-section";
import { InitiativesSection } from "@/components/sustentabilidade/initiatives-section/initiatives-section";
import { ProjectsSection } from "@/components/sustentabilidade/projects-section/projects-section";
import { SdgSection } from "@/components/sustentabilidade/sdg-section/sdg-section";
import { GovernanceSection } from "@/components/sustentabilidade/governance-section/governance-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { getEsgProjects } from "@/sanity/queries/esg-projects";
import { getPage } from "@/sanity/queries/pages";
import { sustentabilidadePage } from "@/sanity/content/pages/sustentabilidade";

export const metadata: Metadata = {
  title: "Sustentabilidade",
  description:
    "Sustentabilidade, inclusão e responsabilidade na intralogística: pilares ESG, iniciativas apoiadas, ODS da ONU e canais de governança da TranspoTech.",
  openGraph: {
    ...baseOpenGraph,
    title: "Sustentabilidade | TranspoTech",
    description:
      "Práticas ESG, projetos apoiados e canais de transparência da TranspoTech.",
  },
};

export default async function SustentabilidadePage() {
  const [projects, content] = await Promise.all([
    getEsgProjects(),
    getPage(sustentabilidadePage),
  ]);

  return (
    <main>
      <SustentabilidadeHeroSection content={content.hero} />

      {/* Grupo claro — demais seções ESG */}
      <div className="relative isolate bg-background pb-6">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <PillarsSection content={content.pillars} />
        <InitiativesSection content={content.initiatives} />
        <ProjectsSection projects={projects} content={content.projects} />
        <SdgSection content={content.sdg} />
        <GovernanceSection content={content.governance} />
      </div>
    </main>
  );
}
