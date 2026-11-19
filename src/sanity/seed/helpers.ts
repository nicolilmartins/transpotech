import type { StaticImageData } from "next/image";

// Formato de entrada do `sanity dataset import`: _sanityAsset faz o CLI enviar
// o arquivo local e trocar a referência pelo asset criado.
export type SeedImage = {
  _type: "imageWithAlt";
  _sanityAsset: string;
  alt?: string;
};

export type SeedDocument = { _id: string; _type: string } & Record<string, unknown>;

/** Converte uma imagem importada de src/assets (via scripts/sanity/loader.mjs). */
export function seedImage(image: StaticImageData, alt?: string): SeedImage {
  const file = image.src.replaceAll("\\", "/");
  return {
    _type: "imageWithAlt",
    _sanityAsset: `image@file:///${file.replace(/^\//, "")}`,
    ...(alt ? { alt } : {}),
  };
}

/** Chave estável para itens de array (o Studio exige _key). */
export function seedKey(index: number, prefix = "item"): string {
  return `${prefix}-${index}`;
}
