import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { CatalogSection } from "@/components/empilhadeiras-novas/catalog-section/catalog-section";
import { CompareSection } from "@/components/layout/compare-section/compare-section";
import { ConsiderUsedSection } from "@/components/empilhadeiras-novas/consider-used-section/consider-used-section";
import { WhyChooseSection } from "@/components/empilhadeiras-novas/why-choose-section/why-choose-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { getFaqItems } from "@/sanity/queries/faq";
import { getForkliftsNovas } from "@/sanity/queries/forklifts";
import { getPage } from "@/sanity/queries/pages";
import { empilhadeirasNovasPage } from "@/sanity/content/pages/empilhadeiras-novas";
import { CtaSection } from "@/components/layout/cta/cta-section";
import { DarkAmbient } from "@/components/layout/dark-ambient";
import { DriftMesh } from "@/components/layout/drift-mesh";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Empilhadeiras Novas",
  description:
    "Catálogo de empilhadeiras novas STILL, Linde e Baoli: elétricas, a combustão, retráteis e transpaleteiras. Equipamentos zero-hora com garantia de fábrica e configuração sob medida.",
  alternates: { canonical: ROUTES.EMPILHADEIRAS_NOVAS },
  openGraph: {
    ...baseOpenGraph,
    title: "Empilhadeiras Novas | TranspoTech",
    description:
      "Catálogo de empilhadeiras novas STILL, Linde e Baoli, zero-hora com garantia de fábrica e configuração sob medida.",
  },
};

export default async function EmpilhadeirasNovasPage() {
  const [forklifts, faqItems, content] = await Promise.all([
    getForkliftsNovas(),
    getFaqItems("empilhadeiras"),
    getPage(empilhadeirasNovasPage),
  ]);

  return (
    <main>
      {/* Grupo claro — catálogo.
          pt extra → clareira do header flutuante (≈80px do título ao header).
          Malha animada (DriftMesh, como na hero do Canal da Transparência)
          só na região da hero: altura de viewport + fade na base. */}
      <div className="relative isolate bg-neutral-50 pt-[96px]">
        <DriftMesh
          fade
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh"
        />
        <CatalogSection forklifts={forklifts} content={content.catalog} />
      </div>

      {/* Comparativo — fundo branco, cards neutral-50 */}
      <div className="bg-white">
        <CompareSection />
      </div>

      {/* Bloco dark — considere seminovas + por que escolher a TranspoTech */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <ConsiderUsedSection content={content.considerUsed} />
        <WhyChooseSection content={content.whyChoose} />
      </div>

      {/* Grupo claro — FAQ (sem malha) */}
      <div className="bg-background">
        <FaqSection {...content.faq} items={faqItems} />
      </div>

      <CtaSection {...content.cta} ctaHref={ROUTES.CONTATO} />
    </main>
  );
}
