import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import { imageProjection } from "@/sanity/image";
import { units as localUnits, type Unit } from "@/data/units";

const unitsQuery = defineQuery(`*[_type == "unit"] | order(order asc){
  city,
  note,
  footerNote,
  phone,
  address,
  "image": select(defined(image.asset) => image${imageProjection}),
  googleProfileUrl,
  galleryOrder
}`);

type UnitRow = { [K in keyof Unit]-?: Unit[K] | null };

// O GROQ devolve null em campo vazio, e o tipo Unit usa campo ausente.
// googleProfileUrl repete a validação do schema: escrita direta pela API não
// passa pelas regras do Studio.
function toUnit(row: UnitRow): Unit {
  const unit = Object.fromEntries(
    Object.entries(row).filter(([, value]) => value != null),
  ) as Unit;
  if (unit.googleProfileUrl && !/^https?:\/\//i.test(unit.googleProfileUrl)) {
    delete unit.googleProfileUrl;
  }
  return unit;
}

export async function getUnits(): Promise<Unit[]> {
  const rows = await sanityFetch<UnitRow[]>({
    query: unitsQuery,
    tags: ["unit"],
  });
  return rows ? rows.map(toUnit) : localUnits;
}
