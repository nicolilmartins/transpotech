import {
  ClipboardCheck,
  ShieldCheck,
  Truck,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

type Card = { title: string; description: string; Icon: LucideIcon };

const cards: Card[] = [
  {
    title: "Revisão técnica completa",
    description:
      "Cada equipamento passa por avaliação multipontos antes de entrar no estoque.",
    Icon: ClipboardCheck,
  },
  {
    title: "Garantia TranspoTech",
    description: "6 a 12 meses de garantia conforme condição do equipamento.",
    Icon: ShieldCheck,
  },
  {
    title: "Pronta entrega disponível",
    description:
      "Equipamentos prontos pra operação após inspeção e ajustes técnicos.",
    Icon: Truck,
  },
  {
    title: "Cobertura nacional",
    description:
      "10 unidades em PR, SC, RS, SP e GO para suporte próximo da sua operação.",
    Icon: MapPin,
  },
];

export function WhyBuySection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        Por que comprar usada
        <br />
        <span className="text-primary-500">com a TranspoTech</span>
      </h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        Consultar equipamentos
      </Button>
    </Section>
  );
}
