import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { ROUTES } from "@/lib/routes";
import forklift from "@/assets/images/hero-image-empilhadeiras-seminovas.webp";
import forkliftMobile from "@/assets/images/hero-image-empilhadeiras-seminovas-mobile.webp";

export function SeminovasHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] md:p-4">
      {/* Card de imagem — full-bleed no mobile; de md em diante, 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-svh md:h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden md:rounded-[20px]">
        {/* Imagem de fundo (mobile) — mesma cena em versão clara, corte do
            Figma na empilhadeira da esquerda (object-position ≈ 44%). */}
        <Image
          src={forkliftMobile}
          alt=""
          priority
          fill
          sizes="100vw"
          className="object-cover object-[44%_center] md:hidden"
        />
        {/* Imagem de fundo (desktop) — frota de empilhadeiras em operação */}
        <Image
          src={forklift}
          alt=""
          priority
          fill
          sizes="100vw"
          className="hidden scale-[1.15] object-cover object-[72%_center] md:block"
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
                // Mobile: "Empilhadeiras" / "seminovas revisadas" / "e com
                // garantia". Desktop mantém as duas linhas de antes (os <br>
                // responsivos trocam o ponto de quebra por breakpoint).
                {
                  text: "Empilhadeiras ",
                  className: "font-normal",
                  br: "lg:hidden",
                },
                {
                  text: "seminovas ",
                  className: "font-normal",
                  br: "hidden lg:inline",
                },
                {
                  text: "revisadas ",
                  className: "font-bold text-primary-500",
                  br: "lg:hidden",
                },
                {
                  text: "e com garantia",
                  className: "font-bold text-primary-500",
                },
              ]}
            />
            <p className="mx-auto max-w-[420px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Inspeção completa, procedência e suporte pós-venda, pronta entrega
              com confiança.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.ORCAMENTO}
            className="w-full lg:w-auto"
          >
            Solicitar cotação
          </Button>
        </div>
      </div>
    </section>
  );
}
