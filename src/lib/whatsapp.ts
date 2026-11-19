// Seções de origem dos CTAs de orçamento: definem o número de WhatsApp, a
// mensagem inicial e o `origem_secao` enviado ao GTM.
export type QuoteSection =
  | "maquinas_novas"
  | "seminovas"
  | "locacao"
  | "automacao"
  | "pecas_acessorios_pneus"
  | "geral";

// Números reais da TranspoTech (padrão). As variáveis NEXT_PUBLIC_WHATSAPP_VENDAS
// e NEXT_PUBLIC_WHATSAPP_PECAS (só dígitos, com 55 e DDD) sobrescrevem, p.ex. para teste local.
const NUMBERS = {
  vendas: process.env.NEXT_PUBLIC_WHATSAPP_VENDAS || "5547991628599",
  pecas: process.env.NEXT_PUBLIC_WHATSAPP_PECAS || "5547992700241",
};

// Mensagens iniciais aprovadas: ficam todas aqui.
const MESSAGES: Record<QuoteSection, string> = {
  maquinas_novas: "Olá! Vim pelo site e gostaria de um orçamento de máquina nova.",
  seminovas: "Olá! Vim pelo site e tenho interesse em uma máquina seminova.",
  locacao: "Olá! Vim pelo site e gostaria de um orçamento de locação.",
  automacao: "Olá! Vim pelo site e quero saber mais sobre automação.",
  pecas_acessorios_pneus:
    "Olá! Vim pelo site e gostaria de um orçamento de peças/acessórios/pneus.",
  geral: "Olá! Vim pelo site e gostaria de um orçamento.",
};

// Baterias e carregadores usam o número e o origem_secao de peças, com texto próprio.
export const BATERIAS_MESSAGE =
  "Olá! Vim pelo site e gostaria de um orçamento de baterias/carregadores.";

export type WhatsappChannel = "vendas" | "pecas";

export function whatsappChannel(section: QuoteSection): WhatsappChannel {
  return section === "pecas_acessorios_pneus" ? "pecas" : "vendas";
}

/**
 * Link wa.me da seção; com `equipment`, a mensagem cita a máquina. `message`
 * troca o texto padrão da seção (o número e o origem_secao seguem os da seção).
 */
export function whatsappQuoteUrl(
  section: QuoteSection,
  equipment?: string,
  customMessage?: string,
) {
  const base = customMessage ?? MESSAGES[section];
  const message = equipment ? `${base} Equipamento: ${equipment}.` : base;
  return `https://wa.me/${NUMBERS[whatsappChannel(section)]}?text=${encodeURIComponent(message)}`;
}
