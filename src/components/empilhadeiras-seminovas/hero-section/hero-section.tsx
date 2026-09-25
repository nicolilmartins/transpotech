import { HeroPicture } from "@/components/layout/photo-hero/hero-picture";
import { Button } from "@/components/ui/button";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import type { SectionContent } from "@/sanity/content/fields";
import type { seminovasPage } from "@/sanity/content/pages/seminovas";

// Primeira palavra e o resto. O título tem duas partes editáveis (normal e
// destaque) e o celular quebra linha depois da primeira palavra de cada uma.
function splitFirstWord(text: string): [string, string] {
  const [first = "", ...rest] = text.trim().split(/\s+/);
  return [first, rest.join(" ")];
}

type SeminovasHeroContent = SectionContent<typeof seminovasPage.sections.hero>;

export function SeminovasHeroSection({ content }: { content: SeminovasHeroContent }) {
  const [regularFirst, regularRest] = splitFirstWord(content.titleRegular);
  const [accentFirst, accentRest] = splitFirstWord(content.titleAccent);

  return (
    <section data-header-hero className="relative w-full bg-background md:p-4">
      {/* Card de imagem — full-bleed no mobile; de md em diante, 16px de padding em volta e bordas de 20px */}
      <div className="relative flex h-svh md:h-[calc(100svh-2rem)] min-h-[560px] w-full overflow-hidden md:rounded-[20px]">
        {/* Imagem de fundo. Mobile: mesma cena em versão clara, corte do
            Figma na empilhadeira da esquerda (object-position ≈ 44%).
            Desktop: frota de empilhadeiras em operação. */}
        <HeroPicture
          image={content.image}
          imageMobile={content.imageMobile}
          className="object-cover object-[44%_center] md:scale-[1.15] md:object-[72%_center]"
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-end gap-10 px-5 pb-20 text-center sm:px-6 lg:gap-8 lg:px-16">
          <div className="flex max-w-[563px] flex-col gap-4">
            <BlurRevealTitle
              tone="dark"
              className="text-h2 text-neutral-50"
              segments={[
                // Mobile: "Empilhadeiras" / "seminovas revisadas" / "e com
                // garantia". Desktop mantém as duas linhas de antes (os <br>
                // responsivos trocam o ponto de quebra por breakpoint).
                {
                  text: `${regularFirst} `,
                  className: "font-normal",
                  br: "lg:hidden",
                },
                {
                  text: `${regularRest} `,
                  className: "font-normal",
                  br: "hidden lg:inline",
                },
                {
                  text: `${accentFirst} `,
                  className: "font-bold text-primary-500",
                  br: "lg:hidden",
                },
                {
                  text: accentRest,
                  className: "font-bold text-primary-500",
                },
              ]}
            />
            <p className="mx-auto max-w-[420px] text-h6 font-normal leading-[1.3] text-neutral-50">
              {content.description}
            </p>
          </div>

          {/* Leva à lista de classificados, na própria página. */}
          <Button
            variant="primary"
            size="lg"
            href="#disponiveis-agora"
            className="w-full lg:w-auto"
          >
            {content.buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
