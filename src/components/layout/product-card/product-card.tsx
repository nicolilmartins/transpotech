import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MadeInBrazilBadge } from "@/components/ui/made-in-brazil-badge";
import { ROUTES } from "@/lib/routes";
import { useSharedTexts, type SharedTexts } from "@/components/layout/shared-texts";
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

type SpecItem = { label: string; value: string };

/** Linhas de característica do catálogo de novas — padrão do card. */
function catalogSpecs(
  forklift: Forklift,
  texts: SharedTexts["productCard"],
): SpecItem[] {
  return [
    { label: texts.capacityLabel, value: forklift.capacity },
    { label: texts.energyLabel, value: forklift.energy },
    { label: texts.liftHeightLabel, value: forklift.liftHeight },
    { label: texts.aisleWidthLabel, value: forklift.aisleWidth },
  ];
}

export function ProductCard({
  forklift,
  onRequestQuote,
  specs,
  detailsHref,
}: {
  forklift: Forklift;
  /** "Solicitar orçamento" abre o modal de orçamento com este equipamento. */
  onRequestQuote: (forklift: Forklift) => void;
  /**
   * Substitui as características exibidas. Os classificados de seminovas
   * mostram ano e horas trabalhadas no lugar de energia e corredor.
   */
  specs?: SpecItem[];
  /**
   * Destino de "Ver detalhes". Default: detalhe do catálogo de novas; os
   * classificados apontam para o detalhe de seminovas.
   */
  detailsHref?: string;
}) {
  const { productCard: texts } = useSharedTexts();
  const specRows = specs ?? catalogSpecs(forklift, texts);
  const detailsUrl =
    detailsHref ?? `${ROUTES.EMPILHADEIRAS_NOVAS}/${forklift.id}`;

  return (
    // Card com padding simétrico (p-6 = 24px). gap-8 (32px) separa imagem →
    // textos → botões. A imagem fica DENTRO do card, sem exceder o topo.
    <article className="relative flex h-full flex-col gap-8 rounded-3xl bg-white p-6 transition duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
      {/* Imagem do produto — contida dentro do card */}
      <div className="relative h-[200px] w-full">
        <Image
          src={forklift.image}
          alt={forklift.name}
          fill
          sizes="(min-width: 1024px) 262px, (min-width: 640px) 50vw, 100vw"
          // Com o selo no canto esquerdo, a foto centralizada fica com o peso
          // visual todo à esquerda — o deslocamento devolve o equilíbrio.
          className={`object-contain ${
            forklift.madeInBrazil ? "translate-x-[6%]" : ""
          }`}
        />
        {/* Selo de fabricação nacional — canto superior esquerdo da foto,
            mesma posição usada pela STILL nos cards do site oficial. */}
        {forklift.madeInBrazil && (
          <MadeInBrazilBadge width="22%" className="absolute left-0 top-0" />
        )}
      </div>

      {/* Bloco de textos — 32px da imagem (gap-8 do article) */}
      <div className="flex flex-col gap-8">
        {/* Tags acima do título = 16px */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-1">
            <span className="rounded-full bg-primary-600 px-4 py-1 text-body text-neutral-50">
              {brandLabel[forklift.brand]}
            </span>
            <span className="rounded-full bg-neutral-100 px-4 py-1 text-body text-neutral-600">
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
          {specRows.map((spec, i) => (
            <SpecRow key={i} label={spec.label} value={spec.value} />
          ))}
        </dl>
      </div>

      {/* Botões — pinados na base do card (mt-auto) para alinhar em todos os
          cards; 32px do bloco de textos (gap-8 do article) quando não há folga. */}
      <div className="mt-auto flex flex-col gap-2">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onRequestQuote(forklift)}
          className="w-full justify-center"
        >
          {texts.quoteLabel}
        </Button>
        <Button
          variant="gray"
          size="lg"
          href={detailsUrl}
          className="w-full justify-center"
        >
          {texts.detailsLabel}
        </Button>
      </div>
    </article>
  );
}
