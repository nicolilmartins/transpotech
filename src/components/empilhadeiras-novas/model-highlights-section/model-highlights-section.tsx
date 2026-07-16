import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import type { ResolvedForkliftDetail } from "@/data/forklift-details";

// Atributos do modelo no layout "Planos de locação para diferentes demandas":
// lista com divisórias, tique laranja por linha e hover, em dark mode. O botão
// "Ver ficha técnica" fica no cabeçalho, à direita.
export function ModelHighlightsSection({
  detail,
}: {
  detail: ResolvedForkliftDetail;
}) {
  return (
    <div className="relative isolate bg-[#181616]">
      <DarkAmbient />
      <Section
        data-header-dark
        className="flex flex-col items-start gap-10 lg:gap-14"
      >
        {/* Cabeçalho — título/descrição à esquerda + "Ver ficha técnica" à direita */}
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-[640px] flex-col gap-4">
            <h2 className="text-h2 text-neutral-50">
              <span className="font-normal">{detail.intro.titleTop}</span>{" "}
              <br className="hidden lg:inline" />
              <span className="font-bold text-primary-500">
                {detail.intro.titleBottom}
              </span>
            </h2>
            <p className="text-body leading-[1.5] text-neutral-400">
              {detail.intro.description}
            </p>
          </div>
          {/* Desktop: botão no cabeçalho, à direita */}
          <div className="hidden shrink-0 sm:block">
            <Button
              variant="primary"
              size="lg"
              href={detail.datasheetHref}
              className="justify-center"
            >
              Ver ficha técnica
            </Button>
          </div>
        </div>

        {/* Tópicos — linhas divisórias + tique laranja por linha */}
        <div className="w-full">
          <ul className="flex flex-col border-t border-white/10">
            {detail.blocks.map((block) => (
              <li
                key={block.title}
                className="group relative flex flex-col gap-3 border-b border-white/10 py-10 transition-colors lg:flex-row lg:gap-16 lg:py-12"
              >
                {/* Linha precisa à esquerda — fica laranja no hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-10 h-9 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-primary-500 lg:top-12"
                />

                <h3 className="pl-6 font-heading text-h4 font-normal text-neutral-100 transition-colors duration-300 group-hover:text-primary-500 lg:w-1/2 lg:pl-8">
                  {block.title}
                </h3>

                <p className="pl-6 text-body leading-[1.5] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-50 lg:w-1/2 lg:pl-0">
                  {block.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile: botão depois dos tópicos */}
        <div className="w-full sm:hidden">
          <Button
            variant="primary"
            size="lg"
            href={detail.datasheetHref}
            className="w-full justify-center"
          >
            Ver ficha técnica
          </Button>
        </div>
      </Section>
    </div>
  );
}
