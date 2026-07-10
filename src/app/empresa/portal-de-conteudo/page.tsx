import type { Metadata } from "next";

import { PortalHeroSection } from "@/components/portal-conteudo/hero-section/hero-section";
import { FeaturedSection } from "@/components/portal-conteudo/featured-section/featured-section";
import { ArticleList } from "@/components/portal-conteudo/article-list/article-list";
import { NewsletterSection } from "@/components/portal-conteudo/newsletter-section/newsletter-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { MeshBackground } from "@/components/layout/mesh-background/mesh-background";

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
          empilhadeiras novas: MeshBackground estático visível + HoverMesh
          reativo ao cursor. Um único wrapper alto faz o fade da malha ficar
          suave (topo cheio), igual à referência. pt extra → clareira do header. */}
      <div className="relative isolate bg-[#f7f6f6] pt-[96px]">
        <MeshBackground className="pointer-events-none absolute inset-0 -z-10" />
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <PortalHeroSection />
        <FeaturedSection />
        <ArticleList />
        <NewsletterSection />
      </div>
    </main>
  );
}
