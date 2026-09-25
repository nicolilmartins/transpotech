import considerUsedImage from "@/assets/images/operacao-image.webp";
import { definePage, defineSection, field } from "../fields";

export const empilhadeirasNovasPage = definePage({
  key: "empilhadeiras-novas",
  title: "Empilhadeiras novas",
  sections: {
    // A página não tem banner com foto: o topo é o cabeçalho do catálogo.
    catalog: defineSection("Cabeçalho do catálogo", {
      titleRegular: field.string("Título — início", "Empilhadeiras "),
      titleAccent: field.string("Título — final em destaque (laranja)", "novas"),
      description: field.text(
        "Texto de apoio",
        "Equipamentos zero-hora com garantia de fábrica e configuração sob medida.",
      ),
    }),
    considerUsed: defineSection("Considere seminovas", {
      titleRegular: field.string("Título — primeira linha", "Considere também"),
      titleAccent: field.string("Título — segunda linha (laranja)", "seminovas"),
      description: field.text(
        "Texto de apoio",
        "Equipamentos com revisão técnica TranspoTech, garantia e pronta entrega. Indicados para ramp-up rápido, projetos temporários ou expansão controlada de frota.",
      ),
      items: field.list(
        "Itens da lista",
        "Item",
        { label: field.string("Texto", "") },
        [
          { label: "Inspeção técnica" },
          { label: "Pronta entrega" },
          { label: "Garantia de até 12 meses" },
        ],
      ),
      buttonLabel: field.string("Texto do botão", "Ver catálogo de seminovas"),
      image: field.image("Foto", considerUsedImage, {
        alt: "Empilhadeira seminova revisada pela TranspoTech em operação",
      }),
    }),
    whyChoose: defineSection("Por que escolher a TranspoTech", {
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
            title: "Orientação técnica na escolha",
            description:
              "Apoio para escolher o equipamento conforme carga, altura, ambiente, piso, turno e intensidade de uso.",
          },
          {
            title: "Distribuidor autorizado",
            description:
              "Venda de equipamentos Linde, STILL e Baoli com suporte de quem conhece a operação.",
          },
          {
            title: "Novas e seminovas no mesmo lugar",
            description:
              "Compare alternativas para compra planejada, renovação de frota ou necessidade imediata.",
          },
          {
            title: "Pós-venda especializado",
            description:
              "A TranspoTech também oferece serviços, peças, pneus, baterias e carregadores para manter a frota em operação.",
          },
          {
            title: "Estrutura regional",
            description:
              "Atendimento por unidades e equipe técnica para apoiar empresas em diferentes regiões.",
          },
          {
            title: "Soluções além da venda",
            description:
              "Além da compra, a TranspoTech pode apoiar com locação, manutenção e soluções intralogísticas.",
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
        "locação de empilhadeiras",
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Precisa comprar empilhadeira com "),
      titleAccent: field.string("Título — final em destaque (laranja)", "segurança técnica?"),
      description: field.text(
        "Texto de apoio",
        "Fale com a TranspoTech e receba uma recomendação conforme carga, altura, ambiente, prazo e orçamento.",
      ),
      ctaLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
    // Textos iguais em todas as páginas de modelo (/produtos/empilhadeiras/novas/<modelo>);
    // o conteúdo de cada modelo vem do documento da empilhadeira.
    detail: defineSection("Página de cada modelo (textos comuns)", {
      regionalTitle: field.string("Disponibilidade — título", "Disponibilidade regional"),
      regionalPrefix: field.string(
        "Disponibilidade — texto antes do estado",
        "Equipamento disponível em",
        "O estado do equipamento entra logo depois deste texto.",
      ),
      regionalSuffix: field.text(
        "Disponibilidade — texto depois do estado",
        "- confirme logística e prazo de entrega para outras cidades.",
      ),
      specialistLabel: field.string("Botão ao lado do orçamento", "Falar com especialista"),
      datasheetLabel: field.string("Botão da ficha técnica", "Ver ficha técnica"),
      relatedEyebrow: field.string(
        "Produtos relacionados — texto acima do título",
        "Produtos relacionados",
      ),
      relatedTitle: field.string(
        "Produtos relacionados — título",
        "Outras opções que podem servir",
      ),
      relatedLinkLabel: field.string(
        "Produtos relacionados — link do catálogo",
        "Ver catálogo completo",
      ),
      backLabel: field.string(
        "Link de volta ao catálogo (fim da página)",
        "Voltar ao catálogo de empilhadeiras novas",
      ),
    }),
  },
});
