import type { FaqItem } from "@/components/layout/faq/faq-section";

// Perguntas: exatamente as do wireframe. Respostas: rascunho factual com base
// na copy do próprio wireframe (revisão técnica, garantia 6–12 meses, laudo,
// financiamento/leasing) — revisar com Marketing.
export const faqUsadas: FaqItem[] = [
  {
    question: "Qual a diferença entre usada e seminova?",
    answer:
      "Seminovas têm pouco tempo de uso e horímetro baixo; usadas têm mais tempo de operação. Em ambos os casos, cada equipamento passa pela inspeção técnica e pelo laudo TranspoTech antes de entrar no estoque.",
  },
  {
    question: "Qual a garantia oferecida?",
    answer:
      "De 6 a 12 meses, conforme a condição do equipamento, cobrindo peças e mão de obra pela equipe técnica TranspoTech.",
  },
  {
    question: "Posso ver o laudo técnico antes de comprar?",
    answer:
      "Sim. O laudo técnico fica disponível mediante solicitação durante o processo de compra.",
  },
  {
    question: "Vocês aceitam permuta?",
    answer:
      "Avaliamos permuta conforme o equipamento e a sua operação. Fale com um especialista para analisarmos a melhor condição.",
  },
  {
    question: "Tem apoio de financiamento?",
    answer:
      "Sim. Trabalhamos com programas de financiamento e leasing — fale com um especialista para encontrar a melhor condição.",
  },
];
