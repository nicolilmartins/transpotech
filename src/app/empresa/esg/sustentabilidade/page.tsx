import type { Metadata } from "next";

import { SustentabilidadeHeroSection } from "@/components/sustentabilidade/hero-section/hero-section";
import { PillarsSection } from "@/components/sustentabilidade/pillars-section/pillars-section";
import { InitiativesSection } from "@/components/sustentabilidade/initiatives-section/initiatives-section";
import { ProjectsSection } from "@/components/sustentabilidade/projects-section/projects-section";
import { SdgSection } from "@/components/sustentabilidade/sdg-section/sdg-section";
import { GovernanceSection } from "@/components/sustentabilidade/governance-section/governance-section";
import { HoverMesh } from "@/components/layout/hover-mesh";

export const metadata: Metadata = {
  title: "Sustentabilidade",
  description:
    "Sustentabilidade, inclusão e responsabilidade na intralogística: pilares ESG, iniciativas apoiadas, ODS da ONU e canais de governança da TranspoTech.",
  openGraph: {
    title: "Sustentabilidade | TranspoTech",
    description:
      "Práticas ESG, projetos apoiados e canais de transparência da TranspoTech.",
  },
};

export default function SustentabilidadePage() {
  return (
    <main>
      <SustentabilidadeHeroSection />

      {/* Grupo claro — demais seções ESG */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <PillarsSection />
        <InitiativesSection />
        <ProjectsSection />
        <SdgSection />
        <GovernanceSection />
      </div>
    </main>
  );
}
