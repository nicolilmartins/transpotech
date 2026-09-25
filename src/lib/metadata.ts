import type { Metadata } from "next";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

// O Next faz merge raso do metadata: um `openGraph` na página substitui por
// inteiro o do layout. Cada página espalha esta base no próprio openGraph
// para não perder type, locale e siteName.
export const baseOpenGraph = {
  type: "website",
  locale: "pt_BR",
  siteName: "TranspoTech",
} as const satisfies OpenGraph;

// Descrições padrão do site (layout raiz). São o fallback de siteSettings.seo
// e a fonte do seed; o valor editável fica no Sanity.
export const defaultDescription =
  "TranspoTech: locação, assistência técnica e venda de empilhadeiras industriais. Representante oficial STILL, Linde e Baoli. 25 anos de mercado, 11 unidades.";

export const defaultShareDescription =
  "Locação, assistência técnica e venda de empilhadeiras industriais. Representante oficial STILL, Linde e Baoli.";
