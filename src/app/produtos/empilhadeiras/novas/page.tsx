import type { Metadata } from "next";

import { CatalogSection } from "@/components/empilhadeiras-novas/catalog-section/catalog-section";
import { CompareSection } from "@/components/empilhadeiras-novas/compare-section/compare-section";
import { ConsiderUsedSection } from "@/components/empilhadeiras-novas/consider-used-section/consider-used-section";
import { WhyChooseSection } from "@/components/empilhadeiras-novas/why-choose-section/why-choose-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqEmpilhadeiras } from "@/data/faq-empilhadeiras";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { MeshBackground } from "@/components/layout/mesh-background/mesh-background";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Empilhadeiras Novas",
  description:
    "Catálogo de empilhadeiras novas STILL, Linde e Baoli — elétricas, a combustão, retráteis e transpaleteiras. Equipamentos zero-hora com garantia de fábrica e configuração sob medida.",
  alternates: { canonical: ROUTES.EMPILHADEIRAS_NOVAS },
  openGraph: {
    title: "Empilhadeiras Novas | TranspoTech",
    description:
      "Catálogo de empilhadeiras novas STILL, Linde e Baoli, zero-hora com garantia de fábrica e configuração sob medida.",
  },
};

export default function EmpilhadeirasNovasPage() {
  return (
    <main>
      {/* Grupo claro — catálogo.
          pt extra → clareira do header flutuante (≈80px do título ao header). */}
      <div className="relative isolate bg-[#f7f6f6] pt-[96px]">
        <MeshBackground className="pointer-events-none absolute inset-0 -z-10" />
        <CatalogSection />
      </div>

      {/* Comparativo — fundo branco, cards #f7f6f6 */}
      <div className="bg-white">
        <CompareSection />
      </div>

      {/* Bloco dark — considere usadas + por que escolher a Transpotech */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <ConsiderUsedSection />
        <WhyChooseSection />
      </div>

      {/* Grupo claro — FAQ */}
      <div className="relative isolate bg-[#fdfdfd]">
        <MeshBackground className="pointer-events-none absolute inset-0 -z-10" />
        <FaqSection
          titleRegular="Perguntas frequentes sobre "
          titleAccent="locação de empilhadeiras"
          items={faqEmpilhadeiras}
        />
      </div>

      <CtaSection
        titleRegular="Precisa comprar empilhadeira com "
        titleAccent="segurança técnica?"
        description="Fale com a TranspoTech e receba uma recomendação conforme carga, altura, ambiente, prazo e orçamento."
        ctaLabel="Falar com especialista"
        ctaHref={ROUTES.ORCAMENTO}
      />
    </main>
  );
}
