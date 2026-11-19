import { Section } from "@/components/ui/section";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { DriftMesh } from "@/components/layout/drift-mesh";
import type { SectionContent } from "@/sanity/content/fields";
import type { simularEconomiaPage } from "@/sanity/content/pages/simular-economia";

type OrcamentoHeroContent = SectionContent<typeof simularEconomiaPage.sections.hero>;

export function OrcamentoHeroSection({ content }: { content: OrcamentoHeroContent }) {

  return (
    <div
      data-header-hero
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Malha que anda sozinha no fundo (como nas heros do site) */}
      <DriftMesh
        fade
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <Section className="flex flex-col items-center gap-4 pb-[36px] pt-[168px] text-center lg:pb-[48px] lg:pt-[196px]">
        <p className="text-body font-semibold uppercase tracking-wide text-primary-500">
          {content.eyebrow}
        </p>
        <BlurRevealTitle
          className="text-balance text-h2 text-neutral-800"
          segments={[
            { text: content.titleTop, className: "font-normal", br: true },
            { text: content.titleAccent, className: "font-bold text-primary-500" },
          ]}
        />
        <p className="mx-auto max-w-[620px] text-pretty text-body leading-[1.5] text-neutral-600">
          {content.description}
        </p>
      </Section>
    </div>
  );
}
