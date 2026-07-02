import { Button } from "@/components/ui/button";
import { StateMesh } from "@/components/layout/state-mesh";

type CtaSectionProps = {
  /** Primeira parte do título (peso normal). */
  titleRegular?: string;
  /** Segunda parte do título (destaque laranja, negrito). */
  titleAccent?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Botão secundário opcional (quando definido, renderiza ao lado do primário). */
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaSection({
  titleRegular = "Qual é o maior gargalo ",
  titleAccent = "da sua operação?",
  description = "Um especialista analisa seu cenário e apresenta a opção mais adequada, sem compromisso.",
  ctaLabel = "Falar com especialistas",
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: CtaSectionProps = {}) {
  return (
    <section className="relative overflow-hidden rounded-t-2xl bg-[#fdfdfd]">
      {/* Background — cobre a tela toda (full-bleed), atrás do conteúdo */}
      <StateMesh className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute -right-32 -top-40 size-[700px] -rotate-45 rounded-full bg-primary-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 top-0 size-[700px] -rotate-45 rounded-full bg-secondary-600/15 blur-[120px]" />

      {/* Conteúdo — limitado a 1440px */}
      <div className="relative mx-auto flex min-h-[360px] w-full max-w-[1440px] flex-col items-center justify-center gap-10 px-5 py-16 sm:px-6 lg:h-[419px] lg:px-16 lg:py-20 2xl:px-30">
        <div className="relative flex flex-col items-center gap-4 text-center">
          <h2 className="w-[700px] max-w-full text-balance text-h2 text-neutral-800">
            <span className="font-normal">{titleRegular}</span>
            <span className="font-bold text-primary-500">{titleAccent}</span>
          </h2>
          <p className="w-[420px] max-w-full text-body leading-[1.35] text-neutral-600">
            {description}
          </p>
        </div>
        <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            href={ctaHref}
            className="w-full justify-center sm:w-auto"
          >
            {ctaLabel}
          </Button>
          {secondaryLabel && (
            <Button
              variant="gray"
              size="lg"
              href={secondaryHref}
              className="w-full justify-center sm:w-auto"
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
