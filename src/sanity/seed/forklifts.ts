import { forkliftsNovas } from "@/data/forklifts-novas";
import { forkliftsSeminovas } from "@/data/forklifts-seminovas";
import { getForkliftDetail, type DetailImage } from "@/data/forklift-details";
import type { Forklift } from "@/types/forklift.types";
import { seedImage, seedKey, type SeedDocument } from "./helpers";

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

function cardFields(forklift: Forklift, order: number) {
  return {
    name: forklift.name,
    slug: { _type: "slug", current: forklift.id },
    image: seedImage(forklift.image),
    brand: forklift.brand,
    energyTag: forklift.energyTag,
    equipmentType: forklift.equipmentType,
    application: forklift.application,
    capacity: forklift.capacity,
    energy: forklift.energy,
    liftHeight: forklift.liftHeight,
    aisleWidth: forklift.aisleWidth,
    availability: forklift.availability,
    location: forklift.location,
    order,
  };
}

const imageItems = (images: DetailImage[], prefix: string) =>
  images.map((image, i) => ({
    ...seedImage(image.src, image.alt),
    _key: seedKey(i, prefix),
  }));

// Só grava no documento o que difere do conteúdo padrão; o resto fica vazio e
// o loader aplica o mesmo default (ver getForkliftDetail em queries/forklifts).
function detailFields(forklift: Forklift) {
  const detail = getForkliftDetail(forklift);
  const fallback = getForkliftDetail({ ...forklift, id: "" });
  const { hero, cards, gallery } = detail.media;

  return {
    ...(!same(detail.tagline, fallback.tagline) && { tagline: detail.tagline }),
    ...(!same(detail.highlights, fallback.highlights) && {
      highlights: detail.highlights,
    }),
    ...(!same(detail.intro, fallback.intro) && { intro: detail.intro }),
    ...(!same(detail.blocks, fallback.blocks) && {
      blocks: detail.blocks.map((block, i) => ({
        _key: seedKey(i, "block"),
        _type: "detailBlock",
        ...block,
      })),
    }),
    ...(!same(hero, fallback.media.hero) && {
      heroImage: seedImage(hero.src, hero.alt),
      heroFit: hero.fit ?? "cover",
    }),
    ...(!same(cards, fallback.media.cards) && {
      cardImages: imageItems(cards, "card"),
    }),
    ...(!same(gallery, fallback.media.gallery) && {
      galleryWide: seedImage(gallery.wide.src, gallery.wide.alt),
      galleryPair: imageItems(gallery.pair, "pair"),
    }),
    ...(!same(detail.datasheetHref, fallback.datasheetHref) && {
      datasheetHref: detail.datasheetHref,
    }),
  };
}

export function documents(): SeedDocument[] {
  const novas = forkliftsNovas.map((forklift, i) => ({
    _id: `forkliftNew-${forklift.id}`,
    _type: "forkliftNew",
    ...cardFields(forklift, i),
    madeInBrazil: forklift.madeInBrazil ?? false,
    ...detailFields(forklift),
  }));

  const seminovas = forkliftsSeminovas.map((forklift, i) => ({
    _id: `forkliftUsed-${forklift.id}`,
    _type: "forkliftUsed",
    ...cardFields(forklift, i),
    year: forklift.year,
    workedHours: forklift.workedHours,
    ...(forklift.gallery && {
      gallery: forklift.gallery.map((image, j) => ({
        ...seedImage(image),
        _key: seedKey(j, "photo"),
      })),
    }),
  }));

  return [...novas, ...seminovas];
}
