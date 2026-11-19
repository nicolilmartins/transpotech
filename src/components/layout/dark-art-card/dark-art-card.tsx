import { type StaticImageData } from "next/image";
import { CardImageIcon } from "@/components/ui/card-image-icon";

export type DarkArtCardArt = {
  src: StaticImageData;
  width: number;
  height: number;
  maskX: number;
  maskY: number;
  left: number;
  top: number;
  flip?: boolean;
};

type DarkArtCardProps = {
  title: string;
  description: string;
  art: DarkArtCardArt;
  /** Largura/quebra do título (varia por seção no Figma). */
  titleClassName?: string;
};

// Card escuro com ilustração mascarada no topo e brilho verde no hover.
// Tons iguais à why-us da home: cores originais + máscara exata do Figma
// (plateau=false) + blend lighten.
export function DarkArtCard({
  title,
  description,
  art,
  titleClassName = "",
}: DarkArtCardProps) {
  return (
    <div className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-surface-dark p-6 transition-shadow duration-300 hover:z-10 hover:shadow-glow-secondary lg:min-h-[299px]">
      <CardImageIcon
        src={art.src}
        width={art.width}
        height={art.height}
        left={art.left}
        top={art.top}
        maskX={art.maskX}
        maskY={art.maskY}
        flip={art.flip ?? false}
        plateau={false}
        blendMode="lighten"
      />
      <div className="relative mt-[124px] lg:mt-[140px] flex flex-col gap-4">
        <h3
          className={`${titleClassName} font-heading text-h6 font-semibold text-neutral-200`}
        >
          {title}
        </h3>
        <p className="text-body leading-[1.35] text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}
