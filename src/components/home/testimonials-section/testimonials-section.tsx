import { type CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SnapCarousel } from "@/components/layout/snap-carousel";
import caseLogo1 from "@/assets/images/depoimentos/case-logo1.png";
import caseLogo2 from "@/assets/images/depoimentos/case-logo2.png";
import quote from "@/assets/images/quote.png";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

// Fundo do card (Figma): linear verde (#146B55, 0.2) → laranja (#E78028) já
// transparente (stop em 118%). O brilho quente vem do glow laranja no canto.
const cardGradient: CSSProperties = {
  background:
    "linear-gradient(90deg, rgba(20,107,85,0.2) 0%, rgba(231,128,40,0) 118.21%)",
};

const cardBase =
  "stroke-fade min-h-[280px] w-[82%] shrink-0 snap-start overflow-hidden rounded-xl p-6 sm:w-[60%] md:w-[45%] lg:h-[380px] lg:w-auto lg:min-w-0 lg:flex-1 lg:shrink lg:snap-align-none";

// Glow laranja (#f58220) difuso à direita — replica as 3 "Mask Shapes" do Figma:
// retângulo rotacionado -60°, blur 77.5, opacity 12%, clipado pelo card.
function CardGlow() {
  const shapes = [
    { left: "245.61px" },
    { left: "245.61px" },
    { left: "227.46px" },
  ];
  return (
    <>
      {shapes.map((s, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute top-[-1px] flex h-[587.107px] w-[569.925px] items-center justify-center"
          style={{ left: s.left }}
        >
          <div className="h-[400.031px] w-[446.974px] rotate-[-60deg] bg-primary-500 opacity-[0.12] blur-[77.517px]" />
        </div>
      ))}
    </>
  );
}

// Logo de cada case, na ordem dos cases editados no Studio.
const caseLogos = [
  { src: caseLogo1, className: "h-9 w-[186px] object-contain" },
  { src: caseLogo2, className: "h-9 w-[200px] object-contain mix-blend-lighten" },
];

type TestimonialsContent = SectionContent<typeof homePage.sections.testimonials>;

export function TestimonialsSection({ content }: { content: TestimonialsContent }) {
  return (
    <section
      data-header-dark
      className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 py-12 sm:px-6 lg:px-16 lg:py-20"
    >
      <div className="flex w-full max-w-[1312px] flex-col items-center gap-10 lg:gap-16">
        {/* Cabeçalho */}
        <div className="relative flex w-full flex-col items-start gap-4">
          <div className="w-[626px] max-w-full">
            <h2 className="text-h2 text-neutral-100">
              <span className="font-normal">{content.titleRegular}</span>
              <span className="font-bold">{content.titleAccent}</span>
            </h2>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <p className="w-[507px] max-w-full text-body leading-[1.35] text-neutral-200">
              {content.description}
            </p>

            {/* Setas de navegação — canto superior direito, após o texto */}
            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <button
                type="button"
                aria-label="Anterior"
                className="flex size-12 items-center justify-center rounded-full border border-white/20 text-primary-500 transition-colors hover:bg-white/10"
              >
                <ArrowLeft className="size-6" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Próximo"
                className="flex size-12 items-center justify-center rounded-full border border-white/20 text-primary-500 transition-colors hover:bg-white/10"
              >
                <ArrowRight className="size-6" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {/* Carrossel — scroll horizontal no mobile; flex no desktop. Bolinhas
            sincronizadas ao scroll (e clicáveis) via SnapCarousel. No mobile o
            trilho sangra até a borda da tela (margem negativa + padding
            interno + scroll-px), para o padding da seção não cortar os cards. */}
        <SnapCarousel
          count={3}
          dotLabel="Ir para o case"
          trackClassName="relative -mx-5 flex w-[calc(100%+2.5rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 scroll-px-5 [scrollbar-width:none] sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 sm:scroll-px-6 lg:mx-0 lg:grid lg:w-full lg:grid-cols-4 lg:snap-none lg:items-center lg:overflow-visible lg:px-0 lg:pb-0 lg:scroll-px-0"
        >
          {/* Imagem — oculta em mobile, visível no desktop (mesma largura dos cards:
              flex sizing idêntico ao cardBase → 4 colunas iguais) */}
          <div className="relative hidden min-h-[280px] overflow-hidden rounded-xl bg-image-placeholder lg:block lg:h-[380px] lg:min-w-0 lg:flex-1 lg:shrink">
            <Image
              src={content.image}
              alt={content.image.alt}
              fill
              sizes="25vw"
              className="object-cover [object-position:35%_center]"
            />
          </div>

          {/* Cases */}
          {content.cases.map((item, i) => (
            <article key={i} data-snap-item className={cardBase} style={cardGradient}>
              <CardGlow />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-lg font-semibold leading-[1.35] text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="text-body leading-[1.35] text-neutral-300">
                    {item.description}
                  </p>
                </div>
                <Image
                  src={caseLogos[i].src}
                  alt=""
                  className={caseLogos[i].className}
                />
              </div>
            </article>
          ))}

          {/* Depoimento */}
          <article data-snap-item className={cardBase} style={cardGradient}>
            <CardGlow />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-5">
                <Image
                  src={quote}
                  alt=""
                  className="h-9 w-[47px] object-contain"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-lg font-semibold leading-[1.35] text-neutral-100">
                    {content.quoteTitle}
                  </h3>
                  <p className="text-body leading-[1.35] text-neutral-300">
                    {content.quote}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={content.authorPhoto}
                  alt={content.authorPhoto.alt}
                  className="size-[54px] rounded-full object-cover"
                />
                <div className="flex flex-col gap-1 text-body">
                  <span className="font-semibold leading-[1.35] text-neutral-100">
                    {content.authorName}
                  </span>
                  <span className="leading-[1.35] text-neutral-200">
                    {content.authorCompany}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </SnapCarousel>
      </div>
    </section>
  );
}
