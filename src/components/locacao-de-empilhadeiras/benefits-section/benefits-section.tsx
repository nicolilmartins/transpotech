import {
  Landmark,
  Gauge,
  Target,
  Wallet,
  ShieldCheck,
  RefreshCw,
  TrendingDown,
  ArrowLeftRight,
  Headset,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";

type Benefit = { title: string; Icon: LucideIcon };

// Ordem em fluxo de linha (row-major) para as 3 colunas.
const benefits: Benefit[] = [
  { title: "Incentivos fiscais", Icon: Landmark },
  { title: "Gestão inteligente de frota", Icon: Gauge },
  { title: "Você 100% focado apenas no seu negócio", Icon: Target },
  { title: "Custo mensal fixo", Icon: Wallet },
  { title: "Garantia de disponibilidade", Icon: ShieldCheck },
  { title: "Atualização e renovação de frota garantida", Icon: RefreshCw },
  { title: "Redução de custos", Icon: TrendingDown },
  { title: "Flexibilidade de troca", Icon: ArrowLeftRight },
  { title: "Assistência técnica especializada 24/7", Icon: Headset },
];

export function BenefitsSection() {
  return (
    <Section data-header-dark className="flex flex-col gap-10 lg:gap-14">
      {/* Cabeçalho — chip + título + subtítulo */}
      <div className="flex w-full max-w-[620px] flex-col gap-6">
        <h2 className="text-h2 text-neutral-50">
          <span className="font-bold">Benefícios de alugar</span>{" "}
          <span className="font-normal">com a TranspoTech</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          Mais de 80% da frota usa baterias de íons de lítio: tecnologia que
          reduz custo, libera espaço e elimina paradas de troca.
        </p>
      </div>

      {/* Grade de benefícios — ícone no topo + título, com divisores */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <li
            key={b.title}
            className="flex flex-col gap-4 border-t border-white/10 py-8 lg:px-8 lg:[&:not(:nth-child(3n+1))]:border-l lg:[&:not(:nth-child(3n+1))]:border-white/10 lg:[&:nth-child(3n+1)]:pl-0"
          >
            <b.Icon aria-hidden className="size-6 text-primary-500" />
            <span className="text-body font-semibold leading-[1.35] text-neutral-100">
              {b.title}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
