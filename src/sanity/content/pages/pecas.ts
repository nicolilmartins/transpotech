import heroImage from "@/assets/images/hero-image-pecas.webp";
import { definePage, defineSection, field } from "../fields";

const BREAK_HINT = "Enter quebra a linha só no desktop.";

export const pecasPage = definePage({
  key: "pecas",
  title: "Peças",
  sections: {
    hero: defineSection("Banner", {
      titleTop: field.string("Título — primeira linha", "Peças para cada"),
      titleAccent: field.string("Título — segunda linha (laranja)", "necessidade da operação"),
      description: field.text(
        "Texto de apoio",
        "Originais e multimarcas para manutenção, reposição ou equipamento parado.",
      ),
      image: field.image("Imagem de fundo", heroImage),
      buttonLabel: field.string("Texto do botão", "Solicitar cotação de peças"),
    }),
    leadForm: defineSection("Formulário de cotação", {
      titleTop: field.string("Título — primeira linha", "As peças que a"),
      titleBottom: field.string("Título — segunda linha (laranja)", "sua frota precisa"),
      description: field.text(
        "Texto de apoio",
        "Informe o modelo e o item e a TranspoTech localiza a peça original ou multimarcas com o melhor prazo de entrega.",
      ),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Modelo do equipamento, código ou descrição da peça e quantidade.",
      ),
      submitLabel: field.string("Texto do botão de envio", "Solicitar cotação de peças"),
    }),
    needs: defineSection("Qual é a sua necessidade", {
      title: field.string("Título", "Qual é a sua necessidade?"),
      description: field.text(
        "Texto de apoio",
        "A solicitação pode começar pelo problema, tipo de manutenção\nou urgência da operação.",
        BREAK_HINT,
      ),
      items: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          cta: field.string("Texto do link", ""),
        },
        [
          {
            title: "Desgaste ou reposição",
            description:
              "Para componentes que precisam ser substituídos por uso, desgaste ou perda de desempenho.",
            cta: "Solicitar reposição",
          },
          {
            title: "Parte elétrica ou energia",
            description:
              "Para demandas relacionadas ao funcionamento elétrico, alimentação, carregamento ou desempenho.",
            cta: "Solicitar avaliação",
          },
          {
            title: "Parte hidráulica ou movimentação",
            description:
              "Para demandas relacionadas à elevação, movimentação, vazamentos, força ou funcionamento operacional.",
            cta: "Solicitar avaliação",
          },
          {
            title: "Não sei qual peça preciso",
            description:
              "Descreva o problema, envie foto ou informe o diagnóstico técnico, se tiver.",
            cta: "Receber orientação",
          },
        ],
        // O ícone de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    noCode: defineSection("Não sabe o código da peça", {
      title: field.string("Título", "Não sabe o código da peça?"),
      description: field.text(
        "Texto de apoio",
        "Muitas solicitações começam com uma descrição do problema, uma foto ou os dados do equipamento. A TranspoTech ajuda a direcionar sua necessidade.",
      ),
      steps: field.list(
        "Passos",
        "Passo",
        {
          title: field.string("Título", ""),
          description: field.string("Descrição", "", "Fica em uma linha só; o excesso é cortado."),
        },
        [
          {
            title: "Descreva o problema",
            description: "Explique o que está acontecendo com o equipamento.",
          },
          {
            title: "Informe o equipamento",
            description: "Informe marca, modelo, capacidade ou número de série.",
          },
          {
            title: "Receba orientação",
            description: "A equipe avalia as informações e direciona a solicitação.",
          },
        ],
        // Três colunas no desktop; a numeração (01, 02...) sai da posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Receber orientação"),
    }),
    requestSteps: defineSection("Como funciona a solicitação", {
      titleRegular: field.string("Título — primeira linha", "Como funciona a"),
      titleAccent: field.string("Título — segunda linha (laranja)", "solicitação de peças"),
      description: field.text(
        "Texto de apoio",
        "Um processo simples e transparente, do primeiro contato à orientação ou cotação com suporte da TranspoTech.",
      ),
      steps: field.list(
        "Etapas",
        "Etapa",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Você informa a necessidade",
            description:
              "Pode ser peça para corretiva, preventiva, reposição ou dúvida técnica.",
          },
          {
            title: "Envia dados do equipamento",
            description:
              "Modelo, número de série, fotos e diagnóstico ajudam a orientar a cotação.",
          },
          {
            title: "A equipe avalia o pedido",
            description: "A TranspoTech verifica compatibilidade, aplicação e disponibilidade.",
          },
          {
            title: "Você recebe orientação ou cotação",
            description: "O time retorna com informações e próximos passos.",
          },
          {
            title: "A operação segue com suporte",
            description:
              "Se necessário, a solicitação é conectada a manutenção ou assistência técnica.",
          },
        ],
        // O ícone de cada etapa fica no código, por posição.
        { fixed: true },
      ),
    }),
    infoCards: defineSection("Informações que ajudam", {
      title: field.string("Título — primeira linha", "Informações que ajudam a"),
      titleMiddle: field.string("Título — segunda linha", "encontrar a"),
      titleAccent: field.string("Título — final em destaque (laranja)", "peça certa"),
      description: field.text(
        "Texto de apoio",
        "Quanto mais detalhes você enviar, mais rápido o time consegue direcionar sua cotação.",
      ),
      topics: field.list(
        "Tópicos",
        "Tópico",
        {
          title: field.string("Título", ""),
          items: field.list("Informações", "Informação", { text: field.string("Texto", "") }, []),
        },
        [
          {
            title: "Sobre o equipamento",
            items: [
              { text: "Marca" },
              { text: "Modelo" },
              { text: "Capacidade" },
              { text: "Número de série" },
            ],
          },
          {
            title: "Sobre a peça e o problema",
            items: [
              { text: "Foto da peça ou local de instalação" },
              { text: "Descrição do problema" },
              { text: "Diagnóstico técnico (se houver)" },
              { text: "Tipo de manutenção" },
            ],
          },
          {
            title: "Sobre o pedido",
            items: [{ text: "Quantidade" }, { text: "Cidade/UF" }, { text: "Urgência" }],
          },
        ],
      ),
      buttonLabel: field.string("Texto do botão", "Enviar informações para cotação"),
    }),
    whyTranspotech: defineSection("Por que a TranspoTech", {
      titleRegular: field.string("Título — primeira linha", "Por que solicitar peças"),
      titleAccent: field.string("Título — segunda linha (laranja)", "com a TranspoTech?"),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Apoio técnico na identificação",
            description:
              "Ajudamos a identificar a peça correta a partir do equipamento, da aplicação e do diagnóstico.",
          },
          {
            title: "Menos risco de compra incorreta",
            description:
              "Você evita peças incompatíveis que geram retrabalho, atraso e parada da operação.",
          },
          {
            title: "Conexão com manutenção e serviços",
            description:
              "A solicitação pode seguir direto para manutenção e assistência técnica quando necessário.",
          },
          {
            title: "Direcionamento conforme equipamento e aplicação",
            description: "Orientação considerando modelo, uso e contexto da sua operação.",
          },
          {
            title: "Atendimento para diferentes necessidades",
            description: "Peças para corretiva, preventiva, reposição ou dúvidas técnicas.",
          },
          {
            title: "Suporte para disponibilidade da frota",
            description:
              "Apoio para manter os equipamentos operando e reduzir tempo de parada.",
          },
          {
            title: "Peças genuínas multimarcas",
            description:
              "Peças originais e compatíveis para as principais marcas e modelos de empilhadeiras.",
          },
          {
            title: "Amplo estoque",
            description:
              "Estoque abrangente para dar mais agilidade na solução e reduzir o tempo de espera.",
          },
          {
            title: "Descarte correto das peças usadas",
            description:
              "Logística reversa para o descarte ambientalmente adequado das peças substituídas.",
          },
        ],
        // A arte de cada card fica no código, por posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Dúvidas frequentes sobre "),
      titleAccent: field.string("Título — final em destaque (laranja)", "peças"),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Precisa de peça, mas não sabe "),
      titleAccent: field.string("Título — final em destaque (laranja)", "exatamente qual?"),
      description: field.text(
        "Texto de apoio",
        "Descreva o problema, informe o equipamento e fale com a TranspoTech para direcionar sua cotação.",
      ),
      ctaLabel: field.string("Texto do botão", "Solicitar cotação de peças"),
    }),
  },
});
