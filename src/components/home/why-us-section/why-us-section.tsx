import Image from "next/image";
import userSettings from "@/assets/icons/user-settings.svg";
import dashboard2 from "@/assets/icons/dashboard2.svg";
import mapPin from "@/assets/icons/map-pin.svg";
import settings from "@/assets/icons/settings.svg";

const cards = [
  {
    icon: userSettings,
    title: "+400 técnicos especializados",
    description:
      "Suporte para abastecimento de linha, movimentação interna e continuidade de produção.",
  },
  {
    icon: dashboard2,
    title: "Atendimento multimarcas",
    description:
      "Soluções para armazenagem, fluxo, picking, expedição e produtividade operacional.",
  },
  {
    icon: mapPin,
    title: "90% de presença nacional",
    description:
      "11 unidades em PR, SC, RS, SP e GO para resposta próxima e suporte técnico local.",
  },
  {
    icon: settings,
    title: "+30 milhões em estoque de peças",
    description:
      "Estrutura que garante rapidez, eficiência e flexibilidade total na manutenção de empilhadeiras.",
  },
];

export function WhyUsSection() {
  return (
    <section className="relative flex flex-col items-start gap-[67px] overflow-hidden bg-neutral-900 px-16 py-20">
      {/* Glows de fundo */}
      <div className="pointer-events-none absolute -left-40 top-20 size-[600px] -rotate-45 rounded-full bg-secondary-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 -top-40 size-[600px] -rotate-45 rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="relative w-full">
        <h2 className="w-full text-center text-h3 font-normal text-neutral-200">
          Por que empresas escolhem a Transpotech
        </h2>
      </div>

      <div className="relative flex w-full items-center gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex h-[299px] flex-1 flex-col justify-between overflow-hidden rounded-xl bg-[rgba(251,251,251,0.05)] p-6"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary-500">
              <Image src={card.icon} alt="" className="size-8" />
            </div>
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
