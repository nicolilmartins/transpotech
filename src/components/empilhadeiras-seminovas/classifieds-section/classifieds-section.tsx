"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/layout/product-card/product-card";
import { LazyQuoteModal } from "@/components/layout/quote-modal/lazy-quote-modal";
import { ROUTES } from "@/lib/routes";
import type { Forklift } from "@/types/forklift.types";

type ClassifiedsSectionProps = {
  /** Equipamentos exibidos. */
  items: Forklift[];
  /** Opções do modal de orçamento. Default: `items`. */
  quoteOptions?: Forklift[];
  eyebrow: string;
  title: string;
  labelYear: string;
  labelHours: string;
  labelCapacity: string;
  labelLocation: string;
  /** id de âncora — usado por links que apontam direto para a lista. */
  id?: string;
};

// Mesmo card, cabeçalho e grade da seção "Outras opções que podem servir" (no
// detalhe de novas): os cards fluem na vertical, quebrando em novas linhas
// conforme o estoque cresce, sem rolagem horizontal.
export function ClassifiedsSection({
  items,
  quoteOptions = items,
  eyebrow,
  title,
  labelYear,
  labelHours,
  labelCapacity,
  labelLocation,
  id,
}: ClassifiedsSectionProps) {
  const [quoteForId, setQuoteForId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <Section id={id} className="flex flex-col gap-10 lg:gap-12">
      <div className="flex flex-col gap-4">
        <p className="text-body font-semibold uppercase leading-[1.1] text-secondary-600">
          {eyebrow}
        </p>
        <h2 className="max-w-[408px] text-h2 font-normal leading-[1.1] text-neutral-800">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((forklift) => (
          <ProductCard
            key={forklift.id}
            forklift={forklift}
            onRequestQuote={(f) => setQuoteForId(f.id)}
            detailsHref={`${ROUTES.EMPILHADEIRAS_SEMINOVAS}/${forklift.id}`}
            specs={[
              { label: labelYear, value: forklift.year ?? "—" },
              { label: labelHours, value: forklift.workedHours ?? "—" },
              { label: labelCapacity, value: forklift.capacity },
              { label: labelLocation, value: forklift.location },
            ]}
          />
        ))}
      </div>

      {quoteForId && (
        <LazyQuoteModal
          onClose={() => setQuoteForId(null)}
          forklifts={quoteOptions}
          initialSelectedId={quoteForId}
        />
      )}
    </Section>
  );
}
