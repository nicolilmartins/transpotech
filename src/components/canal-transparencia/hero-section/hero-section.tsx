import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";

// Hero centralizada (mesmo padrão de Ouvidoria / Quem Somos) — label, título
// grande e parágrafo no centro; a malha animada (DriftMesh) fica no wrapper da
// página.
export function CanalHeroSection() {
  return (
    <Section
      data-header-hero
      className="flex min-h-svh flex-col items-center justify-center gap-6 pt-[128px] text-center lg:pt-[152px]"
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Ética e integridade
        </p>
        <BlurRevealTitle
          className="max-w-[900px] text-h2 text-neutral-800"
          segments={[
            { text: "Canal da ", className: "font-normal" },
            { text: "Transparência", className: "font-normal" },
          ]}
        />
      </div>
      <p className="max-w-[640px] text-h6 font-normal leading-[1.35] text-neutral-700">
        Um espaço para relatar situações relacionadas à ética, integridade,
        conduta e responsabilidade corporativa. Os relatos são direcionados para
        análise responsável, com tratamento confidencial conforme as políticas
        internas.
      </p>

      <Button variant="primary" size="lg" href="#relato">
        Fazer um relato
      </Button>
    </Section>
  );
}
