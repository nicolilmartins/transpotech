import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";

// Hero centralizada (mesmo padrão de Quem Somos) — label, título grande e
// parágrafo no centro; a malha animada (DriftMesh) fica no wrapper da página.
export function OuvidoriaHeroSection() {
  return (
    <Section
      data-header-hero
      className="flex min-h-svh flex-col items-center justify-center gap-6 pt-[128px] text-center lg:pt-[152px]"
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Escuta e relacionamento
        </p>
        <BlurRevealTitle
          className="max-w-[900px] text-h2 text-neutral-800"
          segments={[
            { text: "Ouvidoria ", className: "font-normal" },
            { text: "Digital", className: "font-normal" },
          ]}
        />
      </div>
      <p className="max-w-[640px] text-h6 font-normal leading-[1.35] text-neutral-700">
        Um canal para receber reclamações, sugestões, elogios, dúvidas e
        manifestações gerais sobre sua experiência com a TranspoTech. Queremos
        ouvir você para melhorar nossos processos, atendimento e relacionamento.
      </p>

      <Button variant="primary" size="lg" href="#manifestacao" className="mt-4 lg:mt-0">
        Fazer manifestação
      </Button>
    </Section>
  );
}
