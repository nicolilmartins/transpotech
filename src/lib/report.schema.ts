import { z } from "zod";

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

export const reportSchema = z.object({
  identify: z.enum(["sim", "anonimo"]),
  relation: z.enum(reportRelations, {
    message: "Selecione sua relação com a TranspoTech",
  }),
  type: z.enum(reportTypes, { message: "Selecione o tipo de relato" }),
  location: z.string().optional(),
  occurredAt: z.string().optional(),
  people: z.string().optional(),
  description: z
    .string()
    .min(20, "Descreva o ocorrido com mais detalhes (mín. 20 caracteres)"),
});

export type ReportFormValues = z.infer<typeof reportSchema>;
