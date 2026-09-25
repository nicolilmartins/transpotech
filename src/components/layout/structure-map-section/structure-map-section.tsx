import { Section } from "@/components/ui/section";
import { StatsGrid } from "@/components/layout/stats-grid";
import { BrazilMap } from "./brazil-map";
import { getSharedTexts } from "@/sanity/queries/shared";

// Seção "estrutura / abrangência nacional" compartilhada (serviços e
// quem-somos): indicadores + legenda à esquerda e mapa do Brasil interativo à
// direita (zoom no estado; nos estados com unidade, capital, unidades e tempos
// de deslocamento). Fundo dark — envolver num wrapper bg-[#181616] na página.
type StructureMapSectionProps = {
  /** Tag acima do título. */
  eyebrow?: string;
  /** Primeira linha do título (peso normal). */
  titleTop: string;
  /** Segunda linha do título (negrito). */
  titleBottom: string;
  /** Destaca a segunda linha do título em laranja (primary). */
  accentBottom?: boolean;
  description: string;
  /** Largura máx. da descrição (controla a quebra de linhas). Ex.: "540px". */
  descriptionWidth?: string;
};

export async function StructureMapSection({
  eyebrow = "Abrangência nacional",
  titleTop,
  titleBottom,
  accentBottom = false,
  description,
  descriptionWidth = "760px",
}: StructureMapSectionProps) {
  const { coverage } = await getSharedTexts();

  return (
    <Section data-header-dark>
      {/* Desktop: coluna esquerda (título + indicadores) | mapa ao lado de
          ambos, encostado no padding direito e com o topo alinhado ao da tag/título
          (referência: HTML de abrangência).
          Mobile: título → mapa → indicadores — a coluna esquerda vira
          `contents` e a ordem é controlada por `order`. */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-x-16">
        <div className="contents lg:flex lg:flex-col lg:gap-20">
          {/* Tag, título e descrição */}
          <div className="order-1 flex flex-col gap-4 lg:order-none">
            <p className="text-body font-semibold uppercase tracking-wide text-primary-400">
              {eyebrow}
            </p>
            {/* 40px no desktop (text-h2, mesmo token dos títulos de seção
                da página). Quebra fixa em 2 linhas só a partir de xl — em lg
                a coluna é estreita demais para as linhas sem quebra. */}
            <h2 className="text-h2 text-neutral-50">
              <span className="lg:block xl:whitespace-nowrap font-normal">
                {titleTop}
              </span>{" "}
              <span
                className={`lg:block xl:whitespace-nowrap font-bold ${
                  accentBottom ? "text-primary-500" : ""
                }`}
              >
                {titleBottom}
              </span>
            </h2>
            <p
              className="text-balance text-body leading-[1.35] text-neutral-400"
              style={{ maxWidth: descriptionWidth }}
            >
              {description}
            </p>
          </div>

          {/* Indicadores + legenda */}
          <div className="order-3 flex flex-col gap-6 lg:order-none">
            <StatsGrid
              stats={coverage.stats}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            />

            {/* Legenda do mapa */}
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="size-4 shrink-0 rounded-sm border border-neutral-50/40 bg-primary-500/30"
                />
                {coverage.legendActive}
              </li>
              <li className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="mx-0.5 size-3 shrink-0 rounded-full bg-primary-400 shadow-[0_0_8px_rgba(245,130,32,0.55)]"
                />
                {coverage.legendUnit}
              </li>
            </ul>
          </div>
        </div>

        {/* Mapa sempre inteiro na tela: altura limitada ao viewport (menos o
            header). Desktop: a célula estica até a altura da coluna esquerda e
            o mapa (absolute) ocupa essa altura, encostado à direita — o sul não
            passa do fim dos indicadores. Mobile/tablet: largura total, reduzida
            (e centralizada) se a altura resultante passar do viewport. */}
        <div className="order-2 lg:relative lg:order-none lg:self-stretch">
          <BrazilMap className="mx-auto w-full max-w-[calc((100svh-8rem)*var(--map-ratio))] lg:absolute lg:right-0 lg:top-0 lg:mx-0 lg:h-full lg:max-h-[calc(100svh-8rem)] lg:w-auto lg:max-w-full" />
        </div>
      </div>
    </Section>
  );
}
