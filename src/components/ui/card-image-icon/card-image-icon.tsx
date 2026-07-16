import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

// Imagem 3D no lugar do ícone, no mesmo tratamento da seção "Por que as
// empresas escolhem a TranspoTech" (home/why-us): a arte transborda o canto
// superior esquerdo do card e uma máscara radial (mesma do SVG do Figma)
// desvanece as bordas. Os offsets/dimensões são o padrão do modelo — quando
// vierem os valores exatos do Figma, é só passar via props.
export type CardImageIconProps = {
  src: StaticImageData;
  /** Dimensões da caixa da arte (px). */
  width?: number;
  height?: number;
  /** Offset da caixa em relação ao card (px). */
  left?: number;
  top?: number;
  /** Posição da máscara radial dentro da caixa (px). */
  maskX?: number;
  maskY?: number;
  /** Tamanho da máscara radial (px) — mask-size do Figma. */
  maskW?: number;
  maskH?: number;
  /** Espelhamento horizontal (flip do export do Figma). */
  flip?: boolean;
  /** object-fit da imagem (default "cover"; "contain" mostra a arte inteira). */
  objectFit?: "cover" | "contain";
  /** object-position da imagem (ex.: "bottom"). */
  objectPosition?: string;
  /** Escala extra da arte (mantém o centro; útil pra reduzir um card). */
  scale?: number;
  /** Aplica a máscara radial (default true). Desligue para artes com fundo
      transparente que não devem desvanecer nas bordas. */
  mask?: boolean;
  /** Usa o platô "aceso" na máscara (default true). Passe false para a máscara
      exata do Figma (sem platô), igual à seção why-us da home. */
  plateau?: boolean;
  /** mix-blend-mode da arte. Use "lighten" quando o fundo escuro da imagem for
      mais escuro que o card: o fundo some (vira a cor do card) e só o objeto,
      mais claro, permanece visível. */
  blendMode?: CSSProperties["mixBlendMode"];
};

const ART_W = 204.438;
const ART_H = 153.328;
const MASK_W = 149.517;
const MASK_H = 133.868;
// Elipse radial em %, para escalar com o mask-size.
// - PLATEAU: centro opaco até ~60% do raio (ícone mais "aceso").
// - FIGMA: opaco no centro (0%) desvanecendo linear até a borda (100%), sem
//   platô — é a máscara EXATA do SVG do Figma (imgImage9), igual à why-us.
const MASK_IMAGE_PLATEAU =
  "radial-gradient(50% 50% at 50% 50%, #000 0%, #000 60%, transparent 100%)";
const MASK_IMAGE_FIGMA =
  "radial-gradient(50% 50% at 50% 50%, #000 0%, transparent 100%)";

export function CardImageIcon({
  src,
  width = ART_W,
  height = ART_H,
  left = -52.85,
  top = -20.37,
  maskX = 40.141,
  maskY = 12.819,
  maskW = MASK_W,
  maskH = MASK_H,
  flip = true,
  objectFit = "cover",
  objectPosition,
  scale = 1,
  mask: useMask = true,
  plateau = true,
  blendMode,
}: CardImageIconProps) {
  const gradient = plateau ? MASK_IMAGE_PLATEAU : MASK_IMAGE_FIGMA;
  const mask = !useMask
    ? {}
    : ({
    maskImage: gradient,
    WebkitMaskImage: gradient,
    maskSize: `${maskW}px ${maskH}px`,
    WebkitMaskSize: `${maskW}px ${maskH}px`,
    maskPosition: `${maskX}px ${maskY}px`,
    WebkitMaskPosition: `${maskX}px ${maskY}px`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    // Chrome trata o gradiente como luminance por padrão (esconde o preto);
    // alpha faz o centro opaco aparecer e as bordas desvanecerem.
    maskMode: "alpha",
  } as const);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute select-none overflow-hidden [--icon-scale:0.82] lg:[--icon-scale:1]"
      style={{
        left,
        top,
        width,
        height,
        transform: `${flip ? "scaleX(-1) " : ""}scale(var(--icon-scale, 1))${
          scale !== 1 ? ` scale(${scale})` : ""
        }`,
        ...mask,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="210px"
        className="max-w-none"
        style={{ objectFit, objectPosition, mixBlendMode: blendMode }}
      />
    </div>
  );
}
