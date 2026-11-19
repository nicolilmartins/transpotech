// Modelo de custo GLP × Elétrica (lítio) — baseado na planilha comercial
// "Comparativo GLP 2.5 x Elétrica 2.5". Compara a empilhadeira a GLP RC4425C
// (motor Nissan K25) com a elétrica lítio RCE25-35 em duas configurações de
// bateria (412Ah e 277Ah), replicando exatamente as fórmulas da planilha.
//
// Só três valores são editáveis (células amarelas): nr. de turnos, valor do
// cilindro de gás e valor do kWh. Os demais são constantes de referência dos
// equipamentos ("alterar somente campos em amarelo").

import type { StaticImageData } from "next/image";
import imgGlp from "@/assets/images/empilhadeiras/rc_44_1.webp";
import imgEletrica from "@/assets/images/empilhadeiras/rce_1.webp";

/** Valores editáveis pelo usuário (células amarelas da planilha). */
export type SimuladorInputs = {
  /** Nr. de turnos de trabalho por dia (ex.: 2.5). */
  turnos: number;
  /** Valor do cilindro de gás P20 (R$). */
  cilindro: number;
  /** Valor do kWh (R$). */
  kwh: number;
};

/** Resultado de custo de um equipamento (GLP ou elétrico). */
export type ResultadoEquipamento = {
  id: string;
  nome: string;
  /** Nome curto para cabeçalhos compactos (ex.: "GLP", "Elétrica 412Ah"). */
  nomeCurto: string;
  motor: string;
  /** Foto do equipamento (cabeçalho da coluna). */
  image: StaticImageData;
  /** true para as opções elétricas (payback/economia; acento verde). */
  eletrica: boolean;
  custoHora: number;
  custoMes: number;
  custoAno: number;
  custoCincoAnos: number;
  /** GLP: preço de referência do equipamento (R$). Elétrica: undefined. */
  preco?: number;
  /** Elétrica: retorno do investimento em meses. GLP: undefined. */
  paybackMeses?: number;
  /** Elétrica: economia acumulada em 5 anos vs. GLP (R$). GLP: undefined. */
  economiaCincoAnos?: number;
};

export type ComparativoResultado = {
  glp: ResultadoEquipamento;
  baterias: ResultadoEquipamento[];
};

/** Valores padrão (mesmos defaults da planilha). */
export const DEFAULT_INPUTS: SimuladorInputs = {
  turnos: 2.5,
  cilindro: 200,
  kwh: 0.57,
};

// Constantes de operação (não editáveis).
const DIAS_MES = 22;
const MESES_ANO = 12;
const ANOS = 5;
const TURNO_HORAS = 8;

// GLP — RC4425C (motor Nissan K25 GLP).
const GLP = {
  nome: "GLP RC4425C",
  nomeCurto: "GLP",
  motor: "Motor Nissan K25 (GLP)",
  image: imgGlp,
  autonomiaHoras: 8, // autonomia média por cilindro com carga completa
  preco: 155000, // preço de referência (torre standard 4.775mm)
};

// Elétrica — RCE25-35 (motor elétrico AC / lítio), duas baterias.
const BATERIAS = [
  {
    id: "bateria-412ah",
    nome: "Elétrica lítio · 412Ah",
    nomeCurto: "Elétrica 412Ah",
    image: imgEletrica,
    capacidadeKwh: 32.96,
    autonomiaHoras: 8,
  },
  {
    id: "bateria-277ah",
    nome: "Elétrica lítio · 277Ah",
    nomeCurto: "Elétrica 277Ah",
    image: imgEletrica,
    capacidadeKwh: 22.16,
    autonomiaHoras: 6,
  },
] as const;

const ELETRICA_MOTOR = "Motor elétrico AC / Lítio-Íon (RCE25-35)";

/**
 * Calcula o comparativo de custos com os valores informados. Função pura —
 * replica as fórmulas da planilha (turno base de 8h para o custo mensal).
 */
export function compararCustos(inputs: SimuladorInputs): ComparativoResultado {
  const { turnos, cilindro, kwh } = inputs;

  // GLP: custo/hora = preço do cilindro ÷ autonomia; mês = (hora×8)×22×turnos.
  const glpHora = cilindro / GLP.autonomiaHoras;
  const glpMes = glpHora * TURNO_HORAS * DIAS_MES * turnos;
  const glpAno = glpMes * MESES_ANO;
  const glp: ResultadoEquipamento = {
    id: "glp",
    nome: GLP.nome,
    nomeCurto: GLP.nomeCurto,
    motor: GLP.motor,
    image: GLP.image,
    eletrica: false,
    custoHora: glpHora,
    custoMes: glpMes,
    custoAno: glpAno,
    custoCincoAnos: glpAno * ANOS,
    preco: GLP.preco,
  };

  const baterias = BATERIAS.map((b): ResultadoEquipamento => {
    const kwhTotal = b.capacidadeKwh * kwh;
    const hora = kwhTotal / b.autonomiaHoras;
    const mes = hora * TURNO_HORAS * DIAS_MES * turnos;
    const ano = mes * MESES_ANO;
    const cincoAnos = ano * ANOS;
    // Payback: preço do GLP ÷ economia mensal de energia (GLP − elétrica).
    const economiaMes = glpMes - mes;
    return {
      id: b.id,
      nome: b.nome,
      nomeCurto: b.nomeCurto,
      motor: ELETRICA_MOTOR,
      image: b.image,
      eletrica: true,
      custoHora: hora,
      custoMes: mes,
      custoAno: ano,
      custoCincoAnos: cincoAnos,
      paybackMeses: economiaMes > 0 ? GLP.preco / economiaMes : Infinity,
      economiaCincoAnos: glp.custoCincoAnos - cincoAnos,
    };
  });

  return { glp, baterias };
}
