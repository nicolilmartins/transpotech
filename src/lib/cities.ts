// Base de municípios brasileiros para o autocomplete de cidade dos formulários.
// Os dados vêm da API pública do IBGE (todos os ~5.570 municípios + UF),
// carregados sob demanda e cacheados. Se a chamada falhar, cai numa lista
// embutida com as principais cidades (capitais + polos industriais), para o
// campo nunca ficar sem sugestões.

import { CITIES_FALLBACK } from "./cities-fallback";

export type City = {
  /** Nome do município como exibido (ex.: "Campinas"). */
  name: string;
  /** Sigla do estado (ex.: "SP"). */
  uf: string;
  /** Nome normalizado (minúsculo, sem acento) — usado só na busca. */
  norm: string;
};

/** Valor final gravado no formulário para uma cidade (ex.: "Campinas - SP"). */
export function formatCity(city: Pick<City, "name" | "uf">): string {
  return `${city.name} - ${city.uf}`;
}

// ── Normalização ──────────────────────────────────────────────────────────
// `normalize` colapsa espaços — bom para comparar a consulta inteira.
// `fold` normaliza caractere a caractere (1:1) — preserva os índices, o que
// permite destacar o trecho digitado sobre o nome original.
export function normalize(value: string): string {
  return fold(value).replace(/\s+/g, " ").trim();
}

export function fold(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, " ")
    .toLowerCase();
}

function toCity(name: string, uf: string): City {
  return { name, uf, norm: normalize(name) };
}

// ── Carregamento (IBGE + cache + fallback) ──────────────────────────────────
const IBGE_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado&orderBy=nome";
const STORAGE_KEY = "tt:cities:v1";

let cache: City[] | null = null;
let inflight: Promise<City[]> | null = null;

type IbgeNivelado = {
  "municipio-nome"?: string;
  "UF-sigla"?: string;
};

function fromSession(): City[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Array<[string, string]>;
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed.map(([name, uf]) => toCity(name, uf));
  } catch {
    return null;
  }
}

function toSession(cities: City[]): void {
  if (typeof window === "undefined") return;
  try {
    const compact = cities.map((c) => [c.name, c.uf]);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(compact));
  } catch {
    // Cota cheia / modo privado — segue só com o cache em memória.
  }
}

/**
 * Carrega a lista de municípios (uma vez por sessão). Resolve com a lista do
 * IBGE quando disponível; nunca rejeita — em caso de erro devolve o fallback.
 */
export function loadCities(): Promise<City[]> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  const stored = fromSession();
  if (stored) {
    cache = stored;
    return Promise.resolve(stored);
  }

  inflight = fetch(IBGE_URL, { headers: { Accept: "application/json" } })
    .then((res) => {
      if (!res.ok) throw new Error(`IBGE ${res.status}`);
      return res.json() as Promise<IbgeNivelado[]>;
    })
    .then((rows) => {
      const cities = rows
        .map((row) => {
          const name = row["municipio-nome"];
          const uf = row["UF-sigla"];
          return name && uf ? toCity(name, uf) : null;
        })
        .filter((c): c is City => c !== null);
      if (cities.length === 0) throw new Error("IBGE vazio");
      cache = cities;
      toSession(cities);
      return cities;
    })
    .catch(() => {
      // Offline / IBGE fora do ar: usa as principais cidades embutidas.
      cache = CITIES_FALLBACK.map((c) => toCity(c.name, c.uf));
      return cache;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

// ── Busca fuzzy ─────────────────────────────────────────────────────────────
// Tolerante a erros: prefixo > substring > subsequência (letra faltando) >
// distância de edição (troca/ordem de letras). Considera nome e "nome UF".

function subsequenceGaps(target: string, query: string): number | null {
  let ti = 0;
  let gaps = 0;
  for (let qi = 0; qi < query.length; qi++) {
    const ch = query[qi];
    let found = false;
    while (ti < target.length) {
      if (target[ti] === ch) {
        ti++;
        found = true;
        break;
      }
      ti++;
      gaps++;
    }
    if (!found) return null;
  }
  return gaps;
}

// Damerau-Levenshtein com teto — cobre troca, inversão e omissão de letras.
function boundedEditDistance(a: string, b: string, max: number): number {
  const al = a.length;
  const bl = b.length;
  if (Math.abs(al - bl) > max) return max + 1;

  let prevPrev = new Array<number>(bl + 1).fill(0);
  let prev = new Array<number>(bl + 1);
  let curr = new Array<number>(bl + 1);
  for (let j = 0; j <= bl; j++) prev[j] = j;

  for (let i = 1; i <= al; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let val = Math.min(
        prev[j] + 1, // remoção
        curr[j - 1] + 1, // inserção
        prev[j - 1] + cost // substituição
      );
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        val = Math.min(val, prevPrev[j - 2] + 1); // transposição
      }
      curr[j] = val;
      if (val < rowMin) rowMin = val;
    }
    if (rowMin > max) return max + 1;
    [prevPrev, prev, curr] = [prev, curr, prevPrev];
  }
  return prev[bl];
}

