import {
  Forklift,
  Ruler,
  Grid3x3,
  Building2,
  Boxes,
  Gauge,
  Clock,
  Disc3,
  MapPin,
  AlarmClock,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

const checklist: { label: string; Icon: LucideIcon }[] = [
  { label: "Tipo de equipamento", Icon: Forklift },
  { label: "Medida do pneu atual", Icon: Ruler },
  { label: "Tipo de piso", Icon: Grid3x3 },
  { label: "Ambiente interno ou externo", Icon: Building2 },
  { label: "Carga movimentada", Icon: Boxes },
  { label: "Intensidade de uso", Icon: Gauge },
  { label: "Horas de operação por dia", Icon: Clock },
  { label: "Condição atual do pneu", Icon: Disc3 },
  { label: "Cidade/UF", Icon: MapPin },
  { label: "Urgência da troca", Icon: AlarmClock },
];

export function ConsiderSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col gap-10 lg:flex-row lg:gap-16"
    >
      <div className="flex flex-1 flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 font-normal text-neutral-50">
            O que considerar antes{" "}
            <br className="hidden lg:inline" />
            de <span className="font-bold">solicitar pneus?</span>
          </h2>
          <p className="max-w-[460px] text-body leading-[1.35] text-neutral-400">
            Marque ou anote o que se aplica à sua operação. Quanto mais detalhes,
            mais precisa a cotação.
          </p>
        </div>

        {/* Desktop: botão na coluna do texto */}
        <div className="hidden lg:block">
          <Button variant="primary" size="lg" href={ROUTES.ORCAMENTO}>
            Enviar informações para cotação
          </Button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-3 lg:flex-[1.3]">
        {checklist.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <item.Icon aria-hidden className="size-5 shrink-0 text-primary-500" />
            <span className="text-body text-neutral-200">{item.label}</span>
          </li>
        ))}
      </ul>

      {/* Mobile: botão abaixo dos cards de tópicos */}
      <div className="lg:hidden">
        <Button variant="primary" size="lg" href={ROUTES.ORCAMENTO}>
          Enviar informações para cotação
        </Button>
      </div>
    </Section>
  );
}
