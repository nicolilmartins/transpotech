import { definePage, defineSection, field } from "../fields";

const compareCardFields = {
  title: field.string("Título", ""),
  description: field.text("Descrição", ""),
  points: field.list(
    "Critérios",
    "Critério",
    {
      label: field.string("Critério", ""),
      text: field.text("Descrição", ""),
    },
    // Só a quantidade conta aqui (validação do Studio); os textos de cada card
    // vêm do default da lista `cards`.
    Array.from({ length: 7 }, () => ({ label: "", text: "" })),
    { fixed: true },
  ),
};

// Textos de componentes que aparecem em várias páginas, iguais em todas.
export const sharedPage = definePage({
  key: "shared",
  title: "Textos comuns do site",
  sections: {
    compare: defineSection("Comparativo elétrica × GLP", {
      titleTop: field.string("Título — primeira linha", "Empilhadeira elétrica ou GLP:"),
      titleAccent: field.string("Título — segunda linha (laranja)", "qual escolher?"),
      description: field.text(
        "Texto de apoio",
        "As duas movimentam as mesmas cargas, mas brilham em operações diferentes. Veja qual encaixa melhor na sua rotina antes de escolher o modelo.",
      ),
      cards: field.list(
        "Cards",
        "Card",
        compareCardFields,
        [
          {
            title: "Elétrica (lítio)",
            description: "A mesma força. Muito mais economia.",
            points: [
              {
                label: "Custo de energia",
                text: "R$ 400,00 em energia elétrica — até 90% de economia no dia a dia.",
              },
              {
                label: "Custo de manutenção",
                text: "Até 70% de economia: menos peças, menos paradas e menos custos.",
              },
              {
                label: "Desempenho",
                text: "Mesmo desempenho e força da combustão para as mesmas aplicações.",
              },
              {
                label: "Impacto ambiental",
                text: "Zero emissão de gases, mais sustentável e amiga do meio ambiente.",
              },
              {
                label: "Frenagem e segurança",
                text: "Frenagem regenerativa reduz o uso do freio, evita fadiga e economiza em manutenções.",
              },
              {
                label: "Pneus",
                text: "Menor desgaste dos pneus pelo menor uso do freio.",
              },
              {
                label: "Armazenagem de gás",
                text: "Dispensa cilindros: mais segurança, melhor qualidade do ar e otimização de espaço (m²).",
              },
            ],
          },
          {
            title: "GLP",
            description: "Força que você conhece. Combustível que você paga.",
            points: [
              {
                label: "Custo de energia",
                text: "R$ 4.000,00 em combustível (GLP) — valor de simulação.",
              },
              {
                label: "Custo de manutenção",
                text: "Mais componentes de desgaste: sistema de combustível, motor, transmissão, carburador, correias e radiadores.",
              },
              {
                label: "Desempenho",
                text: "Força e desempenho dependem do combustível e exigem aquecimento do motor.",
              },
              {
                label: "Impacto ambiental",
                text: "Emite gases poluentes, contribuindo para a poluição do ar.",
              },
              {
                label: "Frenagem e segurança",
                text: "Maior uso do pedal de freio, gerando fadiga do operador e mais desgaste do sistema.",
              },
              {
                label: "Pneus",
                text: "Maior desgaste dos pneus devido ao uso mais frequente do freio.",
              },
              {
                label: "Armazenagem de gás",
                text: "Exige armazenamento físico de cilindros, ocupando espaço e com cuidados de segurança.",
              },
            ],
          },
        ],
        // Foto, cor de destaque e ícone de cada critério ficam no código, por posição.
        {
          fixed: true,
          description:
            "Exatamente 2 cards (elétrica e GLP), cada um com 7 critérios na mesma ordem: os ícones ficam no código, por posição.",
        },
      ),
    }),
    coverage: defineSection("Abrangência nacional (mapa)", {
      stats: field.list(
        "Indicadores",
        "Indicador",
        {
          value: field.string("Número", "", "Ex.: +660. O número anima contando até o valor."),
          label: field.string("Rótulo", ""),
        },
        [
          { value: "23", label: "estados com atuação" },
          { value: "+660", label: "cidades atendidas" },
          { value: "11", label: "unidades físicas" },
          { value: "+3.700", label: "máquinas locadas" },
        ],
        { fixed: true },
      ),
      legendActive: field.string("Legenda — estado destacado", "Estado com atuação TranspoTech"),
      legendUnit: field.string("Legenda — ponto no mapa", "Unidade física"),
    }),
    leadForm: defineSection("Formulário de solicitação", {
      eyebrow: field.string("Texto acima do título", "Falar com especialista"),
      nameLabel: field.string("Nome — rótulo", "Nome *"),
      namePlaceholder: field.string("Nome — exemplo no campo", "Digite seu nome completo."),
      companyLabel: field.string("Empresa — rótulo", "Empresa *"),
      companyPlaceholder: field.string("Empresa — exemplo no campo", "Informe o nome da empresa."),
      phoneLabel: field.string("Telefone — rótulo", "Telefone *"),
      phonePlaceholder: field.string("Telefone — exemplo no campo", "Telefone ou WhatsApp."),
      emailLabel: field.string("E-mail — rótulo", "E-mail *"),
      emailPlaceholder: field.string("E-mail — exemplo no campo", "nome@empresa.com.br"),
      cityLabel: field.string("Cidade/UF — rótulo", "Cidade/UF *"),
      rentalPeriodLabel: field.string(
        "Período de locação — rótulo",
        "Período de locação (meses)",
        "Aparece só na página de locação.",
      ),
      rentalPeriodPlaceholder: field.string(
        "Período de locação — texto antes de escolher",
        "Selecione o período",
      ),
      rentalPeriodSearchPlaceholder: field.string(
        "Período de locação — exemplo na busca",
        "Buscar meses…",
      ),
      monthSingular: field.string("Período de locação — “mês” (1 mês)", "mês"),
      monthPlural: field.string("Período de locação — “meses” (2 a 60 meses)", "meses"),
      messageLabel: field.string("Mensagem — rótulo", "Mensagem *"),
      messagePlaceholder: field.text(
        "Mensagem — exemplo no campo (padrão)",
        "Descreva sua operação, equipamento, urgência, cidade ou o que você precisa resolver.",
        "Usado quando a página não define um exemplo próprio.",
      ),
      consent: field.text(
        "Texto do consentimento (LGPD)",
        "Concordo com o tratamento dos meus dados conforme a Política de Privacidade da TranspoTech (LGPD).",
      ),
      submitLabel: field.string(
        "Texto do botão de envio (padrão)",
        "Enviar solicitação",
        "Usado quando a página não define um texto próprio.",
      ),
      successMessage: field.string(
        "Mensagem de envio concluído",
        "Sua solicitação foi enviada! Em breve retornaremos.",
      ),
      resumeText: field.string(
        "Aviso no topo — texto",
        "Você começou uma solicitação.",
        "Aparece quando a pessoa começa a preencher e rola para longe do formulário.",
      ),
      resumeAction: field.string("Aviso no topo — link para voltar", "Voltar e finalizar"),
    }),
    newsletter: defineSection("Newsletter", {
      titleTop: field.string("Título — primeira linha", "Inteligência logística"),
      titleAccent: field.string("Título — segunda linha (laranja)", "direto no seu e-mail"),
      description: field.text(
        "Texto de apoio",
        "Guias práticos, cases reais e tendências de intralogística para apoiar as decisões da sua operação.",
      ),
      emailPlaceholder: field.string("Exemplo no campo de e-mail", "email@empresa.com"),
      buttonLabel: field.string("Texto do botão", "Quero receber"),
      successMessage: field.text(
        "Mensagem de inscrição concluída",
        "Inscrição confirmada! Em breve nossos conteúdos chegam ao seu e-mail.",
      ),
    }),
    productCard: defineSection("Card de empilhadeira (catálogo)", {
      quoteLabel: field.string("Botão de orçamento", "Solicitar orçamento"),
      detailsLabel: field.string("Botão de detalhes", "Ver detalhes"),
      capacityLabel: field.string("Especificação — capacidade", "Capacidade"),
      energyLabel: field.string("Especificação — energia", "Energia"),
      liftHeightLabel: field.string("Especificação — elevação", "Elevação"),
      aisleWidthLabel: field.string("Especificação — corredor", "Corredor operacional"),
    }),
    productQuote: defineSection("Página do modelo — botão de orçamento", {
      buttonLabel: field.string("Texto do botão", "Solicitar orçamento deste modelo"),
    }),
  },
});
