import type { StaticImageData } from "next/image";

// O otimizador do Next baixa o original a cada largura que gera; foto enviada
// ao Studio pode ter 9000px (40MB+ no CDN). O CDN do Sanity entrega no máximo
// 2560px em WebP e o Next redimensiona a partir disso. O next.config só libera
// URLs do Sanity com exatamente esta query.
export const SANITY_IMAGE_MAX_WIDTH = 2560;
export const SANITY_IMAGE_QUERY = `?w=${SANITY_IMAGE_MAX_WIDTH}&fit=max&fm=webp&q=90`;

const dims = "asset->metadata.dimensions";

/**
 * Projeção GROQ de um campo `imageWithAlt`. O resultado tem o mesmo formato de
 * StaticImageData (src, width, height, blurDataURL), então os componentes
 * recebem a imagem do CMS pelo mesmo tipo das importadas de src/assets. As
 * dimensões acompanham o limite de largura aplicado pelo CDN.
 *
 * Uso: `*[_type == "x"]{ "image": image${imageProjection} }`
 */
export const imageProjection = `{
  "src": asset->url + "${SANITY_IMAGE_QUERY}",
  "width": select(${dims}.width > ${SANITY_IMAGE_MAX_WIDTH} => ${SANITY_IMAGE_MAX_WIDTH}, ${dims}.width),
  "height": select(
    ${dims}.width > ${SANITY_IMAGE_MAX_WIDTH} => round(${dims}.height * ${SANITY_IMAGE_MAX_WIDTH} / ${dims}.width),
    ${dims}.height
  ),
  "blurDataURL": asset->metadata.lqip,
  alt
}`;

export type CmsImage = StaticImageData & { alt?: string };
