import { toPlainText, type PortableTextBlock } from "next-sanity";

// Tópicos do artigo. `articleSections` é o sumário do corpo de demonstração
// (ArticleBody sem conteúdo do CMS); com CMS, o sumário sai dos h2 do corpo.
// Nos dois casos o id é o slug do título.
export type ArticleSection = { id: string; title: string; key?: string };

export const articleSections: ArticleSection[] = [
  "Locação ou compra: a pergunta certa não é o preço",
  "Cinco cenários em que a locação costuma vencer",
  "Como calcular o ponto de virada",
  "Quando a compra faz mais sentido",
  "O custo que não aparece na proposta: disponibilidade",
].map((title) => ({ id: slugify(title), title }));

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Sumário a partir dos h2 do corpo. O id vem do texto do título (o link
 * âncora continua valendo enquanto o título não mudar); títulos repetidos
 * recebem sufixo -2, -3...
 */
export function getArticleSections(body: PortableTextBlock[]): ArticleSection[] {
  const used = new Map<string, number>();
  return body
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block, i) => {
      const title = toPlainText(block);
      const base = slugify(title) || `secao-${i + 1}`;
      const count = (used.get(base) ?? 0) + 1;
      used.set(base, count);
      return {
        id: count === 1 ? base : `${base}-${count}`,
        title,
        key: block._key,
      };
    });
}
