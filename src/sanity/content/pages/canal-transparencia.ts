import { definePage, defineSection, field } from "../fields";

export const canalTransparenciaPage = definePage({
  key: "canal-transparencia",
  title: "Canal da transparência",
  sections: {
    hero: defineSection("Banner", {
      eyebrow: field.string("Texto acima do título", "Ética e integridade"),
      titleStart: field.string("Título — início", "Canal da "),
      titleEnd: field.string("Título — final", "Transparência"),
      description: field.text(
        "Texto de apoio",
        "Um espaço para relatar situações relacionadas à ética, integridade, conduta e responsabilidade corporativa. Os relatos são direcionados para análise responsável, com tratamento confidencial conforme as políticas internas.",
      ),
      buttonLabel: field.string("Texto do botão", "Fazer um relato"),
    }),
    scope: defineSection("Quando usar o canal", {
      titleTop: field.string("Título — primeira linha", "Quando usar o"),
      titleAccent: field.string("Título — segunda linha (laranja)", "Canal da Transparência?"),
      description: field.text(
        "Texto de apoio",
        "Este canal deve ser utilizado para relatos relacionados a condutas incompatíveis com os princípios da TranspoTech.",
      ),
      topics: field.list(
        "Tópicos",
        "Tópico",
        { title: field.string("Texto", "") },
        [
          { title: "Assédio moral ou sexual" },
          { title: "Discriminação" },
          { title: "Fraude ou corrupção" },
          { title: "Conflito de interesses" },
          { title: "Descumprimento de políticas internas" },
          { title: "Uso indevido de recursos" },
          { title: "Conduta antiética" },
          { title: "Outras situações sensíveis" },
        ],
        // O ícone de cada tópico fica no código, por posição.
        { fixed: true },
      ),
    }),
    redirect: defineSection("Direcionamento", {
      eyebrow: field.string("Texto acima do título", "Direcionamento"),
      titleTop: field.string("Título — primeira linha", "Este não é o melhor canal"),
      titleBottom: field.string("Título — segunda linha (negrito)", "para todos os assuntos"),
      description: field.text(
        "Texto de apoio",
        "Para temas comerciais, dúvidas, orçamento, reclamações de atendimento ou solicitações gerais, utilize a Ouvidoria Digital ou a página de Contato.",
      ),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          linkLabel: field.string("Texto do link", ""),
        },
        [
          {
            title: "Orçamentos e vendas",
            description: "Para compra, locação ou peças, utilize o contato comercial.",
            linkLabel: "Ir para contato",
          },
          {
            title: "Reclamações ou sugestões",
            description:
              "Para manifestações gerais sobre atendimento, relacionamento ou serviços, use a Ouvidoria Digital.",
            linkLabel: "Acessar Ouvidoria",
          },
          {
            title: "Assistência técnica",
            description: "Para manutenção ou equipamento parado, solicite atendimento técnico.",
            linkLabel: "Solicitar assistência",
          },
        ],
        // Ícone e destino de cada card ficam no código, por posição.
        { fixed: true },
      ),
    }),
    process: defineSection("Como funciona o processo", {
      titleTop: field.string("Título — primeira linha", "Como funciona"),
      titleAccent: field.string("Título — segunda linha (laranja)", "o processo"),
      description: field.text(
        "Texto de apoio",
        "Um processo estruturado e sigiloso, do registro do relato ao encaminhamento conforme as políticas internas.",
      ),
      steps: field.list(
        "Etapas",
        "Etapa",
        {
          title: field.text(
            "Título",
            "",
            "Enter separa o título em duas linhas no desktop.",
          ),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Você registra o relato",
            description: "Informe o ocorrido com o máximo de detalhes possível.",
          },
          {
            title: "O relato é recebido",
            description:
              "As informações são direcionadas para avaliação conforme o fluxo definido pela empresa.",
          },
          {
            title: "A análise é iniciada",
            description:
              "A comissão responsável avalia o conteúdo, evidências e necessidade de apuração.",
          },
          {
            title: "Podem ser solicitadas\ninformações adicionais",
            description:
              "Quando houver identificação ou canal de retorno, a empresa pode solicitar complementos.",
          },
          {
            title: "O caso recebe encaminhamento",
            description:
              "As medidas cabíveis são tratadas conforme políticas internas e legislação aplicável.",
          },
        ],
        // Ícone por posição e largura das colunas do desktop ficam no código.
        { fixed: true },
      ),
    }),
    commitments: defineSection("Nossos compromissos", {
      titleRegular: field.string("Título — início", "Nossos "),
      titleAccent: field.string("Título — final em negrito", "compromissos"),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Tratamento responsável",
            description:
              "Os relatos são avaliados com seriedade e encaminhados conforme sua natureza.",
          },
          {
            title: "Confidencialidade",
            description:
              "As informações são tratadas com confidencialidade conforme políticas internas e requisitos aplicáveis.",
          },
          {
            title: "Possibilidade de anonimato",
            description:
              "O usuário pode optar por não se identificar, quando essa opção estiver disponível no formulário.",
          },
          {
            title: "Não retaliação",
            description:
              "A empresa deve tratar relatos de boa-fé com responsabilidade e sem tolerância a retaliações.",
          },
        ],
        // A arte de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Perguntas "),
      titleAccent: field.string("Título — final em destaque (laranja)", "frequentes"),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Tem uma manifestação que não é sobre "),
      titleAccent: field.string("Título — final em destaque (laranja)", "ética ou conduta?"),
      description: field.text(
        "Texto de apoio",
        "Use a Ouvidoria Digital para reclamações, sugestões, elogios, dúvidas ou solicitações gerais.",
      ),
      ctaLabel: field.string("Texto do botão", "Acessar Ouvidoria"),
    }),
  },
});
