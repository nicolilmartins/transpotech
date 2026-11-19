import type { FaqItem } from "@/components/layout/faq/faq-section";

// Perguntas: exatamente as do wireframe. Respostas: rascunho factual com base
// na copy do próprio wireframe (compatibilidade, autonomia, foto, preço sob
// cotação, suporte técnico) — revisar com Marketing.
export const faqBaterias: FaqItem[] = [
  {
    question: "Preciso saber o modelo exato da bateria?",
    answer:
      "Ajuda, mas não é obrigatório. Informe o equipamento, a rotina de carregamento e, se possível, uma foto da bateria atual que a equipe identifica a especificação.",
  },
  {
    question: "Como saber se o carregador é compatível?",
    answer:
      "A compatibilidade depende da bateria, da tensão e da rotina de carga. Envie os dados do equipamento que a equipe valida a opção correta.",
  },
  {
    question: "Vocês avaliam autonomia da operação?",
    answer:
      "Sim. Avaliamos se a bateria atual atende aos turnos, picos e rotina operacional e indicamos a melhor alternativa.",
  },
  {
    question: "Posso enviar foto da bateria ou carregador atual?",
    answer:
      "Sim. A foto ajuda a validar modelo, compatibilidade e condição na hora da cotação.",
  },
  {
    question: "Vocês informam preço no site?",
    answer:
      "Não. O preço depende de tecnologia, especificação, equipamento e disponibilidade. Por isso a cotação é feita conforme a sua operação.",
  },
  {
    question: "Vocês também prestam suporte técnico?",
    answer:
      "Sim. Além do fornecimento, a TranspoTech apoia com suporte técnico conectado à manutenção.",
  },
];
