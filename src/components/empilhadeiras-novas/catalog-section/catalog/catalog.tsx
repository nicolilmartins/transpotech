"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, SearchX, X } from "lucide-react";
import type { Forklift, ForkliftBrand } from "@/types/forklift.types";
import { brandOrder } from "@/data/forklifts-novas";
import { ProductCard } from "@/components/layout/product-card/product-card";
import { LazyQuoteModal } from "@/components/layout/quote-modal/lazy-quote-modal";
import { useModalFocus } from "@/hooks/use-modal-focus";
import { CatalogToolbar } from "./catalog-toolbar/catalog-toolbar";
import { CatalogFilters } from "./catalog-filters/catalog-filters";
import {
  EMPTY_BRANDS,
  readBrands,
  subscribeBrands,
  writeBrands,
} from "./brand-filter";
import type {
  FacetGroup,
  FacetKey,
  RangeGroup,
  RangeKey,
  SelectedFacets,
  SelectedRanges,
  SortKey,
} from "./catalog.types";

const brandLabel: Record<ForkliftBrand, string> = {
  STILL: "Still",
  Linde: "Linde",
  Baoli: "Baoli",
};

// Taxonomia fixa da barra de filtros (definida pelo design, não derivada dos
// dados). As opções e a ordem seguem exatamente o catálogo de referência.
// Capacidade/elevação/corredor são sliders (RANGE_GROUPS), logo após "Marca".
const FACET_GROUPS: { key: FacetKey; label: string; options: string[] }[] = [
  { key: "brand", label: "Marca", options: ["Linde", "STILL", "Baoli"] },
  {
    key: "equipmentType",
    label: "Tipo de equipamento",
    options: [
      "Contrabalançada elétrica",
      "Contrabalançada a combustão",
      "Retrátil",
      "Patolada",
      "Transpaleteira",
      "Selecionadora de pedidos",
      "Rebocador",
      "Outro",
    ],
  },
  {
    key: "energyTag",
    label: "Energia",
    options: ["Elétrica", "Diesel", "GLP", "Li-ion", "Chumbo-ácida", "Não sei"],
  },
];

const facetKeys: FacetKey[] = FACET_GROUPS.map((g) => g.key);

const emptySelection: SelectedFacets = {
  brand: [],
  equipmentType: [],
  energyTag: [],
};

// ── Parsing numérico dos specs ──────────────────────────────────────────────
/** Intervalo que o produto cobre num spec; valor único vira lo === hi. */
type SpecRange = { lo: number; hi: number };

/** "1,6 t" → {1.6, 1.6}; "2,5 – 3,5 t" → {2.5, 3.5} (toneladas). */
const parseTons = (capacity: string): SpecRange => {
  const [lo, hi = lo] = capacity
    .split(/[–-]/)
    .map((part) => parseFloat(part.replace(/[^\d,]/g, "").replace(",", ".")));
  return { lo, hi };
};

/** "5.400 mm" → {5400, 5400} (milímetros). */
const parseMm = (value: string): SpecRange => {
  const mm = parseInt(value.replace(/\D/g, ""), 10);
  return { lo: mm, hi: mm };
};

/**
 * Alinha o limite do slider à grade do step: o input range só produz
 * min + n·step, e com min fora da grade o valor filtrado não bate com o
 * rótulo arredondado. toFixed tira o ruído de ponto flutuante (14 × 0.1).
 */
const snapToStep = (
  value: number,
  step: number,
  round: (n: number) => number
): number => {
  const decimals = (String(step).split(".")[1] ?? "").length;
  const steps = round(Number((value / step).toFixed(6)));
  return Number((steps * step).toFixed(decimals));
};

const formatTons = (tons: number) =>
  `${tons.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} t`;

const formatMeters = (mm: number) =>
  `${(mm / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} m`;

// Para cada faceta, os valores (da taxonomia fixa) que um produto satisfaz.
const facetMatch: Record<FacetKey, (f: Forklift) => string[]> = {
  brand: (f) => [f.brand],
  equipmentType: (f) => {
    if (f.equipmentType === "Contrabalançada") {
      return f.energyTag === "Combustão"
        ? ["Contrabalançada a combustão"]
        : ["Contrabalançada elétrica"];
    }
    return [f.equipmentType];
  },
  energyTag: (f) => {
    if (f.energy === "Lítio-Íon") return ["Li-ion"];
    if (f.energy === "Diesel/GLP") return ["Diesel", "GLP"];
    if (f.energy === "Elétrica") return ["Elétrica"];
    return [f.energy];
  },
};

// Intervalo numérico de cada slider para um produto (NaN = spec ausente).
const rangeValue: Record<RangeKey, (f: Forklift) => SpecRange> = {
  capacity: (f) => parseTons(f.capacity),
  liftHeight: (f) => parseMm(f.liftHeight),
  aisleWidth: (f) => parseMm(f.aisleWidth),
};

