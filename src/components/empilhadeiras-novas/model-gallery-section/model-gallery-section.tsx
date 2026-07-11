import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import type { ForkliftMedia } from "@/data/forklift-details";

export function ModelGallerySection({
  gallery,
  datasheetHref,
}: {
  gallery: ForkliftMedia["gallery"];
  datasheetHref: string;
}) {
  const { wide, pair } = gallery;
  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      {/* Cabeçalho — título à esquerda + botão "Ver ficha técnica" no extremo
          direito, alinhados pela base. */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex max-w-[560px] flex-col gap-4">
          <h2 className="text-h2 text-neutral-800">
            <span className="font-normal">Veja o equipamento</span>
            <br />
            <span className="font-bold text-primary-500">de perto</span>
          </h2>
        </div>
        <Button
          variant="primary"
          size="lg"
          href={datasheetHref}
          className="shrink-0 justify-center"
        >
          Ver ficha técnica
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Imagem ampla — parallax sutil dentro do frame */}
        <ParallaxFrame className="h-[240px] w-full rounded-3xl sm:h-[320px] lg:h-[460px]">
          <Image
            src={wide.src}
            alt={wide.alt}
            fill
            sizes="(min-width: 1024px) 1312px, 100vw"
            className="object-cover"
          />
        </ParallaxFrame>

        {/* Par de imagens */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pair.map((item, i) => (
            <ParallaxFrame
              key={`${item.alt}-${i}`}
              className="h-[220px] w-full rounded-3xl sm:h-[300px] lg:h-[360px]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </ParallaxFrame>
          ))}
        </div>
      </div>
    </Section>
  );
}
