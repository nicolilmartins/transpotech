import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { HeroHotspots } from "./hero-hotspots";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";
import forklift from "@/assets/images/home-hero-image.webp";

// Arte da hero no enquadramento do antigo recorte mobile (1334x1550). Esse
// recorte mostrava ~25 linhas de chão abaixo e ~13 colunas à direita além do
// que existe na arte atual; cópias espelhadas nessas bordas continuam o degradê
// sem costura. Mesmo arquivo e `sizes` → mesma URL, sem download extra.
//
// O arquivo tem defeitos de exportação nas bordas (linha quase preta + 2 brancas
// na base; 3 colunas claras à direita) que o redimensionamento do srcset espalha
// pelas vizinhas. Por isso o espelho reflete com folga — 30 linhas (3450/3480) e
// 24 colunas (4308/4332) antes da borda: o wrapper recorta na linha de reflexo e
// a cópia invertida é deslocada pela mesma folga. O chão ali é degradê suave.
//
// Preload das duas artes com `media`: sizes diferentes → URLs diferentes, e
// sem `media` as duas disputavam banda em qualquer viewport. O `preload` do
// <Image> não aceita `media`, então o <img> do desktop fica lazy (lazy dentro de
// display:none não baixa no mobile) e é o <link> que o busca cedo no desktop.
const HERO_DESKTOP_SIZES = "160vw";
const HERO_MOBILE_SIZES = "121vw";

function preloadHeroArt() {
  const variants = [
    { sizes: HERO_DESKTOP_SIZES, media: "(min-width: 1024px)" },
    { sizes: HERO_MOBILE_SIZES, media: "(max-width: 1023px)" },
  ];
  for (const { sizes, media } of variants) {
    const { props } = getImageProps({ src: forklift, alt: "", fill: true, sizes });
    preload(props.src, {
      as: "image",
      imageSrcSet: props.srcSet,
      imageSizes: props.sizes,
      fetchPriority: "high",
      media,
    });
  }
}

function MobileHeroArt({ highPriority = false }: { highPriority?: boolean }) {
  const art = (mirror = false) => (
    <Image
      src={forklift}
      alt=""
      fill
      sizes={HERO_MOBILE_SIZES}
      loading={mirror || highPriority ? "eager" : undefined}
      fetchPriority={highPriority && !mirror ? "high" : undefined}
      className="object-cover"
    />
  );
  return (
    <>
      {art()}
      {/* eager: as cópias ficam recortadas pelo overflow e o lazy-load nunca as
          veria entrando na viewport */}
      <div className="absolute inset-y-0 left-[99.4460%] w-full overflow-hidden">
        <div className="absolute inset-y-0 -left-[0.5540%] w-full -scale-x-100">
          {art(true)}
        </div>
      </div>
      <div className="absolute inset-x-0 top-[99.1379%] h-full overflow-hidden">
        <div className="absolute inset-x-0 -top-[0.8621%] h-full -scale-y-100">
          {art(true)}
        </div>
      </div>
    </>
  );
}

type HomeHeroContent = SectionContent<typeof homePage.sections.hero>;

