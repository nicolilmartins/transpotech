"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { fieldBase, fieldTones, type FieldTone } from "@/components/ui/input";
import { useCities } from "@/hooks/use-cities";
import {
  formatCity,
  getRememberedCity,
  highlightCity,
  rememberCity,
  searchCities,
  type CityMatch,
} from "@/lib/cities";
import type { CityAutocompleteProps } from "./city-autocomplete.types";

// Reaproveita o painel/opções do Select para manter o visual dos campos.
const panelTones: Record<FieldTone, string> = {
  light: "border-neutral-200 bg-white shadow-lg",
  dark: "border-white/10 bg-[#181616] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]",
};

const optionTones: Record<FieldTone, { base: string; active: string }> = {
  light: { base: "text-neutral-800", active: "bg-neutral-100" },
  dark: { base: "text-neutral-50", active: "bg-white/10" },
};

const ufTones: Record<FieldTone, string> = {
  light: "text-neutral-400",
  dark: "text-neutral-500",
};

const hintTones: Record<FieldTone, string> = {
  light: "text-neutral-400",
  dark: "text-neutral-500",
};

// Campo de cidade com autocomplete pesquisável e tolerante a erros. Padrão APG
// "editable combobox": input de texto + listbox navegável pelo teclado, com o
// trecho digitado destacado nas sugestões.
export function CityAutocomplete({
  tone = "light",
  invalid,
  value,
  onChange,
  onBlur,
  placeholder = "Informe onde sua operação está localizada",
  id,
  name,
  disabled,
  className = "",
  minChars = 3,
  maxResults = 8,
}: CityAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  // Só baixa a base de municípios depois da primeira interação com o campo.
  const [touched, setTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  const { cities } = useCities(touched);

  const remembered = useMemo(() => getRememberedCity(), []);
  const query = value.trim();

  // Sugestões: busca fuzzy quando há texto suficiente; com o campo vazio, mostra
  // a cidade usada recentemente (pré-preenchimento entre formulários).
  const suggestions = useMemo<CityMatch[]>(() => {
    if (query.length >= minChars) {
      return searchCities(cities, query, maxResults);
    }
    return [];
  }, [cities, query, minChars, maxResults]);

  const showRemembered =
    query.length === 0 && !!remembered && remembered !== value;

  const hasList = suggestions.length > 0 || showRemembered;

  // Mantém a opção ativa visível ao navegar com as setas.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  // Fecha ao clicar fora e propaga o blur (marca "touched" no RHF).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const commit = (text: string) => {
    onChange(text);
    rememberCity(text);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!hasList) return;
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (showRemembered) {
        // Único item (cidade recente): Enter usa; setas apenas o realçam.
        setActiveIndex(0);
        return;
      }
      const delta = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => {
        const next = i + delta;
        if (next < 0) return suggestions.length - 1;
        if (next >= suggestions.length) return 0;
        return next;
      });
      return;
    }
    if (e.key === "Enter") {
      if (open && showRemembered && remembered) {
        e.preventDefault();
        commit(remembered);
        return;
      }
      if (open && activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        commit(formatCity(suggestions[activeIndex].city));
      }
      return;
    }
    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
      }
      return;
    }
    if (e.key === "Tab" && open) {
      setOpen(false);
      onBlur?.();
    }
  };

  const activeDescendant =
    open && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined;

  return (
    <div ref={rootRef} className="relative w-full">
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open && hasList}
        aria-controls={open && hasList ? listboxId : undefined}
        aria-activedescendant={activeDescendant}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => {
          setTouched(true);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => {
          // O blur real é tratado no clique-fora; aqui só cobre saída por Tab.
          if (!open) onBlur?.();
        }}
        className={`${fieldBase} ${fieldTones[tone]} h-12 px-4 ${className}`}
      />

      {open && hasList && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Sugestões de cidade"
          className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 max-h-72 overflow-y-auto rounded-xl border p-2 ${panelTones[tone]}`}
        >
          {showRemembered ? (
            <li
              id={`${listboxId}-0`}
              role="option"
              aria-selected={activeIndex === 0}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => commit(remembered!)}
              onMouseEnter={() => setActiveIndex(0)}
              className={`flex cursor-pointer flex-col gap-0.5 rounded-lg px-4 py-3 text-body transition-colors ${
                optionTones[tone].base
              } ${activeIndex === 0 ? optionTones[tone].active : ""}`}
            >
              <span className={`text-body-sm ${hintTones[tone]}`}>
                Usar cidade recente
              </span>
              <span className="font-medium">{remembered}</span>
            </li>
          ) : (
            suggestions.map((match, index) => {
              const segments = highlightCity(match.city.name, query);
              return (
                <li
                  key={`${match.city.name}-${match.city.uf}`}
                  id={`${listboxId}-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commit(formatCity(match.city))}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 text-body transition-colors ${
                    optionTones[tone].base
                  } ${index === activeIndex ? optionTones[tone].active : ""}`}
                >
                  <span className="truncate">
                    {segments.map((seg, i) =>
                      seg.match ? (
                        <strong key={i} className="font-semibold text-primary-500">
                          {seg.text}
                        </strong>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    )}
                  </span>
                  <span className={`shrink-0 text-body-sm ${ufTones[tone]}`}>
                    {match.city.uf}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
