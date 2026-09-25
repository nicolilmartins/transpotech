"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ProductCard } from "@/components/layout/product-card/product-card";
import { LazyQuoteModal } from "@/components/layout/quote-modal/lazy-quote-modal";
import { ROUTES } from "@/lib/routes";
import type { Forklift } from "@/types/forklift.types";
import type { SectionContent } from "@/sanity/content/fields";
import type { empilhadeirasNovasPage } from "@/sanity/content/pages/empilhadeiras-novas";

type DetailContent = SectionContent<typeof empilhadeirasNovasPage.sections.detail>;

type RelatedProductsSectionProps = {
  items: Forklift[];
  /** Catálogo completo, oferecido no modal de orçamento. */
  forklifts: Forklift[];
  content: Pick<DetailContent, "relatedEyebrow" | "relatedTitle" | "relatedLinkLabel">;
};

export function RelatedProductsSection({
  items,
  forklifts,
  content,
}: RelatedProductsSectionProps) {
  const [quoteForId, setQuoteForId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-body font-semibold uppercase leading-[1.1] text-secondary-600">
            {content.relatedEyebrow}
          </p>
          <h2 className="max-w-[408px] text-h2 font-normal leading-[1.1] text-neutral-800">
            {content.relatedTitle}
          </h2>
        </div>

        <TextLink href={ROUTES.EMPILHADEIRAS_NOVAS} className="shrink-0">
          {content.relatedLinkLabel}
        </TextLink>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((forklift) => (
          <ProductCard
            key={forklift.id}
            forklift={forklift}
            onRequestQuote={(f) => setQuoteForId(f.id)}
          />
        ))}
      </div>

      {quoteForId && (
        <LazyQuoteModal
          onClose={() => setQuoteForId(null)}
          forklifts={forklifts}
          initialSelectedId={quoteForId}
        />
      )}
    </Section>
  );
}
