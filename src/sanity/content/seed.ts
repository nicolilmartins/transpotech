import type { StaticImageData } from "next/image";
import { seedImage, seedKey } from "../seed/helpers";
import type { DefaultValues, Field, Fields } from "./fields";

function seedField(field: Field, value: unknown): unknown {
  switch (field.kind) {
    case "image":
      return seedImage(value as StaticImageData, field.alt);
    case "references":
      return (value as string[]).map((id, i) => ({
        _type: "reference",
        _key: seedKey(i, "ref"),
        _ref: id,
      }));
    case "list":
      return (value as DefaultValues<Fields>[]).map((item, i) => ({
        _type: "item",
        _key: seedKey(i),
        ...seedFields(field.of, item),
      }));
    default:
      return value;
  }
}

/** Valores atuais no formato do `sanity dataset import`. */
export function seedFields(fields: Fields, values: DefaultValues<Fields>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [name, field] of Object.entries(fields)) {
    result[name] = seedField(field, values[name]);
  }
  return result;
}
