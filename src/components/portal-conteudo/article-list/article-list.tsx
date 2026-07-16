"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search, SearchX } from "lucide-react";
import { Section } from "@/components/ui/section";
import { articles as allArticles } from "@/data/articles";
import { ArticleCard } from "../article-card/article-card";

const PAGE_SIZE = 6;

const unique = (values: string[]) => Array.from(new Set(values));

// Tags de filtro = categorias das publicações.
const categories = unique(allArticles.map((a) => a.category));

function TagFilter({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-body-sm font-semibold transition-colors ${
        active
          ? "bg-primary-500 text-neutral-50"
          : "bg-white text-neutral-700 hover:text-primary-500"
      }`}
    >
      {children}
    </button>
  );
}

export function ArticleList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allArticles.filter((a) => {
      if (query) {
        const haystack = `${a.title} ${a.author} ${a.category}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (category && a.category !== category) return false;
      return true;
    });
  }, [search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const selectCategory = (value: string) => {
    setCategory(value);
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

      {/* Busca + tags de filtro (logo abaixo da busca) */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por título, autor ou tema"
            aria-label="Buscar publicações"
            className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-4 pr-10 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none"
          />
          <Search
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <TagFilter active={category === ""} onClick={() => selectCategory("")}>
            Todos
          </TagFilter>
          {categories.map((cat) => (
            <TagFilter
              key={cat}
              active={category === cat}
              onClick={() => selectCategory(cat)}
            >
              {cat}
            </TagFilter>
          ))}
        </div>
      </div>

      {/* Grid / empty state */}
      {pageItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white px-6 py-16 text-center">
          <SearchX aria-hidden className="size-10 text-neutral-400" />
          <p className="text-h6 font-semibold text-neutral-800">
            Nenhuma publicação encontrada
          </p>
          <p className="max-w-sm text-body text-neutral-600">
            Tente ajustar a busca ou os filtros.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
