import { Clock } from "lucide-react";
import type { Article } from "@/data/articles";
import { formatLongDate } from "@/data/articles";
import { ArticleShare } from "../article-share/article-share";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="flex flex-col gap-4">
      <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
        {article.category}
      </p>
      <h1 className="max-w-[540px] text-h2 font-bold text-neutral-800">
        {article.title}
      </h1>
      <p className="max-w-[720px] text-h6 font-normal leading-[1.35] text-neutral-600">
        {article.excerpt}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-neutral-500">
          <span>{formatLongDate(article.dateISO)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden className="size-4" />
            {article.readTime}
          </span>
          <span aria-hidden>·</span>
          <span>por {article.author}</span>
        </div>
        <ArticleShare title={article.title} />
      </div>
    </header>
  );
}
