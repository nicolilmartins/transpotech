import Image, { type StaticImageData } from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
// PLACEHOLDER: trocar por mapa de unidades / foto do carro oficina
import mapImage from "@/assets/images/operacao-image.webp";
import vanImage from "@/assets/images/empilhadeiras/warehouse-wide.webp";

const media: { src: StaticImageData; caption: string }[] = [
  { src: mapImage, caption: "Mapa de unidades" },
  { src: vanImage, caption: "Carro oficina TranspoTech" },
];

const stats = [
  "+360 carros oficina",
  "Técnicos treinados",
  "Atendimento regional",
  "Peças, pneus e componentes",
  "Suporte para Linde, STILL, Baoli e multimarcas",
];

export function TechStructureSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-12"
    >
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
          Estrutura técnica
        </p>
        <h2 className="text-h3 font-normal text-neutral-50">
          Estrutura técnica para apoiar sua operação
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          A TranspoTech reúne equipe técnica, carros oficina, unidades, peças e
          experiência em intralogística para atender empresas que dependem de
          equipamentos disponíveis.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {media.map((item) => (
          <div
            key={item.caption}
            className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:h-[300px]"
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <li
            key={stat}
            className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-500" />
            <span className="text-body font-semibold leading-[1.35] text-neutral-200">
              {stat}
            </span>
          </li>
        ))}
      </ul>

      <Button variant="primary" size="lg" href={ROUTES.ORCAMENTO}>
        Encontrar atendimento na minha região
      </Button>
    </Section>
  );
}
