import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import { imageProjection } from "@/sanity/image";
import { forkliftsNovas } from "@/data/forklifts-novas";
import { forkliftsSeminovas } from "@/data/forklifts-seminovas";
import {
  getForkliftDetail as getLocalForkliftDetail,
  type DetailBlock,
  type DetailImage,
  type ForkliftMedia,
  type ResolvedForkliftDetail,
} from "@/data/forklift-details";
import type { Forklift } from "@/types/forklift.types";

const cardProjection = `
  "id": slug.current,
  name,
  brand,
  energyTag,
  equipmentType,
  application,
  capacity,
  energy,
  liftHeight,
  aisleWidth,
  availability,
  location,
  "image": image${imageProjection}`;

const forkliftsNovasQuery = defineQuery(`*[_type == "forkliftNew"] | order(order asc){
  ${cardProjection},
  madeInBrazil == true => { "madeInBrazil": true }
}`);

const forkliftsSeminovasQuery = defineQuery(`*[_type == "forkliftUsed"] | order(order asc){
  ${cardProjection},
  year,
  workedHours,
  count(gallery) > 0 => { "gallery": gallery[]${imageProjection} }
}`);

const detailImageProjection = `{ "src": ${imageProjection}, "alt": coalesce(alt, "") }`;

const forkliftDetailQuery = defineQuery(`*[_type == "forkliftNew" && slug.current == $slug][0]{
  tagline,
  highlights,
  intro,
  blocks[]{ title, description, icon },
  datasheetHref,
  "hero": select(defined(heroImage.asset) => heroImage{
    "src": ${imageProjection},
    "alt": coalesce(alt, ""),
    "fit": coalesce(^.heroFit, "cover")
  }),
  "cards": select(count(cardImages) > 0 => cardImages[]${detailImageProjection}),
  "gallery": select(defined(galleryWide.asset) && count(galleryPair) == 2 => {
    "wide": galleryWide${detailImageProjection},
    "pair": galleryPair[]${detailImageProjection}
  })
}`);

type CmsForkliftDetail = {
  tagline: string | null;
  highlights: string[] | null;
  intro: { titleTop?: string; titleBottom?: string; description?: string } | null;
  blocks: DetailBlock[] | null;
  datasheetHref: string | null;
  hero: DetailImage | null;
  cards: DetailImage[] | null;
  gallery: ForkliftMedia["gallery"] | null;
};

export async function getForkliftsNovas(): Promise<Forklift[]> {
  const items = await sanityFetch<Forklift[]>({
    query: forkliftsNovasQuery,
    tags: ["forkliftNew"],
  });
  return items ?? forkliftsNovas;
}

export async function getForkliftsSeminovas(): Promise<Forklift[]> {
  const items = await sanityFetch<Forklift[]>({
    query: forkliftsSeminovasQuery,
    tags: ["forkliftUsed"],
  });
  return items ?? forkliftsSeminovas;
}

/** Slugs de todas as novas (rotas de detalhe e sitemap). */
export async function getForkliftNovaSlugs(): Promise<string[]> {
  return (await getForkliftsNovas()).map((forklift) => forklift.id);
}

/** Slugs de todas as seminovas (rotas de detalhe e sitemap). */
export async function getForkliftSeminovaSlugs(): Promise<string[]> {
  return (await getForkliftsSeminovas()).map((forklift) => forklift.id);
}

export async function getForkliftNovaBySlug(slug: string): Promise<Forklift | undefined> {
  return (await getForkliftsNovas()).find((forklift) => forklift.id === slug);
}

export async function getForkliftSeminovaBySlug(
  slug: string
): Promise<Forklift | undefined> {
  return (await getForkliftsSeminovas()).find((forklift) => forklift.id === slug);
}

/**
 * Produtos relacionados: prioriza a mesma marca, depois o mesmo tipo de
 * equipamento, completando até `count` (excluindo o produto atual).
 */
export function getRelatedForklifts(
  all: Forklift[],
  current: Forklift,
  count = 4
): Forklift[] {
  const others = all.filter((f) => f.id !== current.id);
  const score = (f: Forklift) =>
    (f.brand === current.brand ? 2 : 0) +
    (f.equipmentType === current.equipmentType ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, count);
}

/** Demais classificados, para a seção "outras seminovas" do detalhe. */
export function getOtherSeminovas(
  all: Forklift[],
  current: Forklift,
  limit = 4
): Forklift[] {
  return all.filter((forklift) => forklift.id !== current.id).slice(0, limit);
}

// Link vindo do CMS: só http(s), mailto, tel ou caminho interno ("/x", não
// "//x" nem "/\x" — o navegador lê "\" como "/" em URL http(s)).
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/(?![/\\]))/i;

/**
 * Conteúdo da página de detalhe. Campo vazio no documento cai no mesmo default
 * de src/data/forklift-details.ts.
 */
export async function getForkliftDetail(
  forklift: Forklift
): Promise<ResolvedForkliftDetail> {
  const cms = await sanityFetch<CmsForkliftDetail | null>({
    query: forkliftDetailQuery,
    params: { slug: forklift.id },
    tags: ["forkliftNew"],
  });
  if (cms === null) return getLocalForkliftDetail(forklift);

  // forklift-details.ts não exporta o conteúdo genérico: um id fora de
  // detailById faz getForkliftDetail devolvê-lo, com o palco padrão (foto do
  // próprio modelo, inteira) e as mídias compartilhadas.
  const fallback = getLocalForkliftDetail({ ...forklift, id: "" });

  return {
    tagline: cms.tagline || fallback.tagline,
    highlights: cms.highlights?.length ? cms.highlights : fallback.highlights,
    intro: {
      titleTop: cms.intro?.titleTop || fallback.intro.titleTop,
      titleBottom: cms.intro?.titleBottom || fallback.intro.titleBottom,
      description: cms.intro?.description || fallback.intro.description,
    },
    blocks: cms.blocks?.length ? cms.blocks : fallback.blocks,
    datasheetHref:
      cms.datasheetHref && SAFE_HREF.test(cms.datasheetHref)
        ? cms.datasheetHref
        : fallback.datasheetHref,
    media: {
      hero: cms.hero ?? fallback.media.hero,
      cards: cms.cards ?? fallback.media.cards,
      gallery: cms.gallery ?? fallback.media.gallery,
    },
  };
}
