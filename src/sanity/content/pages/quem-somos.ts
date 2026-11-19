import heroImage from "@/assets/images/hero-quem-somos.webp";
// PLACEHOLDER: trocar por foto real da equipe/ações ESG TranspoTech.
import esgImage from "@/assets/images/transpotech-team.webp";
import { definePage, defineSection, field } from "../fields";

const BREAK_HINT = "Enter quebra a linha só no desktop.";

export const quemSomosPage = definePage({
  key: "quem-somos",
  title: "Quem somos",
  sections: {
    hero: defineSection("Banner", {
      titleRegular: field.string("Título — início", "Especialistas em empilhadeiras para "),
      titleAccent: field.string("Título — final em destaque (laranja)", "operações em movimento"),
      description: field.text(
        "Texto de apoio",
        "Desde 2001, a TranspoTech atua com soluções para movimentação de materiais, apoiando empresas que precisam de disponibilidade, segurança, eficiência e suporte técnico especializado.",
      ),
      image: field.image("Imagem de fundo", heroImage),
      buttonLabel: field.string("Texto do botão", "Fale com um especialista"),
    }),
    stats: defineSection("Estrutura (números)", {
      eyebrow: field.string("Texto acima do título", "Estrutura"),
      titleTop: field.string("Título — primeira linha", "A estrutura que sustenta"),
      titleAccent: field.string("Título — segunda linha (laranja)", "cada operação"),
      description: field.text(
        "Texto de apoio",
        "Equipe técnica especializada, estoque robusto, postos de atendimento regionais e transporte especializado para manter sua operação em movimento.",
      ),
      items: field.list(
        "Números",
        "Número",
        {
          value: field.string(
            "Número",
            "",
            "Animado com contagem ao aparecer na tela: use só o número, com + opcional na frente e ponto no milhar (ex.: +3.700).",
          ),
          label: field.text("Legenda", "", BREAK_HINT),
        },
        [
          { value: "+800", label: "colaboradores" },
          { value: "+360", label: "carros oficina" },
          { value: "+3.700", label: "máquinas locadas" },
          { value: "42.500", label: "metros quadrados\nde estrutura" },
        ],
        // A ilustração de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    structure: defineSection("Abrangência nacional (mapa)", {
      eyebrow: field.string("Texto acima do título", "Abrangência nacional"),
      titleTop: field.string("Título — primeira linha", "Onde sua operação estiver,"),
      titleAccent: field.string("Título — segunda linha (laranja)", "a gente chega"),
      description: field.text(
        "Texto de apoio",
        "Com unidades, hub administrativo, hub de rental, oficinas, estoque de peças e carros oficina, a TranspoTech oferece atendimento consultivo e suporte para empresas que precisam de agilidade, disponibilidade e confiança.",
      ),
    }),
    units: defineSection("Nossas unidades", {
      eyebrow: field.string("Texto acima do título", "Nossas unidades"),
      titleTop: field.string("Título — primeira linha", "Presença real,"),
      titleAccent: field.string("Título — segunda linha (laranja)", "perto da sua operação"),
      description: field.text(
        "Texto de apoio",
        "São 11 unidades próprias em cinco estados, com equipe técnica, estoque e estrutura física para atender sua empresa de perto.",
      ),
      linkLabel: field.string("Texto do link de cada unidade", "Conhecer unidade"),
    }),
    about: defineSection("Sobre a TranspoTech", {
      titleTop: field.string("Título — primeira linha", "O que sua operação de"),
      titleAccent: field.string("Título — segunda linha (laranja)", "intralogística precisa"),
      paragraphs: field.list(
        "Parágrafos",
        "Parágrafo",
        { text: field.text("Texto", "") },
        [
          {
            text: "A TranspoTech é uma empresa especializada em soluções para intralogística, com atuação em equipamentos de movimentação, locação, manutenção, peças e suporte técnico.",
          },
          {
            text: "Mais do que fornecer empilhadeiras, atuamos como parceira de empresas que precisam reduzir paradas, aumentar produtividade e manter suas operações funcionando com segurança.",
          },
        ],
      ),
    }),
    history: defineSection("Nossa história", {
      titleRegular: field.string("Título — início", "Nossa "),
      titleAccent: field.string("Título — final em negrito", "história"),
      description: field.text(
        "Texto de apoio",
        "Nossa trajetória foi construída ao lado de clientes que precisam movimentar mais, parar menos e operar com segurança. Ao longo dos anos, ampliamos nossa estrutura, equipe técnica, unidades e portfólio para atender operações cada vez mais exigentes.",
      ),
      milestones: field.list(
        "Marcos",
        "Marco",
        {
          badge: field.string("Etiqueta (ano ou fase)", ""),
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            badge: "2001",
            title: "Início da atuação da TranspoTech",
            description:
              "Começo da trajetória no mercado de intralogística e equipamentos de movimentação.",
          },
          {
            badge: "Primeiros anos",
            title: "Primeira empilhadeira locada",
            description: "Expansão da atuação em locação e suporte técnico.",
          },
          {
            badge: "Expansão",
            title: "Abertura de novas unidades",
            description: "Crescimento regional para atender clientes em diferentes estados.",
          },
          {
            badge: "Parcerias",
            title: "Distribuidor autorizado",
            description: "Fortalecimento da atuação com marcas reconhecidas no mercado.",
          },
          {
            badge: "Hoje",
            title: "Portfólio completo em intralogística",
            description:
              "Venda, locação, manutenção, peças, pneus, baterias, carregadores e soluções para movimentação de materiais.",
          },
        ],
        // A linha do tempo do desktop tem cinco colunas.
        { fixed: true },
      ),
    }),
    culture: defineSection("Cultura", {
      title: field.text("Título", "Uma cultura feita por pessoas\nque ", BREAK_HINT),
      titleAccent: field.string("Título — final em destaque (laranja)", "fazem acontecer"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech acredita em relações de longo prazo, atendimento próximo e responsabilidade na entrega. Nosso time atua com ética, humildade, respeito, atualização constante e compromisso com o negócio dos clientes.",
      ),
      // Os 8 valores originais condensados em 4 tópicos:
      // "Fazemos acontecer" + "Um time de donos" + "Vestimos a camisa";
      // "Não pegamos atalhos" + "Humildade, respeito e ética";
      // "Pensamos no futuro, agindo agora" + "Atualização constante".
      values: field.list(
        "Valores",
        "Valor",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Fazemos acontecer",
            description:
              "Somos um time de donos que veste a camisa: assumimos a responsabilidade do começo ao fim e transformamos desafios em entrega.",
          },
          {
            title: "Amamos o negócio dos nossos clientes",
            description:
              "Atendimento próximo e compromisso real com a operação de cada cliente: o sucesso deles é o nosso.",
          },
          {
            title: "Não pegamos atalhos",
            description:
              "Agimos com ética, humildade e respeito em todas as relações, fazemos do jeito certo, mesmo quando é o caminho mais longo.",
          },
          {
            title: "Pensamos no futuro, agindo agora",
            description:
              "Atualização constante para evoluir sempre: antecipamos tendências e agimos hoje para construir o amanhã.",
          },
        ],
      ),
    }),
    careers: defineSection("Trabalhe conosco", {
      eyebrow: field.string("Texto acima do título", "Trabalhe conosco"),
      titleRegular: field.string("Título — início", "Faça parte do time"),
      titleAccent: field.string("Título — final em destaque (laranja)", "TranspoTech"),
      description: field.text(
        "Texto de apoio",
        "Somos uma das empresas certificadas Great Place to Work, com mais de 800 colaboradores em 11 unidades. Conheça as oportunidades abertas no nosso portal de carreiras.",
      ),
      buttonLabel: field.string("Texto do botão", "Ver vagas no Gupy"),
      perks: field.list(
        "Diferenciais",
        "Diferencial",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Great Place to Work",
            description: "Única do setor certificada, por quatro anos consecutivos.",
          },
          {
            title: "Plano de capacitação técnica",
            description: "Formação e desenvolvimento contínuo para toda a equipe.",
          },
          {
            title: "Diversidade e inclusão",
            description: "Ambiente plural, incluindo mulheres nas áreas de mecânica.",
          },
          {
            title: "Presença regional",
            description: "Unidades em PR, SC, RS, SP e GO, perto de onde você está.",
          },
        ],
        // O ícone de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    esg: defineSection("ESG e governança", {
      eyebrow: field.string("Texto acima do título", "ESG E GOVERNANÇA"),
      titleRegular: field.string("Título — início", "Crescimento com"),
      titleAccent: field.string("Título — final em negrito", "responsabilidade"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech investe em iniciativas de responsabilidade social, inclusão, sustentabilidade e governança. Acreditamos que uma operação eficiente também deve contribuir para um futuro mais responsável.",
      ),
      image: field.image("Foto", esgImage, {
        alt: "Equipe TranspoTech em ações ESG",
      }),
      items: field.list(
        "Tópicos",
        "Tópico",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          linkLabel: field.string("Texto do link", ""),
        },
        [
          {
            title: "Sustentabilidade",
            description:
              "Soluções e práticas que apoiam operações mais eficientes e conscientes.",
            linkLabel: "Saiba mais",
          },
          {
            title: "Inclusão",
            description:
              "Iniciativas voltadas à equidade, diversidade e desenvolvimento de pessoas.",
            linkLabel: "Conheça as iniciativas",
          },
          {
            title: "Comunidade",
            description:
              "Apoio a projetos sociais, esporte, educação e desenvolvimento comunitário.",
            linkLabel: "Conheça os projetos",
          },
          {
            title: "Governança",
            description:
              "Canais de transparência, ouvidoria digital e práticas de responsabilidade corporativa.",
            linkLabel: "Canal de transparência",
          },
        ],
        // O destino do link de cada tópico fica no código, por posição.
        { fixed: true },
      ),
    }),
    whyChoose: defineSection("Por que escolher a TranspoTech", {
      titleTop: field.string("Título — primeira linha", "Por que empresas"),
      titleAccent: field.string("Título — segunda linha (laranja)", "escolhem a TranspoTech?"),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Estrutura técnica",
            description:
              "Equipe especializada, carros oficina e suporte para operações que exigem disponibilidade.",
          },
          {
            title: "Portfólio completo",
            description:
              "Venda, locação, peças, pneus, serviços, baterias, carregadores e soluções intralogísticas.",
          },
          {
            title: "Marcas reconhecidas",
            description: "Distribuidor autorizado Linde, STILL e Baoli.",
          },
          {
            title: "Atendimento consultivo",
            description:
              "Apoio para indicar o melhor equipamento ou solução conforme a necessidade operacional.",
          },
          {
            title: "90% de presença regional",
            description: "Unidades e estrutura para atender empresas em diferentes localidades.",
          },
          {
            title: "Experiência em intralogística",
            description: "Atuação desde 2001 em operações de movimentação de materiais.",
          },
        ],
        // A arte de cada card fica no código, por posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Precisa de uma parceira para "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "sua operação intralogística?",
      ),
      description: field.text(
        "Texto de apoio",
        "Fale com a TranspoTech e encontre a solução ideal para compra, locação, manutenção ou melhoria da sua operação.",
      ),
      ctaLabel: field.string("Texto do botão principal", "Falar com especialista"),
      secondaryLabel: field.string("Texto do botão secundário", "Solicitar orçamento"),
    }),
  },
});
