import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import forklift from "@/assets/images/hero-image.webp";
import forkliftMobile from "@/assets/images/hero-image-mobile.webp";

export function HeroSection() {
  return (
    <section
      data-header-hero
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Gradiente base (verde transparente → laranja 25%, Figma) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[image:var(--hero-overlay)]"
      />

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

      {/* Mobile: empilhadeira full-bleed atrás do texto. A imagem dedicada já tem
          o "céu" claro no topo (onde fica o texto) e a empilhadeira embaixo, então
          o texto nunca a sobrepõe. Cobre o overlay → sem tom laranja sobre ela. */}
      <div aria-hidden className="absolute inset-0 overflow-hidden lg:hidden">
        <Image
          src={forkliftMobile}
          alt=""
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col">
        {/* Texto + botões: centralizado no mobile, sobreposto à esquerda no desktop */}
        <div className="flex flex-col items-center gap-10 px-5 pt-38 text-center sm:px-6 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:items-start lg:gap-10 lg:px-16 lg:pt-0 lg:text-left">
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
            <p className="text-[16px] font-normal text-neutral-800 lg:max-w-[440px] 2xl:text-[18px]">
              Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota
              funcionando, custo previsível e atendimento técnico 24h, tudo em um
              único parceiro.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-row lg:gap-2">
            <Button variant="primary" size="lg">
              Locar empilhadeira
            </Button>
            <Button variant="gray" size="lg">
              Comprar empilhadeira
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