export function Catalog({ forklifts }: { forklifts: Forklift[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [selected, setSelected] = useState<SelectedFacets>(emptySelection);
  const [showFilters, setShowFilters] = useState(false);
  const filtersDialogRef = useRef<HTMLDivElement>(null);
  const filtersCloseRef = useRef<HTMLButtonElement>(null);
  useModalFocus(showFilters, filtersDialogRef, filtersCloseRef);

  // Modal de orçamento: dados de contato, com o equipamento clicado já
  // selecionado (e botão "+" para incluir outros).
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteForId, setQuoteForId] = useState<string | null>(null);
  const openQuote = (forklift: Forklift) => {
    setQuoteForId(forklift.id);
    setQuoteOpen(true);
  };

  // A marca mora na URL (?marca=still) e só lá — é a mesma fonte que os logos
  // do cabeçalho escrevem, então logo, checkbox e link nunca divergem.
  // useSyncExternalStore em vez de efeito com setState: a página é
  // pré-renderizada, e o snapshot do servidor (vazio) mantém a primeira
  // renderização do cliente igual ao HTML; o valor real entra logo depois,
  // sem divergência de hidratação.
  const brandSelection = useSyncExternalStore(
    subscribeBrands,
    readBrands,
    () => EMPTY_BRANDS
  );

  const effectiveSelected = useMemo<SelectedFacets>(
    () => ({ ...selected, brand: brandSelection }),
    [selected, brandSelection]
  );

  // Grupos de checkbox com contadores (total de produtos do site por opção).
  const groups: FacetGroup[] = useMemo(
    () =>
      FACET_GROUPS.map((g) => ({
        ...g,
        defaultOpen: true,
        counts: Object.fromEntries(
          g.options.map((option) => [
            option,
            forklifts.filter((f) => facetMatch[g.key](f).includes(option))
              .length,
          ])
        ),
      })),
    [forklifts]
  );

  // Limites dos sliders derivados dos produtos. Capacidade/elevação filtram
  // "a partir de" (boundary neutro = mínimo); corredor filtra "até"
  // (boundary neutro = máximo).
  const rangeGroups: RangeGroup[] = useMemo(() => {
    const bounds = (key: RangeKey, step: number) => {
      const values = forklifts
        .map((f) => rangeValue[key](f))
        .filter((v) => Number.isFinite(v.lo) && Number.isFinite(v.hi));
      return {
        min: snapToStep(Math.min(...values.map((v) => v.lo)), step, Math.floor),
        max: snapToStep(Math.max(...values.map((v) => v.hi)), step, Math.ceil),
        step,
      };
    };
    return [
      {
        key: "capacity" as const,
        label: "Capacidade",
        ...bounds("capacity", 0.1),
        mode: "min" as const,
        format: formatTons,
      },
      {
        key: "liftHeight" as const,
        label: "Elevação",
        ...bounds("liftHeight", 100),
        mode: "min" as const,
        format: formatMeters,
      },
      {
        key: "aisleWidth" as const,
        label: "Corredor",
        ...bounds("aisleWidth", 100),
        mode: "max" as const,
        format: formatMeters,
      },
    ];
  }, [forklifts]);

  // Boundary neutro de cada slider (posição em que não filtra nada).
  const neutralRanges = useMemo(
    () =>
      Object.fromEntries(
        rangeGroups.map((r) => [r.key, r.mode === "min" ? r.min : r.max])
      ) as SelectedRanges,
    [rangeGroups]
  );

  const [ranges, setRanges] = useState<SelectedRanges | null>(null);
  const currentRanges = ranges ?? neutralRanges;

  // Modal de filtros (mobile): trava o scroll do body e fecha no Escape.
  useEffect(() => {
    if (!showFilters) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFilters(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [showFilters]);

  const hasActiveFilters =
    search.trim() !== "" ||
    facetKeys.some((key) => effectiveSelected[key].length > 0) ||
    rangeGroups.some((r) => currentRanges[r.key] !== neutralRanges[r.key]);

  const toggleFacet = (key: FacetKey, value: string) => {
    // Marca não entra no estado local: vai para a URL, de onde é lida de volta.
    if (key === "brand") {
      const brand = value as ForkliftBrand;
      writeBrands(
        brandSelection.includes(brand)
          ? brandSelection.filter((b) => b !== brand)
          : [...brandSelection, brand]
      );
      return;
    }
    setSelected((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const setRange = (key: RangeKey, value: number) => {
    setRanges({ ...currentRanges, [key]: value });
  };

  const clearFilters = () => {
    writeBrands([]);
    setSelected(emptySelection);
    setRanges(null);
    setSearch("");
  };

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = forklifts.filter((f) => {
      if (query) {
        const haystack =
          `${f.name} ${brandLabel[f.brand]} ${f.application}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      const facetsOk = facetKeys.every((key) => {
        const sel = effectiveSelected[key];
        if (sel.length === 0) return true;
        const matches = facetMatch[key](f);
        return sel.some((value) => matches.includes(value));
      });
      if (!facetsOk) return false;
      return rangeGroups.every((r) => {
        if (currentRanges[r.key] === neutralRanges[r.key]) return true;
        const { lo, hi } = rangeValue[r.key](f);
        // Produto sem spec numérico não é eliminado pelo slider.
        if (!Number.isFinite(lo) || !Number.isFinite(hi)) return true;
        // Produto em faixa (ex.: 2,5 – 3,5 t) passa se alguma parte dela
        // atende ao limite escolhido.
        return r.mode === "min"
          ? hi >= currentRanges[r.key]
          : lo <= currentRanges[r.key];
      });
    });

    const sorted = [...filtered];
    if (sort === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "pt"));
    } else if (sort === "brand") {
      sorted.sort(
        (a, b) =>
          brandOrder.indexOf(a.brand) - brandOrder.indexOf(b.brand) ||
          a.name.localeCompare(b.name, "pt")
      );
    }
    return sorted;
  }, [
    forklifts,
    search,
    effectiveSelected,
    sort,
    rangeGroups,
    currentRanges,
    neutralRanges,
  ]);

  const grouped = brandOrder
    .map((brand) => ({
      brand,
      items: results.filter((f) => f.brand === brand),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <CatalogToolbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Toggle de filtros (mobile) */}
      <button
        type="button"
        onClick={() => setShowFilters((v) => !v)}
        aria-expanded={showFilters}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-800/10 px-5 text-body font-semibold text-neutral-700 lg:hidden"
      >
        <SlidersHorizontal aria-hidden className="size-5" />
        Filtros
      </button>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        {/* Sidebar de filtros — apenas no desktop. No mobile vira modal. */}
        <aside className="hidden lg:block lg:w-[280px] lg:shrink-0">
          <CatalogFilters
            groups={groups}
            rangeGroups={rangeGroups}
            ranges={currentRanges}
            onRangeChange={setRange}
            selected={effectiveSelected}
            onToggle={toggleFacet}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        <div className="flex-1">
          {grouped.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-neutral-50 px-6 py-16 text-center">
              <SearchX aria-hidden className="size-10 text-neutral-400" />
              <p className="text-h6 font-semibold text-neutral-800">
                Nenhuma empilhadeira encontrada
              </p>
              <p className="max-w-sm text-body text-neutral-600">
                Tente ajustar a busca ou remover alguns filtros.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="h-11 rounded-full bg-primary-500 px-5 text-body font-semibold text-neutral-50 transition-colors hover:bg-primary-600"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {grouped.map((group, groupIndex) => (
                <section key={group.brand} className="flex flex-col gap-6">
                  <h2 className="font-heading text-h2 font-normal text-neutral-800">
                    {brandLabel[group.brand]}
                  </h2>
                  <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {group.items.map((forklift, i) => (
                      <ProductCard
                        key={forklift.id}
                        forklift={forklift}
                        onRequestQuote={openQuote}
                        // Primeiro card = LCP do catálogo no mobile.
                        priority={groupIndex === 0 && i === 0}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filtros como modal (bottom sheet) no mobile */}
      {showFilters &&
        createPortal(
          <div
            ref={filtersDialogRef}
            className="fixed inset-0 z-[var(--z-modal)] flex flex-col justify-end lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Filtros"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowFilters(false)}
              aria-hidden
            />
            <div className="relative z-10 flex max-h-[88svh] flex-col overflow-hidden rounded-t-2xl bg-white">
              <div className="flex items-center justify-between border-b border-neutral-200 p-5">
                <h2 className="font-heading text-h6 font-semibold text-neutral-800">
                  Filtros
                </h2>
                <button
                  ref={filtersCloseRef}
                  type="button"
                  onClick={() => setShowFilters(false)}
                  aria-label="Fechar"
                  className="flex size-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                <CatalogFilters
                  groups={groups}
                  rangeGroups={rangeGroups}
                  ranges={currentRanges}
                  onRangeChange={setRange}
                  selected={effectiveSelected}
                  onToggle={toggleFacet}
                  onClear={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
              <div className="border-t border-neutral-200 p-5">
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="h-12 w-full rounded-full bg-primary-500 text-body font-semibold text-neutral-50 transition-colors hover:bg-primary-600"
                >
                  Ver {results.length}{" "}
                  {results.length === 1 ? "resultado" : "resultados"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {quoteOpen && (
        <LazyQuoteModal
          onClose={() => setQuoteOpen(false)}
          forklifts={forklifts}
          initialSelectedId={quoteForId}
        />
      )}
    </div>
  );
}
