import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { Article } from "@/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-neutral-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.14)]">
      <div className="relative h-[200px] w-full bg-neutral-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-body-sm font-semibold uppercase tracking-wide text-primary-600">
            {article.category}
          </span>
          <span className="rounded-full bg-neutral-100 px-3 py-0.5 text-body-sm text-neutral-600">
            {article.type}
          </span>
        </div>

        <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
          {article.title}
        </h3>
        <p className="flex-1 text-body-sm leading-[1.35] text-neutral-600">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between gap-3 text-body-sm text-neutral-500">
          <span>{article.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden className="size-4" />
            {article.readTime}
          </span>
        </div>

        {/* Detalhe de artigo ainda não construído — link placeholder */}
        <span className="mt-1 inline-flex items-center gap-1.5 text-body-sm font-semibold text-neutral-800">
          Ler conteúdo
          <ArrowRight aria-hidden className="size-4" />
        </span>
      </div>
    </article>
  );
}
