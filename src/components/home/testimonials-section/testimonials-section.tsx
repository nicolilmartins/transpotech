import { type CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import warehouse from "@/assets/images/depoimentos/warehouse.png";
import caseLogo1 from "@/assets/images/depoimentos/case-logo1.png";
import caseLogo2 from "@/assets/images/depoimentos/case-logo2.png";
import avatar from "@/assets/images/depoimentos/avatar.png";
import quote from "@/assets/images/quote.png";

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
          <div className="h-[400.031px] w-[446.974px] rotate-[-60deg] bg-[#f58220] opacity-[0.12] blur-[77.517px]" />
        </div>
      ))}
    </>
  );
}

export function TestimonialsSection() {
  return (
    <section
      data-header-dark
      className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 py-16 sm:px-6 lg:px-16 lg:py-20 2xl:px-30"
    >
      <div className="flex w-full max-w-[1312px] flex-col items-center gap-16">
        {/* Cabeçalho */}
        <div className="relative flex w-full flex-col items-start gap-4">
          <div className="w-[626px] max-w-full">
            <h2 className="text-h2 font-normal text-neutral-100">
              O que nossos clientes dizem
            </h2>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <p className="w-[507px] max-w-full text-body leading-[1.35] text-neutral-200">
              A melhor prova de valor não está só no portfólio, mas na
              capacidade de responder à cenários reais com a solução certa.
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

        {/* Carrossel — scroll horizontal no mobile; flex no desktop */}
        <div className="relative -mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:w-[calc(100%+48px)] sm:px-6 lg:mx-0 lg:w-full lg:snap-none lg:items-center lg:overflow-visible lg:px-0 lg:pb-0">
          {/* Imagem — oculta em mobile, visível no desktop (mesmo tamanho dos cards) */}
          <div className="relative hidden min-h-[280px] min-w-0 flex-1 overflow-hidden rounded-xl bg-[#d9d9d9] lg:block lg:h-[380px]">
            <Image
              src={warehouse}
              alt="Operação em armazém"
              fill
              sizes="25vw"
              className="object-cover [object-position:35%_center]"
            />
          </div>

          {/* Case 1 */}
          <article className={cardBase} style={cardGradient}>
            <CardGlow />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-body-lg font-semibold leading-[1.35] text-neutral-100">
                  Logística em escala
                </h3>
                <p className="text-body leading-[1.35] text-neutral-300">
                  Como uma operação nacional reduziu gargalos e acelerou a
                  tomada de decisão com uma estrutura digital mais clara.
                </p>
              </div>
              <Image
                src={caseLogo1}
                alt=""
                className="h-9 w-[186px] object-contain"
              />
            </div>
          </article>

          {/* Case 2 */}
          <article className={cardBase} style={cardGradient}>
            <CardGlow />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-body-lg font-semibold leading-[1.35] text-neutral-100">
                  Custos reduzidos
                </h3>
                <p className="text-body leading-[1.35] text-neutral-300">
                  Como uma operação global reduziu custos de frete e otimizou
                  prazos integrando sistemas de rastreamento inteligente.
                </p>
              </div>
              <Image
                src={caseLogo2}
                alt=""
                className="h-9 w-[200px] object-contain mix-blend-lighten"
              />
            </div>
          </article>

          {/* Depoimento */}
          <article className={cardBase} style={cardGradient}>
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
                    Logística em escala
                  </h3>
                  <p className="text-body leading-[1.35] text-neutral-300">
                    A Transpotech nos ajudou a reorganizar toda a estrutura de
                    dados da operação. Em três meses, passamos a enxergar em
                    tempo real onde estava cada carga, onde estavam os atrasos e
                    onde o custo estava vazando.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={avatar}
                  alt="Joel Castro"
                  className="size-[54px] rounded-full object-cover"
                />
                <div className="flex flex-col gap-1 text-body">
                  <span className="font-semibold leading-[1.35] text-neutral-100">
                    Joel Castro
                  </span>
                  <span className="leading-[1.35] text-neutral-200">Meli</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Paginação */}
        <div className="relative flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-full bg-neutral-100" />
          <span className="size-2 rounded-full bg-neutral-600" />
          <span className="size-2 rounded-full bg-neutral-600" />
        </div>
      </div>
    </section>
  );
}
