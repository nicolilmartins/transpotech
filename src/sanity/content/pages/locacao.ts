import heroImage from "@/assets/images/hero-image-locacao-de-empilhadeiras.webp";
import heroImageMobile from "@/assets/images/hero-image-locacao-de-empilhadeiras-mobile.webp";
import structureImage from "@/assets/images/operacao-image.webp";
import { definePage, defineSection, field } from "../fields";

const BREAK_HINT = "Enter quebra a linha só no desktop.";

export const locacaoPage = definePage({
  key: "locacao",
  title: "Locação de empilhadeiras",
  sections: {
    hero: defineSection("Banner", {
      titleTop: field.string("Título — primeira linha", "Locação flexível para"),
      titleAccent: field.string("Título — segunda linha (laranja)", "cada operação"),
      description: field.text(
        "Texto de apoio",
        "Empilhadeiras novas e seminovas com contratos flexíveis e suporte técnico 24h.",
      ),
      image: field.image("Imagem de fundo (tablet e desktop)", heroImage),
      imageMobile: field.image(
        "Imagem de fundo (celular)",
        heroImageMobile,
        "Foto em pé (retrato), com a empilhadeira no centro.",
      ),
      buttonLabel: field.string("Texto do botão", "Locar empilhadeira"),
    }),
    brands: defineSection("Marcas", {
      eyebrow: field.string("Texto acima dos logos", "Dealer oficial"),
    }),
    leadForm: defineSection("Formulário de proposta", {
      titleTop: field.string("Título — primeira linha", "Proposta de locação"),
      titleBottom: field.string("Título — segunda linha (laranja)", "sob medida"),
      description: field.text(
        "Texto de apoio",
        "Conte sobre sua operação e a TranspoTech monta um plano de locação com manutenção preventiva inclusa e disponibilidade garantida.",
      ),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Quantidade de equipamentos, aplicação, prazo e cidade da operação.",
      ),
      submitLabel: field.string("Texto do botão de envio", "Solicitar proposta de locação"),
    }),
    fleetTech: defineSection("Frota e tecnologia", {
      eyebrow: field.string("Texto acima do título", "Frota e tecnologia"),
      titleRegular: field.string("Título — início", "Frota pronta para qualquer "),
      titleAccent: field.string("Título — final em destaque (laranja)", "perfil de operação"),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", "", "Enter quebra a linha."),
        },
        [
          { title: "Incentivos fiscais", description: "Redução de custos gerais\ne de manutenção." },
          {
            title: "Flexibilidade de troca",
            description: "Atualização e renovação\nde frota garantida.",
          },
          { title: "Custo mensal fixo", description: "Valores previsíveis que\nse mantêm mês a mês." },
          {
            title: "Gestão inteligente de frota",
            description: "Você 100% focado na gestão\ndo seu negócio.",
          },
        ],
        // A ilustração de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    electricFleet: defineSection("Frota elétrica", {
      title: field.text("Título", "Por que a maior parte da\nnossa frota ", BREAK_HINT),
      titleAccent: field.string("Título — final em destaque (laranja)", "é elétrica"),
      description: field.text(
        "Texto de apoio",
        "Mais de 80% com baterias de íons de lítio, garantindo mais eficiência, menos manutenção e um ambiente mais limpo.",
      ),
      items: field.list(
        "Vantagens",
        "Vantagem",
        { label: field.string("Texto", "", "Cabe em uma linha só.") },
        [
          { label: "Sem troca de bateria" },
          { label: "Redução de até 30% no consumo" },
          { label: "Sem emissão de gases nem ácidos" },
          { label: "Retorno do investimento mais rápido" },
          { label: "Vida útil até 3x maior" },
          { label: "Carregamento rápido" },
          { label: "Não requer sala de baterias" },
          { label: "Uma única bateria por equipamento" },
        ],
        // O ícone de cada item fica no código, por posição.
        { fixed: true },
      ),
    }),
    forkliftTypes: defineSection("Qual empilhadeira locar", {
      eyebrow: field.string("Texto acima do título", "Nós te ajudamos"),
      title: field.text("Título", "Não sabe qual\nempilhadeira locar?", BREAK_HINT),
      description: field.text(
        "Texto de apoio",
        "Você não precisa chegar com o modelo definido. A TranspoTech avalia sua operação e indica a melhor opção conforme tipo de carga, altura de elevação, ambiente, piso, urgência e prazo de locação.",
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
            title: "Empilhadeiras elétricas",
            description:
              "Indicadas para operações internas, centros de distribuição, supermercados, indústrias e ambientes que exigem menor emissão local e operação mais silenciosa.",
            cta: "Solicitar indicação",
          },
          {
            title: "Empilhadeiras a combustão",
            description:
              "Indicadas para áreas externas, pisos mais exigentes, movimentação de cargas maiores e operações com demanda intensa.",
            cta: "Solicitar indicação",
          },
          {
            title: "Empilhadeiras retráteis",
            description:
              "Indicadas para porta-paletes, corredores, armazenagem vertical e operações que precisam ganhar eficiência em altura.",
            cta: "Solicitar indicação",
          },
          {
            title: "Paleteiras e transpaleteiras",
            description:
              "Indicadas para movimentação horizontal, abastecimento, separação de pedidos e apoio operacional.",
            cta: "Solicitar indicação",
          },
          {
            title: "Short rental",
            description:
              "Para picos sazonais, inventários, aumento temporário de demanda, novos contratos ou testes antes de uma decisão de compra.",
            cta: "Quero uma locação temporária",
          },
          {
            title: "Frota sob demanda",
            description:
              "Para empresas que precisam expandir, renovar ou terceirizar parte da frota com mais previsibilidade.",
            cta: "Solicitar indicação",
          },
        ],
        // O ícone de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    plans: defineSection("Planos de locação", {
      titleRegular: field.string("Título — primeira linha", "Planos de locação para"),
      titleAccent: field.string("Título — segunda linha (laranja)", "diferentes demandas"),
      description: field.text(
        "Texto de apoio",
        "Do contrato de longo prazo ao short rental para picos sazonais, escolha o modelo que melhor se encaixa na sua operação, sempre com manutenção e suporte técnico da TranspoTech.",
      ),
      items: field.list(
        "Planos",
        "Plano",
        {
          title: field.string("Plano", ""),
          description: field.text("Quando usar", ""),
        },
        [
          {
            title: "Locação de longo prazo",
            description:
              "Operações contínuas, CDs, indústrias, supermercados e operadores logísticos",
          },
          {
            title: "Short rental",
            description: "Picos sazonais, inventários, eventos, testes e demandas temporárias",
          },
          {
            title: "Frota sob demanda",
            description: "Expansão, novos contratos ou substituição de frota própria",
          },
          {
            title: "Locação com manutenção",
            description: "Empresas que querem reduzir a carga interna de manutenção",
          },
          {
            title: "Locação de novas e seminovas",
            description: "Diferentes níveis de investimento, prazo e necessidade operacional",
          },
        ],
      ),
    }),
    process: defineSection("Processo", {
      titleRegular: field.string("Título — início", "Processo estruturado para "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "garantir eficiência máxima",
      ),
      description: field.text(
        "Texto de apoio",
        "Escala, equipe e infraestrutura para garantir disponibilidade, agilidade e suporte técnico em todo o Sul e Sudeste.",
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
            title: "Você informa sua necessidade",
            description:
              "Cidade, tipo de operação, carga, altura, ambiente, prazo e quantidade aproximada de equipamentos.",
          },
          {
            title: "Um especialista avalia sua operação",
            description:
              "A TranspoTech entende o contexto e recomenda o tipo de equipamento e o plano mais adequado.",
          },
          {
            title: "Você recebe uma proposta",
            description:
              "A proposta considera modelo, prazo, disponibilidade, manutenção, transporte e acessórios necessários.",
          },
          {
            title: "O equipamento é entregue",
            description:
              "A implantação pode incluir orientações de uso, apoio técnico e ajustes conforme a operação.",
          },
          {
            title: "A TranspoTech acompanha",
            description:
              "O suporte técnico ajuda sua operação a manter disponibilidade, segurança e produtividade.",
          },
        ],
        // A ilustração de cada etapa fica no código, por posição.
        { fixed: true },
      ),
    }),
    structure: defineSection("Estrutura", {
      titleRegular: field.string("Título — primeira linha", "Estrutura para atender"),
      titleAccent: field.string("Título — segunda linha (laranja)", "sua operação"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech reúne estrutura técnica, frota, peças, unidades e atendimento especializado para apoiar operações de movimentação de materiais.",
      ),
      image: field.image("Foto", structureImage, {
        alt: "Empilhadeiras Linde, STILL e Baoli enfileiradas em pátio de operação",
      }),
      items: field.list(
        "Itens da lista",
        "Item",
        { label: field.string("Texto", "") },
        [
          { label: "+360 carros oficina" },
          { label: "Atendimento técnico especializado" },
          { label: "Dealer Linde, Still e Baoli" },
          { label: "Peças, pneus, baterias e serviços" },
          { label: "Estrutura regional para suporte" },
        ],
        // O ícone de cada item fica no código, por posição.
        { fixed: true },
      ),
    }),
    segments: defineSection("Segmentos", {
      eyebrow: field.string("Texto acima do título", "Segmentos"),
      titleRegular: field.string("Título — início", "Locação para diferentes"),
      titleAccent: field.string("Título — final em destaque (laranja)", "tipos de operação"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech apoia empresas com necessidades distintas de movimentação, abastecimento interno, armazenagem e suporte técnico.",
      ),
      items: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Centro de distribuição",
            description:
              "Para operações com alto volume, SLA exigente, turnos intensos e necessidade de disponibilidade.",
          },
          {
            title: "Supermercados e atacadistas",
            description:
              "Para recebimento, armazenagem, reposição, expansão de loja, sazonalidade e picos de abastecimento.",
          },
          {
            title: "Indústrias e manufaturas",
            description:
              "Para almoxarifado, linha de produto, movimentação interna, expedição e apoio à manutenção.",
          },
          {
            title: "Operadores logísticos e 3PLs",
            description:
              "Para contratos novos, aumento temporário de demanda e abertura de novas operações.",
          },
          {
            title: "Galpões e operações sazonais",
            description:
              "Para períodos de alta demanda, inventários, eventos, projetos temporários ou substituição emergencial.",
          },
        ],
        // A arte de cada card fica no código, por posição (3 em cima, 2 embaixo).
        { fixed: true },
      ),
    }),
    rentVsBuy: defineSection("Locar ou comprar", {
      titleTop: field.string("Título — primeira linha", "Vale a pena"),
      titleAccent: field.string("Título — segunda linha (laranja)", "locar ou comprar?"),
      description: field.text(
        "Texto de apoio",
        "Cada uma com seus benefícios próprios. A escolha certa deve sempre se basear nas necessidades da sua operação.",
      ),
      rentTitle: field.string("Card laranja — título", "Locar pode ser melhor quando:"),
      rentReasons: field.list(
        "Card laranja — itens",
        "Item",
        { label: field.string("Texto", "") },
        [
          { label: "A demanda varia ao longo do ano" },
          { label: "A operação está crescendo ou abrindo uma nova unidade" },
          { label: "A manutenção da frota própria está ficando cara" },
          { label: "A empresa quer evitar obsolescência dos equipamentos" },
          { label: "Existe pressão para reduzir CAPEX" },
          { label: "A operação precisa de suporte técnico e troca mais ágil" },
        ],
      ),
      buyTitle: field.string("Card verde — título", "Comprar pode ser melhor quando:"),
      buyReasons: field.list(
        "Card verde — itens",
        "Item",
        { label: field.string("Texto", "") },
        [
          { label: "A operação é muito estável" },
          { label: "O uso é previsível por muitos anos" },
          { label: "A empresa tem equipe interna robusta de manutenção" },
          { label: "A frota própria já está bem dimensionada" },
        ],
      ),
    }),
    fleetManager: defineSection("FleetManager", {
      eyebrow: field.string("Texto acima do título", "Gestão de frota"),
      titleTop: field.string("Título — primeira linha", "Sua frota locada conectada"),
      titleBottom: field.string("Título — segunda linha, início", "com o "),
      titleAccent: field.string("Título — segunda linha, final (laranja)", "FleetManager"),
      description: field.text(
        "Texto de apoio",
        "O sistema de gestão de frota da STILL mostra quem operou cada equipamento, para quê,\nquando e se houve impacto. Tudo em um aplicativo web, sem instalação.",
        BREAK_HINT,
      ),
      modules: field.list(
        "Módulos",
        "Módulo",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Autorização de operador",
            description:
              "Acesso liberado por cartão, chip ou PIN, com perfil de uso próprio para cada operador.",
          },
          {
            title: "Registro de impactos",
            description:
              "Sensor de aceleração detecta choques e registra data, hora, equipamento e operador.",
          },
          {
            title: "Reconhecimento de carga",
            description:
              "Sensores de pressão registram as cargas movimentadas por cada equipamento.",
          },
          {
            title: "Horas e relatórios",
            description:
              "Horas de operação e turnos alimentam diários de bordo e relatórios de eficiência.",
          },
        ],
        // O ícone de cada módulo fica no código, por posição.
        { fixed: true },
      ),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Perguntas frequentes sobre "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "locação de empilhadeiras",
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      // Espaço não-quebrável entre "suporte" e "e" para o "e" não ficar órfão
      // no início de linha no mobile (fica "suporte e" / "previsibilidade?").
      titleRegular: field.string(
        "Título",
        "Sua operação precisa de disponibilidade, suporte e ",
      ),
      titleAccent: field.string("Título — final em destaque (laranja)", "previsibilidade?"),
      description: field.text(
        "Texto de apoio",
        "Fale com a TranspoTech e receba uma recomendação de locação conforme as necessidades da sua operação.",
      ),
      ctaLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
  },
});
