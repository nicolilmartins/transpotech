"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
      <div className="flex-1">
        <Input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por modelo, marca ou aplicação"
          aria-label="Buscar empilhadeiras"
          iconEnd={<Search className="size-5" />}
        />
      </div>

      {/* Ordenação */}
      <div className="sm:w-56">
        <label htmlFor="catalog-sort" className="sr-only">
          Ordenar por
        </label>
        <Select
          id="catalog-sort"
          options={sortOptions}
          value={sort}
          onChange={(value) => onSortChange(value as SortKey)}
        />
      </div>
    </div>
  );
}
