import Image from "next/image";
import { IntentLink } from "@/components/ui/intent-link";
import { ArrowRight, Clock } from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import type { Article } from "@/data/articles";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

const articleHref = (id: string) => `${ROUTES.PORTAL_CONTEUDO}/${id}`;

// Conteúdos exibidos na home (o primeiro é o destaque, os demais os cards
// menores). Cada card leva ao artigo correspondente no Portal de Conteúdo.
type BlogContent = SectionContent<typeof homePage.sections.blog>;

export function BlogSection({
  content,
  articles,
}: {
  content: BlogContent;
  articles: Article[];
}) {
  const [featured, ...rest] = articles;

  // Nenhum artigo marcado para a home no CMS: a seção sai da página.
  if (!featured) return null;

  return (
    <section className="relative isolate mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 overflow-hidden px-5 py-12 sm:px-6 lg:gap-16 lg:px-16 lg:py-20">
      {/* Cabeçalho — texto à esquerda, link "ver todos" à direita */}
      {/* Mobile empilhado (link abaixo); desktop lado a lado. Largura do h2
          fluida (max-w) para nunca estourar o viewport. */}
      <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4 lg:flex-1">
          <h2 className="w-full max-w-[613px] text-h2 text-neutral-800">
            <span className="font-normal">{content.titleRegular}</span>
            <span className="font-bold text-primary-500">{content.titleAccent}</span>
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            {content.description}
          </p>
        </div>
        <TextLink href={ROUTES.PORTAL_CONTEUDO} className="shrink-0">
          {content.allLabel}
        </TextLink>
      </div>

      {/* Grade: artigo principal grande à esquerda + cards menores à direita.
          Os cards transicionam só scale/box-shadow (o hover): opacity e
          transform são do ScrollReveal (GSAP), e `transition` genérico fazia
          cada quadro dele abrir e cancelar uma transição CSS. */}
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
        {/* Artigo em destaque */}
        <IntentLink
          href={articleHref(featured.id)}
          className="group/card relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900 transition-[scale,box-shadow] duration-300 hover:z-10 hover:scale-[1.01] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] lg:min-h-[560px] lg:flex-[1.35]"
        >
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 via-85% to-black/15"
          />
          {/* Conteúdo em fluxo (não absoluto): a altura do card acompanha o
              texto e nada é cortado em viewports estreitos */}
          <div className="relative flex flex-col gap-4 p-8">
            <span className="text-body font-semibold uppercase tracking-wide leading-[1.35] text-primary-400">
              {featured.category}
            </span>
            <h3 className="max-w-[560px] font-heading text-[28px] font-bold leading-[1.2] text-neutral-50">
              {featured.title}
            </h3>
            <p className="max-w-[540px] text-body leading-[1.4] text-neutral-200">
              {featured.excerpt}
            </p>
            {/* Rodapé: ler conteúdo (esquerda) · tempo de leitura (direita) */}
            <div className="flex items-center justify-between pt-2">
              <span className="flex items-center gap-2 text-body font-semibold leading-[1.35] text-neutral-400 transition-colors group-hover/card:text-neutral-200">
                {content.readLabel}
                <ArrowRight className="size-5" aria-hidden />
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="size-4" aria-hidden />
                <span className="text-body leading-[1.35]">
                  {featured.readTime}
                </span>
              </div>
            </div>
          </div>
        </IntentLink>

        {/* Cards menores empilhados */}
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          {rest.map((article) => (
            <IntentLink
              key={article.id}
              href={articleHref(article.id)}
              className="group/card relative flex min-h-[140px] flex-1 gap-4 overflow-hidden rounded-xl bg-white p-3 transition-[scale,box-shadow] duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg sm:w-36 lg:h-full lg:w-auto">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                />
              </div>

              {/* Texto — topo: categoria + título | rodapé: ler conteúdo + tempo */}
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                {/* Topo esquerdo */}
                <div className="flex flex-col gap-1">
                  <span className="text-body font-semibold uppercase tracking-wide leading-[1.35] text-primary-500">
                    {article.category}
                  </span>
                  <h3 className="line-clamp-2 font-heading text-lg font-semibold leading-[1.3] text-neutral-800">
                    {article.title}
                  </h3>
                </div>

                {/* Rodapé: ler conteúdo (esquerda) · tempo (direita) */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-body font-semibold leading-[1.35] text-neutral-500 transition-colors group-hover/card:text-neutral-700">
                    {content.readLabel}
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Clock className="size-4" aria-hidden />
                    <span className="text-body leading-[1.35]">
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </IntentLink>
          ))}
        </div>
      </div>
    </section>
  );
}
