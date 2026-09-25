import heroImage from "@/assets/images/hero-servicos.webp";
import heroImageMobile from "@/assets/images/hero-servicos-mobile.webp";
// PLACEHOLDER: trocar por imagem de checklist técnico / técnico em atendimento
import pm2pImage from "@/assets/images/operacao-image.webp";
import { definePage, defineSection, field } from "../fields";

export const servicosPage = definePage({
  key: "servicos",
  title: "Serviços",
  sections: {
    hero: defineSection("Banner", {
      titleTop: field.string(
        "Título — primeira linha",
        "Manutenção para manter ",
      ),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "sua frota em operação",
      ),
      description: field.text(
        "Texto de apoio",
        "Preventiva, corretiva e multimarcas com suporte técnico especializado.",
      ),
      image: field.image("Imagem de fundo (desktop)", heroImage),
      imageMobile: field.image("Imagem de fundo (celular)", heroImageMobile),
      buttonLabel: field.string(
        "Texto do botão",
        "Solicitar assistência técnica",
      ),
    }),
    multibrand: defineSection("Assistência multimarcas", {
      eyebrow: field.string("Texto acima do título", "Assistência multimarcas"),
      title: field.string(
        "Título — início",
        "Manutenção para empilhadeiras de",
      ),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "todas as marcas",
      ),
      description: field.text(
        "Texto de apoio",
        "Nossa equipe conectada ao departamento de peças garante agilidade no atendimento e o menor custo para sua operação.",
      ),
      footnote: field.text(
        "Texto abaixo dos logos",
        "Também atendemos equipamentos importados e chineses, todas as marcas e modelos, elétricos e a combustão.",
      ),
    }),
    techStructure: defineSection("Estrutura técnica (mapa)", {
      eyebrow: field.string("Texto acima do título", "Abrangência nacional"),
      titleTop: field.string(
        "Título — primeira linha",
        "Estrutura técnica para",
      ),
      titleBottom: field.string(
        "Título — segunda linha (laranja)",
        "apoiar sua operação",
      ),
      description: field.text(
        "Texto de apoio",
        "Escolha um estado e veja onde atuamos.",
      ),
    }),
    leadForm: defineSection("Formulário de atendimento", {
      titleTop: field.string("Título — primeira linha", "Atendimento técnico"),
      titleBottom: field.string(
        "Título — segunda linha (laranja)",
        "especializado",
      ),
      description: field.text(
        "Texto de apoio",
        "Descreva a necessidade da sua frota e um especialista da TranspoTech direciona o atendimento: preventivo, corretivo ou multimarcas.",
      ),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Tipo de serviço, equipamento, urgência e cidade da operação.",
      ),
      submitLabel: field.string(
        "Texto do botão de envio",
        "Solicitar atendimento",
      ),
    }),
    portfolio: defineSection("Portfólio de serviços", {
      eyebrow: field.string("Texto acima do título", "Portfólio de serviços"),
      titleTop: field.string("Título — primeira linha", "Serviços para manter"),
      titleBottom: field.string(
        "Título — segunda linha (negrito)",
        "sua frota disponível",
      ),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech apoia empresas que precisam reduzir paradas, aumentar a segurança e manter seus equipamentos de movimentação funcionando com eficiência.",
      ),
      linkLabel: field.string(
        "Texto do link ao lado do título",
        "Abrir um chamado",
      ),
      items: field.list(
        "Serviços",
        "Serviço",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          cta: field.string("Texto do link", ""),
        },
        [
          {
            title: "Manutenção corretiva",
            description:
              "Atendimento para diagnóstico e correção de falhas em empilhadeiras e equipamentos de movimentação.",
            cta: "Solicitar corretiva",
          },
          {
            title: "Manutenção preventiva",
            description:
              "Revisões planejadas para reduzir falhas, preservar componentes e aumentar a confiabilidade da frota.",
            cta: "Agendar preventiva",
          },
          {
            title: "Serviços multimarcas",
            description:
              "Atendimento técnico para diferentes marcas de empilhadeiras e equipamentos de movimentação.",
            cta: "Consultar atendimento",
          },
          {
            title: "Contrato de manutenção",
            description:
              "Planos recorrentes para empresas que precisam de previsibilidade, acompanhamento técnico e suporte contínuo.",
            cta: "Conhecer contrato",
          },
          {
            title: "Peças e componentes",
            description:
              "Apoio com peças, pneus, baterias e carregadores para manter sua operação funcionando.",
            cta: "Solicitar peças",
          },
          {
            title: "Diagnóstico técnico",
            description:
              "Avaliação da frota para identificar riscos, priorizar manutenções e orientar decisões operacionais.",
            cta: "Avaliar equipamento",
          },
        ],
        // Ícone e destino do link de cada card ficam no código, por posição.
        { fixed: true },
      ),
    }),
    pm2p: defineSection("Programa PM2P", {
      eyebrow: field.string("Texto acima do título", "Programa"),
      titleTop: field.string(
        "Título — primeira linha",
        "PM2P: manutenção programada",
      ),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "para reduzir paradas",
      ),
      description: field.text(
        "Texto de apoio",
        "O Programa de Manutenção Produtiva Programada ajuda sua empresa a manter a frota acompanhada de forma recorrente, com revisões preventivas e correções identificadas durante o atendimento.",
      ),
      benefits: field.list(
        "Benefícios",
        "Benefício",
        { label: field.string("Texto", "") },
        [
          { label: "Mais previsibilidade na manutenção" },
          { label: "Mais segurança para operadores" },
          { label: "Identificação antecipada de falhas" },
          { label: "Redução de custos corretivos" },
        ],
      ),
      buttonLabel: field.string("Texto do botão", "Conhecer PM2P"),
      image: field.image("Foto", pm2pImage, {
        alt: "Técnico da TranspoTech em atendimento programado",
      }),
    }),
    process: defineSection("Como funciona o atendimento", {
      eyebrow: field.string("Texto acima do título", "Processo"),
      titleRegular: field.string("Título — início", "Como funciona o "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "atendimento",
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
              "Envie cidade, tipo de equipamento, modelo, série, marca, problema ou objetivo da manutenção.",
          },
          {
            title: "A equipe entende o contexto",
            description:
              "A TranspoTech avalia a demanda e direciona o atendimento conforme urgência, região e tipo de serviço.",
          },
          {
            title: "O técnico realiza o diagnóstico",
            description:
              "O equipamento é avaliado para identificar falhas, riscos, peças necessárias e prioridade de intervenção.",
          },
          {
            title: "A manutenção é executada",
            description:
              "A equipe realiza o serviço corretivo, preventivo ou programado conforme escopo definido.",
          },
          {
            title: "Sua frota segue acompanhada",
            description:
              "Quando necessário, a TranspoTech pode apoiar com peças, novas manutenções, contrato ou plano recorrente.",
          },
        ],
        // A ilustração de cada etapa fica no código, por posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Solicitar atendimento"),
    }),
    differentials: defineSection("Diferenciais", {
      eyebrow: field.string("Texto acima do título", "Diferenciais"),
      titleTop: field.string("Título — primeira linha", "Por que investir em"),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "manutenção especializada?",
      ),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Menos paradas inesperadas",
            description:
              "A manutenção adequada ajuda a reduzir falhas que comprometem produtividade, prazos e segurança.",
          },
          {
            title: "Mais segurança operacional",
            description:
              "Equipamentos revisados reduzem riscos para operadores, cargas e estrutura da operação.",
          },
          {
            title: "Previsibilidade de custos",
            description:
              "A manutenção programada permite planejar intervenções e evitar gastos emergenciais recorrentes.",
          },
          {
            title: "Vida útil da frota",
            description:
              "O cuidado preventivo ajuda a preservar componentes e prolongar a utilização dos equipamentos.",
          },
          {
            title: "Suporte técnico especializado",
            description:
              "Equipe preparada para atuar em diferentes tipos de empilhadeiras e demandas operacionais.",
          },
          {
            title: "Técnico dedicado na operação",
            description:
              "Terceirizamos os serviços dos nossos técnicos para auxiliar em altos volumes de manutenções.",
          },
        ],
        // A arte de cada card fica no código, por posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Avaliar minha frota"),
    }),
    segments: defineSection("Segmentos", {
      eyebrow: field.string("Texto acima do título", "Segmentos"),
      title: field.string("Título — início", "Serviços para diferentes"),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "tipos de operação",
      ),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", "", "Cabe em uma linha só."),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Centros de distribuição",
            description:
              "Para operações com alto volume, prazos exigentes e necessidade de disponibilidade constante.",
          },
          {
            title: "Indústrias",
            description:
              "Para almoxarifados, produção, expedição e movimentação interna de materiais.",
          },
          {
            title: "Supermercados e atacadistas",
            description:
              "Para recebimento, armazenagem, reposição e picos de abastecimento.",
          },
          {
            title: "Operadores logísticos",
            description:
              "Para 3PLs, galpões e contratos que dependem de frota confiável.",
          },
          {
            title: "Empresas com frota própria",
            description:
              "Para quem precisa manter equipamentos comprados em boas condições de uso.",
          },
          {
            title: "Agroindústria",
            description:
              "Para cooperativas, armazenagem de grãos, insumos e movimentação em ambientes agroindustriais.",
          },
        ],
        // A arte de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Perguntas frequentes sobre "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "serviços e manutenção",
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Solicite "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "atendimento técnico",
      ),
      description: field.text(
        "Texto de apoio",
        "Preencha os dados e um especialista da TranspoTech entrará em contato para entender sua necessidade e direcionar o atendimento.",
      ),
      ctaLabel: field.string("Texto do botão", "Solicitar atendimento técnico"),
    }),
  },
});
