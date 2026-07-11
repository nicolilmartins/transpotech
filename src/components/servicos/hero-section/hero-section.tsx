import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { ROUTES } from "@/lib/routes";
import heroImage from "@/assets/images/hero-servicos.webp";

export function ServicosHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] p-4">
      {/* Card de imagem com 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden rounded-[20px]">
        {/* Imagem de fundo — manutenção / técnico em operação */}
        <Image
          src={heroImage}
          alt=""
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-end gap-8 px-5 pb-20 text-center sm:px-6 lg:px-16">
          <div className="flex max-w-[563px] flex-col gap-4">
            <BlurRevealTitle
              tone="dark"
              className="text-h2 text-neutral-50"
              segments={[
                {
                  text: "Manutenção para manter",
                  className: "font-normal",
                  br: true,
                },
                {
                  text: "sua frota em operação",
                  className: "font-bold text-primary-500",
                },
              ]}
            />
            <p className="mx-auto max-w-[440px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Preventiva, corretiva e multimarcas com suporte técnico
              especializado.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.ORCAMENTO}
            className="w-full justify-center sm:w-auto"
          >
            Solicitar assistência técnica
          </Button>
        </div>
      </div>
    </section>
  );
}
