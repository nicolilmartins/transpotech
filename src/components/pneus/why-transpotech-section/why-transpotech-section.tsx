import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { ROUTES } from "@/lib/routes";
import iconPessoa from "@/assets/images/stats/pneus-icon-pessoa.webp";
import iconSelo from "@/assets/images/stats/pneus-icon-selo.webp";
import iconFerramentas from "@/assets/images/stats/pneus-icon-ferramentas.webp";
import iconDocumento from "@/assets/images/stats/card-document.webp";

// Geometria por card conforme o Figma (node 3603:3240). Padrão: caixa
// 178.49×133.867 com flip; o selo tem caixa maior sem flip.
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
    title: "Orientação para escolha correta",
    description:
      "Indicamos a categoria certa para cada piso, aplicação e tipo de operação.",
    art: { ...STD, src: iconPessoa },
  },
  {
    title: "Menos risco de compra incompatível",
    description:
      "Você evita pneus inadequados que comprometem segurança e produtividade.",
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
    title: "Apoio técnico para operação e manutenção",
    description:
      "Suporte especializado para prolongar a vida útil e reduzir paradas.",
    art: { ...STD, src: iconFerramentas },
  },
  {
    title: "Direcionamento conforme região e necessidade",
    description:
      "Cobertura nacional para atender sua operação onde ela estiver.",
    art: { ...STD, src: iconDocumento, maskX: 12.486, maskY: 4 },
  },
];

export function WhyTranspotechSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        Por que solicitar pneus{" "}
        <br className="hidden lg:inline" />
        <span className="font-bold text-primary-500">com a TranspoTech?</span>
      </h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <Button variant="primary" size="lg" href={ROUTES.CONTATO}>
        Falar com especialista
      </Button>
    </Section>
  );
}
