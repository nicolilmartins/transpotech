import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { ROUTES } from "@/lib/routes";
import iconFerramentas from "@/assets/images/stats/qs-icon-ferramentas.webp";
import iconRevisao from "@/assets/images/stats/why-buy-icon-revisao.webp";
import iconSelo from "@/assets/images/stats/qs-icon-selo.webp";
import iconPessoa from "@/assets/images/stats/qs-icon-pessoa.webp";
import iconPin from "@/assets/images/stats/qs-icon-pin.webp";
import iconGalpao from "@/assets/images/stats/card-house.webp";

// Geometria por card conforme o Figma (node 3603:3301). Padrão: caixa
// 178.49×133.867 com flip. A prancheta é retrato (caixa própria) e o selo tem
// caixa maior sem flip.
type Art = {
  src: StaticImageData;
  width: number;
  height: number;
  left: number;
  top: number;
  maskX: number;
  maskY: number;
  maskW?: number;
  maskH?: number;
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
    title: "Estrutura técnica",
    description:
      "Equipe especializada, carros oficina e suporte para operações que exigem disponibilidade.",
    art: { ...STD, src: iconFerramentas },
  },
  {
    title: "Portfólio completo",
    description:
      "Venda, locação, peças, pneus, serviços, baterias, carregadores e soluções intralogísticas.",
    art: { ...STD, src: iconRevisao, flip: false },
  },
  {
    title: "Marcas reconhecidas",
    description: "Distribuidor autorizado Linde, STILL e Baoli.",
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
  {
    title: "Atendimento consultivo",
    description:
      "Apoio para indicar o melhor equipamento ou solução conforme a necessidade operacional.",
    art: { ...STD, src: iconPessoa },
  },
  {
    title: "90% de presença regional",
    description:
      "Unidades e estrutura para atender empresas em diferentes localidades.",
    art: { ...STD, src: iconPin },
  },
  {
    title: "Experiência em intralogística",
    description:
      "Atuação desde 2001 em operações de movimentação de materiais.",
    art: { ...STD, src: iconGalpao },
  },
];

export function WhyChooseSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <div className="flex flex-col gap-4">
        <h2 className="text-h3 font-normal text-neutral-800">
          <span className="lg:block">Por que empresas</span>{" "}
          <span className="lg:block font-bold text-primary-500">
            escolhem a TranspoTech?
          </span>
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:h-[260px]"
          >
            <CardImageIcon
              src={card.art.src}
              width={card.art.width}
              height={card.art.height}
              left={card.art.left}
              top={card.art.top}
              maskX={card.art.maskX}
              maskY={card.art.maskY}
              maskW={card.art.maskW}
              maskH={card.art.maskH}
              flip={card.art.flip}
            />
            <div className="relative flex flex-col gap-3">
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

      <Button variant="primary" size="lg" href={ROUTES.CONTATO}>
        Falar com especialista
      </Button>
    </Section>
  );
}
