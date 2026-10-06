import { Section } from "@/components/ui/section";
import { TopicCard } from "@/components/layout/topic-card";
import type { SectionContent } from "@/sanity/content/fields";
import type { acessoriosPage } from "@/sanity/content/pages/acessorios";

const CTA_HREF = "#solicitar-acessorios";

type SolutionsContent = SectionContent<typeof acessoriosPage.sections.solutions>;

export function SolutionsSection({ content }: { content: SolutionsContent }) {
  return (
    <Section data-header-dark className="flex flex-col gap-10 lg:gap-12">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-50">
          {content.title}{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-balance text-body leading-[1.35] text-neutral-300">
          {content.description}
        </p>
      </div>

      {/* 3 colunas só a partir de xl: abaixo disso o card fica estreito demais
          para manter descrição em 2 linhas e tópicos em 1 linha. */}
      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-3">
        {content.cards.map((solution) => (
          <TopicCard
            key={solution.title}
            {...solution}
            items={solution.items.map((item) => item.text)}
            ctaHref={CTA_HREF}
          />
        ))}
      </div>
    </Section>
  );
}
