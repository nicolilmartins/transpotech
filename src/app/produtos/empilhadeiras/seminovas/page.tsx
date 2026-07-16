import type { Metadata } from "next";

import { SeminovasHeroSection } from "@/components/empilhadeiras-seminovas/hero-section/hero-section";
import { WhyBuySection } from "@/components/empilhadeiras-seminovas/why-buy-section/why-buy-section";
import { EvaluationSection } from "@/components/empilhadeiras-seminovas/evaluation-section/evaluation-section";
import { IncludedSection } from "@/components/empilhadeiras-seminovas/included-section/included-section";
import { ValueSection } from "@/components/empilhadeiras-seminovas/value-section/value-section";
import { PurchaseStepsSection } from "@/components/empilhadeiras-seminovas/purchase-steps-section/purchase-steps-section";
import { ConsiderNewSection } from "@/components/empilhadeiras-seminovas/consider-new-section/consider-new-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqSeminovas } from "@/data/faq-seminovas";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";

export const metadata: Metadata = {
  title: "Empilhadeiras Seminovas",
  description:
    "Empilhadeiras seminovas revisadas e com garantia. Equipamentos multimarcas com procedência e histórico de manutenção. Consulte disponibilidade.",
  openGraph: {
    title: "Empilhadeiras Seminovas | TranspoTech",
    description:
      "Empilhadeiras seminovas revisadas com garantia. Consulte disponibilidade.",
  },
};

export default function EmpilhadeirasSeminovasPage() {
  return (
    <main>
      <SeminovasHeroSection />

      {/* Grupo claro 1 — Por que comprar + Como avaliamos */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <WhyBuySection />
        <EvaluationSection />
      </div>

      {/* Bloco dark — O que está incluso */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <IncludedSection />
      </div>

      {/* Grupo claro 2 — Onde entrega valor */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <ValueSection />
      </div>

      {/* Bloco dark único — Como funciona + Considere novas.
          Um só DarkAmbient para os blurs laranja/verde percorrerem as duas
          seções de forma contínua (parecem uma seção só). */}
      <div className="relative isolate bg-[#181616]">
        <DarkAmbient />
        <PurchaseStepsSection />
        <ConsiderNewSection />
      </div>

      {/* Grupo claro 4 — FAQ. pb-6 compensa o -mt-6 do footer (topo
          arredondado sobreposto), mantendo os 48/80px visuais da diretriz. */}
      <div className="relative isolate bg-[#fdfdfd] pb-6">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <FaqSection
          titleRegular="Dúvidas frequentes sobre "
          titleAccent="seminovas"
          items={faqSeminovas}
        />
      </div>
    </main>
  );
}
