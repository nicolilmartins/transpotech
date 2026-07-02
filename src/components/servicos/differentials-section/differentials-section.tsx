import {
  Activity,
  ShieldCheck,
  DollarSign,
  Clock,
  Wrench,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

type Card = { title: string; description: string; Icon: LucideIcon };

const cards: Card[] = [
  {
    title: "Menos paradas inesperadas",
    description:
      "A manutenção adequada ajuda a reduzir falhas que comprometem produtividade, prazos e segurança.",
    Icon: Activity,
  },
  {
    title: "Mais segurança operacional",
    description:
      "Equipamentos revisados reduzem riscos para operadores, cargas e estrutura da operação.",
    Icon: ShieldCheck,
  },
  {
    title: "Previsibilidade de custos",
    description:
      "A manutenção programada permite planejar intervenções e evitar gastos emergenciais recorrentes.",
    Icon: DollarSign,
  },
  {
    title: "Vida útil da frota",
    description:
      "O cuidado preventivo ajuda a preservar componentes e prolongar a utilização dos equipamentos.",
    Icon: Clock,
  },
  {
    title: "Suporte técnico especializado",
    description:
      "Equipe preparada para atuar em diferentes tipos de empilhadeiras e demandas operacionais.",
    Icon: Wrench,
  },
  {
    title: "Técnico dedicado na operação",
    description:
      "Terceirizamos os serviços dos nossos técnicos para auxiliar em altos volumes de manutenções.",
    Icon: UserCog,
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
          Por que investir em manutenção especializada?
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex min-h-[240px] flex-col justify-between overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:h-[280px]"
          >
            <card.Icon className="size-7 text-primary-500 lg:size-8" aria-hidden />
            <div className="flex flex-col gap-4">
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
