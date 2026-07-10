import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import fachada from "@/assets/images/fachada-transpotech.webp";

// Notícia em destaque — matéria externa (Informe Blumenau).
const featured = {
  category: "Notícia",
  title:
    "TranspoTech recebe prêmio de melhor pós-vendas do Brasil da Linde Still, líder mundial em empilhadeiras elétricas",
  excerpt:
    "A empresa venceu o programa Top Service da Linde Still e foi reconhecida como o melhor serviço de pós-vendas do Brasil, entre 46 centros autorizados.",
  date: "22 ago 2016",
  source: "Informe Blumenau",
  href: "https://www.informeblumenau.com/transpotech-recebe-premio-de-melhor-pos-vendas-do-brasil-da-linde-still-lider-mundial-em-empilhadeiras-eletricas/",
  image: fachada,
};

export function FeaturedSection() {
  const article = featured;

  return (
    <Section className="-mt-6 flex flex-col gap-8 pt-0 lg:-mt-10">
      {/* Linha divisória fina — mesmo tom dos filtros do catálogo */}
      <div className="border-t border-neutral-200" />

      <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
        Notícia em destaque
      </p>

      <article className="grid grid-cols-1 items-stretch gap-4 overflow-hidden rounded-2xl bg-white p-3 transition duration-300 hover:scale-[1.01] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] lg:grid-cols-2 lg:gap-8">
        {/* Imagem com pequena borda do card ao redor (padding do article + cantos). */}
        <div className="relative h-[248px] w-full overflow-hidden rounded-xl bg-neutral-100 lg:h-full lg:min-h-[404px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex h-full flex-col justify-between gap-6 p-3 pt-3 lg:py-7 lg:pl-4 lg:pr-7">
          {/* Bloco no topo: tag, título, descrição, data e tempo de leitura */}
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center rounded-full bg-primary-50 px-3.5 py-1.5 text-body-sm font-semibold text-primary-600">
              {article.category}
            </span>

            <h2 className="text-h3 font-bold text-neutral-800">
              {article.title}
            </h2>

            <p className="text-body leading-[1.35] text-neutral-600">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-neutral-500">
              <span>{article.date}</span>
              <span aria-hidden>·</span>
              <span>{article.source}</span>
            </div>
          </div>

          {/* Botão na base — abre a matéria externa em nova aba */}
          <Button
            variant="primary"
            size="lg"
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            iconRight={<ArrowRight aria-hidden className="size-5" />}
            className="self-start"
          >
            Ler notícia completa
          </Button>
        </div>
      </article>
    </Section>
  );
}
