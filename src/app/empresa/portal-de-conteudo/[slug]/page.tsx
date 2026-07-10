import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/breadcrumb/breadcrumb";
import { ArticleHeader } from "@/components/article/article-header/article-header";
import { ArticleCover } from "@/components/article/article-cover/article-cover";
import { ArticleBody } from "@/components/article/article-body/article-body";
import { RelatedSection } from "@/components/article/related-section/related-section";
import { NewsletterSection } from "@/components/portal-conteudo/newsletter-section/newsletter-section";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { MeshBackground } from "@/components/layout/mesh-background/mesh-background";
import {
  articles,
  getArticleById,
  getRelatedArticles,
} from "@/data/articles";
import { ROUTES } from "@/lib/routes";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// Conjunto fixo de artigos: slugs fora de generateStaticParams retornam 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleById(slug);

  if (!article) {
    return { title: "Conteúdo não encontrado" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${ROUTES.PORTAL_CONTEUDO}/${article.id}` },
    openGraph: {
      title: `${article.title} | TranspoTech`,
      description: article.excerpt,
    },
  };
}

export default async function ArtigoPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleById(slug);

  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return (
    <main>
      {/* Início — mesmo fundo da página de detalhe de novas: malha visível no
          topo (MeshBackground), header em modo hero e clareira do header
          flutuante (pt-96). data-header-hero fica só nesta região do topo. */}
      <div
        data-header-hero
        className="relative isolate bg-[#fdfdfd] pt-[96px]"
      >
        <MeshBackground className="pointer-events-none absolute inset-0 -z-10" />

        <Section className="flex flex-col gap-8">
          <Breadcrumb
            items={[
              { label: "Portal de Conteúdo", href: ROUTES.PORTAL_CONTEUDO },
              { label: article.title },
            ]}
          />
          <ArticleHeader article={article} />
          {/* Mais espaço entre o título/descrição e a imagem de capa */}
          <div className="mt-4 lg:mt-8">
            <ArticleCover article={article} />
          </div>
        </Section>
      </div>

      {/* Corpo do artigo */}
      <div className="bg-[#fdfdfd]">
        <Section className="pt-2 lg:pt-4">
          <ArticleBody article={article} />
        </Section>
      </div>

      {/* Newsletter + Relacionados — mesmo tom do portal de conteúdo (#f7f6f6) */}
      <div className="bg-[#f7f6f6]">
        <NewsletterSection showGlow={false} />
        <RelatedSection articles={related} />
      </div>

      <CtaSection
        titleRegular="Pronto pra evoluir "
        titleAccent="sua operação?"
        titleBreak
        description="Locação, compra, manutenção, acessórios e automação em um só parceiro: a TranspoTech mantém sua operação disponível, previsível e pronta para crescer."
        ctaLabel="Falar com especialista"
        ctaHref={ROUTES.CONTATO}
        secondaryLabel="Ver soluções"
        secondaryHref={ROUTES.SERVICOS}
      />
    </main>
  );
}
