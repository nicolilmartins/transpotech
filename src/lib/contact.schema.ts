import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .regex(/^\d[\d\s\-()]+$/, "Telefone inválido"),
  company: z.string().min(2, "Nome da empresa é obrigatório"),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem muito longa"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
