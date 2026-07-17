import type { Metadata } from "next";

import { ContatoHeroSection } from "@/components/contato/hero-section/hero-section";
import { HelpSection } from "@/components/contato/help-section/help-section";
import { UnitsSection } from "@/components/contato/units-section/units-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DriftMesh } from "@/components/layout/drift-mesh";
import { faqContato } from "@/data/faq-contato";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com um especialista em intralogística da TranspoTech. Envie sua solicitação de compra, locação, manutenção ou cotação e encontre a unidade mais próxima.",
  openGraph: {
    title: "Contato | TranspoTech",
    description:
      "Fale com um especialista em intralogística. Unidades em SC, PR, RS, SP e GO.",
  },
};

export default function ContatoPage() {
  return (
    <main>
      {/* Hero clara com a malha que "anda" sozinha (DriftMesh), em versão mais
          sutil (opacity reduzida). pt no próprio hero cobre a clareira do header. */}
      <div className="relative isolate bg-[#fdfdfd]">
        <DriftMesh className="pointer-events-none absolute inset-0 -z-10 opacity-50" />
        <ContatoHeroSection />
      </div>

      {/* Grupo claro — ajuda, unidades e FAQ (malha só até as unidades) */}
      <div className="relative isolate bg-[#fdfdfd] pb-6">
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <HelpSection />
          <UnitsSection />
        </div>
        <FaqSection
          titleRegular="Perguntas "
          titleAccent="frequentes"
          items={faqContato}
        />
      </div>
    </main>
  );
}
