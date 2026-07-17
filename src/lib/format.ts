// Formatação numérica em pt-BR (moeda, meses).

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const brlInteiro = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** Valor em reais, ex.: `R$ 1.033,30`. */
export function formatBRL(value: number): string {
  return brl.format(value);
}

/** Valor em reais sem centavos, ex.: `R$ 155.000` — para números redondos. */
export function formatBRLInteiro(value: number): string {
  return brlInteiro.format(value);
}

/** Meses com 1 casa decimal, ex.: `15,6 meses`. */
export function formatMeses(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const n = value.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${n} ${value >= 2 ? "meses" : "mês"}`;
}
