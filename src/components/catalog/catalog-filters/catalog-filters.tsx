"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { FacetGroup, FacetKey, SelectedFacets } from "../catalog.types";

type CatalogFiltersProps = {
  groups: FacetGroup[];
  selected: SelectedFacets;
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

function FilterGroup({
  group,
  selected,
  onToggle,
}: {
  group: FacetGroup;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(group.defaultOpen ?? false);
  const panelId = `filter-${group.key}`;

  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="text-body font-semibold text-neutral-800">
          {group.label}
        </span>
        <ChevronDown
          aria-hidden
          className={`size-5 shrink-0 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul id={panelId} className="mt-4 flex flex-col gap-3">
          {group.options.map((option) => {
            const checked = selected.includes(option);
            return (
              <li key={option}>
                <label className="flex cursor-pointer items-center gap-2.5 text-body text-neutral-600">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => onToggle(option)}
                  />
                  <span
                    aria-hidden
                    className="flex size-5 shrink-0 items-center justify-center rounded border border-neutral-300 bg-white peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/40"
                  >
                    {checked && <Check className="size-3.5 text-neutral-50" />}
                  </span>
                  <span>{option}</span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function CatalogFilters({
  groups,
  selected,
  onToggle,
  onClear,
  hasActiveFilters,
}: CatalogFiltersProps) {
  return (
    <div className="flex flex-col">
      {groups.map((group) => (
        <FilterGroup
          key={group.key}
          group={group}
          selected={selected[group.key]}
          onToggle={(value) => onToggle(group.key, value)}
        />
      ))}

      <button
        type="button"
        onClick={onClear}
        disabled={!hasActiveFilters}
        className="mt-6 h-12 w-full rounded-full bg-neutral-800/10 text-body font-semibold text-neutral-700 transition-colors hover:bg-neutral-800/20 disabled:pointer-events-none disabled:opacity-50"
      >
        Limpar filtros
      </button>
    </div>
  );
}
