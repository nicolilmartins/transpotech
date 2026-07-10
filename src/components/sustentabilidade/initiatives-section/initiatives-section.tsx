import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
// PLACEHOLDER: imagens reaproveitadas — trocar por fotos reais das iniciativas.
import imgWomen from "@/assets/images/blog/post1.png";
import imgSocial from "@/assets/images/blog/post2.png";
import imgCitizen from "@/assets/images/blog/post3.jpg";
import imgEfficiency from "@/assets/images/blog/post4.png";

type Initiative = {
  title: string;
  description: string;
  /** Destino do card. PENDÊNCIA: páginas de detalhe ainda não construídas. */
  href: string;
  image: StaticImageData;
};

const initiatives: Initiative[] = [
  {
    title: "Mulheres Mecânicas",
    description:
      "Iniciativa voltada à inclusão e valorização de mulheres em áreas técnicas do setor.",
    href: "#",
    image: imgWomen,
  },
  {
    title: "Projetos sociais e comunitários",
    description:
      "Apoio a iniciativas ligadas a esporte, educação, inclusão e desenvolvimento da comunidade.",
    href: "#",
    image: imgSocial,
  },
  {
    title: "Empresa cidadã",
    description:
      "Ações que fortalecem a conexão da empresa com a comunidade e ampliam o impacto positivo.",
    href: "#",
    image: imgCitizen,
  },
  {
    title: "Soluções mais eficientes",
    description:
      "Atuação em tecnologias, equipamentos e serviços que apoiam operações intralogísticas mais eficientes.",
    href: "#",
    image: imgEfficiency,
  },
];

export function InitiativesSection() {
  return (
    <Section id="destaques" className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Inclusão
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Inclusão que movimenta o futuro
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          A TranspoTech acredita no desenvolvimento de pessoas e na construção
          de oportunidades. Inclusão, formação e valorização profissional fazem
          parte da nossa cultura.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {initiatives.map((initiative) => (
          <Link
            key={initiative.title}
            href={initiative.href}
            className="group/card block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <article className="flex h-full flex-col rounded-xl bg-white p-2 transition duration-300 group-hover/card:scale-[1.02] group-hover/card:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
              {/* Imagem com pequena borda do card ao redor (padding do article + cantos). */}
              <div className="relative h-[196px] w-full overflow-hidden rounded-lg bg-neutral-100">
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
                  {initiative.title}
                </h3>
                <p className="flex-1 text-body-sm leading-[1.35] text-neutral-600">
                  {initiative.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </Section>
  );
}
