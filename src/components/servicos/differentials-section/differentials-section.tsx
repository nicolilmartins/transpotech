import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { ROUTES } from "@/lib/routes";
import iconPessoa from "@/assets/images/stats/serv-icon-pessoa.webp";
import iconEscudo from "@/assets/images/stats/serv-icon-escudo.webp";
import iconMoeda from "@/assets/images/stats/serv-icon-moeda.webp";
import iconBateria from "@/assets/images/stats/serv-icon-bateria.webp";
import iconFerramentas from "@/assets/images/stats/serv-icon-ferramentas.webp";
// Card 6 reusa o selo/check do card 3 da Quem Somos (sem 6ª imagem no Figma).
import iconSelo from "@/assets/images/stats/qs-icon-selo.webp";

// Geometria por card conforme o Figma (node 3603:3264). Padrão: caixa
// 178.49×133.867 com flip. Moeda e selo têm caixa maior sem flip.
type Art = {
  src: StaticImageData;
  width: number;
  height: number;
  left: number;
  top: number;
  maskX: number;
  maskY: number;
  flip: boolean;
};

const STD = {
  width: 178.49,
  height: 133.867,
  left: -35,
  top: -18,
  maskX: 14.486,
  maskY: 0,
  flip: true,
};

type Card = { title: string; description: string; art: Art };

const cards: Card[] = [
  {
    title: "Menos paradas inesperadas",
    description:
      "A manutenção adequada ajuda a reduzir falhas que comprometem produtividade, prazos e segurança.",
    art: { ...STD, src: iconPessoa },
  },
  {
    title: "Mais segurança operacional",
    description:
      "Equipamentos revisados reduzem riscos para operadores, cargas e estrutura da operação.",
    art: { ...STD, src: iconEscudo },
  },
  {
    title: "Previsibilidade de custos",
    description:
      "A manutenção programada permite planejar intervenções e evitar gastos emergenciais recorrentes.",
    art: {
      src: iconMoeda,
      width: 210.402,
      height: 157.801,
      left: -51,
      top: -30,
      maskX: 30.442,
      maskY: 10.726,
      flip: false,
    },
  },
  {
    title: "Vida útil da frota",
    description:
      "O cuidado preventivo ajuda a preservar componentes e prolongar a utilização dos equipamentos.",
    art: { ...STD, src: iconBateria },
  },
  {
    title: "Suporte técnico especializado",
    description:
      "Equipe preparada para atuar em diferentes tipos de empilhadeiras e demandas operacionais.",
    art: { ...STD, src: iconFerramentas },
  },
  {
    title: "Técnico dedicado na operação",
    description:
      "Terceirizamos os serviços dos nossos técnicos para auxiliar em altos volumes de manutenções.",
    art: {
      src: iconSelo,
      width: 199.939,
      height: 149.954,
      left: -45.7,
      top: -26,
      maskX: 25.211,
      maskY: 8.043,
      flip: false,
    },
  },
];

export function DifferentialsSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <div className="flex flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Diferenciais
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          <span className="lg:block">Por que investir em</span>{" "}
          <span className="lg:block font-bold text-primary-500">
            manutenção especializada?
          </span>
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:h-[280px]"
          >
            <CardImageIcon
              src={card.art.src}
              width={card.art.width}
              height={card.art.height}
              left={card.art.left}
              top={card.art.top}
              maskX={card.art.maskX}
              maskY={card.art.maskY}
              flip={card.art.flip}
            />
            <div className="relative flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                {card.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-600">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" size="lg" href={ROUTES.ORCAMENTO}>
        Avaliar minha frota
      </Button>
    </Section>
  );
}
