import heroImage from "@/assets/images/hero-image-empilhadeiras-seminovas.webp";
import heroImageMobile from "@/assets/images/hero-image-empilhadeiras-seminovas-mobile.webp";
import considerNewImage from "@/assets/images/RCE 20 + 16.webp";
import { definePage, defineSection, field } from "../fields";

const BREAK_HINT = "No celular, a linha quebra depois da primeira palavra.";

// Sem CTA: a página não usa o CtaSection.
export const seminovasPage = definePage({
  key: "seminovas",
  title: "Empilhadeiras seminovas",
  sections: {
    hero: defineSection("Banner", {
      titleRegular: field.string(
        "Título — primeira linha",
        "Empilhadeiras seminovas",
        BREAK_HINT,
      ),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "revisadas e com garantia",
        BREAK_HINT,
      ),
      description: field.text(
        "Texto de apoio",
        "Inspeção completa, procedência e suporte pós-venda, pronta entrega com confiança.",
      ),
      image: field.image("Imagem de fundo (tablet e desktop)", heroImage),
      imageMobile: field.image(
        "Imagem de fundo (celular)",
        heroImageMobile,
        "Foto em pé (retrato), com a empilhadeira à esquerda do centro.",
      ),
      buttonLabel: field.string("Texto do botão", "Solicitar cotação"),
    }),
    leadForm: defineSection("Formulário de consulta", {
      titleTop: field.string("Título — primeira linha", "Encontre a seminova ideal"),
      titleBottom: field.string("Título — segunda linha (laranja)", "para sua operação"),
      description: field.text(
        "Texto de apoio",
        "Diga o que você precisa e retornamos com opções de empilhadeiras seminovas revisadas, com procedência e garantia.",
      ),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Capacidade, tipo de empilhadeira, aplicação e cidade da operação.",
      ),
      submitLabel: field.string("Texto do botão de envio", "Consultar seminovas"),
    }),
    whyBuy: defineSection("Por que comprar seminova", {
      titleRegular: field.string("Título — primeira linha", "Por que comprar seminova"),
      titleAccent: field.string("Título — segunda linha (laranja)", "com a TranspoTech"),
      cards: field.list(
        "Cards",
        "Card",
        {
          titleTop: field.string(
            "Título — primeira parte",
            "",
            "Quando algum título não cabe em uma linha, todos quebram entre a primeira e a segunda parte.",
          ),
          titleBottom: field.string("Título — segunda parte", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            titleTop: "Revisão técnica",
            titleBottom: "completa",
            description:
              "Cada equipamento passa por avaliação multipontos antes de entrar no estoque.",
          },
          {
            titleTop: "Garantia",
            titleBottom: "TranspoTech",
            description: "6 a 12 meses de garantia conforme condição do equipamento.",
          },
          {
            titleTop: "Pronta entrega",
            titleBottom: "disponível",
            description:
              "Equipamentos prontos pra operação após inspeção e ajustes técnicos.",
          },
          {
            titleTop: "Cobertura",
            titleBottom: "nacional",
            description:
              "10 unidades em PR, SC, RS, SP e GO para suporte próximo da sua operação.",
          },
        ],
        // A arte de cada card fica no código, por posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Consultar equipamentos"),
    }),
    evaluation: defineSection("Como avaliamos", {
      titleRegular: field.string("Título — primeira linha", "Como avaliamos"),
      titleAccent: field.string("Título — segunda linha (laranja)", "cada equipamento"),
      description: field.text(
        "Texto de apoio",
        "Antes de entrar no estoque, cada equipamento passa por inspeção técnica e laudo TranspoTech.",
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
            title: "Avaliação de chegada",
            description: "Histórico, documentação, número de série e horímetro são auditados.",
          },
          {
            title: "Inspeção mecânica e hidráulica",
            description: "Motor, transmissão, mastro, cilindros, vazamentos e folgas.",
          },
          {
            title: "Inspeção elétrica e eletrônica",
            description: "Bateria, carregador, comandos, sensores e chicotes.",
          },
          {
            title: "Reparos e substituições",
            description:
              "Peças de desgaste trocadas e ajustes feitos pelo time técnico TranspoTech.",
          },
          {
            title: "Laudo e teste operacional",
            description:
              "Equipamento liberado com laudo técnico assinado e teste de operação.",
          },
        ],
        // A ilustração de cada etapa fica no código, por posição.
        { fixed: true },
      ),
    }),
    included: defineSection("O que está incluso", {
      titleRegular: field.string("Título — início", "O que está"),
      titleAccentTop: field.string("Título — destaque (laranja), primeira parte", "incluso"),
      titleAccentBottom: field.string(
        "Título — destaque (laranja), segunda parte",
        "na compra",
        "No celular, esta parte vai para a linha de baixo.",
      ),
      description: field.text(
        "Texto de apoio",
        "Cada empilhadeira seminova já vem com a estrutura da TranspoTech por trás, da garantia ao suporte pós-venda.",
      ),
      items: field.list(
        "Itens",
        "Item",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Garantia",
            description:
              "Cobertura de 6 a 12 meses conforme o equipamento, incluindo peças e mão de obra.",
          },
          {
            title: "Revisão técnica documentada",
            description:
              "Laudo TranspoTech e histórico de manutenção entregues junto ao equipamento.",
          },
          {
            title: "Suporte pós-venda",
            description:
              "Peças, manutenção preventiva e corretiva pela equipe técnica da TranspoTech.",
          },
          {
            title: "Treinamento operacional",
            description:
              "Orientação básica de operação e segurança ao operador no recebimento.",
          },
          {
            title: "Logística de entrega",
            description:
              "Transporte coordenado pela TranspoTech até a sua unidade, com hora marcada.",
          },
        ],
      ),
    }),
    value: defineSection("Onde a seminova entrega mais valor", {
      titleTop: field.string("Título — primeira linha", "Onde a empilhadeira seminova"),
      titleMiddle: field.string("Título — segunda linha, início", "entrega"),
      titleAccent: field.string("Título — segunda linha, final (laranja)", "mais valor"),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", "", "Enter quebra a linha. Até duas linhas."),
        },
        [
          {
            title: "Expansão controlada",
            description: "Adicionar capacidade sem comprometer CAPEX em equipamento novo.",
          },
          {
            title: "Projetos temporários",
            description: "Obras, contratos com prazo fixo\ne operações sazonais.",
          },
          {
            title: "Backup de frota",
            description:
              "Garantir continuidade operacional quando o equipamento principal sai para manutenção.",
          },
          {
            title: "Operações de pátio",
            description:
              "Aplicações externas onde robustez é mais importante que tecnologia de ponta.",
          },
          {
            title: "Substituição de fim de vida",
            description:
              "Trocar equipamento muito antigo por uma seminova mais nova com TCO melhor.",
          },
          {
            title: "Operação inicial",
            description:
              "Pequenas e médias empresas começando a estruturar a frota intralogística.",
          },
        ],
        // O ícone de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    purchaseSteps: defineSection("Como funciona a compra", {
      titleRegular: field.string("Título — primeira linha", "Como funciona"),
      titleAccent: field.string("Título — segunda linha (laranja)", "a compra de seminova"),
      description: field.text(
        "Texto de apoio",
        "Um processo simples e transparente, do primeiro contato à entrega com garantia e suporte da TranspoTech.",
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
            description: "Tipo de operação, capacidade, ambiente, energia, prazo e orçamento.",
          },
          {
            title: "Indicação de equipamentos",
            description: "A equipe seleciona equipamentos compatíveis no estoque atual.",
          },
          {
            title: "Visita técnica (opcional)",
            description:
              "Você pode visitar a unidade ou pedir vídeo do equipamento em operação.",
          },
          {
            title: "Laudo e proposta",
            description: "Laudo técnico, garantia e proposta comercial detalhada.",
          },
          {
            title: "Entrega e suporte pós-venda",
            description:
              "Entrega coordenada e início da garantia + suporte técnico TranspoTech.",
          },
        ],
        // O ícone de cada etapa fica no código, por posição.
        { fixed: true },
      ),
    }),
    considerNew: defineSection("Considere novas", {
      titleRegular: field.string("Título — início", "Considere também "),
      titleAccent: field.string("Título — final em destaque (laranja)", "empilhadeiras novas"),
      description: field.text(
        "Texto de apoio",
        "Equipamentos zero-hora com garantia de fábrica e configuração sob medida. Indicados para operações de longo prazo, multi-turno intenso ou programas de modernização da frota.",
      ),
      items: field.list(
        "Itens da lista",
        "Item",
        { label: field.string("Texto", "") },
        [
          { label: "Garantia de fábrica" },
          { label: "Configuração sob medida" },
          { label: "Programas de financiamento e leasing" },
        ],
      ),
      buttonLabel: field.string("Texto do botão", "Ver catálogo de novas"),
      image: field.image("Foto", considerNewImage, {
        alt: "Empilhadeira nova STILL RCE 20 + 16 em operação",
      }),
    }),
    classifieds: defineSection("Classificados", {
      eyebrow: field.string("Texto acima do título", "Classificados"),
      title: field.string("Título", "Seminovas disponíveis agora"),
      labelYear: field.string("Card — rótulo do ano", "Ano"),
      labelHours: field.string("Card — rótulo das horas", "Horas trabalhadas"),
      labelCapacity: field.string("Card — rótulo da capacidade", "Capacidade"),
      labelLocation: field.string("Card — rótulo da localização", "Localização"),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Dúvidas frequentes sobre "),
      titleAccent: field.string("Título — final em destaque (laranja)", "seminovas"),
    }),
    // Textos iguais em todas as páginas de equipamento
    // (/produtos/empilhadeiras/seminovas/<equipamento>); o conteúdo de cada
    // equipamento vem do documento da empilhadeira.
    detail: defineSection("Página de cada equipamento (textos comuns)", {
      locationTitle: field.string("Localização — título", "Onde está o equipamento"),
      locationPrefix: field.string(
        "Localização — texto antes do estado",
        "Disponível em",
        "O estado do equipamento entra logo depois deste texto.",
      ),
      locationSuffix: field.text(
        "Localização — texto depois do estado",
        "- confirme visita técnica, logística e prazo de entrega para outras cidades.",
      ),
      othersEyebrow: field.string("Outras seminovas — texto acima do título", "Classificados"),
      othersTitle: field.string("Outras seminovas — título", "Outras seminovas disponíveis"),
    }),
  },
});
