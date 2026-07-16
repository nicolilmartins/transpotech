"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, SearchX, X } from "lucide-react";
import type { Forklift, ForkliftBrand } from "@/types/forklift.types";
import { brandOrder } from "@/data/forklifts-novas";
import { ProductCard } from "./product-card/product-card";
import { QuoteModal } from "./quote-modal/quote-modal";
import { CatalogToolbar } from "./catalog-toolbar/catalog-toolbar";
import { CatalogFilters } from "./catalog-filters/catalog-filters";
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
  {
    key: "application",
    label: "Aplicação",
    options: [
      "Operação interna",
      "Operação externa",
      "Centro de distribuição",
      "Supermercado / atacado",
      "Indústria",
      "Galpão logístico",
      "Carga e descarga",
      "Corredores estreitos",
      "Armazenagem vertical",
    ],
  },
  {
    key: "location",
    label: "Localização",
    options: ["SC", "PR", "RS", "SP", "GO", "Outros estados"],
  },
];

const facetKeys: FacetKey[] = FACET_GROUPS.map((g) => g.key);

const emptySelection: SelectedFacets = {
  brand: [],
  equipmentType: [],
  energyTag: [],
  application: [],
  location: [],
};

const KNOWN_UFS = ["SC", "PR", "RS", "SP", "GO"];

// ── Parsing numérico dos specs ──────────────────────────────────────────────
/** "1,6 t" → 1.6 (toneladas). */
const parseTons = (capacity: string): number =>
  parseFloat(capacity.replace(/[^\d,]/g, "").replace(",", "."));

/** "5.400 mm" → 5400 (milímetros). */
const parseMm = (value: string): number =>
  parseInt(value.replace(/\D/g, ""), 10);

const formatTons = (tons: number) =>
  `${tons.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} t`;

const formatMeters = (mm: number) =>
  `${(mm / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} m`;

const applicationMatch = (application: string): string[] => {
  const a = application.toLowerCase();
  const result: string[] = [];
  if (/intern[oa]/.test(a)) result.push("Operação interna");
  if (/extern[oa]/.test(a)) result.push("Operação externa");
  if (a.includes("distribui")) result.push("Centro de distribuição");
  if (a.includes("supermercado") || a.includes("atacado"))
    result.push("Supermercado / atacado");
  if (a.includes("indústr") || a.includes("industr")) result.push("Indústria");
  if (a.includes("galpão") || a.includes("galpao")) result.push("Galpão logístico");
  if (a.includes("descarga") || a.includes("carga e descarga"))
    result.push("Carga e descarga");
  if (a.includes("estreito")) result.push("Corredores estreitos");
  if (a.includes("armazenagem vertical")) result.push("Armazenagem vertical");
  return result;
};

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
  application: (f) => applicationMatch(f.application),
  location: (f) => {
    const uf = f.location.split(" - ")[1]?.trim() ?? "";
    return [KNOWN_UFS.includes(uf) ? uf : "Outros estados"];
  },
};

// Valor numérico de cada slider para um produto (NaN = spec ausente).
const rangeValue: Record<RangeKey, (f: Forklift) => number> = {
  capacity: (f) => parseTons(f.capacity),
  liftHeight: (f) => parseMm(f.liftHeight),
  aisleWidth: (f) => parseMm(f.aisleWidth),
};

export function Catalog({ forklifts }: { forklifts: Forklift[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [selected, setSelected] = useState<SelectedFacets>(emptySelection);
  const [showFilters, setShowFilters] = useState(false);

  // Modal de orçamento (dois passos): equipamentos + dados de contato.
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteForId, setQuoteForId] = useState<string | null>(null);
  const openQuote = (forklift: Forklift) => {
    setQuoteForId(forklift.id);
    setQuoteOpen(true);
  };

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
    const bounds = (key: RangeKey) => {
      const values = forklifts
        .map((f) => rangeValue[key](f))
        .filter((v) => Number.isFinite(v));
      return { min: Math.min(...values), max: Math.max(...values) };
    };
    return [
      {
        key: "capacity" as const,
        label: "Capacidade",
        ...bounds("capacity"),
        step: 0.1,
        mode: "min" as const,
        format: formatTons,
      },
      {
        key: "liftHeight" as const,
        label: "Elevação",
        ...bounds("liftHeight"),
        step: 100,
        mode: "min" as const,
        format: formatMeters,
      },
      {
        key: "aisleWidth" as const,
        label: "Corredor",
        ...bounds("aisleWidth"),
        step: 100,
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
    facetKeys.some((key) => selected[key].length > 0) ||
    rangeGroups.some((r) => currentRanges[r.key] !== neutralRanges[r.key]);

  const toggleFacet = (key: FacetKey, value: string) => {
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
        const sel = selected[key];
        if (sel.length === 0) return true;
        const matches = facetMatch[key](f);
        return sel.some((value) => matches.includes(value));
      });
      if (!facetsOk) return false;
      return rangeGroups.every((r) => {
        if (currentRanges[r.key] === neutralRanges[r.key]) return true;
        const value = rangeValue[r.key](f);
        // Produto sem spec numérico não é eliminado pelo slider.
        if (!Number.isFinite(value)) return true;
        return r.mode === "min"
          ? value >= currentRanges[r.key]
          : value <= currentRanges[r.key];
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
  }, [forklifts, search, selected, sort, rangeGroups, currentRanges, neutralRanges]);

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
            selected={selected}
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
              {grouped.map((group) => (
                <section key={group.brand} className="flex flex-col gap-6">
                  <h2 className="font-heading text-h2 font-normal text-neutral-800">
                    {brandLabel[group.brand]}
                  </h2>
                  <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {group.items.map((forklift) => (
                      <ProductCard
                        key={forklift.id}
                        forklift={forklift}
                        onRequestQuote={openQuote}
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
            className="fixed inset-0 z-[200] flex flex-col justify-end lg:hidden"
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
                  selected={selected}
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
        <QuoteModal
          onClose={() => setQuoteOpen(false)}
          forklifts={forklifts}
          initialSelectedId={quoteForId}
        />
      )}
    </div>
  );
}
