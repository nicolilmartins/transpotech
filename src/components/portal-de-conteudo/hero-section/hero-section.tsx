import { Section } from "@/components/ui/section";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { portalConteudoPage } from "@/sanity/content/pages/portal-conteudo";

type PortalHeroContent = SectionContent<typeof portalConteudoPage.sections.hero>;

export function PortalHeroSection({ content }: { content: PortalHeroContent }) {
  return (
    <Section className="flex flex-col gap-4 pb-5">
      <BlurRevealTitle
        className="max-w-[720px] text-h2 font-bold text-neutral-800"
        segments={[
          { text: `${content.titleRegular} ` },
          {
            text: content.titleAccent,
            className: "text-primary-500",
          },
        ]}
      />
      <p className="max-w-[620px] text-body leading-[1.35] text-neutral-600">
        <LineBreaks text={content.description} brClassName="hidden lg:inline" />
      </p>
    </Section>
  );
}
