import {
  Warehouse,
  Factory,
  ShoppingCart,
  Truck,
  Boxes,
  Tractor,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";

type Segment = { title: string; description: string; Icon: LucideIcon };

const segments: Segment[] = [
  {
    title: "Centros de distribuição",
    description:
      "Para operações com alto volume, prazos exigentes e necessidade de disponibilidade constante.",
    Icon: Warehouse,
  },
  {
    title: "Indústrias",
    description:
      "Para almoxarifados, produção, expedição e movimentação interna de materiais.",
    Icon: Factory,
  },
  {
    title: "Supermercados e atacadistas",
    description:
      "Para recebimento, armazenagem, reposição e picos de abastecimento.",
    Icon: ShoppingCart,
  },
  {
    title: "Operadores logísticos",
    description: "Para 3PLs, galpões e contratos que dependem de frota confiável.",
    Icon: Truck,
  },
  {
    title: "Empresas com frota própria",
    description:
      "Para quem precisa manter equipamentos comprados em boas condições de uso.",
    Icon: Boxes,
  },
  {
    title: "Agroindústria",
    description:
      "Para cooperativas, armazenagem de grãos, insumos e movimentação em ambientes agroindustriais.",
    Icon: Tractor,
  },
];

function SegmentCard({ title, description, Icon }: Segment) {
  return (
    <div className="flex min-h-[240px] flex-col justify-between overflow-hidden rounded-xl bg-[rgba(251,251,251,0.05)] p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:h-[299px]">
      <Icon aria-hidden className="size-7 text-[#919090] lg:size-8" />
      <div className="flex flex-col gap-4">
        <h3 className="whitespace-nowrap font-heading text-h6 font-semibold text-neutral-200">
          {title}
        </h3>
        <p className="text-body leading-[1.35] text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export function SegmentsSection() {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
          Segmentos
        </p>
        <h2 className="text-h2 font-normal text-neutral-50">
          Serviços para diferentes tipos de operação
        </h2>
      </div>

      {/* 6 cards — grade de 3 colunas (3 + 3) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment) => (
          <SegmentCard key={segment.title} {...segment} />
        ))}
      </div>
    </Section>
  );
}
