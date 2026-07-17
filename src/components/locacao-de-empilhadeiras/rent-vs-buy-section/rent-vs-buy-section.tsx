import { Section } from "@/components/ui/section";

const rentReasons = [
  "A demanda varia ao longo do ano",
  "A operação está crescendo ou abrindo uma nova unidade",
  "A manutenção da frota própria está ficando cara",
  "A empresa quer evitar obsolescência dos equipamentos",
  "Existe pressão para reduzir CAPEX",
  "A operação precisa de suporte técnico e troca mais ágil",
];

const buyReasons = [
  "A operação é muito estável",
  "O uso é previsível por muitos anos",
  "A empresa tem equipe interna robusta de manutenção",
  "A frota própria já está bem dimensionada",
];

type CompareCardProps = {
  title: string;
  reasons: string[];
  accent: "rent" | "buy";
};

function CompareCard({ title, reasons, accent }: CompareCardProps) {
  const isRent = accent === "rent";
  const accentText = isRent ? "text-primary-500" : "text-secondary-600";
  const glowBg = isRent ? "bg-primary-500" : "bg-secondary-600";
  const bulletBg = isRent ? "bg-primary-500" : "bg-secondary-600";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl">
      {/* Zona do título — fundo #F7F6F6 + blur de acento bem suave (acende no hover) */}
      <div className="relative overflow-hidden bg-[#f7f6f6] px-6 pb-6 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full ${glowBg} opacity-[0.1] blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.28]`}
        />
        <h3 className={`relative text-h6 font-semibold ${accentText}`}>
          {title}
        </h3>
      </div>

      {/* Zona dos tópicos — mesmo #F7F6F6 a 50% (divisão) + leve linha */}
      <div className="relative flex-1 border-t border-black/[0.04] bg-[#f7f6f6]/50 px-6 pb-8 pt-6 lg:px-8">
        <ul className="relative z-10 flex flex-col gap-2.5">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-[9px] size-1.5 shrink-0 rounded-full ${bulletBg}`}
              />
              <span className="text-body leading-[1.35] text-neutral-700">
                {reason}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RentVsBuySection() {
  return (
    <Section className="flex flex-col items-center gap-12 lg:gap-16">
      {/* Cabeçalho centralizado */}
      <div className="flex max-w-[560px] flex-col gap-4 text-center">
        {/* Duas linhas fixas em todos os tamanhos: "Vale a pena" /
            "locar ou comprar?" (block também no mobile). */}
        <h2 className="text-h2 text-neutral-800">
          <span className="block font-normal">Vale a pena</span>{" "}
          <span className="block font-bold text-primary-500">
            locar ou comprar?
          </span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Cada uma com seus benefícios próprios. A escolha certa deve sempre se
          basear nas necessidades da sua operação.
        </p>
      </div>

      {/* Comparativo */}
      <div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        <CompareCard
          title="Locar pode ser melhor quando:"
          reasons={rentReasons}
          accent="rent"
        />
        <CompareCard
          title="Comprar pode ser melhor quando:"
          reasons={buyReasons}
          accent="buy"
        />
      </div>
    </Section>
  );
}
