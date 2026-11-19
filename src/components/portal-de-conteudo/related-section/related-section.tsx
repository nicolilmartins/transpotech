import { IntentLink } from "@/components/ui/intent-link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ArticleCard } from "@/components/layout/article-card/article-card";
import type { Article } from "@/data/articles";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { artigoPage } from "@/sanity/content/pages/artigo";

type RelatedContent = SectionContent<typeof artigoPage.sections.related>;

export function RelatedSection({
  articles,
  content,
}: {
  articles: Article[];
  content: RelatedContent;
}) {
  if (articles.length === 0) return null;

  return (
    <Section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <h2 className="text-h3 font-normal text-neutral-800">
          {content.title}
        </h2>
        <IntentLink
          href={ROUTES.PORTAL_CONTEUDO}
          className="inline-flex shrink-0 items-center gap-1.5 text-body font-semibold text-primary-500 transition-colors hover:text-primary-600"
        >
          {content.linkLabel}
          <ArrowRight aria-hidden className="size-4" />
        </IntentLink>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </Section>
  );
}
