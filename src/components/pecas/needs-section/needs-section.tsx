import { TextLink } from "@/components/ui/text-link";
import { Recycle, Zap, Droplet, HelpCircle, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { pecasPage } from "@/sanity/content/pages/pecas";

// Ícone de cada card, na ordem dos cards editados no Studio.
const icons: LucideIcon[] = [Recycle, Zap, Droplet, HelpCircle];

type NeedsContent = SectionContent<typeof pecasPage.sections.needs>;

export function NeedsSection({ content }: { content: NeedsContent }) {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[560px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-800">
          {content.title}
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          <LineBreaks text={content.description} brClassName="hidden lg:inline" />
        </p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {content.items.map((need, i) => {
          const Icon = icons[i];
          return (
          <div
            key={need.title}
            className="flex w-full flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-surface-subtle p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {need.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {need.description}
                </p>
              </div>
            </div>
            <TextLink
              href="#solicitar-pecas"
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
