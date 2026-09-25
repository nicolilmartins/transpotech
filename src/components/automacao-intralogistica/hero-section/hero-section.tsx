import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import type { SectionContent } from "@/sanity/content/fields";
import type { automacaoPage } from "@/sanity/content/pages/automacao";

// Mesmo ponto de corte do `md:` do Tailwind (48rem).
const DESKTOP_MEDIA = "(min-width: 48rem)";

type AutomacaoHeroContent = SectionContent<typeof automacaoPage.sections.hero>;

export function AutomacaoHeroSection({ content }: { content: AutomacaoHeroContent }) {
  // Art direction com <picture>, como na hero de seminovas: o navegador baixa
  // só a versão da viewport, e o preload de cada uma fica restrito à sua media.
  const common = {
    alt: "",
    fill: true,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
  } as const;
  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({ ...common, src: content.image });
  const { props: mobileProps } = getImageProps({
    ...common,
    src: content.imageMobile,
  });

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
    <section data-header-hero className="relative w-full bg-background md:p-4">
      {/* Card de imagem — full-bleed no mobile; de md em diante, 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-svh md:h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden md:rounded-[20px]">
        {/* Imagem de fundo. Mobile: recorte exato do Figma (node 3640:3262),
            técnica com laptop diante da linha automatizada. Desktop: armazém
            automatizado. */}
        <picture className="contents">
          <source
            media={DESKTOP_MEDIA}
            srcSet={desktopSrcSet}
            sizes={common.sizes}
          />
          <img
            {...mobileProps}
            alt=""
            className="object-cover object-center"
          />
        </picture>

        {/* Gradiente escuro da base para o topo, concentrado na base */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #01120E 0%, rgba(1,18,14,0.85) 28%, rgba(1,18,14,0) 72%)",
          }}
        />

        {/* Conteúdo — parte inferior da hero (80px de padding inferior) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-end gap-10 px-5 pb-20 text-center sm:px-6 lg:gap-8 lg:px-16">
          <div className="flex max-w-[563px] flex-col gap-4">
            <BlurRevealTitle
              tone="dark"
              className="text-h2 text-neutral-50"
              segments={[
                {
                  text: content.titleTop,
                  className: "font-normal",
                  br: true,
                },
                {
                  text: content.titleAccent,
                  className: "font-bold text-primary-500",
                },
              ]}
            />
            <p className="mx-auto max-w-[440px] text-h6 font-normal leading-[1.3] text-neutral-50">
              {content.description}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href="#avaliar-automacao"
            className="w-full lg:w-auto"
          >
            {content.buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
