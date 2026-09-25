import { STATE_UNITS } from "./state-units";

// Abrangência nacional (fonte: inputs/abrangencia-nacional- Transpotech.html).
// Estados com atuação TranspoTech destacados no mapa do Brasil.
export const ACTIVE_UFS = [
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

/** Estados com unidade física — derivados de STATE_UNITS (fonte única). */
export const UNIT_UFS = Object.keys(STATE_UNITS);
