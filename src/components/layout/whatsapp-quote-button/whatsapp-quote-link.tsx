"use client";

import { TextLink } from "@/components/ui/text-link";
import { GTM_EVENTS, pushDataLayerEvent } from "@/lib/gtm";
import {
  whatsappChannel,
  whatsappQuoteUrl,
  type QuoteSection,
} from "@/lib/whatsapp";

// Versão em link de texto do botão de orçamento (rodapé dos cards).
export function WhatsappQuoteLink({
  section,
  message,
  className,
  children,
}: {
  section: QuoteSection;
  /** Troca a mensagem padrão da seção. */
  message?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <TextLink
      href={whatsappQuoteUrl(section, undefined, message)}
      className={className}
      onClick={() =>
        pushDataLayerEvent(GTM_EVENTS.WHATSAPP_QUOTE_CLICK, {
          origem_secao: section,
          canal_whatsapp: whatsappChannel(section),
        })
      }
    >
      {children}
    </TextLink>
  );
}
