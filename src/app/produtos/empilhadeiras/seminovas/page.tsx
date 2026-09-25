import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { SeminovasHeroSection } from "@/components/empilhadeiras-seminovas/hero-section/hero-section";
import { LeadFormSection } from "@/components/layout/lead-form-section/lead-form-section";
import { WhyBuySection } from "@/components/empilhadeiras-seminovas/why-buy-section/why-buy-section";
import { EvaluationSection } from "@/components/empilhadeiras-seminovas/evaluation-section/evaluation-section";
import { IncludedSection } from "@/components/empilhadeiras-seminovas/included-section/included-section";
import { ValueSection } from "@/components/empilhadeiras-seminovas/value-section/value-section";
import { PurchaseStepsSection } from "@/components/empilhadeiras-seminovas/purchase-steps-section/purchase-steps-section";
import { ConsiderNewSection } from "@/components/empilhadeiras-seminovas/consider-new-section/consider-new-section";
import { ClassifiedsSection } from "@/components/empilhadeiras-seminovas/classifieds-section/classifieds-section";
import { CompareSection } from "@/components/layout/compare-section/compare-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { getFaqItems } from "@/sanity/queries/faq";
import { getForkliftsSeminovas } from "@/sanity/queries/forklifts";
import { getPage } from "@/sanity/queries/pages";
import { seminovasPage } from "@/sanity/content/pages/seminovas";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";

export const metadata: Metadata = {
  title: "Empilhadeiras Seminovas",
  description:
    "Empilhadeiras seminovas revisadas e com garantia. Equipamentos multimarcas com procedência e histórico de manutenção. Consulte disponibilidade.",
  openGraph: {
    ...baseOpenGraph,
    title: "Empilhadeiras Seminovas | TranspoTech",
    description:
      "Empilhadeiras seminovas revisadas com garantia. Consulte disponibilidade.",
  },
};

export default async function EmpilhadeirasSeminovasPage() {
  const [forklifts, faqItems, content] = await Promise.all([
    getForkliftsSeminovas(),
    getFaqItems("seminovas"),
    getPage(seminovasPage),
  ]);

  return (
    <main>
      <SeminovasHeroSection content={content.hero} />

      {/* Grupo claro 1 — Captação (logo após a hero) + Por que comprar + Como
          avaliamos. Uma única malha cobre tudo, sem cortes. */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <LeadFormSection
          id="consultar-seminovas"
          {...content.leadForm}
        />
        <WhyBuySection content={content.whyBuy} />
        <EvaluationSection content={content.evaluation} />
      </div>

      {/* Bloco dark — O que está incluso */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <IncludedSection content={content.included} />
      </div>

      {/* Grupo claro 2 — Onde entrega valor + Comparativo elétrica × GLP */}
      <div className="relative isolate bg-background">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ValueSection content={content.value} />
        <CompareSection />
      </div>

      {/* Bloco dark único — Como funciona + Considere novas.
          Um só DarkAmbient para os blurs laranja/verde percorrerem as duas
          seções de forma contínua (parecem uma seção só). */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <PurchaseStepsSection content={content.purchaseSteps} />
        <ConsiderNewSection content={content.considerNew} />
      </div>

      {/* Classificados — estoque de seminovas disponível, mesmo card e grid da
          seção "Outras opções que podem servir" das páginas de detalhe. Fundo
          neutral-50 (igual ao dos relacionados) para os cards brancos destacarem. */}
      <div className="relative isolate bg-neutral-50">
        <ClassifiedsSection
          id="disponiveis-agora"
          items={forklifts}
          {...content.classifieds}
        />
      </div>

      {/* Grupo claro 4 — FAQ (sem malha). pb-6 compensa o -mt-6 do footer (topo
          arredondado sobreposto), mantendo os 48/80px visuais da diretriz. */}
      <div className="bg-background pb-6">
        <FaqSection {...content.faq} items={faqItems} />
      </div>
    </main>
  );
}
