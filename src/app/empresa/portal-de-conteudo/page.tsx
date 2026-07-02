import type { Metadata } from "next";

import { PortalHeroSection } from "@/components/portal-conteudo/hero-section/hero-section";
import { FeaturedSection } from "@/components/portal-conteudo/featured-section/featured-section";
import { ArticleList } from "@/components/portal-conteudo/article-list/article-list";
import { NewsletterSection } from "@/components/portal-conteudo/newsletter-section/newsletter-section";
import { HoverMesh } from "@/components/layout/hover-mesh";

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
      <PortalHeroSection />

      {/* Grupo claro — Destaque + Listagem + Newsletter */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <FeaturedSection />
        <ArticleList />
        <NewsletterSection />
      </div>
    </main>
  );
}
