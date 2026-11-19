import { getImageProps, type StaticImageData } from "next/image";
import { preload } from "react-dom";

// Mesmo ponto de corte do `md:` do Tailwind (48rem).
const DESKTOP_MEDIA = "(min-width: 48rem)";

const common = {
  alt: "",
  fill: true,
  sizes: "100vw",
  loading: "eager",
  fetchPriority: "high",
} as const;

/**
 * Foto de fundo de hero com versões mobile e desktop (art direction). Com
 * <picture>, o navegador baixa só a versão da viewport, e o preload de cada
 * uma fica restrito à sua media. Duas <Image preload> (uma escondida por CSS)
 * gerariam dois preloads sem media, e a versão invisível disputaria banda com
 * o LCP. Preenche o container posicionado (como `fill`).
 */
export function HeroPicture({
  image,
  imageMobile,
  className,
}: {
  image: StaticImageData;
  imageMobile: StaticImageData;
  /** Classes do <img> (object-fit/position, por breakpoint se preciso). */
  className: string;
}) {
  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({ ...common, src: image });
  const { props: mobileProps } = getImageProps({ ...common, src: imageMobile });

  preload(mobileProps.src, {
    as: "image",
    imageSrcSet: mobileProps.srcSet,
    imageSizes: common.sizes,
    fetchPriority: "high",
    media: `not all and ${DESKTOP_MEDIA}`,
  });
  preload(desktopSrc, {
    as: "image",
    imageSrcSet: desktopSrcSet,
    imageSizes: common.sizes,
    fetchPriority: "high",
    media: DESKTOP_MEDIA,
  });

  return (
    <picture className="contents">
      <source media={DESKTOP_MEDIA} srcSet={desktopSrcSet} sizes={common.sizes} />
      <img {...mobileProps} alt="" className={className} />
    </picture>
  );
}
