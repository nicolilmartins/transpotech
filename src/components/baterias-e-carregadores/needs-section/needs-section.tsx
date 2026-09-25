import { TextLink } from "@/components/ui/text-link";
import {
  Battery,
  PlugZap,
  Gauge,
  RefreshCw,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import type { SectionContent } from "@/sanity/content/fields";
import type { bateriasPage } from "@/sanity/content/pages/baterias";

// Ícone de cada card, na ordem dos cards editados no Studio.
const icons: LucideIcon[] = [Battery, PlugZap, Gauge, RefreshCw, HelpCircle];

type NeedsContent = SectionContent<typeof bateriasPage.sections.needs>;

export function NeedsSection({ content }: { content: NeedsContent }) {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <h2 className="text-h2 font-normal text-neutral-800">
        {content.title}
      </h2>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {content.items.map((need, i) => {
          const Icon = icons[i];
          return (
          <div
            key={need.title}
            className="flex w-full flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-surface-subtle p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {need.title}
                </h3>
                <p className="line-clamp-2 min-h-[2.7em] text-body leading-[1.35] text-neutral-600">
                  {need.description}
                </p>
              </div>
            </div>
            <TextLink
              href="#solicitar-baterias"
              className="w-full px-6 py-4 text-left"
            >
              {need.cta}
            </TextLink>
          </div>
          );
        })}
      </div>
    </Section>
  );
}
