import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import forklift from "@/assets/images/hero-image-empilhadeiras-usadas.webp";

export function UsadasHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] p-4">
      {/* Card de imagem com 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden rounded-[20px]">
        {/* Imagem de fundo — frota de empilhadeiras em operação */}
        <Image
          src={forklift}
          alt=""
          priority
          fill
          sizes="100vw"
          className="scale-[1.15] object-cover object-[72%_center]"
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-end gap-8 px-5 pb-20 text-center sm:px-6 lg:px-16">
          <div className="flex max-w-[563px] flex-col gap-4">
            <h1 className="text-h2 text-neutral-50">
              <span className="font-normal">Empilhadeiras usadas</span>
              <br />
              <span className="font-bold text-primary-500">
                revisadas e com garantia
              </span>
            </h1>
            <p className="mx-auto max-w-[420px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Inspeção completa, procedência e suporte pós-venda — pronta entrega
              com confiança.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.ORCAMENTO}
            className="w-full justify-center sm:w-auto"
          >
            Solicitar cotação
          </Button>
        </div>
      </div>
    </section>
  );
}
