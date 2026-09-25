import { definePage, defineSection, field } from "../fields";

export const ouvidoriaPage = definePage({
  key: "ouvidoria",
  title: "Ouvidoria digital",
  sections: {
    hero: defineSection("Banner", {
      eyebrow: field.string("Texto acima do título", "Escuta e relacionamento"),
      titleStart: field.string("Título — início", "Ouvidoria "),
      titleEnd: field.string("Título — final", "Digital"),
      description: field.text(
        "Texto de apoio",
        "Um canal para receber reclamações, sugestões, elogios, dúvidas e manifestações gerais sobre sua experiência com a TranspoTech. Queremos ouvir você para melhorar nossos processos, atendimento e relacionamento.",
      ),
      buttonLabel: field.string("Texto do botão", "Fazer manifestação"),
    }),
    scope: defineSection("Quando usar a Ouvidoria", {
      titleTop: field.string("Título — primeira linha", "Quando usar a"),
      titleAccent: field.string("Título — segunda linha (laranja)", "Ouvidoria Digital?"),
      description: field.text(
        "Texto de apoio",
        "Use este canal para registrar manifestações sobre atendimento, relacionamento, serviços, processos ou experiências com a TranspoTech.",
      ),
      topics: field.list(
        "Tópicos",
        "Tópico",
        { title: field.string("Texto", "") },
        [
          { title: "Reclamações" },
          { title: "Sugestões" },
          { title: "Elogios" },
          { title: "Dúvidas" },
          { title: "Solicitações gerais" },
          { title: "Experiência com atendimento" },
          { title: "Relacionamento com unidades" },
          { title: "Feedback sobre processos" },
        ],
        // O ícone de cada tópico fica no código, por posição.
        { fixed: true },
      ),
    }),
    channelChoice: defineSection("Qual canal devo usar", {
      title: field.string("Título", "Qual canal devo usar?"),
      channels: field.list(
        "Canais",
        "Canal",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          quotes: field.list(
            "Exemplos",
            "Exemplo",
            { text: field.string("Texto (sem aspas)", "") },
            [],
          ),
          ctaLabel: field.string("Texto do link", ""),
        },
        [
          {
            title: "Ouvidoria Digital",
            description:
              "Use para reclamações, sugestões, elogios, dúvidas, solicitações e feedbacks gerais sobre atendimento ou relacionamento.",
            quotes: [
              { text: "Quero registrar uma reclamação sobre atendimento" },
              { text: "Quero sugerir uma melhoria" },
              { text: "Quero elogiar uma equipe" },
              { text: "Tenho uma dúvida institucional" },
            ],
            ctaLabel: "Enviar manifestação",
          },
          {
            title: "Canal da Transparência",
            description:
              "Use para relatos relacionados a ética, integridade, assédio, discriminação, fraude, conflito de interesses ou descumprimento de políticas.",
            quotes: [
              { text: "Quero relatar uma situação de assédio" },
              { text: "Quero relatar possível fraude" },
              { text: "Quero relatar conduta antiética" },
              { text: "Quero relatar discriminação" },
            ],
            ctaLabel: "Acessar Canal da Transparência",
          },
        ],
        // Cor e destino de cada canal ficam no código, por posição.
        { fixed: true },
      ),
    }),
    process: defineSection("Como funciona a Ouvidoria", {
      titleTop: field.string("Título — primeira linha", "Como funciona a"),
      titleAccent: field.string("Título — segunda linha (laranja)", "Ouvidoria"),
      description: field.text(
        "Texto de apoio",
        "Um processo simples e transparente, do envio da manifestação ao retorno da TranspoTech.",
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
            title: "Você envia sua manifestação",
            description:
              "Preencha o formulário com seus dados, tipo de manifestação e mensagem.",
          },
          {
            title: "A demanda é recebida",
            description:
              "As informações são direcionadas para análise e encaminhamento interno.",
          },
          {
            title: "A área responsável avalia",
            description:
              "A equipe relacionada ao tema analisa o caso e, quando necessário, busca mais informações.",
          },
          {
            title: "O retorno é realizado",
            description:
              "Quando houver dados de contato, a TranspoTech poderá retornar conforme o fluxo definido.",
          },
        ],
        // O ícone de cada etapa fica no código, por posição.
        { fixed: true },
      ),
    }),
    form: defineSection("Formulário de manifestação", {
      eyebrow: field.string("Texto acima do título", "Canal de escuta"),
      title: field.string("Título", "Envie sua manifestação"),
      description: field.text(
        "Texto de apoio",
        "Preencha o formulário para registrar sua manifestação. As informações ajudam a direcionar sua demanda corretamente.",
      ),
      nameLabel: field.string("Rótulo — nome", "Nome"),
      contactLabel: field.string("Rótulo — contato", "E-mail ou telefone"),
      contactPlaceholder: field.string(
        "Exemplo no campo de contato",
        "email@empresa.com ou (00) 00000-0000",
      ),
      relationLabel: field.string("Rótulo — relação", "Relação com a TranspoTech"),
      typeLabel: field.string("Rótulo — tipo", "Tipo de manifestação"),
      selectPlaceholder: field.string("Texto das listas antes da escolha", "Selecione"),
      locationLabel: field.string("Rótulo — unidade/cidade", "Unidade ou cidade relacionada"),
      locationPlaceholder: field.string("Exemplo no campo de unidade/cidade", "Ex.: Curitiba/PR"),
      messageLabel: field.string("Rótulo — mensagem", "Mensagem"),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Descreva sua manifestação com o máximo de detalhes possível.",
      ),
      detailsSummary: field.string(
        "Título dos detalhes opcionais",
        "Detalhes opcionais (empresa, número de pedido, anexos)",
      ),
      companyLabel: field.string("Rótulo — empresa", "Empresa"),
      orderLabel: field.string("Rótulo — número de pedido", "Número de pedido"),
      filesLabel: field.string("Rótulo — anexos", "Anexos"),
      filesButton: field.string("Texto do botão de anexos", "Escolher arquivos"),
      submitLabel: field.string("Texto do botão de envio", "Enviar manifestação"),
      successTitle: field.string("Após o envio — título", "Manifestação enviada"),
      successDescription: field.text(
        "Após o envio — texto",
        "Guarde o número de protocolo abaixo para acompanhar o andamento.",
      ),
      resetLabel: field.string("Após o envio — botão", "Enviar outra manifestação"),
    }),
    commercialRedirect: defineSection("Direcionamento comercial", {
      eyebrow: field.string("Texto acima do título", "Direcionamento comercial"),
      titleTop: field.string("Título — primeira linha", "Precisa de orçamento, locação"),
      titleBottom: field.string("Título — segunda linha (negrito)", "ou assistência técnica?"),
      description: field.text(
        "Texto de apoio",
        "Se sua demanda for comercial ou técnica, use os canais abaixo para receber atendimento mais rápido.",
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
            title: "Solicitar orçamento",
            description: "Para compra, locação, peças, pneus, baterias ou carregadores.",
            linkLabel: "Ir para orçamento",
          },
          {
            title: "Assistência técnica",
            description: "Para manutenção, equipamento parado ou suporte técnico.",
            linkLabel: "Solicitar assistência",
          },
          {
            title: "Falar com especialista",
            description: "Para dúvidas sobre a melhor solução para sua operação.",
            linkLabel: "Falar com especialista",
          },
        ],
        // Ícone e destino de cada card ficam no código, por posição.
        { fixed: true },
      ),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Perguntas "),
      titleAccent: field.string("Título — final em destaque (laranja)", "frequentes"),
    }),
  },
});
