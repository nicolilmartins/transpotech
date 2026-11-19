"use client";

import { WhatsappQuoteButton } from "@/components/layout/whatsapp-quote-button/whatsapp-quote-button";
import { useSharedTexts } from "@/components/layout/shared-texts";
import type { QuoteSection } from "@/lib/whatsapp";
import type { Forklift } from "@/types/forklift.types";

// Botão "Solicitar orçamento deste modelo" das páginas de detalhe (novas e
// classificados de seminovas): leva ao WhatsApp com o nome do equipamento.
export function ProductQuoteButton({
  forklift,
  section,
}: {
  forklift: Forklift;
  section: QuoteSection;
}) {
  const { productQuote } = useSharedTexts();

  return (
    <WhatsappQuoteButton
      section={section}
      equipment={forklift.name}
      className="justify-center"
    >
      {productQuote.buttonLabel}
    </WhatsappQuoteButton>
  );
}
