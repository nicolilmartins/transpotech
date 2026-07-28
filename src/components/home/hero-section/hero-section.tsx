import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { HeroHotspots } from "./hero-hotspots";
import { ROUTES } from "@/lib/routes";
import forklift from "@/assets/images/hero-image.webp";
import forkliftMobile from "@/assets/images/hero-image-mobile.webp";

export function HeroSection() {
  return (
    <section
      data-header-hero
      className="relative h-[100dvh] w-full overflow-hidden hero-short:flex hero-short:flex-col"
    >
      {/* Desktop: empilhadeira full-bleed atrás do conteúdo. Wrapper escalado
          proporcionalmente mantém a empilhadeira a ~66% em qualquer largura;
          `object-bottom` recorta só o topo (céu), nunca a base. */}
      <div
        aria-hidden
        className="absolute inset-0 hidden overflow-hidden lg:block"
      >
        <div className="absolute left-[-14%] top-[-46%] h-[154%] w-[146%]">
          <Image
            src={forklift}
            alt=""
            priority
            fill
            sizes="160vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      {/* Mobile (altura normal): empilhadeira full-bleed atrás do texto — layout
          original. Em telas curtas (hero-short) some, dando lugar à faixa no
          rodapé, para os botões nunca ficarem sobre a empilhadeira. */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden hero-short:hidden lg:hidden"
      >
        {/* Wrapper ancorado na base e ampliado: a empilhadeira fica um pouco
            maior e sempre apoiada embaixo, longe dos botões no topo. */}
        <div className="absolute inset-x-0 bottom-0 h-[116%]">
          <Image
            src={forkliftMobile}
            alt=""
            priority
            fill
            sizes="100vw"
            className="object-cover object-[center_82%]"
          />
        </div>
      </div>

      {/* Bolinhas interativas sobre a empilhadeira (só desktop) */}
      <HeroHotspots />

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
                {
                  text: "Empilhadeiras, ",
                  className: "font-bold",
                  br: "hidden sm:block",
                },
                { text: "locação e manutenção", className: "font-normal" },
              ]}
            />
            <p className="text-[16px] font-normal text-neutral-800 hero-short:text-[14px] hero-short:leading-[1.35] lg:max-w-[440px] lg:text-[16px] 2xl:text-[18px]">
              Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota
              funcionando, custo previsível e atendimento técnico 24h, tudo em um
              único parceiro.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-row lg:gap-2">
            <Button
              variant="primary"
              size="lg"
              href={ROUTES.LOCACAO}
              className="w-full lg:w-auto"
            >
              Locar empilhadeira
            </Button>
            <Button
              variant="gray"
              size="lg"
              href={ROUTES.EMPILHADEIRAS_NOVAS}
              className="w-full lg:w-auto"
            >
              Comprar empilhadeira
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
        <div className="absolute inset-x-0 bottom-0 h-[240%]">
          <Image
            src={forkliftMobile}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_88%]"
          />
        </div>
      </div>
    </section>
  );
}
