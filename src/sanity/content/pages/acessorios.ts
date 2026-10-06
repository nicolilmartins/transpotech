// Duas STILL RCE 20/16 em armazém.
import heroImage from "@/assets/images/RCE 20 + 16.webp";
import { faqAcessorios } from "@/data/faq-acessorios";
import { definePage, defineSection, field } from "../fields";

const BREAK_HINT = "Enter quebra a linha só no desktop.";

export const acessoriosPage = definePage({
  key: "acessorios",
  title: "Acessórios e telemetria",
  sections: {
    hero: defineSection("Banner", {
      titleTop: field.string("Título — primeira linha", "Mais controle e segurança"),
      titleAccent: field.string("Título — segunda linha (laranja)", "para a sua frota"),
      description: field.text(
        "Texto de apoio",
        "Telemetria, check list eletrônico, assistência ao operador e acessórios para empilhadeiras.",
      ),
      image: field.image("Imagem de fundo", heroImage),
      buttonLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
    brands: defineSection("Marcas", {
      eyebrow: field.string(
        "Texto acima dos logos",
        "Soluções para empilhadeiras STILL, Linde, Baoli e outras marcas",
      ),
    }),
    challenges: defineSection("Desafios de uma frota sem controle", {
      title: field.text("Título", "Os desafios de uma\nfrota", BREAK_HINT),
      titleAccent: field.string("Título — final em destaque (laranja)", "sem controle"),
      description: field.text(
        "Texto de apoio",
        "Quando não há registro de quem opera, como opera e em que estado\nestá a máquina, o custo aparece em avarias, paradas e riscos à equipe.",
        BREAK_HINT,
      ),
      // Dores levantadas nos materiais do cliente (E-Check List, FleetManager e ADAS).
      items: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Check list em papel",
            description:
              "Preenchimento manual, documentos ilegíveis, perda do histórico e custo com papel e armazenamento.",
          },
          {
            title: "Indisciplina operacional",
            description:
              "Check list não preenchido e máquinas usadas por operadores sem autorização ou habilitação.",
          },
          {
            title: "Impactos e avarias",
            description:
              "Batidas em estruturas, em outros equipamentos e em imperfeições do piso geram alto custo operacional.",
          },
          {
            title: "Risco a pedestres",
            description:
              "Pontos cegos e circulação de pessoas próximas às máquinas aumentam o risco de acidentes.",
          },
          {
            title: "Processos trabalhistas",
            description:
              "Sem registro confiável, fica difícil comprovar inspeções, uso e responsabilidades.",
          },
          {
            title: "Pouca visibilidade da frota",
            description:
              "Sem dados de uso, tempo com carga e produtividade, as decisões sobre a frota ficam sem base.",
          },
        ],
        // A ilustração de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    solutions: defineSection("Níveis de solução", {
      title: field.string("Título — primeira linha", "Qual solução para"),
      titleAccent: field.string("Título — segunda linha (laranja)", "a sua frota?"),
      description: field.text(
        "Texto de apoio",
        "Do check list eletrônico à telemetria completa: a TranspoTech indica a solução conforme o tamanho da frota, o nível de controle desejado e a rotina da operação.",
      ),
      // Cada dado vem explicitamente dos materiais em inputs/Acessórios:
      // - E-Check List: "Apresentação E-Check List_v1.pdf".
      // - Serralog: "Apresentação Serralog Tptech.pdf".
      // - FleetManager: "Apresentação do Fleetmanager.pdf" (Funções, Aplicação —
      //   "gerir grande parque de máquinas" —, Segurança operacional, Impactos e
      //   Comunicação via app STILL DataShuttle).
      // Descrições curtas (2 linhas) e 5 tópicos curtos (1 linha) por card, para alinhar a
      // leitura entre os três. Pendente de revisão técnica do gerente de produto.
      cards: field.list(
        "Soluções",
        "Solução",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          items: field.list("Tópicos", "Tópico", { text: field.string("Texto", "") }, []),
          ctaLabel: field.string("Texto do link", ""),
        },
        [
          {
            title: "KION E-Check List",
            description: "Check list eletrônico: a máquina só liga após identificação e inspeção.",
            items: [
              { text: "Liberação por cartão RFID ou senha" },
              { text: "Perguntas customizadas pelo cliente" },
              { text: "Bloqueio em respostas negativas" },
              { text: "Funciona em rede local, sem internet" },
              { text: "Software de gestão sem anuidade" },
            ],
            ctaLabel: "Solicitar avaliação",
          },
          {
            title: "Telemetria TranspoTech | Serralog",
            description: "Telemetria online: informações da operação a qualquer hora e lugar.",
            items: [
              { text: "Operador identificado por cartão RFID" },
              { text: "Check list e sensor de impacto" },
              { text: "Bloqueio remoto da máquina" },
              { text: "Alertas de manutenção por e-mail" },
              { text: "Sistema web com dados via 4G" },
            ],
            ctaLabel: "Solicitar avaliação",
          },
          {
            title: "STILL FleetManager 4.x",
            description:
              "Telemetria STILL: segurança, otimização do uso e menos danos por impactos.",
            items: [
              { text: "Até 999 operadores por máquina" },
              { text: "Velocidade por tipo de habilitação" },
              { text: "Acesso pela validade da habilitação" },
              { text: "Bloqueio e alerta após impacto" },
              { text: "Dados via app no celular (Bluetooth)" },
            ],
            ctaLabel: "Solicitar avaliação",
          },
        ],
      ),
    }),
    comparison: defineSection("Comparativo de soluções", {
      title: field.string("Título — início", "Compare as"),
      titleAccent: field.string("Título — final em destaque (laranja)", "soluções"),
      description: field.text(
        "Texto de apoio",
        "Cada nível adiciona mais controle sobre acesso, uso e segurança.\nAs funções podem variar conforme o modelo do equipamento.",
        BREAK_HINT,
      ),
      tableCaption: field.string(
        "Descrição da tabela (para leitores de tela)",
        "Comparativo entre E-Check List, Telemetria TranspoTech e STILL FleetManager",
      ),
      columns: field.list(
        "Colunas (soluções comparadas)",
        "Coluna",
        { title: field.string("Nome da solução", "") },
        [
          { title: "KION E-Check List" },
          { title: "Telemetria TranspoTech" },
          { title: "STILL FleetManager 4.x" },
        ],
        // Cada linha da tabela tem uma célula por coluna.
        { fixed: true },
      ),
      // Comparativo factual a partir dos materiais de cada solução. Pendente de
      // revisão técnica do gerente de produto.
      rows: field.list(
        "Linhas",
        "Linha",
        {
          label: field.text("Recurso", "", "Enter quebra a linha em todas as telas."),
          cell1: field.string("1ª coluna", "", "Digite - (hífen) se a solução não tem o recurso."),
          cell2: field.string("2ª coluna", "", "Digite - (hífen) se a solução não tem o recurso."),
          cell3: field.string("3ª coluna", "", "Digite - (hífen) se a solução não tem o recurso."),
        },
        [
          {
            label: "Indicada para",
            cell1: "Frotas com poucas máquinas",
            cell2: "A solução mais aplicada",
            cell3: "Gestão de grande parque de máquinas",
          },
          {
            label: "Identificação do operador",
            cell1: "Cartão RFID ou senha",
            cell2: "Cartão RFID",
            cell3: "Cartão ou senha",
          },
          {
            label: "Check list com bloqueio\nda máquina",
            cell1: "Sim, com perguntas customizadas",
            cell2: "Sim, check list eletrônico",
            cell3: "Integra com o E-Check List (mesmo cartão)",
          },
          {
            label: "Transmissão de dados",
            cell1: "Rede local, sem internet",
            cell2: "4G, sistema web",
            cell3: "Aplicativo via Bluetooth e plataforma web",
          },
          {
            label: "Detecção de impactos",
            cell1: "-",
            cell2: "Sensor de impacto",
            cell3: "Sim, com redução de velocidade, bloqueio e alertas",
          },
          {
            label: "Relatórios e alertas",
            cell1: "Histórico de respostas exportável",
            cell2: "Produtividade, horímetro, tempo com carga e alertas por e-mail",
            cell3: "Uso simultâneo, energia, acessos e impactos por operador",
          },
        ],
      ),
      buttonLabel: field.string("Texto do botão", "Receber indicação da solução"),
    }),
    adas: defineSection("Assistência ao operador (KION ADAS)", {
      eyebrow: field.string("Texto acima do título", "Assistência ao operador"),
      title: field.text("Título", "Segurança ativa\ncom", BREAK_HINT),
      titleAccent: field.string("Título — final em destaque (laranja)", "KION ADAS"),
      description: field.text(
        "Texto de apoio",
        "Sistema avançado de assistência que usa câmeras e inteligência artificial para detectar\npedestres próximos à empilhadeira e alertar o operador em tempo real.",
        BREAK_HINT,
      ),
      // Funções do KION ADAS conforme a apresentação "KION ADAS Sistema de
      // Assistência". Pendente de revisão técnica do gerente de produto.
      features: field.list(
        "Funções",
        "Função",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Detecção de pedestres",
            description:
              "Visão computacional e inteligência artificial reconhecem alvos parados e em movimento.",
          },
          {
            title: "Monitoramento de ponto cego",
            description:
              "4 câmeras com 100° de ângulo de visão cobrem o entorno da máquina, com imagem no display.",
          },
          {
            title: "Alarme de voz e limite de velocidade",
            description:
              "Alerta sonoro ao operador e zona de limite de velocidade quando há risco por perto.",
          },
          {
            title: "Zona de alarme personalizável",
            description: "Área de alerta configurada conforme o layout e a rotina da operação.",
          },
          {
            title: "Gravação da operação",
            description: "Vídeos salvos automaticamente por 14 dias, para consulta e exportação.",
          },
          {
            title: "GPS e cerca eletrônica",
            description:
              "Posicionamento, trajeto e cerca eletrônica para delimitar áreas da operação.",
          },
        ],
        // A ilustração de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    shelfAccessories: defineSection("Acessórios de prateleira", {
      title: field.text("Título", "Acessórios para\no dia a dia", BREAK_HINT),
      titleAccent: field.string("Título — final em destaque (laranja)", "da operação"),
      description: field.text(
        "Texto de apoio",
        "Itens de pronta entrega que aumentam a visibilidade,\na precisão e a segurança no uso das empilhadeiras.",
        BREAK_HINT,
      ),
      // Acessórios de pronta entrega citados pelo cliente. Descrições pendentes de
      // revisão técnica do gerente de produto.
      items: field.list(
        "Acessórios",
        "Acessório",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          ctaLabel: field.string("Texto do link", ""),
        },
        [
          {
            title: "Câmera de garfos",
            description:
              "Imagem dos garfos no display da cabine, para posicionar a carga com precisão em grandes alturas.",
            ctaLabel: "Solicitar cotação",
          },
          {
            title: "Blue Spot",
            description:
              "Projeção de luz azul no piso que sinaliza a aproximação da empilhadeira para os pedestres.",
            ctaLabel: "Solicitar cotação",
          },
          {
            title: "Red Zone",
            description:
              "Linhas de luz vermelha no piso que delimitam a área de risco ao redor da máquina.",
            ctaLabel: "Solicitar cotação",
          },
          {
            title: "Altímetro digital",
            description:
              "Indica a altura dos garfos nas empilhadeiras retráteis e agiliza o posicionamento em estruturas altas.",
            ctaLabel: "Solicitar cotação",
          },
          {
            title: "Faróis de trabalho",
            description: "Kit de iluminação para operar com mais visibilidade em áreas com pouca luz.",
            ctaLabel: "Solicitar cotação",
          },
        ],
        // O ícone de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    leadForm: defineSection("Formulário de avaliação", {
      titleTop: field.string("Título — primeira linha", "Encontre a solução"),
      titleBottom: field.string("Título — segunda linha (laranja)", "ideal para a sua frota"),
      description: field.text(
        "Texto de apoio",
        "Conte quantas máquinas tem a sua frota e o que você precisa controlar. A TranspoTech indica a solução e apresenta a proposta.",
      ),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Tamanho da frota, marcas e modelos, turnos e o que você quer controlar (acesso, impactos, check list, pedestres).",
      ),
      submitLabel: field.string("Texto do botão de envio", "Solicitar avaliação"),
    }),
    faq: defineSection("Perguntas frequentes", {
      titleRegular: field.string("Título", "Dúvidas frequentes sobre "),
      titleAccent: field.string("Título — final em destaque (laranja)", "acessórios e telemetria"),
      items: field.list(
        "Perguntas",
        "Pergunta",
        { question: field.string("Pergunta", ""), answer: field.text("Resposta", "") },
        faqAcessorios,
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Quer mais controle sobre a "),
      titleAccent: field.string("Título — final em destaque (laranja)", "sua frota?"),
      description: field.text(
        "Texto de apoio",
        "Fale com a TranspoTech e descubra qual combinação de telemetria, check list e acessórios de segurança faz sentido para a sua operação.",
      ),
      ctaLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
  },
});
