import { z } from "zod";
import { reportRelations, reportTypes } from "@/lib/report.options";

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
