import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/hero-sustentabilidade.webp";

export function SustentabilidadeHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] p-4">
      {/* Card de imagem com 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden rounded-[20px]">
        {/* Imagem de fundo — iniciativa ESG / equipe */}
        <Image
          src={heroImage}
          alt=""
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Gradiente escuro da base para o topo — sobe além do título para
            garantir a legibilidade sobre a imagem */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #01120E 0%, rgba(1,18,14,0.85) 40%, rgba(1,18,14,0) 94%)",
          }}
        />

        {/* Conteúdo — parte inferior da hero (80px de padding inferior) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-end gap-8 px-5 pb-20 text-center sm:px-6 lg:px-16">
          <div className="flex max-w-[900px] flex-col gap-4">
            {/* Duas linhas: quebra forçada antes de "responsabilidade..." */}
            <h1 className="text-h2 text-neutral-50">
              <span className="block font-normal">
                Sustentabilidade, inclusão e
              </span>
              <span className="block font-bold text-primary-500 lg:whitespace-nowrap">
                responsabilidade na intralogística
              </span>
            </h1>
            <p className="mx-auto max-w-[480px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Iniciativas de sustentabilidade, inclusão, comunidade e governança
              para um futuro mais responsável.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href="#destaques"
            className="w-full justify-center sm:w-auto"
          >
            Conhecer iniciativas ESG
          </Button>
        </div>
      </div>
    </section>
  );
}
