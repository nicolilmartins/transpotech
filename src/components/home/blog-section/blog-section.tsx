import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import { articles } from "@/data/articles";
import { ROUTES } from "@/lib/routes";

// Conteúdos exibidos na home (destaque + 3 menores). Cada card leva ao artigo
// correspondente no Portal de Conteúdo.
const SELECTED_IDS = [
  "nova-unidade-joinville",
  "linde-e20-e50-x-elite",
  "cimine-2026-automacao",
  "quando-vale-locar-empilhadeiras",
];

const selected = SELECTED_IDS.map((id) =>
  articles.find((article) => article.id === id)
).filter((article): article is (typeof articles)[number] => Boolean(article));

const [featured, ...rest] = selected;

const articleHref = (id: string) => `${ROUTES.PORTAL_CONTEUDO}/${id}`;

export function BlogSection() {
  return (
    <section className="relative isolate mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 overflow-hidden px-5 py-16 sm:px-6 lg:gap-16 lg:px-16 lg:py-20 2xl:px-30">
      {/* Cabeçalho — texto à esquerda, link "ver todos" à direita */}
      <div className="flex w-full items-end justify-between gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="w-[613px] max-w-full text-h2 text-neutral-800">
            <span className="font-normal">Conteúdo prático para apoiar </span>
            <span className="font-bold text-primary-500">suas decisões</span>
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            Guias, comparativos e tendências sobre locação, acessórios e
            automação.
          </p>
        </div>
        <TextLink href={ROUTES.PORTAL_CONTEUDO} className="shrink-0">
          Ver todos os conteúdos
        </TextLink>
      </div>

      {/* Grade: artigo principal grande à esquerda + cards menores à direita */}
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch">
        {/* Artigo em destaque */}
        <Link
          href={articleHref(featured.id)}
          className="group/card relative block h-[360px] overflow-hidden rounded-2xl bg-neutral-900 transition duration-300 hover:scale-[1.01] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] lg:h-[560px] lg:flex-[1.35]"
        >
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            sizes="55vw"
            priority
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-8">
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
                Ler conteúdo
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
        </Link>

        {/* Cards menores empilhados */}
        <div className="flex flex-1 flex-col gap-6">
          {rest.map((article) => (
            <Link
              key={article.id}
              href={articleHref(article.id)}
              className="group/card flex flex-1 gap-4 overflow-hidden rounded-xl bg-white p-3 transition duration-300 hover:scale-[1.02] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]"
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
                  <span className="text-sm font-semibold uppercase tracking-wide leading-[1.35] text-primary-500">
                    {article.category}
                  </span>
                  <h3 className="line-clamp-2 font-heading text-lg font-semibold leading-[1.3] text-neutral-800">
                    {article.title}
                  </h3>
                </div>

                {/* Rodapé: ler conteúdo (esquerda) · tempo (direita) */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm font-semibold leading-[1.35] text-neutral-500 transition-colors group-hover/card:text-neutral-700">
                    Ler conteúdo
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Clock className="size-4" aria-hidden />
                    <span className="text-sm leading-[1.35]">
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
