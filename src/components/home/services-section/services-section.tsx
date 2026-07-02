import { ShieldCheck, Wrench, LayoutDashboard, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";

type ServiceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
};

const cards: ServiceCard[] = [
  {
    icon: ShieldCheck,
    title: "Planos de manutenção preventiva",
    description:
      "Cronograma de visitas técnicas para identificar falhas antes que parem sua frota.",
    cta: "Solicitar plano preventivo",
  },
  {
    icon: Wrench,
    title: "Manutenção\ncorretiva",
    description:
      "Técnicas em campo com peças em estoque para retornar sua operação o quanto antes.",
    cta: "Solicitar atendimento urgente",
  },
  {
    icon: LayoutDashboard,
    title: "Assistência\nmultimarcas",
    description:
      "Linde, Still, Baoli e outras marcas - um único contato para toda a frota.",
    cta: "Ver cobertura multimarcas",
  },
];

export function ServicesSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-[67px]">
      {/* Cabeçalho centralizado */}
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <div className="flex w-[535px] max-w-full flex-col items-center gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            SERVIÇOS
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-bold">Manutenção preventiva, </span>
            <span className="font-normal">corretiva e suporte 24h</span>
          </h2>
        </div>
        <p className="w-[507px] max-w-full text-body leading-[1.35] text-neutral-600">
          Além da venda e locação, a TranspoTech apoia o dia a dia da frota com
          manutenção e suporte técnico especializado.
        </p>
      </div>

      {/* Cards — todos do mesmo tamanho */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <card.icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                {/* Reserva 2 linhas de título e 2 de texto → cards uniformes */}
                <h3 className="min-h-[2.6em] font-heading text-h5 font-semibold leading-[1.3] text-neutral-800">
                  {card.title.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="line-clamp-2 min-h-[2.7em] text-body leading-[1.35] text-neutral-600">
                  {card.description}
                </p>
              </div>
            </div>
            <TextLink
              href={ROUTES.SERVICOS}
              className="w-full px-6 py-4 text-left"
            >
              {card.cta}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
