import {
  BatteryPlus,
  BatteryCharging,
  Leaf,
  CircleDollarSign,
  CalendarClock,
  PlugZap,
  Building2,
  Repeat1,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";

type Benefit = { title: string; Icon: LucideIcon };

const benefits: Benefit[] = [
  { title: "Sem troca de bateria", Icon: BatteryPlus },
  { title: "Redução de até 30% no consumo", Icon: BatteryCharging },
  { title: "Sem emissão de gases nem ácidos", Icon: Leaf },
  { title: "Retorno do investimento mais rápido", Icon: CircleDollarSign },
  { title: "Vida útil até 3x maior", Icon: CalendarClock },
  { title: "Carregamento rápido", Icon: PlugZap },
  { title: "Não requer sala de baterias", Icon: Building2 },
  { title: "Uma única bateria por equipamento", Icon: Repeat1 },
];

export function ElectricFleetSection() {
  return (
    <Section className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
      {/* Cabeçalho — à esquerda, no topo */}
      <div className="flex flex-col gap-4 lg:w-[420px] lg:shrink-0">
        <h2 className="text-h3 text-neutral-800">
          <span className="font-normal">Por que a maior parte da</span>
          <br />
          <span className="font-normal">nossa frota </span>
          <span className="font-bold text-primary-500">é elétrica</span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-500">
          Mais de 80% com baterias de íons de lítio, garantindo mais eficiência,
          menos manutenção e um ambiente mais limpo.
        </p>
      </div>

      {/* Cards — ícone verde + tópico (uma linha); todos do mesmo tamanho */}
      <ul className="grid w-full flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {benefits.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-3 rounded-xl bg-[#F7F6F6] px-4 py-3"
          >
            <item.Icon aria-hidden className="size-5 shrink-0 text-secondary-600" />
            <span className="whitespace-nowrap text-body text-neutral-800">
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
