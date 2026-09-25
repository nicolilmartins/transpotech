import Image from "next/image";
import { IntentLink } from "@/components/ui/intent-link";
import type { Article } from "@/data/articles";
import { ROUTES } from "@/lib/routes";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <IntentLink
      href={`${ROUTES.PORTAL_CONTEUDO}/${article.id}`}
      className="group/card block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      {/* Transição só em scale/box-shadow (o hover): o ScrollReveal anima
          opacity e transform do card por GSAP, e com `transition` genérico cada
          quadro do GSAP abria e cancelava uma transição CSS. */}
      <article className="flex h-full flex-col rounded-xl bg-white p-2 transition-[scale,box-shadow] duration-300 group-hover/card:scale-[1.02] group-hover/card:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
        {/* Imagem com pequena borda do card ao redor (padding do article + cantos). */}
        <div className="relative h-[196px] w-full overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            // Largura do card menos o p-2, nas grades de 1/2/3 colunas do
            // Portal (Section: px-5/px-6/px-16, max 1440px; gap 16–24px).
            sizes="(min-width: 1440px) 405px, (min-width: 1024px) calc(33.33vw - 75px), (min-width: 640px) calc(50vw - 48px), calc(100vw - 56px)"
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <span className="text-body font-semibold uppercase tracking-wide text-primary-600">
            {article.category}
          </span>

          <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
            {article.title}
          </h3>
          <p className="flex-1 text-body leading-[1.35] text-neutral-600">
            {article.excerpt}
          </p>

          {/* Linha fina divisória acima da data */}
          <div className="border-t border-neutral-200" />
          <span className="text-body text-neutral-500">{article.date}</span>
        </div>
      </article>
    </IntentLink>
  );
}
