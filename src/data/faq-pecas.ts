import type { FaqItem } from "@/components/layout/faq/faq-section";

// Perguntas: exatamente as do wireframe. Respostas: rascunho factual com base
// na copy do próprio wireframe (descrição/foto, compatibilidade, preço sob
// cotação, manutenção e assistência técnica) — revisar com Marketing.
export const faqPecas: FaqItem[] = [
  {
    question: "Preciso saber o código da peça?",
    answer:
      "Não. Muitas solicitações começam com uma descrição do problema, uma foto ou os dados do equipamento. A TranspoTech ajuda a identificar a peça certa.",
  },
  {
    question: "Posso enviar foto do equipamento ou da peça?",
    answer:
      "Sim. A foto do equipamento, da peça ou do local de instalação ajuda a validar a identificação e a compatibilidade na hora da cotação.",
  },
  {
    question: "Vocês atendem peças para manutenção preventiva e corretiva?",
    answer:
      "Sim. Atendemos peças para reposição, manutenção preventiva e corretiva, conforme a necessidade da operação.",
  },
  {
    question: "Como saber se a peça é compatível?",
    answer:
      "A compatibilidade depende de marca, modelo e aplicação. Informe os dados do equipamento que a equipe verifica a peça correta.",
  },
  {
    question: "Vocês informam preço no site?",
    answer:
      "Não. O preço depende da peça, do equipamento e da disponibilidade. Por isso a cotação é feita conforme as informações da sua solicitação.",
  },
  {
    question: "Também posso solicitar assistência técnica?",
    answer:
      "Sim. Se necessário, a solicitação pode ser conectada à manutenção ou à assistência técnica da TranspoTech.",
  },
];
