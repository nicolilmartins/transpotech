import type { Metadata } from "next";

import { UsadasHeroSection } from "@/components/empilhadeiras-usadas/hero-section/hero-section";
import { WhyBuySection } from "@/components/empilhadeiras-usadas/why-buy-section/why-buy-section";
import { EvaluationSection } from "@/components/empilhadeiras-usadas/evaluation-section/evaluation-section";
import { IncludedSection } from "@/components/empilhadeiras-usadas/included-section/included-section";
import { ValueSection } from "@/components/empilhadeiras-usadas/value-section/value-section";
import { PurchaseStepsSection } from "@/components/empilhadeiras-usadas/purchase-steps-section/purchase-steps-section";
import { ConsiderNewSection } from "@/components/empilhadeiras-usadas/consider-new-section/consider-new-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { faqUsadas } from "@/data/faq-usadas";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DarkAmbient } from "@/components/layout/dark-ambient";

export const metadata: Metadata = {
  title: "Empilhadeiras Usadas",
  description:
    "Empilhadeiras usadas revisadas e com garantia. Equipamentos multimarcas com procedência e histórico de manutenção. Consulte disponibilidade.",
  openGraph: {
    title: "Empilhadeiras Usadas | TranspoTech",
    description:
      "Empilhadeiras usadas revisadas com garantia. Consulte disponibilidade.",
  },
};

export default function EmpilhadeirasUsadasPage() {
  return (
    <main>
      <UsadasHeroSection />

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

      {/* Grupo claro 4 — FAQ */}
      <div className="relative isolate bg-[#fdfdfd]">
        <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
        <FaqSection
          titleRegular="Dúvidas frequentes sobre "
          titleAccent="usadas e seminovas"
          items={faqUsadas}
        />
      </div>
    </main>
  );
}
