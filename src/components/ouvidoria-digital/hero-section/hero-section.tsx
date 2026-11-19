import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import type { SectionContent } from "@/sanity/content/fields";
import type { ouvidoriaPage } from "@/sanity/content/pages/ouvidoria";

// Hero centralizada (mesmo padrão de Quem Somos) — label, título grande e
// parágrafo no centro; a malha animada (DriftMesh) fica no wrapper da página.
type OuvidoriaHeroContent = SectionContent<typeof ouvidoriaPage.sections.hero>;

export function OuvidoriaHeroSection({ content }: { content: OuvidoriaHeroContent }) {
  return (
    <Section
      data-header-hero
      className="flex min-h-svh flex-col items-center justify-center gap-6 pt-[128px] text-center lg:pt-[152px]"
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
          {content.eyebrow}
        </p>
        <BlurRevealTitle
          className="max-w-[900px] text-h2 text-neutral-800"
          segments={[
            { text: content.titleStart, className: "font-normal" },
            { text: content.titleEnd, className: "font-normal" },
          ]}
        />
      </div>
      <p className="max-w-[640px] text-h6 font-normal leading-[1.35] text-neutral-700">
        {content.description}
      </p>

      <Button
        variant="primary"
        size="lg"
        href="#manifestacao"
        className="mt-4 w-full lg:mt-0 lg:w-auto"
      >
        {content.buttonLabel}
      </Button>
    </Section>
  );
}
