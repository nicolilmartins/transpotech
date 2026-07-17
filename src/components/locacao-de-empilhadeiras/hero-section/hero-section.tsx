import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { ROUTES } from "@/lib/routes";
import forklift from "@/assets/images/hero-image-locacao-de-empilhadeiras.webp";
import forkliftMobile from "@/assets/images/hero-image-locacao-de-empilhadeiras-mobile.webp";

export function LocacaoHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] md:p-4">
      {/* Card de imagem — full-bleed no mobile; de md em diante, 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-svh md:h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden md:rounded-[20px]">
        {/* Imagem de fundo — empilhadeiras em operação */}
        {/* Mobile: recorte exato do Figma (node 3321:3289) — empilhadeira
            central em destaque; o arquivo já é a janela do design (669x1336). */}
        <Image
          src={forkliftMobile}
          alt=""
          priority
          fill
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
        {/* Desktop (md+): recorte landscape padrão, cobrindo a hero inteira. */}
        <Image
          src={forklift}
          alt=""
          priority
          fill
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />

        {/* Gradiente escuro (#01120E) da base para o topo, concentrado na base */}
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
                  text: "Locação flexível para",
                  className: "font-normal",
                  br: true,
                },
                {
                  text: "cada operação",
                  className: "font-bold text-primary-500",
                },
              ]}
            />
            <p className="mx-auto max-w-[420px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Empilhadeiras novas e seminovas com contratos flexíveis e suporte
              técnico 24h.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.ORCAMENTO}
            className="w-full lg:w-auto"
          >
            Locar empilhadeira
          </Button>
        </div>
      </div>
    </section>
  );
}
