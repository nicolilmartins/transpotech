import {
  Wrench,
  ShieldCheck,
  Link2,
  Compass,
  Layers,
  Activity,
  BadgeCheck,
  Boxes,
  Recycle,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

type Card = { title: string; description: string; Icon: LucideIcon };

const cards: Card[] = [
  {
    title: "Apoio técnico na identificação",
    description:
      "Ajudamos a identificar a peça correta a partir do equipamento, da aplicação e do diagnóstico.",
    Icon: Wrench,
  },
  {
    title: "Menos risco de compra incorreta",
    description:
      "Você evita peças incompatíveis que geram retrabalho, atraso e parada da operação.",
    Icon: ShieldCheck,
  },
  {
    title: "Conexão com manutenção e serviços",
    description:
      "A solicitação pode seguir direto para manutenção e assistência técnica quando necessário.",
    Icon: Link2,
  },
  {
    title: "Direcionamento conforme equipamento e aplicação",
    description:
      "Orientação considerando modelo, uso e contexto da sua operação.",
    Icon: Compass,
  },
  {
    title: "Atendimento para diferentes necessidades",
    description:
      "Peças para corretiva, preventiva, reposição ou dúvidas técnicas.",
    Icon: Layers,
  },
  {
    title: "Suporte para disponibilidade da frota",
    description:
      "Apoio para manter os equipamentos operando e reduzir tempo de parada.",
    Icon: Activity,
  },
  {
    title: "Peças genuínas multimarcas",
    description:
      "Peças originais e compatíveis para as principais marcas e modelos de empilhadeiras.",
    Icon: BadgeCheck,
  },
  {
    title: "Amplo estoque",
    description:
      "Estoque abrangente para dar mais agilidade na solução e reduzir o tempo de espera.",
    Icon: Boxes,
  },
  {
    title: "Descarte correto das peças usadas",
    description:
      "Logística reversa para o descarte ambientalmente adequado das peças substituídas.",
    Icon: Recycle,
  },
];

export function WhyTranspotechSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        Por que solicitar peças com a TranspoTech?
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
