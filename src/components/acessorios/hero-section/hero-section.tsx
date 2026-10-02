import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
// Duas STILL RCE 20/16 em armazém — no mobile o crop é deslocado à direita
// para manter as empilhadeiras (≈61% da largura da foto) no centro.
import heroImage from "@/assets/images/RCE 20 + 16.webp";

export function AcessoriosHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] md:p-4">
      {/* Card de imagem — full-bleed no mobile; de md em diante, 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-svh md:h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden md:rounded-[20px]">
        <Image
          src={heroImage}
          alt=""
          priority
          fill
          sizes="100vw"
          className="object-cover object-[70%_50%] md:object-[50%_60%]"
        />

        {/* Gradiente escuro da base para o topo, concentrado na base */}
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
                { text: "Mais controle e segurança", className: "font-normal", br: true },
                {
                  text: "para a sua frota",
                  className: "font-bold text-primary-500",
                },
              ]}
            />
            <p className="mx-auto max-w-[460px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Telemetria, check list eletrônico, assistência ao operador e
              acessórios para empilhadeiras.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href="#solicitar-acessorios"
            className="w-full lg:w-auto"
          >
            Falar com especialista
          </Button>
        </div>
      </div>
    </section>
  );
}
