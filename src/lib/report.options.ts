// Opções dos selects do Canal da Transparência, fora do schema: o formulário
// importa daqui sem puxar zod para o bundle inicial.

/** Opções do select "Relação com a TranspoTech" (rascunho — validar com compliance). */
export const reportRelations = [
  "Colaborador(a)",
  "Ex-colaborador(a)",
  "Cliente",
  "Fornecedor",
  "Parceiro",
  "Outro",
] as const;

/** Opções do select "Tipo de relato" (espelham o escopo do canal). */
export const reportTypes = [
  "Assédio moral ou sexual",
  "Discriminação",
  "Fraude ou corrupção",
  "Conflito de interesses",
  "Descumprimento de políticas internas",
  "Uso indevido de recursos",
  "Conduta antiética",
  "Outras situações sensíveis",
] as const;
