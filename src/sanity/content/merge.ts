import type { StaticImageData } from "next/image";
import type {
  ContentImage,
  DefaultValues,
  Field,
  Fields,
  PageContent,
  PageDefinition,
  Values,
} from "./fields";

type Raw = Record<string, unknown> | null | undefined;

function mergeString(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !value.trim()) return fallback;
  // Texto que hoje termina em espaço separa do trecho seguinte na mesma linha:
  // garante o espaço mesmo se o editor apagá-lo.
  return fallback.endsWith(" ") ? `${value.trimEnd()} ` : value;
}

// Imagem removida pela metade no Studio (sem asset) conta como vazia. O alt
// do Studio vale para qualquer das duas; vazio, fica o atual do código.
function mergeImage(value: unknown, fallback: StaticImageData, alt = ""): ContentImage {
  const image = value as (Partial<StaticImageData> & { alt?: string | null }) | null | undefined;
  const base = image?.src && image.width && image.height ? (image as StaticImageData) : fallback;
  return { ...base, alt: image?.alt?.trim() || alt };
}

function mergeField(field: Field, value: unknown, fallback: unknown): unknown {
  switch (field.kind) {
    case "string":
    case "text":
      return mergeString(value, fallback as string);
    case "references":
      return Array.isArray(value) && value.length
        ? value.filter((id): id is string => typeof id === "string")
        : fallback;
    case "image":
      return mergeImage(value, fallback as StaticImageData, field.alt);
    case "list": {
      const defaults = fallback as DefaultValues<Fields>[];
      const items =
        !Array.isArray(value) || value.length === 0
          ? defaults.map(() => undefined)
          : field.fixed
            ? value.slice(0, defaults.length)
            : value;
      // Item novo (além dos atuais) herda do último item atual o que ficar vazio.
      return items.map((item, i) =>
        mergeFields(field.of, item as Raw, defaults[i] ?? defaults[defaults.length - 1]),
      );
    }
  }
}

function mergeFields<F extends Fields>(
  fields: F,
  raw: Raw,
  fallback: DefaultValues<F>,
): Values<F> {
  const result = {} as Record<string, unknown>;
  for (const [name, field] of Object.entries(fields)) {
    result[name] = mergeField(field, raw?.[name], fallback[name]);
  }
  return result as Values<F>;
}

export function defaultValues<F extends Fields>(fields: F): DefaultValues<F> {
  const result = {} as Record<string, unknown>;
  for (const [name, field] of Object.entries(fields)) result[name] = field.default;
  return result as DefaultValues<F>;
}

/** Cada campo vazio no CMS (ou o documento ausente) cai no conteúdo atual. */
export function mergePage<P extends PageDefinition>(page: P, raw: Raw): PageContent<P> {
  const result = {} as Record<string, unknown>;
  for (const [name, section] of Object.entries(page.sections)) {
    result[name] = mergeFields(
      section.fields,
      raw?.[name] as Raw,
      defaultValues(section.fields),
    );
  }
  return result as PageContent<P>;
}
