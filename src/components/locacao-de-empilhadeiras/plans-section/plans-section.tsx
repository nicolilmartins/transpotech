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

export function PlansSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      {/* Cabeçalho — alinhado à esquerda */}
      <div className="flex max-w-[640px] flex-col gap-4">
        <h2 className="text-h2 text-neutral-50">
          <span className="font-normal">Planos de locação para</span>
          <br />
          <span className="font-bold text-primary-500">
            diferentes demandas
          </span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-400">
          Do contrato de longo prazo ao short rental para picos sazonais,
          escolha o modelo que melhor se encaixa na sua operação, sempre com
          manutenção e suporte técnico da TranspoTech.
        </p>
      </div>

      {/* Planos — linhas divisórias + tick laranja por linha */}
      <div className="w-full">
        <ul className="flex flex-col border-t border-white/10">
          {plans.map((p) => (
            <li
              key={p.plano}
              className="group relative flex flex-col gap-3 border-b border-white/10 py-10 transition-colors lg:flex-row lg:gap-16 lg:py-12"
            >
              {/* Linha precisa à esquerda — fica laranja no hover */}
              <span
                aria-hidden
                className="absolute left-0 top-10 h-9 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-primary-500 lg:top-12"
              />

              <h3 className="pl-6 font-heading text-h4 font-normal text-neutral-100 transition-colors duration-300 group-hover:text-primary-500 lg:w-1/2 lg:pl-8">
                {p.plano}
              </h3>

              <p className="pl-6 text-body leading-[1.5] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-50 lg:w-1/2 lg:pl-0">
                {p.quando}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
