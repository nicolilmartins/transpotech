"use client";

import { useState } from "react";
import { showToast } from "@/components/ui/toast";
import type { ContactFormData } from "@/types/lead.types";
import { leadsService } from "@/services/leads.service";

export function useSubmitLead() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitLead(data: ContactFormData) {
    setIsSubmitting(true);
    try {
      await leadsService.submitContact(data);
    } catch {
      showToast.error({
        title: "Não conseguimos enviar sua solicitação",
        description: "Tente novamente em alguns instantes, por favor.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submitLead, isSubmitting };
}
