import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/breadcrumb/breadcrumb";
import { ArticleHeader } from "@/components/portal-de-conteudo/article-header/article-header";
import { ArticleCover } from "@/components/portal-de-conteudo/article-cover/article-cover";
import { ArticleBody } from "@/components/portal-de-conteudo/article-body/article-body";
import { ArticleShare } from "@/components/portal-de-conteudo/article-share/article-share";
import { ArticleToc } from "@/components/portal-de-conteudo/article-toc/article-toc";
import { RelatedSection } from "@/components/portal-de-conteudo/related-section/related-section";
import { NewsletterSection } from "@/components/layout/newsletter-section/newsletter-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { DriftMesh } from "@/components/layout/drift-mesh";
import {
  articleSections,
  getArticleSections,
} from "@/components/portal-de-conteudo/article-sections";
import {
  getArticleBySlug,
  getArticleSitemapEntries,
  getRelatedArticles,
} from "@/sanity/queries/articles";
import { getPage } from "@/sanity/queries/pages";
import { artigoPage } from "@/sanity/content/pages/artigo";
import { ROUTES } from "@/lib/routes";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// Artigos publicados no CMS depois do build são gerados na primeira visita
// (dynamicParams padrão); slug inexistente cai no notFound() da página.
export async function generateStaticParams() {
  const entries = await getArticleSitemapEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Conteúdo não encontrado" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${ROUTES.PORTAL_CONTEUDO}/${article.id}` },
    openGraph: {
      ...baseOpenGraph,
      title: `${article.title} | TranspoTech`,
      description: article.excerpt,
    },
  };
}

export default async function ArtigoPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const [related, content] = await Promise.all([
    getRelatedArticles(article, 3),
    getPage(artigoPage),
  ]);
  const sections = article.body
    ? getArticleSections(article.body)
    : articleSections;

  return (
    <main>
      {/* Início — mesmo fundo da página de detalhe de novas: malha animada no
          topo (DriftMesh, como na hero do Canal da Transparência — altura de
          viewport + fade na base), header em modo hero e clareira do header
          flutuante (pt-96). data-header-hero fica só nesta região do topo. */}
      <div
        data-header-hero
        className="relative isolate bg-background pt-[96px]"
      >
        <DriftMesh
          fade
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh"
        />

        <Section className="flex flex-col gap-8">
          <Breadcrumb
            items={[
              {
                label: content.header.breadcrumbLabel,
                href: ROUTES.PORTAL_CONTEUDO,
              },
              { label: article.title },
            ]}
          />
          <ArticleHeader
            article={article}
            authorPrefix={content.header.authorPrefix}
          />
          {/* Mais espaço entre o título/descrição e a imagem de capa */}
          <div className="mt-4 lg:mt-8">
            <ArticleCover article={article} />
          </div>
        </Section>
      </div>

      {/* Corpo do artigo — texto à esquerda, aside (compartilhar + sumário) à direita */}
      <div className="bg-background">
        <Section className="flex flex-col gap-10 pt-2 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-4">
          <ArticleBody article={article} sections={sections} />

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:w-[300px] lg:shrink-0">
            {/* Caixinha de compartilhar */}
            <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 p-4">
              <span className="text-body font-semibold text-neutral-800">
                {content.aside.shareLabel}
              </span>
              <ArticleShare
                title={article.title}
                path={`${ROUTES.PORTAL_CONTEUDO}/${article.id}`}
              />
            </div>

            {/* Sumário com os tópicos em link */}
            {sections.length > 0 && (
              <ArticleToc sections={sections} title={content.aside.tocTitle} />
            )}
          </aside>
        </Section>
      </div>

      {/* Relacionados + Newsletter — mesmo tom do portal de conteúdo (neutral-50) */}
      <div className="bg-neutral-50">
        <RelatedSection articles={related} content={content.related} />
        <NewsletterSection />
      </div>

      <CtaSection
        {...content.cta}
        titleBreak
        ctaHref={ROUTES.CONTATO}
        secondaryHref={ROUTES.SERVICOS}
      />
    </main>
  );
}
