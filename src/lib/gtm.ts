type DataLayerEvent = { event: string } & Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

// Eventos enviados ao GTM. Os nomes e parâmetros são o contrato com as tags do
// container: renomear aqui exige ajustar os acionadores lá.
export const GTM_EVENTS = {
  /** Clique em "Solicitar orçamento", que abre o WhatsApp da seção. */
  WHATSAPP_QUOTE_CLICK: "clique_whatsapp_orcamento",
  /** Formulário de captação enviado e aceito pela /api/leads. */
  FORM_SENT: "formulario_enviado",
} as const;

export function pushDataLayerEvent(
  event: (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS],
  params: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  // O GTM reaproveita o dataLayer existente: eventos anteriores ao carregamento
  // do container ficam na fila e são processados quando ele sobe.
  (window.dataLayer ??= []).push({
    event,
    page_path: window.location.pathname,
    ...params,
  });
}
