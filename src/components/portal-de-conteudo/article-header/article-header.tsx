import { Clock } from "lucide-react";
import type { Article } from "@/data/articles";
import { formatLongDate } from "@/data/articles";

export function ArticleHeader({
  article,
  authorPrefix,
}: {
  article: Article;
  authorPrefix: string;
}) {
  return (
    <header className="flex flex-col gap-4">
      <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
        {article.category}
      </p>
      <h1 className="max-w-[860px] text-h2 font-bold text-neutral-800">
        {article.title}
      </h1>
      <p className="max-w-[820px] text-h6 font-normal leading-[1.35] text-neutral-600">
        {article.excerpt}
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body text-neutral-500">
        <span>{formatLongDate(article.dateISO)}</span>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock aria-hidden className="size-4" />
          {article.readTime}
        </span>
        <span aria-hidden>·</span>
        <span>
          {authorPrefix} {article.author}
        </span>
      </div>
    </header>
  );
}
