import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import iconGalpao from "@/assets/images/stats/card-galpao.webp";
import iconFabrica from "@/assets/images/stats/card-fabrica.webp";
import iconCarrinho from "@/assets/images/stats/card-carrinho.webp";
import iconCaminhao from "@/assets/images/stats/card-caminhao.webp";
import iconEmpilhadeira from "@/assets/images/stats/serv-icon-empilhadeira.webp";
import iconTrator from "@/assets/images/stats/serv-icon-trator.webp";

// Geometria por card conforme o Figma (node 3603:3444). flip=false em todos
// (sem espelhamento). Tons iguais à why-us da home: cores originais + máscara
// exata do Figma (plateau=false) + blend lighten.
type Art = {
  src: StaticImageData;
  width: number;
  height: number;
  maskX: number;
  maskY: number;
  left: number;
  top: number;
};

type Segment = { title: string; description: string; art: Art };

const segments: Segment[] = [
  {
    title: "Centros de distribuição",
    description:
      "Para operações com alto volume, prazos exigentes e necessidade de disponibilidade constante.",
    art: {
      src: iconGalpao,
      width: 175.718,
      height: 131.789,
      maskX: 12.101,
      maskY: -1.04,
      left: -22,
      top: -11,
    },
  },
  {
    title: "Indústrias",
    description:
      "Para almoxarifados, produção, expedição e movimentação interna de materiais.",
    art: {
      src: iconFabrica,
      width: 178.49,
      height: 133.868,
      maskX: 14.487,
      maskY: 0,
      left: -25,
      top: -12,
    },
  },
  {
    title: "Supermercados e atacadistas",
    description:
      "Para recebimento, armazenagem, reposição e picos de abastecimento.",
    art: {
      src: iconCarrinho,
      width: 204.438,
      height: 153.328,
      maskX: 25.448,
      maskY: 9.73,
      left: -36,
      top: -22,
    },
  },
  {
    title: "Operadores logísticos",
    description: "Para 3PLs, galpões e contratos que dependem de frota confiável.",
    art: {
      src: iconCaminhao,
      width: 176.465,
      height: 132.349,
      maskX: 16.244,
      maskY: -0.519,
      left: -27,
      top: -12,
    },
  },
  {
    title: "Empresas com frota própria",
    description:
      "Para quem precisa manter equipamentos comprados em boas condições de uso.",
    art: {
      src: iconEmpilhadeira,
      width: 194.667,
      height: 146,
      maskX: 22.575,
      maskY: 6,
      left: -33,
      top: -18,
    },
  },
  {
    title: "Agroindústria",
    description:
      "Para cooperativas, armazenagem de grãos, insumos e movimentação em ambientes agroindustriais.",
    art: {
      src: iconTrator,
      width: 178.345,
      height: 133.759,
      maskX: 14.78,
      maskY: 3.035,
      left: -25,
      top: -15,
    },
  },
];

function SegmentCard({ title, description, art }: Segment) {
  return (
    <div className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-[#222221] p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:min-h-[299px]">
      <CardImageIcon
        src={art.src}
        width={art.width}
        height={art.height}
        left={art.left}
        top={art.top}
        maskX={art.maskX}
        maskY={art.maskY}
        flip={false}
        plateau={false}
        blendMode="lighten"
      />
      <div className="relative mt-[124px] lg:mt-[140px] flex flex-col gap-4">
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
          Serviços para diferentes{" "}
          <span className="font-bold text-primary-500">tipos de operação</span>
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
