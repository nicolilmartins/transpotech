import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { ROUTES } from "@/lib/routes";
import iconPerson from "@/assets/images/stats/card-person.webp";
import iconBadge from "@/assets/images/stats/card-badge.webp";
import iconToolbox from "@/assets/images/stats/card-toolbox.webp";
import iconDocument from "@/assets/images/stats/card-document.webp";
import iconMagnifier from "@/assets/images/stats/card-magnifier.webp";
import iconCalendar from "@/assets/images/stats/pecas-icon-calendar.webp";
import iconGear from "@/assets/images/stats/pecas-icon-gear.webp";
import iconHouse from "@/assets/images/stats/card-house.webp";
import iconRecycle from "@/assets/images/stats/pecas-icon-recycle.webp";

// Geometria por card conforme o Figma (node 3603:3198). A maioria segue o
// padrão (caixa 178.49×133.867, flip); o selo tem caixa maior sem flip.
type Art = {
  src: StaticImageData;
  width: number;
  height: number;
  left: number;
  top: number;
  maskX: number;
  maskY: number;
  flip: boolean;
  objectPosition?: string;
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
    title: "Apoio técnico na identificação",
    description:
      "Ajudamos a identificar a peça correta a partir do equipamento, da aplicação e do diagnóstico.",
    art: { ...STD, src: iconPerson },
  },
  {
    title: "Menos risco de compra incorreta",
    description:
      "Você evita peças incompatíveis que geram retrabalho, atraso e parada da operação.",
    art: {
      src: iconBadge,
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
    title: "Conexão com manutenção e serviços",
    description:
      "A solicitação pode seguir direto para manutenção e assistência técnica quando necessário.",
    art: { ...STD, src: iconToolbox },
  },
  {
    title: "Direcionamento conforme equipamento e aplicação",
    description:
      "Orientação considerando modelo, uso e contexto da sua operação.",
    art: { ...STD, src: iconDocument, maskX: 12.486, maskY: 4 },
  },
  {
    title: "Atendimento para diferentes necessidades",
    description:
      "Peças para corretiva, preventiva, reposição ou dúvidas técnicas.",
    art: { ...STD, src: iconMagnifier },
  },
  {
    title: "Suporte para disponibilidade da frota",
    description:
      "Apoio para manter os equipamentos operando e reduzir tempo de parada.",
    art: { ...STD, src: iconCalendar, objectPosition: "bottom" },
  },
  {
    title: "Peças genuínas multimarcas",
    description:
      "Peças originais e compatíveis para as principais marcas e modelos de empilhadeiras.",
    art: { ...STD, src: iconGear },
  },
  {
    title: "Amplo estoque",
    description:
      "Estoque abrangente para dar mais agilidade na solução e reduzir o tempo de espera.",
    art: { ...STD, src: iconHouse },
  },
  {
    title: "Descarte correto das peças usadas",
    description:
      "Logística reversa para o descarte ambientalmente adequado das peças substituídas.",
    art: { ...STD, src: iconRecycle },
  },
];

export function WhyTranspotechSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        <span className="lg:block">Por que solicitar peças</span>{" "}
        <span className="lg:block font-bold text-primary-500">
          com a TranspoTech?
        </span>
      </h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:min-h-[280px]"
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
              objectPosition={card.art.objectPosition}
            />
            <div className="relative mt-[124px] lg:mt-[140px] flex flex-col gap-4">
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
