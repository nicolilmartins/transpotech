import { PhotoHero } from "@/components/layout/photo-hero";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { quemSomosPage } from "@/sanity/content/pages/quem-somos";

type QuemSomosHeroContent = SectionContent<typeof quemSomosPage.sections.hero>;

export function QuemSomosHeroSection({ content }: { content: QuemSomosHeroContent }) {
  return (
    <PhotoHero
      image={content.image}
      contentClassName="max-w-[820px]"
      titleClassName="text-balance text-h2 text-neutral-50"
      titleSegments={[
        { text: content.titleRegular, className: "font-normal" },
        { text: content.titleAccent, className: "font-bold text-primary-500" },
      ]}
      descriptionClassName="max-w-[520px]"
      description={content.description}
      cta={{ href: ROUTES.CONTATO, label: content.buttonLabel }}
    />
  );
}
