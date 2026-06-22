"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import type { ContactFormData } from "@/types/lead.types";
import { leadsService } from "@/services/leads.service";

export function useSubmitLead() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitLead(data: ContactFormData) {
    setIsSubmitting(true);
    try {
      await leadsService.submitContact(data);
      toast.success("Mensagem enviada! Entraremos em contato em breve.");
    } catch {
      toast.error("Não foi possível enviar sua mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submitLead, isSubmitting };
}
