import Image from "next/image";
import { Button } from "@/components/ui/button";
import forklift from "@/assets/images/hero-forklift.png";
import fabPlus from "@/assets/icons/fab-plus.svg";

export function HeroSection() {
  return (
    <section className="relative h-[700px] w-full overflow-hidden">
      {/* Imagem de fundo */}
      <Image
        src={forklift}
        alt="Empilhadeira STILL"
        priority
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlay em gradiente (verde transparente → laranja 25%) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-500/25" />

      {/* Conteúdo central */}
      <div className="relative mx-auto h-full w-full max-w-[1440px] px-16">
        <div className="absolute top-[217px] flex w-[563px] max-w-[calc(100%-128px)] flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="w-[540px] max-w-full text-h2 text-neutral-800">
              <span className="font-bold">Empilhadeiras,</span>{" "}
              <br className="hidden sm:block" />
              <span className="font-normal">locação e manutenção</span>
            </h1>
            <p className="text-body font-normal text-neutral-700">
              Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota
              funcionando, custo previsível e atendimento técnico 24h, tudo em um
              único parceiro.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="primary" size="lg">
              Locar empilhadeira
            </Button>
            <Button variant="gray" size="lg">
              Comprar empilhadeira
            </Button>
          </div>
        </div>

        {/* Botão flutuante (+) */}
        <button
          aria-label="Ações rápidas"
          className="absolute right-[53px] top-[614px] size-14"
        >
          <Image src={fabPlus} alt="" className="size-full" />
        </button>
      </div>
    </section>
  );
}
