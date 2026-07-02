import Image, { type StaticImageData } from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import post1 from "@/assets/images/blog/post1.png";
import post2 from "@/assets/images/blog/post2.png";
import post3 from "@/assets/images/blog/post3.jpg";
import post4 from "@/assets/images/blog/post4.png";

type Post = {
  img: StaticImageData;
  category: string;
  title: string;
  description: string;
  readTime: string;
};

const posts: Post[] = [
  {
    img: post1,
    category: "LOCAÇÃO",
    title: "TranspoTech inaugura nova unidade em Joinville",
    description:
      "Operação amplia atendimentos e estoque de peças para clientes do norte de Santa Catarina.",
    readTime: "2 min",
  },
  {
    img: post2,
    category: "EMPILHADEIRAS NOVAS",
    title: "Linde lança no Brasil a nova linha elétrica E20-E50",
    description:
      "Modelos chegam com bateria de íons de lítio integrada e ganha até 20% em ciclos por turno.",
    readTime: "2 min",
  },
  {
    img: post3,
    category: "AUTOMAÇÃO",
    title: "TranspoTech apresenta soluções de automação intralogística",
    description:
      "Estande integrado mostra AGVs, WMS e empilhadeiras conectadas em ambiente de operação.",
    readTime: "2 min",
  },
  {
    img: post4,
    category: "LOCAÇÃO",
    title: "TranspoTech apresenta soluções de automação intralogística",
    description:
      "Estande integrado mostra AGVs, WMS e empilhadeiras conectadas em ambiente de operação.",
    readTime: "2 min",
  },
];

const [featured, ...rest] = posts;

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
        <TextLink className="shrink-0">Ver todos os conteúdos</TextLink>
      </div>

      {/* Grade: artigo principal grande à esquerda + cards menores à direita */}
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch">
        {/* Artigo em destaque */}
        <article className="group relative h-[360px] overflow-hidden rounded-2xl bg-neutral-900 lg:h-[560px] lg:flex-[1.35]">
          <Image
            src={featured.img}
            alt={featured.title}
            fill
            sizes="55vw"
            priority
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-8">
            <span className="text-body font-semibold leading-[1.35] text-primary-400">
              {featured.category}
            </span>
            <h3 className="max-w-[560px] font-heading text-[28px] font-bold leading-[1.2] text-neutral-50">
              {featured.title}
            </h3>
            <p className="max-w-[540px] text-body leading-[1.4] text-neutral-200">
              {featured.description}
            </p>
            {/* Rodapé: ler conteúdo (esquerda) · tempo de leitura (direita) */}
            <div className="flex items-center justify-between pt-2">
              <button className="flex items-center gap-2 text-body font-semibold leading-[1.35] text-neutral-400 transition-colors hover:text-neutral-200">
                Ler conteúdo
                <ArrowRight className="size-5" aria-hidden />
              </button>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="size-4" aria-hidden />
                <span className="text-body leading-[1.35]">
                  {featured.readTime}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Cards menores empilhados */}
        <div className="flex flex-1 flex-col gap-6">
          {rest.map((post, i) => (
            <article
              key={i}
              className="group flex flex-1 gap-4 overflow-hidden rounded-xl bg-neutral-50 p-3"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg sm:w-36 lg:h-full lg:w-auto">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Texto — topo: categoria + título | rodapé: ler conteúdo + tempo */}
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                {/* Topo esquerdo */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold leading-[1.35] text-primary-500">
                    {post.category}
                  </span>
                  <h3 className="line-clamp-2 font-heading text-lg font-semibold leading-[1.3] text-neutral-800">
                    {post.title}
                  </h3>
                </div>

                {/* Rodapé: ler conteúdo (esquerda) · tempo (direita) */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1.5 text-sm font-semibold leading-[1.35] text-neutral-500 transition-colors hover:text-neutral-700">
                    Ler conteúdo
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Clock className="size-4" aria-hidden />
                    <span className="text-sm leading-[1.35]">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
