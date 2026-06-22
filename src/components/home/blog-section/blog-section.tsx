import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import time from "@/assets/icons/time.svg";
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

export function BlogSection() {
  return (
    <section className="flex flex-col items-start gap-16 bg-[#fdfdfd] px-16 py-20">
      {/* Cabeçalho com navegação */}
      <div className="flex w-full items-end justify-end gap-4">
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
        <div className="flex items-center gap-2">
          <button
            aria-label="Anterior"
            className="flex size-12 items-center justify-center rounded-full bg-secondary-600/10 text-secondary-600 transition-colors hover:bg-secondary-600/20"
          >
            <ArrowLeft className="size-7" />
          </button>
          <button
            aria-label="Próximo"
            className="flex size-12 items-center justify-center rounded-full bg-secondary-600/10 text-secondary-600 transition-colors hover:bg-secondary-600/20"
          >
            <ArrowRight className="size-7" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex w-full gap-4 overflow-hidden">
        {posts.map((post, i) => (
          <article
            key={i}
            className="flex h-[516px] w-[427px] shrink-0 flex-col gap-4 rounded-xl bg-neutral-50 p-4"
          >
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl">
              <Image
                src={post.img}
                alt={post.title}
                fill
                sizes="427px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-body font-semibold leading-[1.35] text-primary-500">
                    {post.category}
                  </span>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                      {post.title}
                    </h3>
                    <p className="text-body leading-[1.35] text-neutral-600">
                      {post.description}
                    </p>
                  </div>
                </div>
                <div className="h-px w-full bg-neutral-200" />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex flex-1 items-center gap-2 text-body font-semibold leading-[1.35] text-neutral-500">
                  Ler conteúdo
                  <ArrowRight className="size-6" />
                </button>
                <div className="flex items-center gap-2 text-neutral-500">
                  <Image src={time} alt="" className="size-5" />
                  <span className="text-body leading-[1.35]">
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Button variant="primary" size="lg">
        Ver todos os conteúdos
      </Button>
    </section>
  );
}
