import type { StaticImageData } from "next/image";
import post1 from "@/assets/images/blog/post1.png";
import post2 from "@/assets/images/blog/post2.png";
import post3 from "@/assets/images/blog/post3.jpg";
import post4 from "@/assets/images/blog/post4.png";
import locacaoForklift from "@/assets/images/hero-image-locacao-de-empilhadeiras.webp";
import heroQuemSomos from "@/assets/images/hero-quem-somos.webp";
import fachada from "@/assets/images/fachada-transpotech.webp";

export type ArticleCategory =
  | "Institucional"
  | "Locação"
  | "Empilhadeiras novas"
  | "Automação"
  | "Cases de cliente";

export type ArticleType = "Notícia" | "Guia" | "Case";

export type Article = {
  id: string;
  category: ArticleCategory;
  type: ArticleType;
  title: string;
  excerpt: string;
  /** Data de exibição (curta) e ISO para ordenação. */
  date: string;
  dateISO: string;
  readTime: string;
  author: string;
  image: StaticImageData;
};

// Conteúdo do wireframe (placeholder — você ajusta depois). Imagens: blog/post1-4.
export const articles: Article[] = [
  {
    id: "premio-pos-vendas-linde-still",
    category: "Institucional",
    type: "Notícia",
    title:
      "TranspoTech conquista prêmio nacional de pós-vendas da Linde e STILL",
    excerpt:
      "Reconhecimento coloca a operação de pós-vendas da TranspoTech entre as melhores da rede autorizada Linde e STILL no Brasil.",
    date: "12 mai 2026",
    dateISO: "2026-05-12",
    readTime: "3 min",
    author: "Equipe TranspoTech",
    image: fachada,
  },
  {
    id: "quando-vale-locar-empilhadeiras",
    category: "Locação",
    type: "Guia",
    title: "Quando vale mais a pena locar empilhadeiras",
    excerpt:
      "Cinco cenários operacionais em que locação supera compra, e como calcular o ponto de virada.",
    date: "22 abr 2026",
    dateISO: "2026-04-22",
    readTime: "6 min",
    author: "Equipe TranspoTech",
    image: locacaoForklift,
  },
  {
    id: "nova-unidade-joinville",
    category: "Locação",
    type: "Notícia",
    title: "TranspoTech inaugura nova unidade em Joinville",
    excerpt:
      "Operação amplia atendimento e estoque de peças para clientes do norte de Santa Catarina.",
    date: "04 mai 2026",
    dateISO: "2026-05-04",
    readTime: "2 min",
    author: "Equipe TranspoTech",
    image: heroQuemSomos,
  },
  {
    id: "linde-e20-e50-x-elite",
    category: "Empilhadeiras novas",
    type: "Notícia",
    title: "Linde lança no Brasil a nova linha elétrica E20–E50 X ELITE",
    excerpt:
      "Modelos chegam com bateria de íons de lítio integrada e ganho de até 20% em ciclos por turno.",
    date: "01 mai 2026",
    dateISO: "2026-05-01",
    readTime: "3 min",
    author: "Equipe TranspoTech",
    image: post3,
  },
  {
    id: "cimine-2026-automacao",
    category: "Automação",
    type: "Notícia",
    title:
      "Cimine 2026: TranspoTech apresenta soluções de automação intralogística",
    excerpt:
      "Estande integrado mostra AGVs, WMS e empilhadeiras conectadas em ambiente de operação real.",
    date: "26 abr 2026",
    dateISO: "2026-04-26",
    readTime: "2 min",
    author: "Equipe TranspoTech",
    image: post4,
  },
  {
    id: "padronizacao-manutencao-cd",
    category: "Cases de cliente",
    type: "Case",
    title: "Padronização de manutenção multimarcas em CD com 60+ equipamentos",
    excerpt:
      "Substituição de fornecedor pulverizado por contrato único PM2P, com SLA de 4h e dashboard de disponibilidade.",
    date: "20 abr 2026",
    dateISO: "2026-04-20",
    readTime: "5 min",
    author: "Equipe TranspoTech",
    image: post1,
  },
  {
    id: "locacao-flexivel-pico-safra",
    category: "Cases de cliente",
    type: "Case",
    title: "Locação flexível pra absorver pico sazonal de safra",
    excerpt:
      "Frota base de 12 equipamentos + 8 sob demanda nos meses de pico, sem comprometer CAPEX.",
    date: "15 abr 2026",
    dateISO: "2026-04-15",
    readTime: "5 min",
    author: "Equipe TranspoTech",
    image: post2,
  },
];

/** Artigo em destaque (Notícia em destaque do Portal de Conteúdo). */
export const featuredArticle = articles[0];

/** Busca um artigo pelo id (slug da rota de detalhe). */
export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

/**
 * Artigos relacionados a um artigo: prioriza a mesma categoria (excluindo o
 * próprio) e completa com os demais até `limit`.
 */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const others = articles.filter((item) => item.id !== article.id);
  const sameCategory = others.filter(
    (item) => item.category === article.category
  );
  const rest = others.filter((item) => item.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Data por extenso em pt-BR a partir do ISO (ex.: "22 de abril de 2026"). */
export function formatLongDate(dateISO: string): string {
  return new Date(`${dateISO}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
