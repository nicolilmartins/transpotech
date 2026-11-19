import { STATE_UNITS } from "./state-units";

// ── Abrangência por tipo de serviço ─────────────────────────────────────────
// Números informados pelo cliente (out/2026): venda de peças, pneus e
// acessórios em 23 UFs; pós-venda (manutenção) em 19; locação em 17. As faixas
// são encaixadas — quem tem locação também tem pós-venda e venda —, então o
// mapa pinta cada UF na faixa mais forte em que ela aparece.

/** Locação (17 UFs). */
// PENDENTE: o cliente ainda não informou QUAIS são as 17. São 2 a menos que a
// lista de pós-venda abaixo; enquanto a relação não chega, a faixa fica vazia e
// nenhuma UF é pintada no tom de locação.
export const RENTAL_UFS: string[] = [];

/**
 * Pós-venda / manutenção (19 UFs).
 * Fonte: inputs/abrangencia-nacional- Transpotech.html — é a lista que o mapa
 * já pintava antes de existirem as três faixas.
 */
export const SERVICE_UFS = [
  "SC",
  "PR",
  "RS",
  "SP",
  "GO",
  "MG",
  "PE",
  "DF",
  "MT",
  "BA",
  "MA",
  "RJ",
  "PA",
  "AL",
  "AM",
  "CE",
  "RO",
  "ES",
  "TO",
];

/** Venda de peças, pneus e acessórios (23 UFs). */
// PENDENTE: faltam as 4 UFs que completam as 23 — candidatas que sobram no
// Brasil: AC, AP, MS, PB, PI, RN, RR, SE. Até lá a faixa repete a de
// pós-venda, para o mapa nunca afirmar atuação onde não foi confirmada.
export const SALES_UFS = [...SERVICE_UFS];

/** Todas as UFs com algum tipo de atuação — define o que é clicável no mapa. */
export const ACTIVE_UFS = Array.from(
  new Set([...SALES_UFS, ...SERVICE_UFS, ...RENTAL_UFS]),
);

/**
 * Tom da UF no mapa. Venda e manutenção dividem o mesmo tom ("atuação") — a
 * legenda cita os dois números nessa única faixa; a locação, por ser o recorte
 * mais restrito, ganha um tom mais forte.
 */
export type CoverageTier = "rental" | "active" | null;

export function coverageTier(uf: string): CoverageTier {
  if (RENTAL_UFS.includes(uf)) return "rental";
  if (SERVICE_UFS.includes(uf) || SALES_UFS.includes(uf)) return "active";
  return null;
}

/** Estados com unidade física — derivados de STATE_UNITS (fonte única). */
export const UNIT_UFS = Object.keys(STATE_UNITS);
