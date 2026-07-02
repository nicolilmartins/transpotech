import type { FaqItem } from "@/components/layout/faq/faq-section";

// Perguntas: exatamente as do wireframe. Respostas: rascunho factual com base
// na copy do próprio wireframe (implantação faseada, processo, integração,
// pós-venda TranspoTech + Dematic) — revisar com Marketing.
export const faqAutomacao: FaqItem[] = [
  {
    question: "Minha operação é pequena, vale a pena automatizar?",
    answer:
      "Nem sempre é preciso automatizar tudo de uma vez. Estruturamos roadmaps faseados que começam pelo gargalo, com automação pontual em recebimento, picking ou expedição e payback típico em 12–24 meses.",
  },
  {
    question: "Quanto custa um projeto de automação?",
    answer:
      "O investimento depende do escopo, dos volumes e da tecnologia envolvida. Na etapa de concepção montamos o business case com TIR e payback para a sua operação.",
  },
  {
    question: "Quanto tempo leva para implantar?",
    answer:
      "Varia conforme a solução. O projeto segue etapas claras — diagnóstico, concepção, engenharia, implantação, go-live e operação contínua — para reduzir risco e acelerar a captura de valor.",
  },
  {
    question: "Preciso parar a operação durante a obra?",
    answer:
      "A fabricação, instalação e comissionamento são planejados com mínimo impacto à operação, sempre que possível em ondas e por fase.",
  },
  {
    question: "Como vocês integram com os sistemas atuais (ERP, WMS)?",
    answer:
      "A engenharia contempla a especificação de software e integrações, incluindo WMS e WCS, para conectar a automação aos sistemas atuais da sua operação.",
  },
  {
    question: "E o pós-venda? Quem mantém a operação automatizada?",
    answer:
      "A TranspoTech soma engenharia local, equipe própria de implantação e cobertura nacional de pós-venda, com manutenção, evolução e otimização ao longo do ciclo de vida.",
  },
];
