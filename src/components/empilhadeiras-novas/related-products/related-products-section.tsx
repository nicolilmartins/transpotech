"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ProductCard } from "@/components/catalog/product-card/product-card";
import { QuoteModal } from "@/components/catalog/quote-modal/quote-modal";
import { forkliftsNovas } from "@/data/forklifts-novas";
import { ROUTES } from "@/lib/routes";
import type { Forklift } from "@/types/forklift.types";

export function RelatedProductsSection({ items }: { items: Forklift[] }) {
  const [quoteForId, setQuoteForId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-body font-semibold uppercase leading-[1.1] text-secondary-600">
            Produtos relacionados
          </p>
          <h2 className="max-w-[408px] text-h2 font-normal leading-[1.1] text-neutral-800">
            Outras opções que podem servir
          </h2>
        </div>

        <TextLink href={ROUTES.EMPILHADEIRAS_NOVAS} className="shrink-0">
          Ver catálogo completo
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
        <QuoteModal
          onClose={() => setQuoteForId(null)}
          forklifts={forkliftsNovas}
          initialSelectedId={quoteForId}
        />
      )}
    </Section>
  );
}
