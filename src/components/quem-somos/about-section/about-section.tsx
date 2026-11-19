import { Section } from "@/components/ui/section";
import type { SectionContent } from "@/sanity/content/fields";
import type { quemSomosPage } from "@/sanity/content/pages/quem-somos";

type AboutContent = SectionContent<typeof quemSomosPage.sections.about>;

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <Section data-header-dark className="flex flex-col gap-6">
      <h2 className="max-w-[820px] text-h2 text-neutral-50">
        <span className="font-normal">{content.titleTop}</span>{" "}
        <br className="hidden lg:inline" />
        <span className="font-bold text-primary-500">
          {content.titleAccent}
        </span>
      </h2>
      <div className="flex max-w-[720px] flex-col gap-4 text-body leading-[1.35] text-neutral-400">
        {content.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph.text}</p>
        ))}
      </div>
    </Section>
  );
}
