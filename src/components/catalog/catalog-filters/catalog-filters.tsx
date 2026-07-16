"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import type {
  FacetGroup,
  FacetKey,
  RangeGroup,
  RangeKey,
  SelectedFacets,
  SelectedRanges,
} from "../catalog.types";

type CatalogFiltersProps = {
  groups: FacetGroup[];
  /** Sliders numéricos, exibidos logo após o grupo "Marca". */
  rangeGroups: RangeGroup[];
  ranges: SelectedRanges;
  onRangeChange: (key: RangeKey, value: number) => void;
  selected: SelectedFacets;
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

function CollapsibleHeader({
  label,
  open,
  panelId,
  onToggle,
}: {
  label: string;
  open: boolean;
  panelId: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-2 text-left"
    >
      <span className="text-body font-semibold text-neutral-800">{label}</span>
      <ChevronDown
        aria-hidden
        className={`size-5 shrink-0 text-neutral-500 transition-transform duration-200 ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

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
      <CollapsibleHeader
        label={group.label}
        open={open}
        panelId={panelId}
        onToggle={() => setOpen((v) => !v)}
      />

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
                  <span>
                    {option}{" "}
                    {/* Contador sutil — total de produtos do site nessa opção */}
                    <span className="text-neutral-400">
                      ({group.counts?.[option] ?? 0})
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function RangeFilterGroup({
  range,
  value,
  onChange,
}: {
  range: RangeGroup;
  value: number;
  onChange: (value: number) => void;
}) {
  const [open, setOpen] = useState(true);
  const panelId = `filter-${range.key}`;
  const neutral = range.mode === "min" ? range.min : range.max;
  const isActive = value !== neutral;

  return (
    <div className="border-b border-neutral-200 py-4">
      <CollapsibleHeader
        label={range.label}
        open={open}
        panelId={panelId}
        onToggle={() => setOpen((v) => !v)}
      />

      {open && (
        <div id={panelId} className="mt-4 flex flex-col gap-2">
          <input
            type="range"
            min={range.min}
            max={range.max}
            step={range.step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label={`${range.label} — ${
              range.mode === "min" ? "a partir de" : "até"
            } ${range.format(value)}`}
            // Trilha fina em cinza claro + thumb laranja (appearance-none
            // transforma o próprio input na trilha).
            className="h-1 w-full appearance-none rounded-full bg-neutral-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
          />
          <div className="flex items-center justify-between text-body-sm text-neutral-400">
            <span>{range.format(range.min)}</span>
            {isActive && (
              <span className="font-semibold text-primary-500">
                {range.mode === "min" ? "A partir de" : "Até"}{" "}
                {range.format(value)}
              </span>
            )}
            <span>{range.format(range.max)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function CatalogFilters({
  groups,
  rangeGroups,
  ranges,
  onRangeChange,
  selected,
  onToggle,
  onClear,
  hasActiveFilters,
}: CatalogFiltersProps) {
  const [brandGroup, ...otherGroups] = groups;

  return (
    <div className="flex flex-col">
      {/* Marca primeiro, sliders numéricos na sequência, depois os demais */}
      <FilterGroup
        group={brandGroup}
        selected={selected[brandGroup.key]}
        onToggle={(value) => onToggle(brandGroup.key, value)}
      />

      {rangeGroups.map((range) => (
        <RangeFilterGroup
          key={range.key}
          range={range}
          value={ranges[range.key]}
          onChange={(value) => onRangeChange(range.key, value)}
        />
      ))}

      {otherGroups.map((group) => (
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
