import { z } from "zod";

export const newsletterThemes = [
  "Locação",
  "Manutenção",
  "Automação",
  "ESG",
] as const;

export const newsletterSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  theme: z.enum(newsletterThemes, {
    message: "Selecione um tema de interesse",
  }),
  consent: z.literal(true, {
    message: "É necessário concordar com o tratamento dos dados",
  }),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
