import portfolioNovas from "@/assets/images/empilhadeiras/egv-16-5.webp";
import portfolioSeminovas from "@/assets/images/portfolio-novas.png";
import portfolioLocacao from "@/assets/images/empilhadeiras/linde.webp";
import esgTeam from "@/assets/images/esg-team.png";
import automationImage from "@/assets/images/automacao.png";
import testimonialsImage from "@/assets/images/depoimentos/warehouse.png";
import testimonialAvatar from "@/assets/images/depoimentos/avatar.png";
import {
  HOME_ARTICLE_IDS,
  HOME_ARTICLE_LIMIT,
} from "@/components/home/blog-section/home-articles";
import { definePage, defineSection, field } from "../fields";

const LINE_HINT = "Enter quebra a linha.";
const DESKTOP_BREAK_HINT = "Enter quebra a linha só no desktop.";

// A arte da hero fica no código: tem pontos interativos (hotspots)
// posicionados sobre a empilhadeira e um enquadramento calculado para ela.
export const homePage = definePage({
  key: "home",
  title: "Home",
  sections: {
    hero: defineSection("Banner", {
      titleBold: field.string("Título — primeira linha (negrito)", "Empilhadeiras,"),
      titleRegular: field.string("Título — segunda linha", "locação e manutenção"),
      description: field.text(
        "Texto de apoio",
        "Dealer autorizado Linde, STILL e Baoli no Sul do Brasil. Frota funcionando, custo previsível e atendimento técnico 24h, tudo em um único parceiro.",
      ),
      primaryLabel: field.string("Texto do botão principal", "Locar empilhadeira"),
      secondaryLabel: field.string("Texto do botão secundário", "Comprar empilhadeira"),
      hotspots: field.list(
        "Pontos da empilhadeira",
        "Ponto",
        { label: field.string("Texto da etiqueta", "") },
        [
          { label: "Venda de faróis" },
          { label: "Venda de retrovisores" },
          { label: "Venda de mastros" },
          { label: "Venda de baterias" },
          { label: "Venda de pneus" },
        ],
        {
          fixed: true,
          description:
            "Etiquetas que acendem sobre a empilhadeira (só no desktop). Posição e link de cada ponto ficam no código.",
        },
      ),
    }),
    experience: defineSection("Experiência", {
      eyebrow: field.string("Texto acima do título", "EXPERIÊNCIA"),
      title: field.text("Título", "Mais de 88% do Brasil\njá conta", DESKTOP_BREAK_HINT),
      titleAccent: field.string("Título — final em destaque (laranja)", "com a TranspoTech"),
      description: field.text(
        "Texto de apoio",
        "Escala, equipe e infraestrutura para garantir disponibilidade, agilidade e suporte técnico em todo o Sul e Sudeste.",
      ),
      stats: field.list(
        "Números",
        "Número",
        {
          value: field.string(
            "Número",
            "",
            "Anima contando até o primeiro grupo de dígitos (ex.: +3700).",
          ),
          label: field.text("Descrição", "", LINE_HINT),
        },
        [
          {
            value: "+3700",
            label: "Empilhadeiras locadas operando ativamente em diversos segmentos",
          },
          { value: "+670", label: "Cidades atendidas" },
          { value: "+400", label: "Mecânicos (as)\npara manutenção\npreventiva e corretiva" },
          { value: "+360", label: "Carros oficinas\nem + 15 estados" },
        ],
        // A ilustração e a largura do texto de cada card ficam no código, por posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Quero reduzir meus custos"),
    }),
    solutions: defineSection("Soluções em intralogística", {
      eyebrow: field.string("Texto acima do título", "solução 360°"),
      titleRegular: field.string("Título — primeira linha", "Soluções em"),
      titleAccent: field.string("Título — segunda linha (laranja)", "Intralogística"),
      description: field.text(
        "Texto de apoio",
        "Escolha a necessidade mais próxima do seu momento e encontre a solução adequada com rapidez",
      ),
      items: field.list(
        "Soluções",
        "Solução",
        {
          title: field.string("Nome", ""),
          description: field.text("Descrição", ""),
          cta: field.string("Texto do botão", ""),
        },
        [
          {
            title: "Locação de empilhadeiras",
            description:
              "STILL, Linde e Baoli com frota pronta para operação imediata e custo previsível.",
            cta: "Ver locação",
          },
          {
            title: "Venda de empilhadeiras novas",
            description:
              "Linde, Still e Baoli zero-km com orientação técnica para a escolha certa.",
            cta: "Ver novas",
          },
          {
            title: "Empilhadeiras seminovas",
            description:
              "Seminovas revisadas, com garantia e o melhor custo-benefício para sua operação.",
            cta: "Ver seminovas",
          },
          {
            title: "Assistência multimarcas",
            description:
              "Manutenção preventiva, corretiva e multimarcas com 380+ técnicos especializados e peças em estoque.",
            cta: "Ver serviços",
          },
          {
            title: "Automação intralogística",
            description:
              "Menos gargalos, mais produtividade. Automação por etapas adaptada à maturidade da operação.",
            cta: "Conhecer automação",
          },
          {
            title: "Transporte",
            description:
              "Movimentação e logística de cargas com equipe especializada e cobertura nacional.",
            cta: "Falar sobre transporte",
          },
          {
            title: "Baterias e carregadores",
            description:
              "Baterias, carregadores e infraestrutura de energia para operações elétricas eficientes.",
            cta: "Ver baterias",
          },
          {
            title: "Peças e componentes",
            description:
              "Peças originais e compatíveis com estoque amplo para reduzir tempo de parada.",
            cta: "Ver peças",
          },
          {
            title: "Pneus",
            description:
              "Pneus para empilhadeiras de todos os portes e aplicações, com troca no local.",
            cta: "Ver pneus",
          },
        ],
        // Os pontos ficam em volta da engrenagem (um por dente); ícone e link
        // de cada solução ficam no código, por posição.
        { fixed: true },
      ),
    }),
    portfolio: defineSection("Portfólio", {
      eyebrow: field.string("Texto acima do título", "PORTFÓLIO"),
      titleRegular: field.string("Título — primeira linha", "Equipamentos novos,"),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "seminovos e locação de frota",
      ),
      description: field.text(
        "Texto de apoio",
        "Da aquisição e locação ao suporte técnico e automação, a TranspoTech conecta as principais necessidades da movimentação e intralogística em uma estrutura integrada.",
      ),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.text("Título", "", LINE_HINT),
          description: field.text("Descrição", ""),
          cta: field.string("Texto do link", ""),
          image: field.image("Foto", portfolioNovas),
        },
        [
          {
            title: "Empilhadeiras\nnovas",
            description:
              "Equipamentos de marcas reconhecidas para operações que exigem desempenho, segurança e confiabilidade no longo prazo.",
            cta: "Ver empilhadeiras novas",
            image: portfolioNovas,
          },
          {
            title: "Empilhadeiras\nseminovas",
            description:
              "Alternativo para quem busca disponibilidade rápida, revisão técnica e melhor adequação ao orçamento.",
            cta: "Ver empilhadeiras seminovas",
            image: portfolioSeminovas,
          },
          {
            title: "Locação de\nequipamentos",
            description:
              "Solução para operações que precisam de flexibilidade, previsibilidade de custo e resposta rápida à demanda.",
            cta: "Solicitar proposta",
            image: portfolioLocacao,
          },
        ],
        // O ícone 3D e o link de cada card ficam no código, por posição.
        { fixed: true },
      ),
    }),
    brands: defineSection("Marcas", {
      titleRegular: field.string("Título", "Trabalhamos com as marcas "),
      titleAccent: field.string("Título — final em negrito", "líderes globais"),
    }),
    compare: defineSection("Comparativo elétrica x GLP", {
      ctaLabel: field.string("Texto do botão", "Simular economia"),
    }),
    esg: defineSection("ESG e governança", {
      eyebrow: field.string("Texto acima do título", "ESG E GOVERNANÇA"),
      titleBold: field.string("Título — início (negrito)", "ESG na prática,"),
      titleRegular: field.string("Título — final", "para uma intralogística mais responsável"),
      description: field.text(
        "Texto de apoio",
        "Compromissos claros em Ambiental, Social e Governança com iniciativas alinhadas aos ODS da ONU e canais formais de transparência.",
      ),
      badgeAlt: field.string(
        "Descrição do selo GPTW (acessibilidade)",
        "Great Place To Work Certificada — 4 anos consecutivos",
        "Lida por leitores de tela no lugar do selo.",
      ),
      image: field.image("Foto", esgTeam, { alt: "Equipe TranspoTech" }),
      items: field.list(
        "Itens",
        "Item",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          linkLabel: field.string(
            "Texto do link",
            "",
            "Só os dois últimos itens têm link; nos demais, deixe vazio.",
          ),
        },
        [
          {
            title: "Great Place To Work",
            description:
              "Pelo 4° ano consecutivo, a TranspoTech foi reconhecida como Great Place To Work.",
            linkLabel: "",
          },
          {
            title: "Pessoas no centro da operação",
            description:
              "Programas de inclusão e desenvolvimento de talentos na área técnica.",
            linkLabel: "",
          },
          {
            title: "Eficiência e operação mais limpa",
            description:
              "Foco em soluções e tecnologias que aumentam eficiência e reduzem impacto na operação.",
            linkLabel: "Saiba mais",
          },
          {
            title: "Ética, transparência e canais oficiais",
            description:
              "Canal de transparência para relatos e condutas (com seriedade e confidencialidade).",
            linkLabel: "Canal de transparência",
          },
        ],
        // O destino de cada link fica no código, por posição.
        { fixed: true },
      ),
    }),
    services: defineSection("Serviços", {
      eyebrow: field.string("Texto acima do título", "SERVIÇOS"),
      titleBold: field.string("Título — início (negrito)", "Manutenção preventiva, "),
      titleRegular: field.string("Título — final", "corretiva e suporte 24h"),
      description: field.text(
        "Texto de apoio",
        "Além da venda e locação, a TranspoTech apoia o dia a dia da frota com manutenção e suporte técnico especializado.",
      ),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.text("Título", "", LINE_HINT),
          description: field.text("Descrição", ""),
          cta: field.string("Texto do link", ""),
        },
        [
          {
            title: "Planos de manutenção\npreventiva",
            description:
              "Cronograma de visitas técnicas para identificar falhas antes que parem sua frota.",
            cta: "Solicitar plano preventivo",
          },
          {
            title: "Manutenção\ncorretiva",
            description:
              "Técnicas em campo com peças em estoque para retornar sua operação o quanto antes.",
            cta: "Solicitar atendimento urgente",
          },
          {
            title: "Assistência\nmultimarcas",
            description:
              "Linde, Still, Baoli e outras marcas - um único contato para toda a frota.",
            cta: "Ver cobertura multimarcas",
          },
        ],
        // Ícone e destino de cada card ficam no código, por posição.
        { fixed: true },
      ),
    }),
    automation: defineSection("Automação intralogística", {
      titleRegular: field.string("Título — início", "Automação intralogística para"),
      titleAccent: field.string("Título — final em destaque (laranja)", "alta produtividade"),
      description: field.text(
        "Texto de apoio",
        "Para empresas que precisam evoluir o fluxo intralogístico, a TranspoTech também atua com soluções de automação voltadas à eficiência operacional.",
      ),
      bullets: field.list(
        "Itens da lista",
        "Item",
        { label: field.string("Texto", "") },
        [
          { label: "Menos gargalos entre o recebimento, armazenagem e expedição" },
          { label: "Mais pedidos processados com a mesma equipe" },
          { label: "Ociosidade reduzida e melhor aproveitamento do espaço" },
          { label: "Evolução por etapas - do básico à automacão completa" },
        ],
      ),
      buttonLabel: field.string("Texto do botão", "Locar empilhadeira"),
      image: field.image("Foto", automationImage, {
        alt: "Empilhadeira em operação",
      }),
    }),
    segments: defineSection("Segmentos", {
      eyebrow: field.string("Texto acima do título", "SEGMENTOS"),
      title: field.string("Título", "Aplicações por setor"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech apoia empresas com necessidades distintas de movimentação, abastecimento interno, armazenagem e suporte técnico.",
      ),
      items: field.list(
        "Segmentos",
        "Segmento",
        {
          title: field.string("Nome", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Indústria",
            description:
              "Suporte para abastecimento de linha, movimentação interna e continuidade de produção.",
          },
          {
            title: "Distribuição",
            description:
              "Soluções para armazenagem, fluxo, picking, expedição e produtividade operacional.",
          },
          {
            title: "Varejo e atacado",
            description:
              "Apoio para movimentação eficiente em operações com alto giro e necessidade de ritmo constante.",
          },
          {
            title: "Logística",
            description:
              "Estrutura para operações que precisam de disponibilidade, resposta rápida e previsibilidade.",
          },
        ],
        // Cada segmento é um marcador posicionado sobre a ilustração (no código).
        { fixed: true },
      ),
    }),
    testimonials: defineSection("Depoimentos e cases", {
      titleRegular: field.string("Título", "O que nossos "),
      titleAccent: field.string("Título — final em negrito", "clientes dizem"),
      description: field.text(
        "Texto de apoio",
        "A melhor prova de valor não está só no portfólio, mas na capacidade de responder à cenários reais com a solução certa.",
      ),
      image: field.image("Foto ao lado dos cards", testimonialsImage, {
        alt: "Operação em armazém",
      }),
      cases: field.list(
        "Cases",
        "Case",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Logística em escala",
            description:
              "Como uma operação nacional reduziu gargalos e acelerou a tomada de decisão com uma estrutura digital mais clara.",
          },
          {
            title: "Custos reduzidos",
            description:
              "Como uma operação global reduziu custos de frete e otimizou prazos integrando sistemas de rastreamento inteligente.",
          },
        ],
        // O logo de cada case fica no código, por posição.
        { fixed: true },
      ),
      quoteTitle: field.string("Depoimento — título", "Logística em escala"),
      quote: field.text(
        "Depoimento — texto",
        "A TranspoTech nos ajudou a reorganizar toda a estrutura de dados da operação. Em três meses, passamos a enxergar em tempo real onde estava cada carga, onde estavam os atrasos e onde o custo estava vazando.",
      ),
      authorName: field.string("Depoimento — nome do autor", "Joel Castro"),
      authorCompany: field.string("Depoimento — empresa do autor", "Meli"),
      authorPhoto: field.image(
        "Depoimento — foto do autor",
        testimonialAvatar,
        {
          alt: "Joel Castro",
        },
      ),
    }),
    whyUs: defineSection("Por que a TranspoTech", {
      titleRegular: field.string("Título — primeira linha", "Por que as empresas"),
      titleAccent: field.string("Título — segunda linha (laranja)", "escolhem a TranspoTech"),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "+400 técnicos especializados",
            description:
              "Suporte para abastecimento de linha, movimentação interna e continuidade de produção.",
          },
          {
            title: "Atendimento multimarcas",
            description:
              "Soluções para armazenagem, fluxo, picking, expedição e produtividade operacional.",
          },
          {
            title: "+88% de presença nacional",
            description:
              "11 unidades em PR, SC, RS, SP e GO para resposta próxima e suporte técnico local.",
          },
          {
            title: "+30 milhões em estoque de peças",
            description:
              "Estrutura que garante rapidez, eficiência e flexibilidade total na manutenção de empilhadeiras.",
          },
        ],
        // O ícone 3D de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    blog: defineSection("Conteúdos (blog)", {
      titleRegular: field.string("Título", "Conteúdo prático para apoiar "),
      titleAccent: field.string("Título — final em destaque (laranja)", "suas decisões"),
      description: field.text(
        "Texto de apoio",
        "Guias, comparativos e tendências sobre locação, acessórios e automação.",
      ),
      allLabel: field.string("Texto do link para todos os conteúdos", "Ver todos os conteúdos"),
      readLabel: field.string("Texto \"ler\" nos cards", "Ler conteúdo"),
      articles: field.references(
        "Artigos em destaque",
        "article",
        HOME_ARTICLE_IDS.map((id) => `article-${id}`),
        {
          max: HOME_ARTICLE_LIMIT,
          description: `Na ordem da lista (arraste para reordenar): o primeiro é o destaque grande, os demais viram os cards menores. Máximo de ${HOME_ARTICLE_LIMIT}.`,
        },
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Qual é o maior gargalo "),
      titleAccent: field.string("Título — final em destaque (laranja)", "da sua operação?"),
      description: field.text(
        "Texto de apoio",
        "Um especialista analisa seu cenário e apresenta a opção mais adequada, sem compromisso.",
      ),
      ctaLabel: field.string("Texto do botão", "Falar com especialistas"),
    }),
  },
});