export function HeroSection({ content }: { content: HomeHeroContent }) {
  preloadHeroArt();
  return (
    <section
      data-header-hero
      className="relative h-[100svh] w-full overflow-hidden hero-short:flex hero-short:flex-col"
    >
      {/* Desktop: empilhadeira full-bleed atrás do conteúdo. A arte (4332x3480)
          é mais alta que a anterior (4096x2155), então o `object-cover` num
          wrapper fixo mudaria o tamanho da empilhadeira conforme a proporção da
          tela. O wrapper reproduz a geometria antiga: altura = max(escala pela
          altura, escala pela largura) — o mesmo "cover" de antes, via unidades
          de container —, base ancorada em 108% da hero e centro horizontal em
          59% (o -49.25% compensa o deslocamento da empilhadeira na arte). */}
      <div
        aria-hidden
        className="absolute inset-0 hidden overflow-hidden [container-type:size] lg:block"
      >
        <div className="absolute bottom-[-8%] left-[59%] aspect-[4332/3480] h-[max(227.22cqh,113.33cqw)] -translate-x-[49.25%]">
          <Image
            src={forklift}
            alt=""
            fill
            sizes={HERO_DESKTOP_SIZES}
            className="object-cover"
          />
        </div>
      </div>

      {/* Mobile (altura normal): empilhadeira full-bleed atrás do texto — layout
          original. Em telas curtas (hero-short) some, dando lugar à faixa no
          rodapé, para os botões nunca ficarem sobre a empilhadeira.
          Usa a mesma arte do desktop reproduzindo o enquadramento do antigo
          recorte mobile (object-cover object-center): altura = max(escala pela
          altura, pela largura) e os translates recentram a empilhadeira. O topo
          do recorte antigo era só céu branco e fica além da arte — cai no fundo
          da página, visualmente igual. */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden [container-type:size] hero-short:hidden lg:hidden"
      >
        <div className="absolute left-1/2 top-1/2 aspect-[4332/3480] h-[max(83.32cqh,96.82cqw)] -translate-x-[59.31%] -translate-y-[41.90%]">
          <MobileHeroArt highPriority />
        </div>
      </div>

      {/* Bolinhas interativas sobre a empilhadeira (só desktop) */}
      <HeroHotspots labels={content.hotspots.map(({ label }) => label)} />

      {/* Conteúdo — altura normal: sobreposto à imagem full-bleed (h-full).
          Em telas curtas: coluna de altura natural no topo, com a faixa da foto
          logo abaixo (hero-short:h-auto). O mx-0 evita o encolhimento do wrapper
          quando a section vira flex. */}
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col hero-short:mx-0 hero-short:h-auto">
        {/* Texto + botões: centralizado no mobile, sobreposto à esquerda no desktop */}
        <div className="flex flex-col items-center gap-10 px-5 pt-38 text-center hero-short:gap-6 sm:px-6 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:items-start lg:gap-10 lg:px-16 lg:pt-0 lg:text-left">
          <div className="flex flex-col gap-4">
            <BlurRevealTitle
              className="text-[32px] leading-[1.1] text-neutral-800 lg:w-max lg:text-[48px] 2xl:text-[54px]"
              segments={[
                // O espaço fica no código: no mobile o <br> some e as partes
                // seguem na mesma linha.
                {
                  text: `${content.titleBold.trimEnd()} `,
                  className: "font-bold",
                  br: "hidden sm:block",
                },
                { text: content.titleRegular, className: "font-normal" },
              ]}
            />
            <p className="text-[16px] font-normal text-neutral-800 hero-short:leading-[1.35] lg:max-w-[440px] lg:text-[16px] 2xl:text-[18px]">
              {content.description}
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-row lg:gap-2">
            <Button
              variant="primary"
              size="lg"
              href={ROUTES.LOCACAO}
              className="w-full lg:w-auto"
            >
              {content.primaryLabel}
            </Button>
            <Button
              variant="gray"
              size="lg"
              href={ROUTES.EMPILHADEIRAS_NOVAS}
              className="w-full lg:w-auto"
            >
              {content.secondaryLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Faixa da empilhadeira — só em telas curtas (hero-short). Ocupa o espaço
          abaixo dos botões (flex-1, irmã do conteúdo), com wrapper interno
          ampliado e ancorado na base para manter a empilhadeira grande e apoiada,
          sem o chão. Nas alturas normais não existe (a full-bleed acima cuida). */}
      <div
        aria-hidden
        className="relative mt-6 hidden w-full flex-1 overflow-hidden hero-short:block lg:hidden"
      >
        <div className="absolute inset-x-0 bottom-0 h-[275%] [container-type:size]">
          {/* Mesmo enquadramento do antigo recorte mobile com
              object-[center_88%], agora com a arte do desktop. */}
          <div className="absolute left-1/2 top-[88%] aspect-[4332/3480] h-[max(83.32cqh,96.82cqw)] -translate-x-[59.31%] -translate-y-[87.51%]">
            <MobileHeroArt />
          </div>
        </div>
      </div>
    </section>
  );
}
