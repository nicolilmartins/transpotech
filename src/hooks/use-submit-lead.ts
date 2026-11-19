"use client";

import { useRef } from "react";
import { showToast } from "@/components/ui/toast";
import type { LeadRequest } from "@/types/lead.types";
import { leadsService } from "@/services/leads.service";

/** Envia o lead; resolve `true` se chegou ao servidor. */
export function useSubmitLead() {
  // Trava síncrona: o estado do React só muda no próximo render, e um segundo
  // Enter antes disso dispararia outro envio.
  const inFlight = useRef(false);

  async function submitLead(
    data: LeadRequest,
    successMessage: string,
  ): Promise<boolean> {
    if (inFlight.current) return false;
    inFlight.current = true;
    try {
      await leadsService.submitLead(data);
      showToast.success({ title: successMessage });
      return true;
    } catch {
      showToast.error({
        title: "Não conseguimos enviar sua solicitação",
        description: "Tente novamente em alguns instantes, por favor.",
      });
      return false;
    } finally {
      inFlight.current = false;
    }
  }

  return { submitLead };
}
