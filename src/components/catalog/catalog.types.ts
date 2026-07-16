export type FacetKey =
  | "brand"
  | "equipmentType"
  | "energyTag"
  | "application"
  | "location";

export type FacetGroup = {
  key: FacetKey;
  label: string;
  options: string[];
  /** Total de produtos do site que atendem cada opção (contador sutil). */
  counts?: Record<string, number>;
  defaultOpen?: boolean;
};

export type SelectedFacets = Record<FacetKey, string[]>;

/** Filtros numéricos de deslizar (logo após "Marca"). */
export type RangeKey = "capacity" | "liftHeight" | "aisleWidth";

export type RangeGroup = {
  key: RangeKey;
  label: string;
  /** Limites derivados dos produtos (na unidade interna do campo). */
  min: number;
  max: number;
  step: number;
  /**
   * Direção do filtro: "min" = produtos com valor ≥ selecionado (capacidade,
   * elevação); "max" = produtos com valor ≤ selecionado (corredor).
   */
  mode: "min" | "max";
  /** Formata o valor para exibição (ex.: 1.6 → "1,6 t"; 5400 → "5,4 m"). */
  format: (value: number) => string;
};

/** Valor atual de cada slider (no boundary neutro = sem filtro). */
export type SelectedRanges = Record<RangeKey, number>;

export type SortKey = "relevance" | "name" | "brand";
