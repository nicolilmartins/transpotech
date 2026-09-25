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
import type { SectionContent } from "@/sanity/content/fields";
import type { seminovasPage } from "@/sanity/content/pages/seminovas";

type Card = { title: string; description: string; Icon: LucideIcon };

// Ícone de cada card, na ordem dos cards editados no Studio.
const icons: LucideIcon[] = [TrendingUp, CalendarClock, ShieldCheck, Warehouse, RefreshCw, Rocket];

type ValueContent = SectionContent<typeof seminovasPage.sections.value>;

// Enter digitado na descrição quebra a linha (whitespace-pre-line no <p>).
function ValueCard({ title, description, Icon }: Card) {
  // Mesma superfície dos cards brancos da seção "Por que comprar seminova
  // com a TranspoTech" (bg-neutral-50 + sombra esverdeada no hover).
  return (
    <div className="flex min-h-[280px] flex-1 flex-col rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)]">
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

export function ValueSection({ content }: { content: ValueContent }) {
  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[720px] flex-col gap-4">
        {/* Duas linhas fixas (nowrap só no desktop; no mobile flui natural) */}
        <h2 className="text-h2 font-normal text-neutral-800">
          <span className="lg:block lg:whitespace-nowrap">
            {content.titleTop}
          </span>{" "}
          <span className="lg:block">
            {content.titleMiddle}{" "}
            <span className="font-bold text-primary-500">{content.titleAccent}</span>
          </span>
        </h2>
      </div>

      {/* Cards — mesmo visual/comportamento da seção de serviços da home
          (sem a parte do botão) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.cards.map((card, i) => (
          <ValueCard key={card.title} {...card} Icon={icons[i]} />
        ))}
      </div>
    </Section>
  );
}
