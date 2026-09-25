import { definePage, defineSection, field } from "../fields";

export const artigoPage = definePage({
  key: "artigo",
  title: "Artigos (partes comuns a todos)",
  sections: {
    header: defineSection("Topo do artigo", {
      breadcrumbLabel: field.string(
        "Trilha de navegação — link para o portal",
        "Portal de Conteúdo",
      ),
      authorPrefix: field.string("Antes do nome do autor", "por"),
    }),
    aside: defineSection("Lateral do artigo", {
      shareLabel: field.string(
        "Título da caixa de compartilhar",
        "Compartilhar",
      ),
      tocTitle: field.string("Título do sumário", "Neste artigo"),
    }),
    related: defineSection("Conteúdos relacionados", {
      title: field.string("Título", "Outros conteúdos relacionados"),
      linkLabel: field.string(
        "Texto do link para o portal",
        "Ver todos os conteúdos",
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string(
        "Título — primeira linha",
        "Pronto pra evoluir ",
      ),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "sua operação?",
      ),
      description: field.text(
        "Texto de apoio",
        "Locação, compra, manutenção, acessórios e automação em um só parceiro: a TranspoTech mantém sua operação disponível, previsível e pronta para crescer.",
      ),
      ctaLabel: field.string(
        "Texto do botão principal",
        "Falar com especialista",
      ),
      secondaryLabel: field.string("Texto do botão secundário", "Ver soluções"),
    }),
  },
});
