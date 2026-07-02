import { Compass, ShieldCheck, Wrench, MapPin, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

type Card = { title: string; description: string; Icon: LucideIcon };

const cards: Card[] = [
  {
    title: "Orientação para escolha correta",
    description:
      "Indicamos a categoria certa para cada piso, aplicação e tipo de operação.",
    Icon: Compass,
  },
  {
    title: "Menos risco de compra incompatível",
    description:
      "Você evita pneus inadequados que comprometem segurança e produtividade.",
    Icon: ShieldCheck,
  },
  {
    title: "Apoio técnico para operação e manutenção",
    description:
      "Suporte especializado para prolongar a vida útil e reduzir paradas.",
    Icon: Wrench,
  },
  {
    title: "Direcionamento conforme região e necessidade",
    description:
      "Cobertura nacional para atender sua operação onde ela estiver.",
    Icon: MapPin,
  },
];

export function WhyTranspotechSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        Por que solicitar pneus com a TranspoTech?
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

      <Button variant="primary" size="lg" href={ROUTES.CONTATO}>
        Falar com especialista
      </Button>
    </Section>
  );
}
