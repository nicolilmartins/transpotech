// Capitais e unidades TranspoTech projetadas nas coordenadas do br.svg
// (Mercator, calibrado por mínimos quadrados a partir dos bounding boxes dos
// estados em state-maps.ts). Pontos muito próximos da capital (Nova Santa
// Rita, Curitiba, Aparecida de Goiânia) têm um leve afastamento visual para
// os marcadores não se sobreporem.
// Tempos = deslocamento rodoviário aproximado desde a capital.

export type MapLabelPos = "top" | "bottom" | "left" | "right";

export type StateUnitPoint = {
  /** Cidade da unidade. */
  city: string;
  /** Complementos quando há mais de uma unidade na cidade. */
  notes?: string[];
  /** Coordenadas no espaço do br.svg (viewBox 0 0 1000 912). */
  x: number;
  y: number;
  /** Tempo aproximado de deslocamento desde a origem (ausente na unidade-origem). */
  time?: string;
  /** Sufixo do tempo no card. Default: "da capital". */
  timeFrom?: string;
  /** Lado do rótulo no mapa, para evitar colisões. */
  labelPos: MapLabelPos;
  /** Inverte a barriga do arco quando o padrão cruza rótulos vizinhos. */
  arcFlip?: boolean;
  /** Lado alternativo em telas estreitas (quando o padrão estoura a tela). */
  labelPosMobile?: MapLabelPos;
};

export type StateUnitsItem = {
  /** Capital do estado. Quando ausente (ex.: PR, onde a unidade fica na
      própria capital), os arcos partem da primeira unidade da lista. */
  capital?: {
    name: string;
    x: number;
    y: number;
    labelPos: MapLabelPos;
    labelPosMobile?: MapLabelPos;
  };
  points: StateUnitPoint[];
};

export const STATE_UNITS: Record<string, StateUnitsItem> = {
  SC: {
    capital: {
      // Deslocado ~2 unidades a leste da projeção para cair sobre a ilha.
      name: "Florianópolis",
      x: 560.3,
      y: 726.2,
      labelPos: "right",
      labelPosMobile: "left",
    },
    points: [
      {
        city: "Joinville",
        x: 552.2,
        y: 697.0,
        time: "2h30",
        labelPos: "left",
        arcFlip: true,
      },
      {
        city: "Blumenau",
        notes: ["Hub Técnico", "Seminovas"],
        x: 547.8,
        y: 710.9,
        time: "2h",
        labelPos: "left",
      },
      { city: "Itajaí", x: 555.9, y: 710.6, time: "1h20", labelPos: "right" },
      { city: "Chapecó", x: 476.5, y: 715.0, time: "7h", labelPos: "bottom" },
    ],
  },
  RS: {
    capital: { name: "Porto Alegre", x: 504.6, y: 782.2, labelPos: "right" },
    points: [
      {
        city: "Nova Santa Rita",
        x: 500.2,
        y: 775.6,
        time: "30 min",
        labelPos: "left",
      },
      {
        city: "Caxias do Sul",
        x: 505.3,
        y: 762.2,
        time: "2h",
        labelPos: "left",
      },
    ],
  },
  PR: {
    // Sem capital no mapa: a unidade de Curitiba é a origem dos arcos e a
    // distância mostrada é entre as unidades.
    points: [
      { city: "Curitiba", x: 545.1, y: 680.6, labelPos: "right" },
      {
        city: "Maringá",
        x: 490.2,
        y: 633.0,
        time: "5h30",
        timeFrom: "de Curitiba",
        labelPos: "left",
      },
    ],
  },
  SP: {
    capital: { name: "São Paulo", x: 596.7, y: 635.9, labelPos: "bottom" },
    points: [
      {
        city: "Indaiatuba",
        x: 585.0,
        y: 625.8,
        time: "1h30",
        labelPos: "left",
      },
    ],
  },
  GO: {
    capital: { name: "Goiânia", x: 543.8, y: 488.6, labelPos: "left" },
    points: [
      {
        city: "Aparecida de Goiânia",
        x: 546.5,
        y: 495.5,
        time: "30 min",
        labelPos: "right",
      },
    ],
  },
};

/** Total de unidades físicas de um estado (cidades com mais de uma contam todas). */
export function countStateUnits(uf: string): number {
  const state = STATE_UNITS[uf];
  if (!state) return 0;
  return state.points.reduce((sum, p) => sum + (p.notes?.length ?? 1), 0);
}
