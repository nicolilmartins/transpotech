import { Fragment } from "react";
import { Section } from "@/components/ui/section";

type Plan = { plano: string; quando: string };

const plans: Plan[] = [
  {
    plano: "Locação de longo prazo",
    quando:
      "Operações contínuas, CDs, indústrias, supermercados e operadores logísticos",
  },
  {
    plano: "Short rental",
    quando:
      "Picos sazonais, inventários, eventos, testes e demandas temporárias",
  },
  {
    plano: "Frota sob demanda",
    quando: "Expansão, novos contratos ou substituição de frota própria",
  },
  {
    plano: "Locação com manutenção",
    quando: "Empresas que querem reduzir a carga interna de manutenção",
  },
  {
    plano: "Locação de novas e seminovas",
    quando:
      "Diferentes níveis de investimento, prazo e necessidade operacional",
  },
];

// Fundo translúcido do card (topo arredondado + base que se dissolve no fundo dark).
const cardBg =
  "absolute top-0 hidden h-full w-[calc(50%-12px)] overflow-hidden rounded-t-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] ring-1 ring-white/10 lg:block";

export function PlansSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12"
    >
      {/* Título geral — ao lado do comparativo */}
      <div className="lg:w-[320px] lg:shrink-0">
        <h2 className="text-h2 text-neutral-50">
          <span className="font-normal">Planos de locação para </span>
          <span className="font-bold">diferentes demandas</span>
        </h2>
      </div>

      {/* Comparativo — dois cards lado a lado (Plano | Quando faz sentido) */}
      <div className="relative flex-1 lg:pb-10">
        {/* Fundos dos cards (desktop) */}
        <div aria-hidden className={`${cardBg} left-0`}>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#181616] to-transparent" />
        </div>
        <div aria-hidden className={`${cardBg} right-0`}>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#181616] to-transparent" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6">
          {/* Cabeçalhos dos cards (desktop) */}
          <div className="hidden px-6 pb-6 pt-8 text-center lg:block">
            <h3 className="text-h6 font-semibold text-neutral-100">Plano</h3>
          </div>
          <div className="hidden px-6 pb-6 pt-8 text-center lg:block">
            <h3 className="text-h6 font-semibold text-neutral-100">
              Quando faz sentido
            </h3>
          </div>

          {plans.map((p) => (
            <Fragment key={p.plano}>
              {/* Plano */}
              <div className="flex items-center border-t border-white/10 pt-4 text-body font-semibold text-neutral-100 lg:justify-center lg:border-t-0 lg:px-6 lg:py-7 lg:text-center">
                {p.plano}
              </div>
              {/* Quando faz sentido */}
              <div className="pb-4 pt-1 text-body leading-[1.35] text-neutral-300 lg:flex lg:items-center lg:justify-center lg:px-6 lg:py-7 lg:text-center">
                {p.quando}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
}
