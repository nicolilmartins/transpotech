import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import type { Article } from "@/data/articles";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { portalConteudoPage } from "@/sanity/content/pages/portal-conteudo";

type FeaturedContent = SectionContent<typeof portalConteudoPage.sections.featured>;

export function FeaturedSection({
  article,
  content,
}: {
  article: Article;
  content: FeaturedContent;
}) {
  return (
    <Section className="flex flex-col pt-0">
      {/* Linha divisória fina — mesmo tom dos filtros do catálogo. 20px acima
          (padding inferior da hero) e 48px abaixo até a tag da notícia. */}
      <div className="border-t border-neutral-200" />

      <p className="mt-12 text-body font-semibold uppercase tracking-wide text-secondary-600">
        {content.eyebrow}
      </p>

      {/* Transição só no que o hover muda: o ScrollReveal anima opacity e
          transform por GSAP, e com `transition` genérico cada quadro dele
          disparava e cancelava uma transição CSS. */}
      <article className="mt-5 grid grid-cols-1 items-stretch gap-4 overflow-hidden rounded-2xl bg-white p-3 transition-[scale,box-shadow] duration-300 hover:scale-[1.01] hover:z-10 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] lg:grid-cols-2 lg:gap-8">
        {/* Imagem com pequena borda do card ao redor (padding do article + cantos).
            É o LCP da página: baixa já, com prioridade alta. */}
        <div className="relative h-[248px] w-full overflow-hidden rounded-xl bg-neutral-100 lg:h-full lg:min-h-[404px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1440px) 628px, (min-width: 1024px) calc(50vw - 92px), calc(100vw - 64px)"
            className="object-cover"
          />
        </div>

        <div className="flex h-full flex-col justify-between gap-6 p-3 pt-3 lg:py-7 lg:pl-4 lg:pr-7">
          {/* Bloco no topo: tag, título, descrição, data e tempo de leitura */}
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center rounded-full bg-primary-50 px-3.5 py-1.5 text-body font-semibold text-primary-600">
              {article.type}
            </span>

            <h2 className="text-[24px] font-bold leading-[1.3] text-neutral-800 lg:text-h3">
              {article.title}
            </h2>

            <p className="text-body leading-[1.35] text-neutral-600">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body text-neutral-500">
              <span>{article.date}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock aria-hidden className="size-4" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Botão na base — abre a página interna do artigo */}
          <Button
            variant="primary"
            size="lg"
            href={`${ROUTES.PORTAL_CONTEUDO}/${article.id}`}
            iconRight={<ArrowRight aria-hidden className="size-5" />}
            className="self-start"
          >
            {content.buttonLabel}
          </Button>
        </div>
      </article>
    </Section>
  );
}
