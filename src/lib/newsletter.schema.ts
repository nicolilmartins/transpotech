import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
