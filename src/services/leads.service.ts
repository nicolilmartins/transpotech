import type { LeadRequest } from "@/types/lead.types";

export const leadsService = {
  async submitLead(data: LeadRequest): Promise<void> {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Falha ao enviar solicitação");
    }
  },
};
