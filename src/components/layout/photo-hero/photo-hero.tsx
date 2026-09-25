import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import {
  BlurRevealTitle,
  type BlurRevealSegment,
} from "@/components/ui/blur-reveal-title";

type PhotoHeroProps = {
  image: StaticImageData;
  titleSegments: BlurRevealSegment[];
  titleClassName: string;
  description: ReactNode;
  /** Largura máxima do bloco de título + descrição. */
  contentClassName: string;
  /** Largura máxima da descrição. */
  descriptionClassName: string;
  /**
   * Onde o gradiente escuro chega a 85% e onde some (em % da altura, da base
   * para o topo). Padrão: concentrado na base.
   */
  shadeStops?: [number, number];
  cta: { href: string; label: string };
};

// Hero de página com foto de fundo, gradiente escuro na base e conteúdo
// centralizado embaixo.
export function PhotoHero({
  image,
  titleSegments,
  titleClassName,
  description,
  contentClassName,
  descriptionClassName,
  shadeStops = [28, 72],
  cta,
}: PhotoHeroProps) {
  const [mid, end] = shadeStops;

  return (
    <section data-header-hero className="relative w-full bg-background md:p-4">
      {/* Card de imagem — full-bleed no mobile; de md em diante, 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-svh md:h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden md:rounded-[20px]">
        <Image
          src={image}
          alt=""
          preload
          fetchPriority="high"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, #01120E 0%, rgba(1,18,14,0.85) ${mid}%, rgba(1,18,14,0) ${end}%)`,
          }}
        />

        {/* Conteúdo — parte inferior da hero (80px de padding inferior) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-end gap-10 px-5 pb-20 text-center sm:px-6 lg:gap-8 lg:px-16">
          <div className={`flex ${contentClassName} flex-col gap-4`}>
            <BlurRevealTitle
              tone="dark"
              className={titleClassName}
              segments={titleSegments}
            />
            <p
              className={`mx-auto ${descriptionClassName} text-h6 font-normal leading-[1.3] text-neutral-50`}
            >
              {description}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={cta.href}
            className="w-full lg:w-auto"
          >
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
