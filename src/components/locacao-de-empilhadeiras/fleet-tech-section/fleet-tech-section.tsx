import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import illoChart from "@/assets/images/stats/illustration-chart-2.webp";
import illoForklift from "@/assets/images/stats/illustration-emp-2.webp";
import illoCalendar from "@/assets/images/stats/illustration-calendar.webp";
import illoDesktop from "@/assets/images/stats/illustration-desktop.webp";

type Card = { title: string; description: string; image: StaticImageData };

const cards: Card[] = [
  {
    title: "Incentivos fiscais",
    description: "Redução de custos gerais\ne de manutenção.",
    image: illoChart,
  },
  {
    title: "Flexibilidade de troca",
    description: "Atualização e renovação\nde frota garantida.",
    image: illoForklift,
  },
  {
    title: "Custo mensal fixo",
    description: "Valores previsíveis que\nse mantêm mês a mês.",
    image: illoCalendar,
  },
  {
    title: "Gestão inteligente de frota",
    description: "Você 100% focado na gestão\ndo seu negócio.",
    image: illoDesktop,
  },
];

function FleetCard({ title, description, image }: Card) {
  return (
    <div className="group relative flex h-[348px] w-full flex-col overflow-hidden rounded-[20px] lg:max-w-[314px]">
      {/* Parte do texto — 127px de altura; título + descrição centralizados */}
      <div className="relative flex h-[127px] flex-col items-center gap-2 overflow-hidden bg-[#f7f6f6] px-6 pt-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[174px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 opacity-[0.1] blur-[58px] transition-opacity duration-500 group-hover:opacity-[0.28]"
        />
        <h3 className="relative text-[18px] font-semibold leading-[1.35] text-neutral-800">
          {title}
        </h3>
        <p className="relative whitespace-pre-line text-[16px] leading-[1.35] text-neutral-600">
          {description}
        </p>
      </div>

      {/* Imagem centralizada na parte de baixo */}
      <div className="relative flex flex-1 items-center justify-center bg-[#f7f6f6]/40">
        <Image
          src={image}
          alt=""
          className="pointer-events-none h-[240px] w-auto max-w-none select-none object-contain"
        />
      </div>
    </div>
  );
}

export function FleetTechSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Frota e tecnologia
        </p>
        <h2 className="text-h2 text-neutral-800">
          <span className="font-normal">Frota pronta para qualquer </span>
          <span className="font-bold text-primary-500">
            perfil de operação
          </span>
        </h2>
      </div>

      {/* 4 cards — título/descrição em cima, ilustração centralizada embaixo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <FleetCard key={card.title} {...card} />
        ))}
      </div>
    </Section>
  );
}
