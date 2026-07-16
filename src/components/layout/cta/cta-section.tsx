import { Button } from "@/components/ui/button";
import { StateMesh } from "@/components/layout/state-mesh";

type CtaSectionProps = {
  /** Primeira parte do título (peso normal). */
  titleRegular?: string;
  /** Segunda parte do título (destaque laranja, negrito). */
  titleAccent?: string;
  /** Quebra o título entre a parte normal e o destaque (destaque na 2ª linha). */
  titleBreak?: boolean;
  description?: string;
  /** Largura da caixa da descrição (controla a quebra de linha). Ex.: "560px". */
  descriptionWidth?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Botão secundário opcional (quando definido, renderiza ao lado do primário). */
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaSection({
  titleRegular = "Qual é o maior gargalo ",
  titleAccent = "da sua operação?",
  titleBreak = false,
  description = "Um especialista analisa seu cenário e apresenta a opção mais adequada, sem compromisso.",
  descriptionWidth = "420px",
  ctaLabel = "Falar com especialistas",
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: CtaSectionProps = {}) {
  return (
    <section className="relative overflow-hidden bg-[#fdfdfd]">
      {/* Background — cobre a tela toda (full-bleed), atrás do conteúdo */}
      <StateMesh className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      {/* Blurs de ambiência: no mobile ficam menores e ancorados nos cantos —
          no tamanho do desktop eles cobririam a tela inteira e sujariam o fundo */}
      <div className="pointer-events-none absolute -right-24 -top-24 size-[320px] -rotate-45 rounded-full bg-primary-500/15 blur-[90px] lg:-right-32 lg:-top-40 lg:size-[700px] lg:blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 top-16 size-[320px] -rotate-45 rounded-full bg-secondary-600/15 blur-[90px] lg:-left-40 lg:top-0 lg:size-[700px] lg:blur-[120px]" />

      {/* Conteúdo — limitado a 1440px. 48px de padding no topo; embaixo 72px
          (48 + 24) para compensar o -mt-6 do footer, que sobrepõe 24px do CTA —
          assim o respiro visível inferior também fica em 48px. */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 px-5 pb-[72px] pt-12 sm:px-6 lg:px-16">
        <div className="relative flex w-full flex-col items-center gap-4 text-center">
          {/* w-full + max-w (nunca width fixa): largura fixa em filho de flex
              com items-center infla o fit-content do pai e estoura a tela no
              mobile. Título fixo em 32px abaixo de lg. */}
          <h2 className="w-full max-w-[700px] text-balance text-[32px] leading-[1.3] text-neutral-800 lg:text-h2">
            <span className="font-normal">{titleRegular}</span>{" "}
            {titleBreak && <br className="hidden lg:inline" />}
            <span className="font-bold text-primary-500">{titleAccent}</span>
          </h2>
          <p
            className="w-full text-body leading-[1.35] text-neutral-600"
            style={{ maxWidth: descriptionWidth }}
          >
            {description}
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Button variant="primary" size="lg" href={ctaHref}>
            {ctaLabel}
          </Button>
          {secondaryLabel && (
            <Button variant="gray" size="lg" href={secondaryHref}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
