// Tópicos do artigo (demo). Fonte única para os títulos das seções do corpo
// (ArticleBody) e para o sumário/índice (ArticleToc).
export type ArticleSection = { id: string; title: string };

export const articleSections: ArticleSection[] = [
  {
    id: "locacao-ou-compra",
    title: "Locação ou compra: a pergunta certa não é o preço",
  },
  {
    id: "cenarios-locacao",
    title: "Cinco cenários em que a locação costuma vencer",
  },
  { id: "ponto-de-virada", title: "Como calcular o ponto de virada" },
  { id: "quando-comprar", title: "Quando a compra faz mais sentido" },
  {
    id: "disponibilidade",
    title: "O custo que não aparece na proposta: disponibilidade",
  },
];
