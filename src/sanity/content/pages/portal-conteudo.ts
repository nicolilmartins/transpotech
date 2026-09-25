import { definePage, defineSection, field } from "../fields";

export const portalConteudoPage = definePage({
  key: "portal-conteudo",
  title: "Portal de conteúdo",
  sections: {
    hero: defineSection("Banner", {
      titleRegular: field.string("Título — início", "Conhecimento para sua"),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "operação intralogística",
      ),
      description: field.text(
        "Texto de apoio",
        "Artigos técnicos, guias decisórios, cases de clientes e tendências sobre locação,\nmanutenção, automação e ESG.",
        "Enter quebra a linha só no desktop.",
      ),
    }),
    featured: defineSection("Notícia em destaque", {
      eyebrow: field.string("Texto acima do card", "Notícia em destaque"),
      buttonLabel: field.string("Texto do botão", "Ler notícia completa"),
    }),
    articleList: defineSection("Últimas notícias", {
      title: field.string("Título", "Últimas notícias"),
      resultSingular: field.string(
        "Contagem — depois do número (1 resultado)",
        "publicação encontrada.",
      ),
      resultPlural: field.string(
        "Contagem — depois do número (vários resultados)",
        "publicações encontradas.",
      ),
      searchPlaceholder: field.string(
        "Exemplo no campo de busca",
        "Buscar por título, autor ou tema",
      ),
      allLabel: field.string("Filtro que mostra todas as categorias", "Todos"),
      emptyTitle: field.string(
        "Busca sem resultado — título",
        "Nenhuma publicação encontrada",
      ),
      emptyDescription: field.text(
        "Busca sem resultado — texto",
        "Tente ajustar a busca ou os filtros.",
      ),
      loadMoreLabel: field.string(
        "Texto do botão de carregar mais",
        "Carregar mais",
      ),
      showingPrefix: field.string(
        "Rodapé da lista — antes do número exibido",
        "Mostrando",
        'Aparece como "Mostrando 6 de 12".',
      ),
      showingSeparator: field.string(
        "Rodapé da lista — entre os dois números",
        "de",
      ),
    }),
  },
});
