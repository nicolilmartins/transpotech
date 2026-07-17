import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { ROUTES } from "@/lib/routes";
import heroImage from "@/assets/images/hero-image-baterias.webp";

export function BateriasHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] md:p-4">
      {/* Card de imagem — full-bleed no mobile; de md em diante, 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-svh md:h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden md:rounded-[20px]">
        {/* Imagem de fundo — equipamentos elétricos em operação. Posição x em
            65% desloca a cena para a esquerda em telas estreitas, mantendo o
            técnico carregando a empilhadeira dentro do enquadramento. */}
        <Image
          src={heroImage}
          alt=""
          priority
          fill
          sizes="100vw"
          className="object-cover object-[65%_70%]"
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
                { text: "Energia para", className: "font-normal", br: true },
                {
                  text: "equipamentos elétricos",
                  className: "font-bold text-primary-500",
                },
              ]}
            />
            <p className="mx-auto max-w-[420px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Baterias e carregadores conforme compatibilidade, autonomia e
              rotina de uso.
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
