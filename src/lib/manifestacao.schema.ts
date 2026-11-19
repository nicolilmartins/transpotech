import { z } from "zod";
import { reportRelations } from "@/lib/report.options";
import { manifestacaoTypes } from "@/lib/manifestacao.options";

export const manifestacaoSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  contact: z
    .string()
    .trim()
    .min(5, "Informe um e-mail ou telefone para contato")
    .refine(
      (value) =>
        z.string().email().safeParse(value).success ||
        /^\+?[\d\s()-]{10,}$/.test(value),
      "Informe um e-mail ou telefone válido",
    ),
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
