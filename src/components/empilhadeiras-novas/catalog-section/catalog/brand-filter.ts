import type { ForkliftBrand } from "@/types/forklift.types";

// ── Marca do catálogo na URL (?marca=still,linde) ───────────────────────────
// A marca é a única faceta que mora na URL: é por ela que se chega ao catálogo
// (logos do cabeçalho, links externos) e é o recorte que faz sentido
// compartilhar. Manter uma fonte de verdade só — a query string — evita o
// descompasso entre os logos, os checkboxes da barra lateral e o link aberto.

export const BRAND_PARAM = "marca";

const BRANDS: ForkliftBrand[] = ["STILL", "Linde", "Baoli"];

/** Snapshot de servidor: a URL só existe no cliente. Referência fixa. */
export const EMPTY_BRANDS: ForkliftBrand[] = [];

export const brandToSlug = (brand: ForkliftBrand) => brand.toLowerCase();

export const brandFromSlug = (slug: string) =>
  BRANDS.find((b) => brandToSlug(b) === slug.trim().toLowerCase());

// Evento próprio: replaceState não dispara popstate no documento que o chamou,
// então quem escreve avisa os assinantes na mão.
const BRAND_EVENT = "catalog:brandfilter";

// Cache do snapshot — useSyncExternalStore compara com Object.is, então
// devolver um array novo a cada leitura entraria em loop de render. A query
// string é a chave: enquanto ela não muda, a mesma referência volta.
let cachedSearch: string | null = null;
let cachedBrands: ForkliftBrand[] = EMPTY_BRANDS;

export function readBrands(): ForkliftBrand[] {
  const search = window.location.search;
  if (search === cachedSearch) return cachedBrands;

  const raw = new URLSearchParams(search).get(BRAND_PARAM);
  const brands = raw
    ? raw
        .split(",")
        .map(brandFromSlug)
        .filter((b): b is ForkliftBrand => Boolean(b))
    : [];

  cachedSearch = search;
  cachedBrands = brands.length > 0 ? brands : EMPTY_BRANDS;
  return cachedBrands;
}

/**
 * Grava a seleção na URL e avisa os assinantes. replaceState não empilha
 * histórico nem rola a página — filtrar segue sendo uma interação leve.
 */
export function writeBrands(brands: ForkliftBrand[]) {
  const url = new URL(window.location.href);
  if (brands.length > 0) {
    url.searchParams.set(BRAND_PARAM, brands.map(brandToSlug).join(","));
  } else {
    url.searchParams.delete(BRAND_PARAM);
  }
  if (url.href === window.location.href) return;

  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(BRAND_EVENT));
}

/** popstate cobre back/forward; o evento próprio cobre os cliques da página. */
export function subscribeBrands(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(BRAND_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(BRAND_EVENT, onChange);
  };
}
