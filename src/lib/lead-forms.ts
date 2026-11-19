// Formulários de captação e o identificador de conversão de cada um no RD
// Station. O client manda só a chave; o identificador sai daqui, no servidor,
// para ninguém criar conversões arbitrárias na conta do RD.
export const LEAD_FORM_CONVERSIONS = {
  contato: "site-contato",
  "locacao-de-empilhadeiras": "site-locacao-de-empilhadeiras",
  pecas: "site-pecas",
  servicos: "site-servicos",
  acessorios: "site-acessorios",
  "baterias-e-carregadores": "site-baterias-e-carregadores",
  pneus: "site-pneus",
  "empilhadeiras-seminovas": "site-empilhadeiras-seminovas",
  "automacao-intralogistica": "site-automacao-intralogistica",
} as const;

export type LeadFormId = keyof typeof LEAD_FORM_CONVERSIONS;

export const LEAD_FORM_IDS = Object.keys(LEAD_FORM_CONVERSIONS) as [
  LeadFormId,
  ...LeadFormId[],
];
