"use client";

import { Button } from "@/components/ui/button";
import type { ButtonVariant } from "@/components/ui/button/button.types";
import { GTM_EVENTS, pushDataLayerEvent } from "@/lib/gtm";
import {
  whatsappChannel,
  whatsappQuoteUrl,
  type QuoteSection,
} from "@/lib/whatsapp";

// Botão de orçamento: abre o WhatsApp da seção em nova aba e avisa o GTM.
export function WhatsappQuoteButton({
  section,
  equipment,
  message,
  variant = "primary",
  className,
  children,
}: {
  section: QuoteSection;
  /** Nome da máquina; entra na mensagem e no evento. */
  equipment?: string;
  /** Troca a mensagem padrão da seção. */
  message?: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={variant}
      size="lg"
      href={whatsappQuoteUrl(section, equipment, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        pushDataLayerEvent(GTM_EVENTS.WHATSAPP_QUOTE_CLICK, {
          origem_secao: section,
          canal_whatsapp: whatsappChannel(section),
          ...(equipment ? { equipamento: equipment } : {}),
        })
      }
    >
      {children}
    </Button>
  );
}
