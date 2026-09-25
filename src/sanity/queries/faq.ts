import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
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

const localFaqs = {
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
} satisfies Record<string, FaqItem[]>;

export type FaqPageKey = keyof typeof localFaqs;

const faqItemsQuery =
  defineQuery(`*[_type == "faqPage" && page == $page][0].items[]{
  question,
  answer
}`);

export async function getFaqItems(page: FaqPageKey): Promise<FaqItem[]> {
  const items = await sanityFetch<FaqItem[]>({
    query: faqItemsQuery,
    params: { page },
    tags: ["faqPage"],
  });
  return items ?? localFaqs[page];
}
