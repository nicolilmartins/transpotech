export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://transpotech.com.br",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  rdStationToken: process.env.NEXT_PUBLIC_RD_STATION_TOKEN ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
