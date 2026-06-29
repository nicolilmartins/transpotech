"use client";

import { Search, ChevronDown } from "lucide-react";
import type { SortKey } from "../catalog.types";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Mais relevantes" },
  { value: "name", label: "Nome (A–Z)" },
  { value: "brand", label: "Marca" },
];

type CatalogToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
};

export function CatalogToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: CatalogToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Busca */}
      <div className="relative flex-1">
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por modelo, marca ou aplicação"
          aria-label="Buscar empilhadeiras"
          className="h-14 w-full rounded-xl border border-neutral-200 bg-white pl-4 pr-12 text-body text-neutral-800 placeholder:text-neutral-500 focus-visible:border-primary-500 focus-visible:outline-none"
        />
        <Search
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400"
        />
      </div>

      {/* Ordenação */}
      <div className="relative sm:w-56">
        <label htmlFor="catalog-sort" className="sr-only">
          Ordenar por
        </label>
        <select
          id="catalog-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="h-14 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-4 pr-10 text-body text-neutral-800 focus-visible:border-primary-500 focus-visible:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
        />
      </div>
    </div>
  );
}
