// Opções dos selects da Ouvidoria, fora do schema: o formulário importa daqui
// sem puxar zod para o bundle inicial.
import { reportRelations } from "@/lib/report.options";

// Reaproveita as relações do Canal da Transparência.
export { reportRelations as manifestacaoRelations };

/** Opções do select "Tipo de manifestação" (rascunho — validar depois). */
export const manifestacaoTypes = [
  "Reclamação",
  "Sugestão",
  "Elogio",
  "Dúvida",
  "Solicitação",
  "Outro",
] as const;
