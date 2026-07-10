import {
  Wrench,
  Layers,
  BadgeCheck,
  Compass,
  MapPin,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

type Card = { title: string; description: string; Icon: LucideIcon };

const cards: Card[] = [
  {
    title: "Estrutura técnica",
    description:
      "Equipe especializada, carros oficina e suporte para operações que exigem disponibilidade.",
    Icon: Wrench,
  },
  {
    title: "Portfólio completo",
    description:
      "Venda, locação, peças, pneus, serviços, baterias, carregadores e soluções intralogísticas.",
    Icon: Layers,
  },
  {
    title: "Marcas reconhecidas",
    description: "Distribuidor autorizado Linde, STILL e Baoli.",
    Icon: BadgeCheck,
  },
  {
    title: "Atendimento consultivo",
    description:
      "Apoio para indicar o melhor equipamento ou solução conforme a necessidade operacional.",
    Icon: Compass,
  },
  {
    title: "90% de presença regional",
    description:
      "Unidades e estrutura para atender empresas em diferentes localidades.",
    Icon: MapPin,
  },
  {
    title: "Experiência em intralogística",
    description:
      "Atuação desde 2001 em operações de movimentação de materiais.",
    Icon: CalendarDays,
  },
];

export function WhyChooseSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <div className="flex flex-col gap-4">
        <h2 className="text-h3 font-normal text-neutral-800">
          Por que empresas escolhem a TranspoTech?
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex min-h-[220px] flex-col justify-between overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:h-[260px]"
          >
            <card.Icon className="size-7 text-primary-500 lg:size-8" aria-hidden />
            <div className="flex flex-col gap-3">
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
