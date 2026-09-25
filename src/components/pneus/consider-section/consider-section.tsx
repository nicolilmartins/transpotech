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
import type { SectionContent } from "@/sanity/content/fields";
import type { pneusPage } from "@/sanity/content/pages/pneus";

// Ícone de cada item, na ordem dos itens editados no Studio.
const icons: LucideIcon[] = [
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
];

type ConsiderContent = SectionContent<typeof pneusPage.sections.consider>;

export function ConsiderSection({ content }: { content: ConsiderContent }) {
  return (
    <Section
      data-header-dark
      className="flex flex-col gap-10 lg:flex-row lg:gap-16"
    >
      <div className="flex flex-1 flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 font-normal text-neutral-50">
            {content.title}{" "}
            <br className="hidden lg:inline" />
            {content.titleMiddle}{" "}
            <span className="font-bold">{content.titleAccent}</span>
          </h2>
          <p className="max-w-[460px] text-body leading-[1.35] text-neutral-400">
            {content.description}
          </p>
        </div>

        {/* Desktop: botão na coluna do texto */}
        <div className="hidden lg:block">
          <Button variant="primary" size="lg" href="#solicitar-pneus">
            {content.buttonLabel}
          </Button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-3 lg:flex-[1.3]">
        {content.items.map((item, i) => {
          const Icon = icons[i];
          return (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <Icon aria-hidden className="size-5 shrink-0 text-primary-500" />
            <span className="text-body text-neutral-200">{item.label}</span>
          </li>
          );
        })}
      </ul>

      {/* Mobile: botão abaixo dos cards de tópicos */}
      <div className="lg:hidden">
        <Button variant="primary" size="lg" href="#solicitar-pneus">
          {content.buttonLabel}
        </Button>
      </div>
    </Section>
  );
}
