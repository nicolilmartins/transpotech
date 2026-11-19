import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { PortalHeroSection } from "@/components/portal-de-conteudo/hero-section/hero-section";
import { FeaturedSection } from "@/components/portal-de-conteudo/featured-section/featured-section";
import { ArticleList } from "@/components/portal-de-conteudo/article-list/article-list";
import { NewsletterSection } from "@/components/layout/newsletter-section/newsletter-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DriftMesh } from "@/components/layout/drift-mesh";
import { getArticles } from "@/sanity/queries/articles";
import { getPage } from "@/sanity/queries/pages";
import { portalConteudoPage } from "@/sanity/content/pages/portal-conteudo";

export const metadata: Metadata = {
  title: "Portal de Conteúdo",
  description:
    "Artigos, guias e cases sobre empilhadeiras industriais, manutenção, logística e intralogística. Conteúdo especializado para gestores e decisores B2B.",
  openGraph: {
    ...baseOpenGraph,
    title: "Portal de Conteúdo | TranspoTech",
    description:
      "Artigos e guias sobre empilhadeiras, manutenção e intralogística.",
  },
};

export default async function PortalConteudoPage() {
  const [articles, content] = await Promise.all([
    getArticles(),
    getPage(portalConteudoPage),
  ]);
  const [featured] = articles;

  return (
    <main>
      {/* Página inteira num só tom (neutral-50) com a malha no fundo, como em
          empilhadeiras novas: DriftMesh animada na região da hero (altura de
          viewport + fade na base, como na hero do Canal da Transparência) e
          HoverMesh reativo ao cursor só no restante da página — onde a malha
          anda sozinha não há malha de hover (top-[100svh] = altura da Drift).
          pt extra → clareira do header. */}
      <div className="relative isolate bg-neutral-50 pb-6 pt-[96px]">
        <DriftMesh
          fade
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh"
        />
        <HoverMesh className="pointer-events-none absolute inset-x-0 bottom-0 top-[100svh] -z-10" />
        <PortalHeroSection content={content.hero} />
        {featured && (
          <FeaturedSection article={featured} content={content.featured} />
        )}
        <ArticleList articles={articles} content={content.articleList} />
        <NewsletterSection />
      </div>
    </main>
  );
}
