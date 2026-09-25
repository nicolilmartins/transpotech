import { Section } from "@/components/ui/section";
import { Catalog } from "@/components/empilhadeiras-novas/catalog-section/catalog/catalog";
import type { Forklift } from "@/types/forklift.types";
import type { SectionContent } from "@/sanity/content/fields";
import type { empilhadeirasNovasPage } from "@/sanity/content/pages/empilhadeiras-novas";
import { BrandLogoFilters } from "./brand-logo-filters";

type CatalogContent = SectionContent<typeof empilhadeirasNovasPage.sections.catalog>;

export function CatalogSection({
  forklifts,
  content,
}: {
  forklifts: Forklift[];
  content: CatalogContent;
}) {
  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      {/* Cabeçalho da página */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-h2 text-neutral-800">
            <span className="font-normal">{content.titleRegular}</span>
            <span className="font-bold text-primary-500">{content.titleAccent}</span>
          </h1>
          <p className="max-w-[384px] text-body leading-[1.35] text-neutral-600">
            {content.description}
          </p>
        </div>

        {/* Logos clicáveis: filtram o catálogo pela marca (Client Component;
            esta seção segue no servidor). */}
        <BrandLogoFilters />
      </div>

      <Catalog forklifts={forklifts} />
    </Section>
  );
}
