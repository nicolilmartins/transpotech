import {
  Forklift,
  CalendarClock,
  Wrench,
  Package,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";

type HelpCard = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  Icon: LucideIcon;
};

const cards: HelpCard[] = [
  {
    title: "Comprar empilhadeira",
    description:
      "Empilhadeiras novas e seminovas para diferentes aplicações, capacidades e ambientes operacionais.",
    ctaLabel: "Solicitar orçamento",
    href: ROUTES.ORCAMENTO,
    Icon: Forklift,
  },
  {
    title: "Locar empilhadeira",
    description:
      "Locação de empilhadeiras com contratos flexíveis, suporte técnico e orientação para escolher o equipamento ideal.",
    ctaLabel: "Quero locar",
    href: ROUTES.LOCACAO,
    Icon: CalendarClock,
  },
  {
    title: "Solicitar assistência técnica",
    description:
      "Manutenção preventiva, corretiva, serviços multimarcas e suporte técnico para sua frota.",
    ctaLabel: "Solicitar assistência",
    href: ROUTES.SERVICOS,
    Icon: Wrench,
  },
  {
    title: "Cotar peças, pneus, baterias ou carregadores",
    description:
      "Envie sua necessidade, modelo do equipamento ou uma foto para receber orientação e cotação.",
    ctaLabel: "Solicitar cotação",
    href: ROUTES.ORCAMENTO,
    Icon: Package,
  },
  {
    title: "Avaliar minha operação",
    description:
      "Para empresas que precisam melhorar fluxo, produtividade, armazenagem, movimentação ou automação intralogística.",
    ctaLabel: "Avaliar minha operação",
    href: ROUTES.AUTOMACAO,
    Icon: LineChart,
  },
];

export function HelpSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[560px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Atendimento
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          <span className="lg:block">Escolha sua demanda</span>{" "}
          <span className="lg:block font-bold">e fale com o time certo</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Cada necessidade tem um time dedicado na TranspoTech. Se você já sabe
          o que precisa, vá direto pelo canal correspondente e receba um
          atendimento mais rápido e especializado.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex w-full flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)] sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_2rem)/3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <card.Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {card.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {card.description}
                </p>
              </div>
            </div>
            <TextLink href={card.href} className="w-full px-6 py-4 text-left">
              {card.ctaLabel}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
