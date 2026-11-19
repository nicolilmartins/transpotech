import type { FaqItem } from "@/components/layout/faq/faq-section";

// Perguntas: exatamente as do wireframe. Respostas: rascunho factual com base
// na copy do próprio wireframe (foto/medida, categorias por piso/uso, preço sob
// cotação, atendimento por unidades) — revisar com Marketing.
export const faqPneus: FaqItem[] = [
  {
    question: "Preciso saber a medida exata do pneu?",
    answer:
      "Ajuda, mas não é obrigatório. Você pode enviar o modelo do equipamento, a aplicação e uma foto do pneu atual que a equipe identifica a medida correta.",
  },
  {
    question: "Posso enviar foto do pneu atual?",
    answer:
      "Sim. A foto do pneu e do equipamento ajuda a validar a categoria e a medida na hora da cotação.",
  },
  {
    question: "Como saber qual categoria de pneu escolher?",
    answer:
      "Depende do piso, do ambiente, da carga e da intensidade de uso. Se tiver dúvida, descreva a operação que a equipe direciona a melhor alternativa.",
  },
  {
    question: "Vocês informam preço no site?",
    answer:
      "Não. O preço depende de categoria, medida, equipamento e disponibilidade. Por isso a cotação é feita conforme as informações da sua operação.",
  },
  {
    question: "Vocês também fazem manutenção ou troca?",
    answer:
      "Sim. Além do fornecimento, a TranspoTech apoia com troca e manutenção pela equipe técnica.",
  },
  {
    question: "Vocês atendem minha cidade?",
    answer:
      "Atendemos diversas regiões a partir das nossas unidades em PR, SC, RS, SP e GO. Informe sua cidade/UF para confirmarmos.",
  },
];
