import { z } from "zod";

// Nenhuma variável é obrigatória hoje (todas têm default ou são opcionais);
// o parse garante só o formato, falhando no boot se uma URL vier malformada.
const envSchema = z.object({
  siteUrl: z.string().url(),
  apiUrl: z.union([z.literal(""), z.string().url()]),
  rdStationToken: z.string(),
  gaId: z.string(),
});

// Cada NEXT_PUBLIC_* é lida por nome literal: o Next só embute no bundle do
// client as referências estáticas a process.env.
export const env = envSchema.parse({
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://transpotech.com.br",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  rdStationToken: process.env.NEXT_PUBLIC_RD_STATION_TOKEN ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
});

// Segredo do servidor: sem NEXT_PUBLIC, o Next não o embute no client (lá vira
// undefined). Lido na hora do uso para valer o valor do runtime.
export function getRdStationApiKey(): string {
  return process.env.RD_STATION_API_KEY ?? "";
}
