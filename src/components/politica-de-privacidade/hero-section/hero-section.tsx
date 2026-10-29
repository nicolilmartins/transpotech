import { Section } from "@/components/ui/section";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";

// Cabeçalho enxuto — só o título, sobre fundo branco liso. data-header-bare
// deixa o header (menus) sem fundo apenas nesta região; pt-96 é a clareira
// do header flutuante.
export function PrivacyHeroSection() {
  return (
    <div data-header-bare className="bg-background pt-[96px]">
      <Section className="flex flex-col gap-4 pb-16 lg:pb-28 lg:pt-24">
        <BlurRevealTitle
          className="max-w-[860px] text-h2 text-neutral-800"
          segments={[{ text: "Política de Privacidade", className: "font-bold" }]}
        />
      </Section>
    </div>
  );
}
