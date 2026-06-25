import { UserCog, BarChart3, MapPin, Settings, type LucideIcon } from "lucide-react";

type WhyUsCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const cards: WhyUsCard[] = [
  {
    icon: UserCog,
    title: "+400 técnicos especializados",
    description:
      "Suporte para abastecimento de linha, movimentação interna e continuidade de produção.",
  },
  {
    icon: BarChart3,
    title: "Atendimento multimarcas",
    description:
      "Soluções para armazenagem, fluxo, picking, expedição e produtividade operacional.",
  },
  {
    icon: MapPin,
    title: "90% de presença nacional",
    description:
      "11 unidades em PR, SC, RS, SP e GO para resposta próxima e suporte técnico local.",
  },
  {
    icon: Settings,
    title: "+30 milhões em estoque de peças",
    description:
      "Estrutura que garante rapidez, eficiência e flexibilidade total na manutenção de empilhadeiras.",
  },
];

export function WhyUsSection() {
  return (
    <section
      data-header-dark
      className="relative flex flex-col items-start gap-10 px-4 py-16 sm:px-8 lg:gap-[67px] lg:px-16 lg:py-20"
    >
      <div className="relative w-full">
        <h2 className="w-full text-center text-h3 font-normal text-neutral-200">
          Por que empresas escolhem a Transpotech
        </h2>
      </div>

      <div className="relative grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex min-h-[240px] flex-col justify-between overflow-hidden rounded-xl bg-[rgba(251,251,251,0.05)] p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:h-[299px]"
          >
            <card.icon className="size-8 text-white/50" aria-hidden />
            <div className="flex flex-col gap-4">
              <h3 className="w-[242px] max-w-full font-heading text-h6 font-semibold text-neutral-200">
                {card.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-400">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
