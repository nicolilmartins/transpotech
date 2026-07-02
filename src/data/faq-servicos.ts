import type { FaqItem } from "@/components/layout/faq/faq-section";

// Perguntas: exatamente as do wireframe. Respostas: rascunho factual com base
// na copy do próprio wireframe (multimarcas, preventiva/corretiva, PM2P, peças,
// atendimento por região, contratos) — revisar com Marketing.
export const faqServicos: FaqItem[] = [
  {
    question: "Vocês atendem apenas empilhadeiras Linde, STILL e Baoli?",
    answer:
      "Não. A TranspoTech presta serviços multimarcas para empilhadeiras elétricas e a combustão de diferentes fabricantes — equipamentos nacionais, importados e chineses, todas as marcas e modelos.",
  },
  {
    question: "Vocês fazem manutenção preventiva e corretiva?",
    answer:
      "Sim. Atendemos manutenção corretiva (diagnóstico e correção de falhas) e preventiva (revisões planejadas para reduzir falhas e preservar componentes).",
  },
  {
    question: "O que é o PM2P?",
    answer:
      "O PM2P é o Programa de Manutenção Produtiva Programada: um técnico especializado realiza visitas programadas para executar manutenções preventivas, verificar itens críticos e corrigir problemas identificados, prevenindo futuras falhas.",
  },
  {
    question: "Vocês fornecem peças?",
    answer:
      "Sim. A equipe de assistência trabalha integrada ao departamento de peças, com apoio de peças, pneus, baterias e carregadores para manter sua operação funcionando.",
  },
  {
    question: "Como solicito assistência técnica?",
    answer:
      "Informe cidade, tipo de equipamento, marca e o problema ou objetivo da manutenção. A equipe avalia a demanda e direciona o atendimento conforme urgência, região e tipo de serviço.",
  },
  {
    question: "Vocês atendem minha cidade?",
    answer:
      "Atendemos diversas regiões com equipe técnica, carros oficina e unidades. Informe sua cidade/UF que direcionamos para um especialista da região.",
  },
  {
    question: "Posso contratar manutenção recorrente?",
    answer:
      "Sim. Há planos de contrato de manutenção recorrentes para empresas que precisam de previsibilidade, acompanhamento técnico e suporte contínuo.",
  },
  {
    question: "Vocês atendem equipamentos alugados e próprios?",
    answer:
      "Sim. Atendemos tanto equipamentos próprios quanto locados, conforme a necessidade e o contexto da sua operação.",
  },
];
