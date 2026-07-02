"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, SearchX } from "lucide-react";
import { Section } from "@/components/ui/section";
import { articles as allArticles } from "@/data/articles";
import { ArticleCard } from "../article-card/article-card";

const PAGE_SIZE = 6;

const unique = (values: string[]) => Array.from(new Set(values));

const categories = unique(allArticles.map((a) => a.category));
const types = unique(allArticles.map((a) => a.type));
const authors = unique(allArticles.map((a) => a.author));

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  options: string[];
};

function FilterSelect({ label, value, onChange, allLabel, options }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-body-sm font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-4 pr-10 text-body text-neutral-800 focus-visible:border-primary-500 focus-visible:outline-none"
        >
          <option value="">{allLabel}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
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

export function ArticleList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allArticles.filter((a) => {
      if (query) {
        const haystack = `${a.title} ${a.author} ${a.category}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (category && a.category !== category) return false;
      if (type && a.type !== type) return false;
      if (author && a.author !== author) return false;
      return true;
    });
  }, [search, category, type, author]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const resetPage = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <Section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-h3 font-normal text-neutral-800">Últimas notícias</h2>
        <p className="text-body text-neutral-600">
          {filtered.length}{" "}
          {filtered.length === 1
            ? "publicação encontrada."
            : "publicações encontradas."}
        </p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 gap-4 rounded-2xl bg-neutral-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-body-sm font-semibold uppercase tracking-wide text-neutral-500">
            Buscar
          </label>
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => resetPage(setSearch)(e.target.value)}
              placeholder="Buscar por título, autor ou tema"
              aria-label="Buscar publicações"
              className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-4 pr-10 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none"
            />
            <Search
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-400"
            />
          </div>
        </div>
        <FilterSelect
          label="Categoria"
          value={category}
          onChange={resetPage(setCategory)}
          allLabel="Todos"
          options={categories}
        />
        <FilterSelect
          label="Tipo"
          value={type}
          onChange={resetPage(setType)}
          allLabel="Todos os tipos"
          options={types}
        />
        <FilterSelect
          label="Autor"
          value={author}
          onChange={resetPage(setAuthor)}
          allLabel="Todos os autores"
          options={authors}
        />
      </div>

      {/* Grid / empty state */}
      {pageItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-neutral-50 px-6 py-16 text-center">
          <SearchX aria-hidden className="size-10 text-neutral-400" />
          <p className="text-h6 font-semibold text-neutral-800">
            Nenhuma publicação encontrada
          </p>
          <p className="max-w-sm text-body text-neutral-600">
            Tente ajustar a busca ou os filtros.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Paginação (só quando há mais de 1 página) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-10 rounded-full bg-neutral-800/10 px-5 text-body font-semibold text-neutral-700 transition-colors hover:bg-neutral-800/20 disabled:pointer-events-none disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-body text-neutral-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-10 rounded-full bg-neutral-800/10 px-5 text-body font-semibold text-neutral-700 transition-colors hover:bg-neutral-800/20 disabled:pointer-events-none disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </Section>
  );
}
