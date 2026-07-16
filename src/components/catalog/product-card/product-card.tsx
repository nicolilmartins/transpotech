import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import type { Forklift, ForkliftBrand } from "@/types/forklift.types";

const brandLabel: Record<ForkliftBrand, string> = {
  STILL: "Still",
  Linde: "Linde",
  Baoli: "Baoli",
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 whitespace-nowrap text-body text-neutral-600">
        {label}
      </dt>
      <dd className="min-w-0 truncate text-right text-body font-semibold text-neutral-800">
        {value}
      </dd>
    </div>
  );
}

export function ProductCard({
  forklift,
  onRequestQuote,
}: {
  forklift: Forklift;
  /** Quando definido, "Solicitar orçamento" abre o modal em vez de navegar. */
  onRequestQuote?: (forklift: Forklift) => void;
}) {
  return (
    // Card com padding simétrico (p-6 = 24px). gap-8 (32px) separa imagem →
    // textos → botões. A imagem fica DENTRO do card, sem exceder o topo.
    <article className="flex h-full flex-col gap-8 rounded-3xl bg-white p-6 transition duration-300 hover:scale-[1.02] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
      {/* Imagem do produto — contida dentro do card */}
      <div className="relative h-[200px] w-full">
        <Image
          src={forklift.image}
          alt={forklift.name}
          fill
          sizes="(min-width: 1024px) 262px, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      {/* Bloco de textos — 32px da imagem (gap-8 do article) */}
      <div className="flex flex-col gap-8">
        {/* Tags acima do título = 16px */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-1">
            <span className="rounded-full bg-primary-600 px-4 py-1 text-body-sm text-neutral-50">
              {brandLabel[forklift.brand]}
            </span>
            <span className="rounded-full bg-neutral-100 px-4 py-1 text-body-sm text-neutral-600">
              {forklift.energyTag}
            </span>
          </div>

          {/* Título → descrição = 8px. Título reserva sempre 2 linhas; descrição 1. */}
          <div className="flex flex-col gap-2">
            <h3 className="line-clamp-2 min-h-[2.4em] font-heading text-[1.25rem] font-medium leading-[1.2] text-neutral-800">
              {forklift.name}
            </h3>
            <p className="line-clamp-1 min-h-[1.35em] text-body text-neutral-500">
              {forklift.application}
            </p>
          </div>
        </div>

        {/* Características — linhas com 8px */}
        <dl className="flex flex-col gap-2">
          <SpecRow label="Capacidade" value={forklift.capacity} />
          <SpecRow label="Energia" value={forklift.energy} />
          <SpecRow label="Elevação" value={forklift.liftHeight} />
          <SpecRow label="Corredor operacional" value={forklift.aisleWidth} />
        </dl>
      </div>

      {/* Botões — pinados na base do card (mt-auto) para alinhar em todos os
          cards; 32px do bloco de textos (gap-8 do article) quando não há folga. */}
      <div className="mt-auto flex flex-col gap-2">
        {onRequestQuote ? (
          <Button
            variant="primary"
            size="lg"
            onClick={() => onRequestQuote(forklift)}
            className="w-full justify-center"
          >
            Solicitar orçamento
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            href={ROUTES.ORCAMENTO}
            className="w-full justify-center"
          >
            Solicitar orçamento
          </Button>
        )}
        <Button
          variant="gray"
          size="lg"
          href={`${ROUTES.EMPILHADEIRAS_NOVAS}/${forklift.id}`}
          className="w-full justify-center"
        >
          Ver detalhes
        </Button>
      </div>
    </article>
  );
}
