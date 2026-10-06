import { Camera, Spotlight, ScanLine, MoveVertical, Flashlight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { IconCard } from "@/components/acessorios/icon-card/icon-card";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { acessoriosPage } from "@/sanity/content/pages/acessorios";

const CTA_HREF = "#solicitar-acessorios";

// Ícone de cada card, na ordem dos acessórios da definição.
const icons = [Camera, Spotlight, ScanLine, MoveVertical, Flashlight];

type ShelfAccessoriesContent = SectionContent<typeof acessoriosPage.sections.shelfAccessories>;

export function ShelfAccessoriesSection({ content }: { content: ShelfAccessoriesContent }) {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-800">
          <LineBreaks text={content.title} brClassName="hidden lg:inline" />{" "}
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          <LineBreaks text={content.description} brClassName="hidden lg:inline" />
        </p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {content.items.map((item, i) => (
          <IconCard key={item.title} {...item} Icon={icons[i]} ctaHref={CTA_HREF} />
        ))}
      </div>
    </Section>
  );
}
