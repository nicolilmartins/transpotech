import { Section } from "@/components/ui/section";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { DriftMesh } from "@/components/layout/drift-mesh";

export function OrcamentoHeroSection() {
  return (
    <div
      data-header-hero
      className="relative isolate overflow-hidden bg-[#fdfdfd]"
    >
      {/* Malha que anda sozinha no fundo (como nas heros do site) */}
      <DriftMesh
        fade
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <Section className="flex flex-col items-center gap-4 pb-[36px] pt-[168px] text-center lg:pb-[48px] lg:pt-[196px]">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
          Simulador de economia
        </p>
        <BlurRevealTitle
          className="text-balance text-h2 text-neutral-800"
          segments={[
            { text: "Empilhadeira GLP ou elétrica:", className: "font-normal", br: true },
            { text: "quanto sua operação economiza?", className: "font-bold text-primary-500" },
          ]}
        />
        <p className="mx-auto max-w-[620px] text-pretty text-body leading-[1.5] text-neutral-600">
          Ajuste os turnos, o preço do cilindro de gás e o kWh e compare o custo
          de energia de uma empilhadeira a GLP com uma elétrica a lítio e em
          quantos meses ela se paga.
        </p>
      </Section>
    </div>
  );
}
