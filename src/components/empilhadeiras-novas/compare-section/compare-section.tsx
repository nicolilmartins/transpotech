import { Section } from "@/components/ui/section";

type CompareItem = {
  title: string;
  description: string;
  points: string[];
  accent: "primary" | "secondary";
};

// Comparativo elétrica × GLP — copy baseada no posicionamento TranspoTech,
// Linde (E20–E50) e STILL (RX 60 / linhas a combustão). Elétrica com acento
// verde (cor de eletrificação/ESG da identidade) e GLP em laranja.
const items: CompareItem[] = [
  {
    title: "Elétrica",
    description:
      "Zero emissões e operação silenciosa. Ideal para ambientes internos e setores exigentes como alimentício, farmacêutico e eletrônico.",
    points: [
      "Desempenho no nível das empilhadeiras a combustão",
      "Zero emissões locais — segura para operação indoor",
      "Menos ruído e vibração, mais conforto para o operador",
      "Opção de íons de lítio, com carga de oportunidade entre turnos",
      "Menor custo de energia e manutenção",
    ],
    accent: "secondary",
  },
  {
    title: "GLP",
    description:
      "Robustez e disponibilidade contínua para uso intensivo. Ideal para operações pesadas, áreas externas e múltiplos turnos.",
    points: [
      "Autonomia contínua — troca rápida de cilindro, sem pausa para recarga",
      "Desempenho constante em jornadas intensas e múltiplos turnos",
      "Robustez para rampas, pisos irregulares e áreas externas",
      "Capacidades maiores para cargas pesadas",
    ],
    accent: "primary",
  },
];

function CompareCard({ title, description, points, accent }: CompareItem) {
  const isPrimary = accent === "primary";
  const accentText = isPrimary ? "text-primary-500" : "text-secondary-600";
  const glowBg = isPrimary ? "bg-primary-500" : "bg-secondary-600";
  const bulletBg = isPrimary ? "bg-primary-500" : "bg-secondary-600";

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
        <p className="relative mt-3 text-body leading-[1.35] text-neutral-600">
          {description}
        </p>
      </div>

      {/* Zona dos tópicos — mesmo #F7F6F6 a 40% (divisão) + leve linha */}
      <div className="relative flex-1 border-t border-black/[0.04] bg-[#f7f6f6]/40 px-6 pb-8 pt-6 lg:px-8">
        <ul className="relative z-10 flex flex-col gap-2.5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-2 size-1.5 shrink-0 rounded-full ${bulletBg}`}
              />
              <span className="text-body leading-[1.35] text-neutral-700">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CompareSection() {
  return (
    <Section className="flex flex-col items-center gap-12 lg:gap-16">
      <div className="flex max-w-[640px] flex-col gap-4 text-center">
        <h2 className="text-h2 text-neutral-800">
          <span className="lg:block font-normal">
            Empilhadeira elétrica ou GLP:
          </span>{" "}
          <span className="lg:block font-bold text-primary-500">
            qual escolher?
          </span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          As duas movimentam as mesmas cargas, mas brilham em operações
          diferentes. Veja qual encaixa melhor na sua rotina antes de escolher
          o modelo.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <CompareCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  );
}
