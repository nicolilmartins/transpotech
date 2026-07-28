"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  fieldBase,
  fieldIconTones,
  fieldTones,
  type FieldTone,
} from "@/components/ui/input";
import type { SelectOption, SelectProps } from "./select.types";

// Dropdown custom no lugar do <select> nativo: gatilho no padrão dos campos
// (borda arredondada, foco laranja) + painel flutuante estilizado. O foco
// permanece no gatilho (padrão APG "select-only combobox"); as opções são
// navegadas por aria-activedescendant. Com `searchable`, o painel ganha um
// campo de busca que filtra as opções (o foco vai para a busca ao abrir).
const panelTones: Record<FieldTone, string> = {
  light: "border-neutral-200 bg-white shadow-lg",
  dark: "border-white/10 bg-[#181616] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]",
};

const optionTones: Record<FieldTone, { base: string; active: string }> = {
  light: { base: "text-neutral-800", active: "bg-neutral-100" },
  dark: { base: "text-neutral-50", active: "bg-white/10" },
};

const placeholderTones: Record<FieldTone, string> = {
  light: "text-neutral-400",
  dark: "text-neutral-500",
};

export function Select({
  tone = "light",
  invalid,
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Selecione",
  id,
  disabled,
  className = "",
  searchable = false,
  searchPlaceholder = "Buscar…",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const opts = useMemo<SelectOption[]>(
    () =>
      options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option
      ),
    [options]
  );
  const selected = opts.find((option) => option.value === value);

  // Lista exibida: filtrada pela busca quando `searchable`.
  const shown = useMemo(() => {
    if (!searchable || !query.trim()) return opts;
    const q = query.trim().toLowerCase();
    return opts.filter((option) => option.label.toLowerCase().includes(q));
  }, [opts, searchable, query]);

  const openList = () => {
    setQuery("");
    const selectedIndex = opts.findIndex((option) => option.value === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    onBlur?.();
  };

  const selectOption = (option: SelectOption) => {
    onChange?.(option.value);
    close();
  };

  // Foca a busca ao abrir (quando searchable).
  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
  }, [open, searchable]);

  // Fecha ao clicar fora (e marca touched via onBlur).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Mantém a opção ativa visível ao navegar com as setas.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [open, activeIndex]);

  // Navegação por teclado — compartilhada pelo gatilho e pela busca.
  const handleNavKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        close();
      }
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openList();
      const delta = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => Math.min(Math.max(i + delta, 0), shown.length - 1));
      return;
    }
    if (e.key === "Home" || e.key === "End") {
      if (!open) return;
      e.preventDefault();
      setActiveIndex(e.key === "Home" ? 0 : shown.length - 1);
      return;
    }
    if (e.key === "Enter") {
      if (!open) {
        e.preventDefault();
        return openList();
      }
      if (shown[activeIndex]) {
        e.preventDefault();
        selectOption(shown[activeIndex]);
      }
    }
  };

  const onButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Tab") {
      if (open) close();
      return;
    }
    // No modo searchable, a navegação acontece no campo de busca.
    if (open && searchable) return;
    if (e.key === " ") {
      e.preventDefault();
      return open ? selectOption(shown[activeIndex]) : openList();
    }
    handleNavKey(e);
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        id={id}
        disabled={disabled}
        data-field
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open && !searchable ? `${listboxId}-${activeIndex}` : undefined
        }
        aria-invalid={invalid || undefined}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onButtonKeyDown}
        className={`${fieldBase} ${fieldTones[tone]} flex h-12 items-center justify-between gap-3 pl-4 pr-3 text-left ${
          open ? "border-primary-500" : ""
        } ${className}`}
      >
        <span className={`truncate ${selected ? "" : placeholderTones[tone]}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          aria-hidden
          className={`size-5 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } ${fieldIconTones[tone]}`}
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-xl border ${panelTones[tone]}`}
        >
          {searchable && (
            <div className="relative border-b border-neutral-100 p-2">
              <Search
                aria-hidden
                className={`pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ${fieldIconTones[tone]}`}
              />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleNavKey}
                placeholder={searchPlaceholder}
                aria-label="Buscar opção"
                aria-controls={listboxId}
                aria-activedescendant={`${listboxId}-${activeIndex}`}
                className={`h-9 w-full rounded-lg bg-transparent pl-8 pr-2 text-body outline-none ${optionTones[tone].base} placeholder:${placeholderTones[tone]}`}
              />
            </div>
          )}

          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={id}
            className="max-h-72 overflow-y-auto p-2"
          >
            {shown.length === 0 ? (
              <li className={`px-4 py-3 text-body ${placeholderTones[tone]}`}>
                Nenhuma opção encontrada.
              </li>
            ) : (
              shown.map((option, index) => (
                <li
                  key={option.value}
                  id={`${listboxId}-${index}`}
                  role="option"
                  aria-selected={option.value === value}
                  // preventDefault no mousedown mantém o foco no gatilho/busca.
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`cursor-pointer rounded-lg px-4 py-3 text-body transition-colors ${
                    optionTones[tone].base
                  } ${index === activeIndex ? optionTones[tone].active : ""} ${
                    option.value === value ? "font-semibold" : ""
                  }`}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
