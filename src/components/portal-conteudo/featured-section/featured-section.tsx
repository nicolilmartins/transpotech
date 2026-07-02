import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { featuredArticle } from "@/data/articles";

export function FeaturedSection() {
  const article = featuredArticle;

  return (
    <Section className="flex flex-col gap-8">
      <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
        Notícia em destaque
      </p>

      <article className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl bg-neutral-50 lg:grid-cols-2 lg:gap-12">
        <div className="relative h-[260px] w-full lg:h-[420px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 p-6 pt-0 lg:p-10 lg:pl-0">
          <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-600">
            {article.category}
          </p>
          <h2 className="text-h3 font-bold text-neutral-800">{article.title}</h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-neutral-500">
            <span>{article.date}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden className="size-4" />
              {article.readTime}
            </span>
            <span aria-hidden>·</span>
            <span>por {article.author}</span>
          </div>

          {/* Detalhe de artigo ainda não construído — link placeholder */}
          <span className="mt-2 inline-flex items-center gap-1.5 text-body font-semibold text-neutral-800">
            Ler artigo completo
            <ArrowRight aria-hidden className="size-4" />
          </span>
        </div>
      </article>
    </Section>
  );
}
