import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Article } from "@/data/articles";
import { ROUTES } from "@/lib/routes";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`${ROUTES.PORTAL_CONTEUDO}/${article.id}`}
      className="group/card block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      <article className="flex h-full flex-col rounded-xl bg-white p-2 transition duration-300 group-hover/card:scale-[1.02] group-hover/card:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
        {/* Imagem com pequena borda do card ao redor (padding do article + cantos). */}
        <div className="relative h-[196px] w-full overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <span className="text-body-sm font-semibold uppercase tracking-wide text-primary-600">
            {article.category}
          </span>

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

          <span className="mt-1 inline-flex items-center gap-1.5 text-body-sm font-semibold text-neutral-800">
            Ler conteúdo
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover/card:translate-x-1"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
