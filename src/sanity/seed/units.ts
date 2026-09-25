import { units } from "@/data/units";
import { seedImage, type SeedDocument } from "./helpers";

const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function documents(): SeedDocument[] {
  return units.map((unit, i) => ({
    _id: `unit-${slugify(`${unit.city} ${unit.note ?? ""}`)}`,
    _type: "unit",
    city: unit.city,
    ...(unit.note ? { note: unit.note } : {}),
    ...(unit.footerNote ? { footerNote: unit.footerNote } : {}),
    phone: unit.phone,
    ...(unit.address ? { address: unit.address } : {}),
    ...(unit.image ? { image: seedImage(unit.image) } : {}),
    ...(unit.googleProfileUrl
      ? { googleProfileUrl: unit.googleProfileUrl }
      : {}),
    order: i + 1,
    ...(unit.galleryOrder != null ? { galleryOrder: unit.galleryOrder } : {}),
  }));
}
