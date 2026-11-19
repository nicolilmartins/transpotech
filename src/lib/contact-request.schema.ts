import { z } from "zod";
import { LEAD_FORM_IDS } from "./lead-forms";

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo"),
  company: z.string().trim().min(2, "Informe o nome da empresa"),
  phone: z
    .string()
    .trim()
    .regex(/^\d[\d\s\-()]+$/, "Informe um telefone ou WhatsApp para contato")
    .refine(
      (value) => value.replace(/\D/g, "").length >= 8,
      "Informe um telefone ou WhatsApp para contato",
    ),
  email: z.string().trim().email("Informe um e-mail válido"),
  cityUf: z.string().trim().min(2, "Informe a cidade e o estado"),
  message: z
    .string()
    .trim()
    .min(10, "Descreva sua necessidade com mais detalhes (mín. 10 caracteres)"),
  consent: z.literal(true, {
    message: "É necessário concordar com a Política de Privacidade",
  }),
  /** Opcional — usado só no formulário de locação (período em meses). */
  periodMonths: z.string().optional(),
  /** Honeypot: campo escondido que só robô preenche. */
  website: z.string().optional(),
});

export type ContactRequestValues = z.infer<typeof contactRequestSchema>;

/** Corpo de POST /api/leads: os campos do formulário + qual formulário enviou. */
export const leadRequestSchema = contactRequestSchema.extend({
  form: z.enum(LEAD_FORM_IDS),
});

export type LeadRequest = z.infer<typeof leadRequestSchema>;
