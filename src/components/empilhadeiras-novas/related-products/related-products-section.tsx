import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/catalog/product-card/product-card";
import { ROUTES } from "@/lib/routes";
import type { Forklift } from "@/types/forklift.types";

export function RelatedProductsSection({ items }: { items: Forklift[] }) {
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

        <Link
          href={ROUTES.EMPILHADEIRAS_NOVAS}
          className="inline-flex shrink-0 items-center gap-2 text-body font-semibold text-primary-600 transition-colors hover:text-primary-500"
        >
          Ver catálogo completo
          <ArrowRight aria-hidden className="size-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((forklift) => (
          <ProductCard key={forklift.id} forklift={forklift} />
        ))}
      </div>
    </Section>
  );
}
