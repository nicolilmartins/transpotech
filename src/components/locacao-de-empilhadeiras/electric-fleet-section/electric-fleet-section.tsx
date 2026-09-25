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
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { locacaoPage } from "@/sanity/content/pages/locacao";

// Ícone de cada vantagem, na ordem dos itens editados no Studio.
const icons: LucideIcon[] = [
  BatteryPlus,
  BatteryCharging,
  Leaf,
  CircleDollarSign,
  CalendarClock,
  PlugZap,
  Building2,
  Repeat1,
];

type ElectricFleetContent = SectionContent<typeof locacaoPage.sections.electricFleet>;

export function ElectricFleetSection({ content }: { content: ElectricFleetContent }) {
  return (
    <Section className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
      {/* Cabeçalho — à esquerda, no topo */}
      <div className="flex flex-col gap-4 lg:w-[420px] lg:shrink-0">
        <h2 className="text-h3 text-neutral-800">
          <span className="font-normal">
            <LineBreaks text={content.title} brClassName="hidden lg:inline" />
          </span>
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-500">
          {content.description}
        </p>
      </div>

      {/* Cards — ícone verde + tópico (uma linha); todos do mesmo tamanho */}
      <ul className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-3">
        {content.items.map(({ label }, i) => {
          const Icon = icons[i];
          return (
            <li
              key={label}
              className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3"
            >
              <Icon aria-hidden className="size-5 shrink-0 text-secondary-600" />
              <span className="whitespace-nowrap text-body text-neutral-800">
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
