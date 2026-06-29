import Image from "next/image";
import { Button } from "@/components/ui/button";
import forklift from "@/assets/images/hero-image.webp";

export function HeroSection() {
  return (
    <section
      data-header-hero
      className="relative w-full overflow-hidden lg:h-[720px]"
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

      {/* Conteúdo */}
      <div className="relative mx-auto w-full max-w-[1440px] lg:h-full">
        {/* Texto + botões: centralizado no mobile, sobreposto à esquerda no desktop */}
        <div className="flex flex-col items-center gap-8 px-5 pt-32 text-center sm:px-6 lg:absolute lg:top-[200px] lg:max-w-[560px] lg:items-start lg:gap-10 lg:px-16 lg:pt-0 lg:text-left">
          <div className="flex flex-col gap-4">
            <h1 className="text-h2 text-neutral-800 lg:w-[540px]">
              <span className="font-bold">Empilhadeiras,</span>{" "}
              <br className="hidden sm:block" />
              <span className="font-normal">locação e manutenção</span>
            </h1>
            <p className="text-body font-normal text-neutral-800">
              Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota
              funcionando, custo previsível e atendimento técnico 24h, tudo em um
              único parceiro.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:max-w-[400px] lg:w-auto lg:max-w-none lg:flex-row lg:gap-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center lg:w-auto"
            >
              Locar empilhadeira
            </Button>
            <Button
              variant="gray"
              size="lg"
              className="w-full justify-center lg:w-auto"
            >
              Comprar empilhadeira
            </Button>
          </div>
        </div>

        {/* Imagem (mobile): abaixo do conteúdo, ocupando a base da hero */}
        <div className="relative mt-10 h-[340px] w-full lg:hidden">
          <Image
            src={forklift}
            alt="Empilhadeira STILL elétrica movimentando carga em centro de distribuição"
            priority
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
