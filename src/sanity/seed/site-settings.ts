import { ROUTES } from "@/lib/routes";
import { defaultDescription, defaultShareDescription } from "@/lib/metadata";
import type { SeedDocument } from "./helpers";

export function documents(): SeedDocument[] {
  return [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      // PLACEHOLDER: confirmar a URL real do portal de carreiras (Gupy).
      careersUrl: ROUTES.GUPY,
      ouvidorDigitalUrl: ROUTES.OUVIDOR_DIGITAL,
      // Sem `social`: as URLs reais das redes ainda não foram fornecidas.
      seo: {
        description: defaultDescription,
        shareDescription: defaultShareDescription,
      },
    },
  ];
}
