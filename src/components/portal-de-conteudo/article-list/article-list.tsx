"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search, SearchX } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Article } from "@/data/articles";
import { ArticleCard } from "@/components/layout/article-card/article-card";
import type { SectionContent } from "@/sanity/content/fields";
import type { portalConteudoPage } from "@/sanity/content/pages/portal-conteudo";

type ArticleListContent = SectionContent<typeof portalConteudoPage.sections.articleList>;

// Publicações exibidas por vez; "Carregar mais" acrescenta outro bloco.
const PAGE_SIZE = 6;

const unique = (values: string[]) => Array.from(new Set(values));

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
      className={`rounded-full px-4 py-2 text-body font-semibold transition-colors ${
        active
          ? "bg-primary-500 text-neutral-50"
          : "bg-white text-neutral-700 hover:text-primary-500"
      }`}
    >
      {children}
    </button>
  );
}

export function ArticleList({
  articles: allArticles,
  content,
}: {
  articles: Article[];
  content: ArticleListContent;
}) {
  // Tags de filtro = categorias das publicações.
  const categories = useMemo(
    () => unique(allArticles.map((a) => a.category)),
    [allArticles]
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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
  }, [allArticles, search, category]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visible.length;

  // Busca e filtro reiniciam a listagem — senão um resultado curto herdaria a
  // contagem já expandida da consulta anterior.
  const changeSearch = (value: string) => {
    setSearch(value);
    setVisibleCount(PAGE_SIZE);
  };

  const changeCategory = (value: string) => {
    setCategory(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <Section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-h3 font-normal text-neutral-800">{content.title}</h2>
        <p className="text-body text-neutral-600">
          {filtered.length}{" "}
          {filtered.length === 1
            ? content.resultSingular
            : content.resultPlural}
        </p>
      </div>

      {/* Busca + tags de filtro (logo abaixo da busca) */}
      <div className="flex flex-col gap-4">
        <Input
          type="search"
          value={search}
          onChange={(e) => changeSearch(e.target.value)}
          placeholder={content.searchPlaceholder}
          aria-label="Buscar publicações"
          iconEnd={<Search className="size-5" />}
        />

        <div className="flex flex-wrap gap-2">
          <TagFilter active={category === ""} onClick={() => changeCategory("")}>
            {content.allLabel}
          </TagFilter>
          {categories.map((cat) => (
            <TagFilter
              key={cat}
              active={category === cat}
              onClick={() => changeCategory(cat)}
            >
              {cat}
            </TagFilter>
          ))}
        </div>
      </div>

      {/* Grid / empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white px-6 py-16 text-center">
          <SearchX aria-hidden className="size-10 text-neutral-400" />
          <p className="text-h6 font-semibold text-neutral-800">
            {content.emptyTitle}
          </p>
          <p className="max-w-sm text-body text-neutral-600">
            {content.emptyDescription}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visible.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* "Carregar mais" + contagem — só quando há mais do que um bloco */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex flex-col items-center gap-3">
          {hasMore && (
            <Button
              variant="gray"
              size="lg"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              {content.loadMoreLabel}
            </Button>
          )}
          <p aria-live="polite" className="text-body text-neutral-500">
            {content.showingPrefix} {visible.length} {content.showingSeparator}{" "}
            {filtered.length}
          </p>
        </div>
      )}
    </Section>
  );
}
