import { sanityFetch } from "../client";
import { documentTypeOf, type PageContent, type PageDefinition } from "../content/fields";
import { mergePage } from "../content/merge";
import { pageProjection } from "../content/projection";

/** Todo o conteúdo editável da página, com o conteúdo atual onde o CMS estiver vazio. */
export async function getPage<P extends PageDefinition>(page: P): Promise<PageContent<P>> {
  const type = documentTypeOf(page.key);
  const raw = await sanityFetch<Record<string, unknown> | null>({
    query: `*[_id == $id][0]${pageProjection(page)}`,
    params: { id: type },
    tags: [type],
  });
  return mergePage(page, raw);
}
