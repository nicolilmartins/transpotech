import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { ROUTES } from "@/lib/routes";
import heroImage from "@/assets/images/hero-quem-somos.webp";

export function QuemSomosHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] md:p-4">
      {/* Card de imagem — full-bleed no mobile; de md em diante, 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-svh md:h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden md:rounded-[20px]">
        {/* Imagem de fundo — fachada e equipe TranspoTech */}
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-end gap-10 px-5 pb-20 text-center sm:px-6 lg:gap-8 lg:px-16">
          <div className="flex max-w-[820px] flex-col gap-4">
            <BlurRevealTitle
              tone="dark"
              className="text-balance text-h2 text-neutral-50"
              segments={[
                {
                  text: "Especialistas em empilhadeiras para ",
                  className: "font-normal",
                },
                {
                  text: "operações em movimento",
                  className: "font-bold text-primary-500",
                },
              ]}
            />
            <p className="mx-auto max-w-[520px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Desde 2001, a TranspoTech atua com soluções para movimentação de
              materiais, apoiando empresas que precisam de disponibilidade,
              segurança, eficiência e suporte técnico especializado.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.CONTATO}
          >
            Fale com um especialista
          </Button>
        </div>
      </div>
    </section>
  );
}
