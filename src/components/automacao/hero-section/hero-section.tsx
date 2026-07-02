import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
// PLACEHOLDER: trocar por render de armazém automatizado (Dematic)
import heroImage from "@/assets/images/operacao-image.webp";

export function AutomacaoHeroSection() {
  return (
    <section data-header-hero className="relative w-full bg-[#fdfdfd] p-4">
      {/* Card de imagem com 16px de padding em volta e bordas de 20px */}
      <div className="relative flex min-h-[560px] w-full overflow-hidden rounded-[20px] lg:h-[668px] lg:min-h-0">
        {/* Imagem de fundo — armazém automatizado */}
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
              "linear-gradient(to top, #181616 0%, rgba(24,22,22,0.85) 28%, rgba(24,22,22,0) 72%)",
          }}
        />

        {/* Conteúdo — parte inferior da hero (80px de padding inferior) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-end gap-8 px-5 pb-20 text-center sm:px-6 lg:px-16">
          <div className="flex max-w-[563px] flex-col gap-4">
            <h1 className="text-h2 text-neutral-50">
              <span className="font-normal">Operação logística</span>
              <br />
              <span className="font-bold text-primary-500">
                automatizada com Dematic
              </span>
            </h1>
            <p className="mx-auto max-w-[440px] text-h6 font-normal leading-[1.3] text-neutral-50">
              Soluções escaláveis para indústrias, e-commerces e centros de
              distribuição.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.ORCAMENTO}
            className="w-full justify-center sm:w-auto"
          >
            Avaliar minha operação
          </Button>
        </div>
      </div>
    </section>
  );
}
