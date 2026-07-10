"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, SearchX } from "lucide-react";
import type { Forklift, ForkliftBrand } from "@/types/forklift.types";
import { brandOrder } from "@/data/forklifts-novas";
import { ProductCard } from "./product-card/product-card";
import { CatalogToolbar } from "./catalog-toolbar/catalog-toolbar";
import { CatalogFilters } from "./catalog-filters/catalog-filters";
import type {
  FacetGroup,
  FacetKey,
  SelectedFacets,
  SortKey,
} from "./catalog.types";

const brandLabel: Record<ForkliftBrand, string> = {
  STILL: "Still",
  Linde: "Linde",
  Baoli: "Baoli",
};

// Taxonomia fixa da barra de filtros (definida pelo design, não derivada dos
// dados). As opções e a ordem seguem exatamente o catálogo de referência.
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
    key: "capacity",
    label: "Capacidade de carga",
    options: [
      "Até 1,5 t",
      "1,6 t a 2,5 t",
      "2,6 t a 3,5 t",
      "3,6 t a 5 t",
      "Acima de 5 t",
    ],
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
  { key: "availability", label: "Disponibilidade", options: ["Sob consulta"] },
  {
    key: "location",
    label: "Localização",
    options: ["SC", "PR", "RS", "SP", "GO", "Outros estados"],
  },
];

const facetKeys: FacetKey[] = FACET_GROUPS.map((g) => g.key);

const groups: FacetGroup[] = FACET_GROUPS.map((g) => ({
  ...g,
  defaultOpen: true,
}));

const emptySelection: SelectedFacets = {
  brand: [],
  equipmentType: [],
  energyTag: [],
  capacity: [],
  application: [],
  availability: [],
  location: [],
};

const KNOWN_UFS = ["SC", "PR", "RS", "SP", "GO"];

const capacityBucket = (capacity: string): string => {
  const tons = parseFloat(capacity.replace(/[^\d,]/g, "").replace(",", "."));
  if (tons <= 1.5) return "Até 1,5 t";
  if (tons <= 2.5) return "1,6 t a 2,5 t";
  if (tons <= 3.5) return "2,6 t a 3,5 t";
  if (tons <= 5) return "3,6 t a 5 t";
  return "Acima de 5 t";
};

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
  capacity: (f) => [capacityBucket(f.capacity)],
  application: (f) => applicationMatch(f.application),
  availability: (f) =>
    f.availability === "Sob consulta" ? ["Sob consulta"] : [],
  location: (f) => {
    const uf = f.location.split(" - ")[1]?.trim() ?? "";
    return [KNOWN_UFS.includes(uf) ? uf : "Outros estados"];
  },
};

export function Catalog({ forklifts }: { forklifts: Forklift[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [selected, setSelected] = useState<SelectedFacets>(emptySelection);
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    search.trim() !== "" || facetKeys.some((key) => selected[key].length > 0);

  const toggleFacet = (key: FacetKey, value: string) => {
    setSelected((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const clearFilters = () => {
    setSelected(emptySelection);
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
      return facetKeys.every((key) => {
        const sel = selected[key];
        if (sel.length === 0) return true;
        const matches = facetMatch[key](f);
        return sel.some((value) => matches.includes(value));
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
  }, [forklifts, search, selected, sort]);

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
        <aside
          className={`${showFilters ? "block" : "hidden"} lg:block lg:w-[280px] lg:shrink-0`}
        >
          <CatalogFilters
            groups={groups}
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
                  <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((forklift) => (
                      <ProductCard key={forklift.id} forklift={forklift} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
