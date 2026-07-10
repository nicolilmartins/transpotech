import { z } from "zod";
import { reportRelations } from "@/lib/report.schema";

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

export const manifestacaoSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  contact: z.string().min(5, "Informe um e-mail ou telefone para contato"),
  relation: z.enum(reportRelations, {
    message: "Selecione sua relação com a TranspoTech",
  }),
  type: z.enum(manifestacaoTypes, {
    message: "Selecione o tipo de manifestação",
  }),
  location: z.string().min(2, "Informe a unidade ou cidade relacionada"),
  message: z
    .string()
    .min(20, "Descreva sua manifestação com mais detalhes (mín. 20 caracteres)"),
  // Detalhes opcionais
  company: z.string().optional(),
  orderNumber: z.string().optional(),
});

export type ManifestacaoFormValues = z.infer<typeof manifestacaoSchema>;
