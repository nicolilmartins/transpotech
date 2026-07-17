import {
  TrendingUp,
  CalendarClock,
  ShieldCheck,
  Warehouse,
  RefreshCw,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";

type Card = { title: string; description: string; Icon: LucideIcon };

// "\n" força quebra de linha fixa na descrição (whitespace-pre-line no <p>).

const cards: Card[] = [
  {
    title: "Expansão controlada",
    description:
      "Adicionar capacidade sem comprometer CAPEX em equipamento novo.",
    Icon: TrendingUp,
  },
  {
    title: "Projetos temporários",
    description: "Obras, contratos com prazo fixo\ne operações sazonais.",
    Icon: CalendarClock,
  },
  {
    title: "Backup de frota",
    description:
      "Garantir continuidade operacional quando o equipamento principal sai para manutenção.",
    Icon: ShieldCheck,
  },
  {
    title: "Operações de pátio",
    description:
      "Aplicações externas onde robustez é mais importante que tecnologia de ponta.",
    Icon: Warehouse,
  },
  {
    title: "Substituição de fim de vida",
    description:
      "Trocar equipamento muito antigo por uma seminova mais nova com TCO melhor.",
    Icon: RefreshCw,
  },
  {
    title: "Operação inicial",
    description:
      "Pequenas e médias empresas começando a estruturar a frota intralogística.",
    Icon: Rocket,
  },
];

function ValueCard({ title, description, Icon }: Card) {
  // Mesma superfície dos cards brancos da seção "Por que comprar seminova
  // com a TranspoTech" (bg-neutral-50 + sombra esverdeada no hover).
  return (
    <div className="flex min-h-[280px] flex-1 flex-col rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)]">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
        <Icon className="size-6 text-white lg:size-7" aria-hidden />
      </div>
      {/* Bloco de texto ancorado na base do card (mt-auto) */}
      <div className="mt-auto flex flex-col gap-4">
        <h3 className="line-clamp-1 font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
          {title}
        </h3>
        <p className="line-clamp-2 min-h-[2.7em] whitespace-pre-line text-body leading-[1.35] text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ValueSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[720px] flex-col gap-4">
        {/* Duas linhas fixas (nowrap só no desktop; no mobile flui natural) */}
        <h2 className="text-h2 font-normal text-neutral-800">
          <span className="lg:block lg:whitespace-nowrap">
            Onde a empilhadeira seminova
          </span>{" "}
          <span className="lg:block">
            entrega{" "}
            <span className="font-bold text-primary-500">mais valor</span>
          </span>
        </h2>
      </div>

      {/* Cards — mesmo visual/comportamento da seção de serviços da home
          (sem a parte do botão) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <ValueCard key={card.title} {...card} />
        ))}
      </div>
    </Section>
  );
}
