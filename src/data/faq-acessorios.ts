import type { FaqItem } from "@/components/layout/faq/faq-section";

// Rascunho factual com base nos materiais enviados pelo cliente (E-Check List,
// Serralog, FleetManager e ADAS) — revisar com o gerente de produto.
export const faqAcessorios: FaqItem[] = [
  {
    question: "Qual a diferença entre check list eletrônico e telemetria?",
    answer:
      "O check list eletrônico garante que a máquina só seja ligada por um operador identificado e após a inspeção. A telemetria vai além: acompanha uso, produtividade, impactos e alertas da frota em tempo real.",
  },
  {
    question: "O E-Check List precisa de internet?",
    answer:
      "Não. Os dados são transmitidos por uma rede local, na infraestrutura do próprio cliente, e o software de gestão não tem custo de aquisição nem anuidade.",
  },
  {
    question: "As soluções funcionam em empilhadeiras de outras marcas?",
    answer:
      "Depende da solução. O E-Check List e o kit de retrofit do STILL FleetManager podem ser instalados em máquinas KION e de outras marcas. O ADAS é aplicado em máquinas Linde, STILL e Baoli. A TranspoTech avalia a compatibilidade da sua frota.",
  },
  {
    question: "O ADAS substitui a atenção do operador?",
    answer:
      "Não. O ADAS é um sistema de assistência: amplia a percepção do operador e ajuda a evitar acidentes, mas a condução segura continua sendo responsabilidade de um operador capacitado.",
  },
  {
    question: "Posso começar com o check list e evoluir depois?",
    answer:
      "Sim. O E-Check List usa a mesma tecnologia de cartão do STILL FleetManager, o que facilita evoluir o nível de controle da frota ao longo do tempo.",
  },
  {
    question: "Vocês informam preço no site?",
    answer:
      "Não. O investimento depende da solução, da quantidade de máquinas e dos modelos da frota. Por isso a proposta é feita conforme as informações da sua solicitação.",
  },
];
