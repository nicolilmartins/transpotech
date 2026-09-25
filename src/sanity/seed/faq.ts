import type { FaqItem } from "@/components/layout/faq/faq-section";
import { faqAutomacao } from "@/data/faq-automacao";
import { faqBaterias } from "@/data/faq-baterias";
import { faqCanalTransparencia } from "@/data/faq-canal-transparencia";
import { faqContato } from "@/data/faq-contato";
import { faqEmpilhadeiras } from "@/data/faq-empilhadeiras";
import { faqOuvidoria } from "@/data/faq-ouvidoria";
import { faqPecas } from "@/data/faq-pecas";
import { faqPneus } from "@/data/faq-pneus";
import { faqSeminovas } from "@/data/faq-seminovas";
import { faqServicos } from "@/data/faq-servicos";
import type { FaqPageKey } from "@/sanity/queries/faq";
import { seedKey, type SeedDocument } from "./helpers";

// Mesmo mapa de src/sanity/queries/faq.ts, repetido porque aquele arquivo é
// server-only e não carrega no Node do build-seed.
const faqs: Record<FaqPageKey, FaqItem[]> = {
  automacao: faqAutomacao,
  baterias: faqBaterias,
  "canal-transparencia": faqCanalTransparencia,
  contato: faqContato,
  empilhadeiras: faqEmpilhadeiras,
  ouvidoria: faqOuvidoria,
  pecas: faqPecas,
  pneus: faqPneus,
  seminovas: faqSeminovas,
  servicos: faqServicos,
};

export function documents(): SeedDocument[] {
  return Object.entries(faqs).map(([page, items]) => ({
    _id: `faqPage-${page}`,
    _type: "faqPage",
    page,
    items: items.map((item, i) => ({
      _key: seedKey(i),
      _type: "faqItem",
      question: item.question,
      answer: item.answer,
    })),
  }));
}
