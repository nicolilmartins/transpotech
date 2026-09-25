import { Section } from "@/components/ui/section";
import { StatsGrid } from "@/components/layout/stats-grid";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { automacaoPage } from "@/sanity/content/pages/automacao";

type BenefitsContent = SectionContent<typeof automacaoPage.sections.benefits>;

export function BenefitsSection({ content }: { content: BenefitsContent }) {
  return (
    <Section data-header-dark className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[640px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-primary-400">
          {content.eyebrow}
        </p>
        <h2 className="text-h2 font-normal text-neutral-50">
          {content.title}{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">
            {content.titleAccent}
          </span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          <LineBreaks text={content.description} />
        </p>
      </div>

      <StatsGrid stats={content.stats} />
    </Section>
  );
}
