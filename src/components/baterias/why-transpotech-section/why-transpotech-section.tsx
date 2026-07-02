import {
  Compass,
  Gauge,
  BatteryCharging,
  Wrench,
  MapPin,
  FileCheck,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

type Card = { title: string; description: string; Icon: LucideIcon };

const cards: Card[] = [
  {
    title: "Orientação para compatibilidade",
    description:
      "Indicamos a bateria e o carregador certos para o seu equipamento e tipo de operação.",
    Icon: Compass,
  },
  {
    title: "Avaliação da rotina de uso",
    description:
      "Analisamos turnos, autonomia e frequência de carga para dimensionar corretamente.",
    Icon: Gauge,
  },
  {
    title: "Apoio para reduzir paradas por energia",
    description:
      "Soluções que evitam interrupções e mantêm a operação sempre disponível.",
    Icon: BatteryCharging,
  },
  {
    title: "Suporte técnico conectado à manutenção",
    description:
      "A solicitação segue direto para manutenção e assistência quando necessário.",
    Icon: Wrench,
  },
  {
    title: "Direcionamento conforme necessidade da operação",
    description:
      "Recomendações alinhadas ao contexto, ao ambiente e às metas da sua operação.",
    Icon: MapPin,
  },
  {
    title: "Cotação com dados mais precisos",
    description:
      "Quanto mais informações do equipamento, mais precisa fica a cotação.",
    Icon: FileCheck,
  },
];

export function WhyTranspotechSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        Por que solicitar baterias e carregadores
        <br />
        <span className="text-primary-500">com a TranspoTech?</span>
      </h2>

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

      <Button variant="primary" size="lg" href={ROUTES.CONTATO}>
        Falar com especialista
      </Button>
    </Section>
  );
}
