import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import type { SectionContent } from "@/sanity/content/fields";
import type { automacaoPage } from "@/sanity/content/pages/automacao";

type SegmentsContent = SectionContent<typeof automacaoPage.sections.segments>;

export function SegmentsSection({ content }: { content: SegmentsContent }) {
  return (
    <Section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 font-normal text-neutral-800">
            {content.title}{" "}
            <br className="hidden lg:inline" />
            <span className="font-bold">{content.titleAccent}</span>
          </h2>
          <p className="max-w-[460px] text-body leading-[1.35] text-neutral-600">
            {content.description}
          </p>
        </div>

        {/* Desktop: botão na coluna do texto */}
        <div className="hidden lg:block">
          <Button variant="primary" size="lg" href="#avaliar-automacao">
            {content.buttonLabel}
          </Button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-3 lg:flex-[1.3]">
        {content.items.map(({ label: segment }) => (
          <li
            key={segment}
            // Mesma pastilha clara da seção "Por que a maior parte da nossa
            // frota é elétrica" (locação), sem borda.
            className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3"
          >
            <CircleCheck aria-hidden className="size-5 shrink-0 text-primary-500" />
            <span className="text-body text-neutral-800">{segment}</span>
          </li>
        ))}
      </ul>

      {/* Mobile: botão abaixo dos segmentos */}
      <div className="lg:hidden">
        <Button variant="primary" size="lg" href="#avaliar-automacao">
          {content.buttonLabel}
        </Button>
      </div>
    </Section>
  );
}
