import type { Metadata } from "next";

import { PortalHeroSection } from "@/components/portal-conteudo/hero-section/hero-section";
import { FeaturedSection } from "@/components/portal-conteudo/featured-section/featured-section";
import { ArticleList } from "@/components/portal-conteudo/article-list/article-list";
import { NewsletterSection } from "@/components/portal-conteudo/newsletter-section/newsletter-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DriftMesh } from "@/components/layout/drift-mesh";

export const metadata: Metadata = {
  title: "Portal de Conteúdo",
  description:
    "Artigos, guias e cases sobre empilhadeiras industriais, manutenção, logística e intralogística. Conteúdo especializado para gestores e decisores B2B.",
  openGraph: {
    title: "Portal de Conteúdo | TranspoTech",
    description:
      "Artigos e guias sobre empilhadeiras, manutenção e intralogística.",
  },
};

export default function PortalConteudoPage() {
  return (
    <main>
      {/* Página inteira num só tom (#f7f6f6) com a malha no fundo, como em
          empilhadeiras novas: DriftMesh animada na região da hero (altura de
          viewport + fade na base, como na hero do Canal da Transparência) e
          HoverMesh reativo ao cursor só no restante da página — onde a malha
          anda sozinha não há malha de hover (top-[100svh] = altura da Drift).
          pt extra → clareira do header. */}
      <div className="relative isolate bg-[#f7f6f6] pb-6 pt-[96px]">
        <DriftMesh
          fade
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh"
        />
        <HoverMesh className="pointer-events-none absolute inset-x-0 bottom-0 top-[100svh] -z-10" />
        <PortalHeroSection />
        <FeaturedSection />
        <ArticleList />
        <NewsletterSection />
      </div>
    </main>
  );
}
