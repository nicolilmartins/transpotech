import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { ContatoHeroSection } from "@/components/contato/hero-section/hero-section";
import { HelpSection } from "@/components/contato/help-section/help-section";
import { UnitsSection } from "@/components/contato/units-section/units-section";
import { FaqSection } from "@/components/layout/faq/faq-section";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { DriftMesh } from "@/components/layout/drift-mesh";
import { getFaqItems } from "@/sanity/queries/faq";
import { getUnits } from "@/sanity/queries/units";
import { getPage } from "@/sanity/queries/pages";
import { contatoPage } from "@/sanity/content/pages/contato";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com um especialista em intralogística da TranspoTech. Envie sua solicitação de compra, locação, manutenção ou cotação e encontre a unidade mais próxima.",
  openGraph: {
    ...baseOpenGraph,
    title: "Contato | TranspoTech",
    description:
      "Fale com um especialista em intralogística. Unidades em SC, PR, RS, SP e GO.",
  },
};

export default async function ContatoPage() {
  const [units, faqItems, content] = await Promise.all([
    getUnits(),
    getFaqItems("contato"),
    getPage(contatoPage),
  ]);

  return (
    <main>
      {/* Página inteira num só grupo claro — como nas demais páginas, a faixa do
          formulário é FILHA deste fundo, e não uma seção irmã. Assim não há duas
          superfícies pintadas se encontrando: a faixa simplesmente desvanece e o
          fundo do grupo aparece no lugar. */}
      <div className="relative isolate bg-background pb-6">
        {/* Hero com o formulário — faixa no tom de captação (topo chapado, base
            desvanecendo) e a malha que "anda" sozinha (DriftMesh) em versão mais
            sutil, cobrindo a hero inteira. pt no próprio hero cobre a clareira
            do header. `isolate` é obrigatório: sem o contexto de empilhamento
            próprio, o -z-10 da malha cai atrás do fundo desta faixa e ela some. */}
        <div className="form-band-top relative isolate">
          <DriftMesh className="pointer-events-none absolute inset-0 -z-10 opacity-50" />
          <ContatoHeroSection content={content.hero} />
        </div>

        {/* Ajuda e unidades (malha do cursor só até aqui; o FAQ fica sem) */}
        <div className="relative">
          <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
          <HelpSection content={content.help} />
          <UnitsSection units={units} content={content.units} />
        </div>

        <FaqSection
          titleRegular={content.faq.titleRegular}
          titleAccent={content.faq.titleAccent}
          items={faqItems}
        />
      </div>
    </main>
  );
}
