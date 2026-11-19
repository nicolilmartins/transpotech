import { defineQuery, type PortableTextBlock } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  HOME_ARTICLE_IDS,
  HOME_ARTICLE_LIMIT,
} from "@/components/home/blog-section/home-articles";
import { imageProjection, type CmsImage } from "@/sanity/image";
import {
  articles as localArticles,
  type Article,
  type ArticleCategory,
  type ArticleType,
} from "@/data/articles";

/** Artigo da página de detalhe. Sem `body` = corpo de demonstração local. */
export type ArticleDetail = Article & { body?: PortableTextBlock[] };

export type ArticleSitemapEntry = { slug: string; dateISO: string };

type CmsArticle = {
  id: string;
  category: ArticleCategory;
  type: ArticleType;
  title: string;
  excerpt: string;
  dateISO: string;
  readTime: number;
  author: string;
  image: CmsImage;
};

const MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

/**
 * "2026-05-04" → "04 mai 2026", o formato curto dos cards. Montado à mão
 * porque o Intl pt-BR abrevia o mês com ponto ("mai.").
 */
export function formatShortDate(dateISO: string): string {
  const [year, month, day] = dateISO.split("-");
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}

function toArticle({ readTime, ...article }: CmsArticle): Article {
  return {
    ...article,
    date: formatShortDate(article.dateISO),
    readTime: `${readTime} min`,
  };
}

const articleFields = `
  "id": slug.current,
  category,
  type,
  title,
  excerpt,
  "dateISO": date,
  readTime,
  author,
  "image": image${imageProjection}
`;

const articlesQuery = defineQuery(`*[_type == "article" && defined(slug.current)] | order(order asc) {
  ${articleFields}
}`);

// Referência a artigo apagado vira null no ->; o filtro por id a descarta.
// Os parênteses fazem o filtro valer sobre a lista; sem eles o GROQ o aplica a
// cada item e a referência apagada (null) continua lá.
const homeArticlesQuery = defineQuery(`(*[_id == "page_home"][0].blog.articles[]->{
  ${articleFields}
})[defined(id)][0...${HOME_ARTICLE_LIMIT}]`);

const articleBySlugQuery = defineQuery(`*[_type == "article" && slug.current == $slug][0] {
  ${articleFields},
  "body": coalesce(body, [])
}`);

const articleSitemapQuery = defineQuery(`*[_type == "article" && defined(slug.current)] | order(order asc) {
  "slug": slug.current,
  "dateISO": date
}`);

/** Todos os artigos, na ordem da listagem (o primeiro é o destaque). Sem corpo. */
export async function getArticles(): Promise<Article[]> {
  const data = await sanityFetch<CmsArticle[]>({
    query: articlesQuery,
    tags: ["article"],
  });
  return data ? data.map(toArticle) : localArticles;
}

/**
 * Artigos da seção de blog da home, na ordem de "Artigos em destaque" na
 * página Home do Studio: o primeiro é o destaque.
 */
export async function getHomeArticles(): Promise<Article[]> {
  const data = await sanityFetch<CmsArticle[] | null>({
    query: homeArticlesQuery,
    tags: ["page_home", "article"],
  });
  if (data) return data.map(toArticle);
  // Com o Sanity configurado, null é lista vazia ou página Home ausente.
  if (isSanityConfigured) return [];
  return HOME_ARTICLE_IDS.map((id) =>
    localArticles.find((article) => article.id === id)
  ).filter((article): article is Article => Boolean(article));
}

const SLUG_FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function getArticleBySlug(
  slug: string
): Promise<ArticleDetail | undefined> {
  // Slug fora do formato do Studio nem chega à API: cada slug novo seria uma
  // consulta sem CDN (e um item a mais no cache).
  if (!SLUG_FORMAT.test(slug)) return undefined;
  const data = await sanityFetch<
    (CmsArticle & { body: PortableTextBlock[] }) | null
  >({
    query: articleBySlugQuery,
    params: { slug },
    tags: ["article"],
  });
  if (data) return { ...toArticle(data), body: data.body };
  // Com o Sanity configurado, null é slug inexistente, não falta de CMS.
  if (isSanityConfigured) return undefined;
  return localArticles.find((article) => article.id === slug);
}

/** Slug e data de todos os artigos, para o sitemap e o generateStaticParams. */
export async function getArticleSitemapEntries(): Promise<ArticleSitemapEntry[]> {
  const data = await sanityFetch<ArticleSitemapEntry[]>({
    query: articleSitemapQuery,
    tags: ["article"],
  });
  return (
    data ??
    localArticles.map((article) => ({
      slug: article.id,
      dateISO: article.dateISO,
    }))
  );
}

/**
 * Relacionados: prioriza a mesma categoria (excluindo o próprio artigo) e
 * completa com os demais até `limit`.
 */
export async function getRelatedArticles(
  article: Article,
  limit = 3
): Promise<Article[]> {
  const others = (await getArticles()).filter((item) => item.id !== article.id);
  const sameCategory = others.filter(
    (item) => item.category === article.category
  );
  const rest = others.filter((item) => item.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
