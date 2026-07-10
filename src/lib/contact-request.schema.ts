import { z } from "zod";

export const contactRequestSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  company: z.string().min(2, "Informe o nome da empresa"),
  contact: z
    .string()
    .min(5, "Informe um telefone, WhatsApp ou e-mail para contato"),
  cityUf: z.string().min(2, "Informe a cidade e o estado"),
  message: z
    .string()
    .min(10, "Descreva sua necessidade com mais detalhes (mín. 10 caracteres)"),
  consent: z.literal(true, {
    message: "É necessário concordar com a Política de Privacidade",
  }),
});

export type ContactRequestValues = z.infer<typeof contactRequestSchema>;
