import type { ContactFormData } from "@/types/lead.types";

export const leadsService = {
  async submitContact(data: ContactFormData): Promise<void> {
    const response = await fetch("/api/leads/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Falha ao enviar mensagem");
    }
  },
};
