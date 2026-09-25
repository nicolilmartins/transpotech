import heroImage from "@/assets/images/hero-automacao.webp";
import heroImageMobile from "@/assets/images/hero-automacao-mobile.webp";
// Fotos dos pontos da ilustração: as mesmas que a Dematic usa em cada ponto do
// mapa interativo, convertidas para .webp 960x540.
import imgRecebimento from "@/assets/images/automacao/recebimento.webp";
import imgTransporte from "@/assets/images/automacao/transporte.webp";
import imgArmazenagem from "@/assets/images/automacao/armazenagem.webp";
import imgSeparacao from "@/assets/images/automacao/separacao.webp";
import imgEnvio from "@/assets/images/automacao/envio.webp";
import imgSoftware from "@/assets/images/automacao/software.webp";
import imgManutencao from "@/assets/images/automacao/manutencao.webp";
import { definePage, defineSection, field } from "../fields";

const itemFields = {
  title: field.string("Título", ""),
  description: field.text("Descrição", ""),
};

export const automacaoPage = definePage({
  key: "automacao",
  title: "Automação intralogística",
  sections: {
    hero: defineSection("Banner", {
      titleTop: field.string("Título — primeira linha", "Operação logística"),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "automatizada com Dematic",
      ),
      description: field.text(
        "Texto de apoio",
        "Soluções escaláveis para indústrias, e-commerces e centros de distribuição.",
      ),
      image: field.image("Imagem de fundo (desktop)", heroImage),
      imageMobile: field.image("Imagem de fundo (celular)", heroImageMobile),
      buttonLabel: field.string("Texto do botão", "Avaliar minha operação"),
    }),
    partnership: defineSection("Parceria TranspoTech + Dematic", {
      eyebrow: field.string("Texto acima do título", "Parceria tecnológica"),
      title: field.string("Título", "TranspoTech + Dematic"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech leva ao Brasil a automação intralogística da Dematic, referência mundial e parte do grupo KION. Automatizamos a operação de ponta a ponta, do recebimento à expedição, com engenharia local e suporte próprio.",
      ),
      highlights: field.list(
        "Destaques",
        "Destaque",
        {
          label: field.string("Texto", "", "No desktop, cabe em uma linha só."),
        },
        [
          {
            label:
              "Recebimento e armazenagem automatizados, com máximo uso do espaço",
          },
          { label: "Separação e expedição mais rápidas e com menos erros" },
          {
            label:
              "Engenharia local, implantação própria e pós-venda em cobertura nacional",
          },
        ],
      ),
      buttonLabel: field.string("Texto do botão", "Conheça as soluções"),
    }),
    // Copy: as cinco primeiras etapas usam exatamente os itens "Sistemas" da
    // seção "Soluções em automação" desta mesma página. Software e Manutenção
    // não têm equivalente no site — a descrição é um resumo do texto oficial da
    // Dematic (PENDENTE de aprovação do marketing).
    hotspots: defineSection("Parceria — pontos da ilustração", {
      items: field.list(
        "Pontos",
        "Ponto",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          image: field.image(
            "Foto",
            imgRecebimento,
            "Proporção 16:9 (como no card da Dematic).",
          ),
        },
        [
          {
            title: "Recebimento",
            description: "Conferência e alocação automatizadas.",
            image: imgRecebimento,
          },
          {
            title: "Transporte",
            description: "Movimentação interna entre etapas.",
            image: imgTransporte,
          },
          {
            title: "Armazenagem",
            description: "Estocagem densa automatizada (AS/RS).",
            image: imgArmazenagem,
          },
          {
            title: "Separação",
            description: "Picking assistido, rápido e preciso.",
            image: imgSeparacao,
          },
          {
            title: "Envio",
            description: "Embalagem e expedição no prazo.",
            image: imgEnvio,
          },
          {
            title: "Software",
            description: "Controle e planejamento de toda a operação.",
            image: imgSoftware,
          },
          {
            title: "Manutenção",
            description:
              "Suporte para manter equipamentos e sistemas no máximo.",
            image: imgManutencao,
          },
        ],
        {
          fixed: true,
          description:
            "Exatamente 7 pontos, na ordem atual: a posição de cada um sobre a ilustração fica no código.",
        },
      ),
    }),
    leadForm: defineSection("Formulário de avaliação", {
      titleTop: field.string("Título — primeira linha", "Avalie automatizar"),
      titleBottom: field.string(
        "Título — segunda linha (laranja)",
        "a sua operação",
      ),
      description: field.text(
        "Texto de apoio",
        "Conte sobre sua operação intralogística e avaliamos o melhor caminho de automação para o seu negócio.",
      ),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Tipo de operação (indústria, CD, e-commerce), volume e principais gargalos.",
      ),
      submitLabel: field.string(
        "Texto do botão de envio",
        "Avaliar minha operação",
      ),
    }),
    benefits: defineSection("Benefícios (números)", {
      eyebrow: field.string("Texto acima do título", "Benefícios"),
      title: field.string("Título — primeira linha", "O que muda quando a"),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "operação é automatizada",
      ),
      description: field.text(
        "Texto de apoio",
        "Indicadores típicos observados em projetos Dematic ao redor do mundo.\nResultados variam por operação.",
        "Enter quebra a linha.",
      ),
      stats: field.list(
        "Indicadores",
        "Indicador",
        {
          value: field.string(
            "Número",
            "",
            "O primeiro número é animado (conta de 0 até ele); sinais e texto em volta ficam fixos.",
          ),
          label: field.string("Legenda", ""),
        },
        [
          { value: "+60%", label: "produtividade média" },
          { value: "−70%", label: "erros de separação" },
          { value: "+40%", label: "uso do espaço vertical" },
          { value: "24/7", label: "operação contínua" },
          { value: "−30%", label: "custo operacional" },
          { value: "100%", label: "rastreabilidade do pedido" },
        ],
      ),
    }),
    solutions: defineSection("Soluções em automação", {
      eyebrow: field.string("Texto acima do título", "Soluções em automação"),
      title: field.string(
        "Título — primeira linha",
        "Automação de ponta a ponta para ",
      ),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "sua intralogística",
      ),
      description: field.text(
        "Texto de apoio",
        "O portfólio Dematic cobre a operação de ponta a ponta, do recebimento à expedição, combinando equipamentos, software e robótica.",
      ),
      allTabLabel: field.string(
        "Nome da aba que reúne todos os tópicos",
        "Todos",
      ),
    }),
    solutionsTab1: defineSection("Soluções em automação — aba 1", {
      name: field.string("Nome da aba", "Soluções"),
      items: field.list(
        "Tópicos",
        "Tópico",
        itemFields,
        [
          {
            title: "Microatendimento",
            description: "Fulfillment rápido perto do consumidor.",
          },
          {
            title: "Atendimento em caixas mistas",
            description: "Paletes e caixas montados por pedido.",
          },
        ],
        // O ícone de cada tópico fica no código, por posição.
        { fixed: true },
      ),
    }),
    solutionsTab2: defineSection("Soluções em automação — aba 2", {
      name: field.string("Nome da aba", "Sistemas"),
      items: field.list(
        "Tópicos",
        "Tópico",
        itemFields,
        [
          {
            title: "Recebimento",
            description: "Conferência e alocação automatizadas.",
          },
          {
            title: "Transporte",
            description: "Movimentação interna entre etapas.",
          },
          {
            title: "Armazenagem",
            description: "Estocagem densa automatizada (AS/RS).",
          },
          {
            title: "Separação",
            description: "Picking assistido, rápido e preciso.",
          },
          { title: "Envio", description: "Embalagem e expedição no prazo." },
        ],
        { fixed: true },
      ),
    }),
    solutionsTab3: defineSection("Soluções em automação — aba 3", {
      name: field.string("Nome da aba", "AGV & Robótica"),
      items: field.list(
        "Tópicos",
        "Tópico",
        itemFields,
        [
          { title: "AGV", description: "Transporte de cargas sem operador." },
          {
            title: "Robôs móveis autônomos (AMR)",
            description: "Navegação autônoma pelo layout.",
          },
          {
            title: "AutoStore",
            description: "Armazenagem ultracompacta em cubos.",
          },
          {
            title: "Separação de caixas e peças",
            description: "Picking automatizado de caixas e peças.",
          },
          {
            title: "Esteiras",
            description: "Transportadores entre cada etapa.",
          },
          {
            title: "Paletização e despaletização",
            description: "Montagem e desmontagem de paletes.",
          },
          {
            title: "Sorter de bolsas",
            description: "Classificação em bolsas, alta cadência.",
          },
          { title: "Robótica", description: "Braços e células de manuseio." },
          {
            title: "Sistemas de classificação",
            description: "Sorters de alto volume ao destino.",
          },
          {
            title: "Estações de trabalho",
            description: "Postos goods-to-person, ergonômicos.",
          },
        ],
        { fixed: true },
      ),
    }),
    process: defineSection("Como entregamos (processo)", {
      eyebrow: field.string("Texto acima do título", "Como entregamos"),
      titleRegular: field.string("Título — início", "O processo do projeto, "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "da ideia à operação",
      ),
      description: field.text(
        "Texto de apoio",
        "Etapas claras para reduzir risco e acelerar a captura de valor. A TranspoTech implementa conforme a necessidade de cada cliente, em fases que se adequam à sua operação, da automação parcial à completa.",
      ),
      steps: field.list(
        "Etapas",
        "Etapa",
        itemFields,
        [
          {
            title: "Diagnóstico",
            description:
              "Visita técnica, análise de dados e mapeamento de fluxos atuais.",
          },
          {
            title: "Concepção",
            description:
              "Modelagem da solução, simulações e business case com TIR e payback.",
          },
          {
            title: "Engenharia",
            description:
              "Projeto detalhado, especificação de equipamentos, software e integrações.",
          },
          {
            title: "Implantação",
            description:
              "Fabricação, instalação e comissionamento com mínimo impacto à operação.",
          },
          {
            title: "Go-live",
            description:
              "Treinamento, ramp-up assistido e estabilização da operação.",
          },
          {
            title: "Operação contínua",
            description:
              "Manutenção, evolução e otimização ao longo do ciclo de vida.",
          },
        ],
        // A ilustração de cada etapa fica no código, por posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Avaliar minha operação"),
    }),
    segments: defineSection("Operações que automatizamos", {
      title: field.string("Título — primeira linha", "Operações que"),
      titleAccent: field.string(
        "Título — segunda linha (negrito)",
        "automatizamos",
      ),
      description: field.text(
        "Texto de apoio",
        "Adaptamos a solução ao perfil do seu negócio.",
      ),
      items: field.list(
        "Segmentos",
        "Segmento",
        { label: field.string("Texto", "") },
        [
          { label: "Vestuário" },
          { label: "Bens de consumo" },
          { label: "Alimentação e bebidas" },
          { label: "Mercadorias em geral" },
          { label: "Cuidados de saúde" },
          { label: "Manufatura" },
          { label: "Logística terceirizada" },
          { label: "Atacado B2B" },
        ],
      ),
      buttonLabel: field.string("Texto do botão", "Avaliar minha operação"),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Perguntas que sempre recebemos "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "sobre automação",
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Vamos avaliar a automação certa "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "para sua operação?",
      ),
      description: field.text(
        "Texto de apoio",
        "Resposta em até 1 dia útil. Sem compromisso. Confidencialidade garantida.",
      ),
      ctaLabel: field.string("Texto do botão", "Avaliar minha operação"),
      secondaryLabel: field.string(
        "Texto do segundo botão",
        "Falar com especialista",
      ),
    }),
  },
});
