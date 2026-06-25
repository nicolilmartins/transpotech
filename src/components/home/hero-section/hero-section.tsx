import Image from "next/image";
import { Button } from "@/components/ui/button";
import forklift from "@/assets/images/hero-forklift.webp";

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden lg:h-[720px]">
      {/* Fundo */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {/* Gradiente base (verde transparente → laranja 25%, Figma) */}
        <div className="absolute inset-0 bg-[image:var(--hero-overlay)]" />

        {/* Empilhadeira (cena com topo transparente, preenche o frame 1440×778) */}
        <Image
          src={forklift}
          alt="Empilhadeira STILL elétrica movimentando carga em centro de distribuição"
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Conteúdo central */}
      <div className="relative mx-auto h-full w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        <div className="absolute top-[140px] flex w-full max-w-[calc(100%-32px)] flex-col gap-8 sm:max-w-[563px] lg:top-[200px] lg:max-w-[560px] lg:gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="w-full text-h2 text-neutral-800 lg:w-[540px]">
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

          <div className="flex flex-col gap-2 sm:flex-row">
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