function scoreTarget(target: string, query: string): number {
  if (!query) return 0;
  if (target === query) return 1000;
  if (target.startsWith(query)) return 900 - target.length * 0.1;
  const idx = target.indexOf(query);
  if (idx >= 0) return 800 - idx * 4 - target.length * 0.1;
  const gaps = subsequenceGaps(target, query);
  if (gaps !== null) return 650 - Math.min(gaps, 100) - target.length * 0.1;
  // Só tenta distância de edição quando os tamanhos são compatíveis, para
  // evitar custo e falsos positivos com consultas muito curtas.
  if (query.length >= 3 && Math.abs(target.length - query.length) <= 3) {
    const d = boundedEditDistance(target, query, 2);
    if (d <= 2) return 480 - d * 60 - target.length * 0.1;
  }
  return 0;
}

export type CityMatch = {
  city: City;
  score: number;
};

export function searchCities(
  cities: City[],
  rawQuery: string,
  limit = 8
): CityMatch[] {
  const query = normalize(rawQuery);
  if (!query) return [];

  const matches: CityMatch[] = [];
  for (const city of cities) {
    const nameScore = scoreTarget(city.norm, query);
    const fullScore = scoreTarget(`${city.norm} ${city.uf.toLowerCase()}`, query);
    const score = Math.max(nameScore, fullScore);
    if (score > 0) matches.push({ city, score });
  }

  matches.sort(
    (a, b) =>
      b.score - a.score ||
      a.city.name.length - b.city.name.length ||
      a.city.name.localeCompare(b.city.name, "pt-BR")
  );
  return matches.slice(0, limit);
}

// ── Destaque do trecho digitado ─────────────────────────────────────────────
export type HighlightSegment = { text: string; match: boolean };

/**
 * Quebra o nome em segmentos marcando o trecho que casa com a consulta.
 * Ignora um eventual token de UF no fim da consulta (ex.: "campinas sp").
 */
export function highlightCity(name: string, rawQuery: string): HighlightSegment[] {
  const query = normalize(rawQuery);
  if (!query) return [{ text: name, match: false }];

  const foldedName = fold(name).replace(/\s+/g, " ");
  // Remove um token final de 2 letras (provável UF) para casar só o nome.
  const nameQuery = query.replace(/\s+[a-z]{2}$/i, "").trim() || query;

  // 1) trecho contíguo
  const idx = foldedName.indexOf(nameQuery);
  if (idx >= 0) {
    return buildSegments(name, new Set(range(idx, nameQuery.length)));
  }

  // 2) subsequência (cobre letra faltando / erro no meio)
  const matched = new Set<number>();
  let qi = 0;
  const compact = nameQuery.replace(/\s+/g, "");
  for (let i = 0; i < name.length && qi < compact.length; i++) {
    if (fold(name[i]) === compact[qi]) {
      matched.add(i);
      qi++;
    }
  }
  if (qi === compact.length && matched.size > 0) {
    return buildSegments(name, matched);
  }

  // 3) sem correspondência limpa (caso de erro de digitação) — sem destaque
  return [{ text: name, match: false }];
}

function range(start: number, length: number): number[] {
  return Array.from({ length }, (_, i) => start + i);
}

function buildSegments(name: string, indices: Set<number>): HighlightSegment[] {
  const segments: HighlightSegment[] = [];
  let current = "";
  let currentMatch = indices.has(0);
  for (let i = 0; i < name.length; i++) {
    const isMatch = indices.has(i);
    if (isMatch === currentMatch) {
      current += name[i];
    } else {
      if (current) segments.push({ text: current, match: currentMatch });
      current = name[i];
      currentMatch = isMatch;
    }
  }
  if (current) segments.push({ text: current, match: currentMatch });
  return segments;
}

// ── Cidade lembrada (pré-preenchimento entre formulários) ───────────────────
const REMEMBER_KEY = "tt:lastCity";

export function getRememberedCity(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(REMEMBER_KEY) || null;
  } catch {
    return null;
  }
}

export function rememberCity(value: string): void {
  if (typeof window === "undefined") return;
  try {
    if (value.trim()) sessionStorage.setItem(REMEMBER_KEY, value.trim());
  } catch {
    // Ignora falha de storage (modo privado / cota).
  }
}
