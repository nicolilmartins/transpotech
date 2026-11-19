import { cache } from "react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import { imageProjection, type CmsImage } from "@/sanity/image";
import { ROUTES } from "@/lib/routes";
import { defaultDescription, defaultShareDescription } from "@/lib/metadata";

export type SocialNetwork = "facebook" | "instagram" | "linkedin" | "youtube";

export type SiteSettings = {
  careersUrl: string;
  ouvidorDigitalUrl: string;
  /** Sem URL, o ícone do rodapé fica com href="#". */
  social: Partial<Record<SocialNetwork, string>>;
  seo: {
    description: string;
    shareDescription: string;
    shareImage?: CmsImage;
  };
};

export const localSiteSettings: SiteSettings = {
  careersUrl: ROUTES.GUPY,
  ouvidorDigitalUrl: ROUTES.OUVIDOR_DIGITAL,
  social: {},
  seo: {
    description: defaultDescription,
    shareDescription: defaultShareDescription,
  },
};

const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  careersUrl,
  ouvidorDigitalUrl,
  "social": social{ facebook, instagram, linkedin, youtube },
  "seo": seo{
    description,
    shareDescription,
    "shareImage": select(defined(shareImage.asset) => shareImage${imageProjection})
  }
}`);

type SiteSettingsRow = {
  careersUrl: string | null;
  ouvidorDigitalUrl: string | null;
  social: Partial<Record<SocialNetwork, string | null>> | null;
  seo: {
    description: string | null;
    shareDescription: string | null;
    shareImage: CmsImage | null;
  } | null;
};

// Repete a validação do schema: o dataset aceita escrita direta pela API, que
// não passa pelas regras do Studio.
const HTTP_URL = /^https?:\/\//i;
const httpUrl = (url: string | null | undefined) =>
  url && HTTP_URL.test(url) ? url : undefined;

// Campo vazio ou inválido cai no valor local: link nunca fica sem destino.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const row = await sanityFetch<SiteSettingsRow | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });
  if (!row) return localSiteSettings;

  const local = localSiteSettings;
  const social = Object.fromEntries(
    Object.entries(row.social ?? {}).flatMap(([network, url]) =>
      httpUrl(url) ? [[network, url]] : [],
    ),
  ) as SiteSettings["social"];

  return {
    careersUrl: httpUrl(row.careersUrl) ?? local.careersUrl,
    ouvidorDigitalUrl:
      httpUrl(row.ouvidorDigitalUrl) ?? local.ouvidorDigitalUrl,
    social,
    seo: {
      description: row.seo?.description || local.seo.description,
      shareDescription: row.seo?.shareDescription || local.seo.shareDescription,
      ...(row.seo?.shareImage ? { shareImage: row.seo.shareImage } : {}),
    },
  };
});
