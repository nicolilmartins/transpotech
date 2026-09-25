"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LazyQuoteModal,
  preloadQuoteModal,
} from "@/components/layout/quote-modal/lazy-quote-modal";
import { useSharedTexts } from "@/components/layout/shared-texts";
import type { Forklift } from "@/types/forklift.types";

// Botão "Solicitar orçamento deste modelo" das páginas de detalhe (novas e
// classificados de seminovas): abre o modal de orçamento com este equipamento
// já selecionado (e a lista recebida em `forklifts` no "+").
export function ProductQuoteButton({
  forklift,
  forklifts,
}: {
  forklift: Forklift;
  forklifts: Forklift[];
}) {
  const [open, setOpen] = useState(false);
  const { productQuote } = useSharedTexts();

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => setOpen(true)}
        onPointerEnter={preloadQuoteModal}
        onFocus={preloadQuoteModal}
        className="justify-center"
      >
        {productQuote.buttonLabel}
      </Button>

      {open && (
        <LazyQuoteModal
          onClose={() => setOpen(false)}
          forklifts={forklifts}
          initialSelectedId={forklift.id}
        />
      )}
    </>
  );
}
