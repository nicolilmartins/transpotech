import heroImage from "@/assets/images/hero-image-pneus.webp";
import { definePage, defineSection, field } from "../fields";

const BREAK_HINT = "Enter quebra a linha só no desktop.";

export const pneusPage = definePage({
  key: "pneus",
  title: "Pneus",
  sections: {
    hero: defineSection("Banner", {
      titleTop: field.string("Título — primeira linha", "Pneus para operação"),
      titleAccent: field.string("Título — segunda linha (laranja)", "segura e produtiva"),
      description: field.text(
        "Texto de apoio",
        "A categoria certa para cada piso, aplicação e tipo de operação.",
      ),
      image: field.image("Imagem de fundo", heroImage),
      buttonLabel: field.string("Texto do botão", "Solicitar cotação de pneus"),
    }),
    brands: defineSection("Marcas parceiras", {
      eyebrow: field.string("Texto acima dos logos", "Marcas parceiras"),
    }),
    leadForm: defineSection("Formulário de cotação", {
      titleTop: field.string("Título — primeira linha", "O pneu certo para"),
      titleBottom: field.string("Título — segunda linha (laranja)", "cada operação"),
      description: field.text(
        "Texto de apoio",
        "Do uso interno ao mais severo, indicamos o pneu ideal para o seu equipamento e aplicação. Envie os dados e receba a melhor condição.",
      ),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Modelo do equipamento, medida do pneu e aplicação (interna, externa, etc.).",
      ),
      submitLabel: field.string("Texto do botão de envio", "Solicitar cotação de pneus"),
    }),
    categories: defineSection("Categorias", {
      title: field.text("Título", "Escolha a categoria mais \npróxima da", BREAK_HINT),
      titleAccent: field.string("Título — final em destaque (laranja)", "sua necessidade"),
      description: field.text(
        "Texto de apoio",
        "Os pneus devem ser escolhidos conforme equipamento, ambiente, \npiso, carga e intensidade de uso.",
        BREAK_HINT,
      ),
      items: field.list(
        "Categorias",
        "Categoria",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          cta: field.string("Texto do link", ""),
        },
        [
          {
            title: "Pneus para Empilhadeiras",
            description:
              "Disponíveis nos tipos press-on, pneumático e sólido, conforme a aplicação e o piso da operação.",
            cta: "Solicitar pneu para empilhadeira",
          },
          {
            title: "Pneus OTR (Off-The-Road)",
            description:
              "Para escavadeiras, motoniveladoras, retroescavadeiras, carregadeiras, tratores de esteira e compactação.",
            cta: "Solicitar pneu OTR",
          },
          {
            title: "Pneus Agrícolas",
            description:
              "Para tratores, colheitadeiras, plantadeiras, pulverizadores e máquinas de henificação no campo.",
            cta: "Solicitar pneu agrícola",
          },
          {
            title: "Pneus Florestais",
            description:
              "Para skidders, fellers (derrubadoras), processadores, transportadores florestais e máquinas de exploração.",
            cta: "Solicitar pneu florestal",
          },
          {
            title: "Pneus Portuários",
            description:
              "Para reach stackers, carretas portuárias, empilhadeiras de porto, empurradores e equipamentos de contêiner.",
            cta: "Solicitar pneu portuário",
          },
        ],
        // A arte de cada card (recorte posicionado) fica no código, por posição.
        { fixed: true },
      ),
    }),
    consider: defineSection("O que considerar", {
      title: field.string("Título — início", "O que considerar antes"),
      titleMiddle: field.string("Título — segunda linha", "de"),
      titleAccent: field.string("Título — final em destaque", "solicitar pneus?"),
      description: field.text(
        "Texto de apoio",
        "Marque ou anote o que se aplica à sua operação. Quanto mais detalhes, mais precisa a cotação.",
      ),
      buttonLabel: field.string("Texto do botão", "Enviar informações para cotação"),
      items: field.list(
        "Itens da lista",
        "Item",
        { label: field.string("Texto", "") },
        [
          { label: "Tipo de equipamento" },
          { label: "Medida do pneu atual" },
          { label: "Tipo de piso" },
          { label: "Ambiente interno ou externo" },
          { label: "Carga movimentada" },
          { label: "Intensidade de uso" },
          { label: "Horas de operação por dia" },
          { label: "Condição atual do pneu" },
          { label: "Cidade/UF" },
          { label: "Urgência da troca" },
        ],
        // O ícone de cada item fica no código, por posição.
        { fixed: true },
      ),
    }),
    quotationSteps: defineSection("Como funciona a cotação", {
      titleRegular: field.string("Título — primeira linha", "Como funciona"),
      titleAccent: field.string("Título — segunda linha (laranja)", "a cotação de pneus"),
      description: field.text(
        "Texto de apoio",
        "Um processo simples e rápido: você informa a necessidade e a equipe da TranspoTech indica o pneu certo para a sua operação.",
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
            description: "Escolha a categoria ou descreva o pneu que precisa.",
          },
          {
            title: "Envia dados do equipamento",
            description: "Modelo, medida, aplicação e foto ajudam a validar a solicitação.",
          },
          {
            title: "A equipe avalia compatibilidade",
            description:
              "A TranspoTech direciona a melhor alternativa conforme operação e disponibilidade.",
          },
          {
            title: "Você recebe orientação ou cotação",
            description: "O time retorna com os próximos passos para compra.",
          },
        ],
        { fixed: true },
      ),
    }),
    whyTranspotech: defineSection("Por que a TranspoTech", {
      titleRegular: field.string("Título — primeira linha", "Por que solicitar pneus"),
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
            title: "Orientação para escolha correta",
            description:
              "Indicamos a categoria certa para cada piso, aplicação e tipo de operação.",
          },
          {
            title: "Menos risco de compra incompatível",
            description:
              "Você evita pneus inadequados que comprometem segurança e produtividade.",
          },
          {
            title: "Apoio técnico para operação e manutenção",
            description: "Suporte especializado para prolongar a vida útil e reduzir paradas.",
          },
          {
            title: "Direcionamento conforme região e necessidade",
            description: "Cobertura nacional para atender sua operação onde ela estiver.",
          },
        ],
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Dúvidas frequentes sobre "),
      titleAccent: field.string("Título — final em destaque (laranja)", "pneus"),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Precisa trocar ou cotar pneus para "),
      titleAccent: field.string("Título — final em destaque (laranja)", "sua operação?"),
      description: field.text(
        "Texto de apoio",
        "Fale com a TranspoTech, envie os dados do equipamento e receba orientação para solicitar a cotação correta.",
      ),
      ctaLabel: field.string("Texto do botão", "Solicitar cotação de pneus"),
    }),
  },
});
