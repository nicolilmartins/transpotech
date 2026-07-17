"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuoteModal } from "@/components/catalog/quote-modal/quote-modal";
import type { Forklift } from "@/types/forklift.types";

// Botão "Solicitar orçamento deste modelo" do detalhe: abre o modal de
// orçamento com este equipamento já selecionado (e a lista completa no "+").
export function ProductQuoteButton({
  forklift,
  forklifts,
}: {
  forklift: Forklift;
  forklifts: Forklift[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => setOpen(true)}
        className="justify-center"
      >
        Solicitar orçamento deste modelo
      </Button>

      {open && (
        <QuoteModal
          onClose={() => setOpen(false)}
          forklifts={forklifts}
          initialSelectedId={forklift.id}
        />
      )}
    </>
  );
}
