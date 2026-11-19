import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./env";

// Dataset público só para leitura: nenhum token no site. useCdn desligado
// porque a revalidação precisa ler o conteúdo recém-publicado, e o CDN da API
// do Sanity pode devolver a versão anterior por alguns segundos.
const client = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;

const REVALIDATE_SECONDS = 60;

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  /** Tipos de documento lidos pela query; o webhook (opcional) revalida por `_type`. */
  tags: string[];
};

/**
 * Retorna `null` quando o projeto do Sanity não está configurado, para o
 * chamador cair no conteúdo local de src/data.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: SanityFetchOptions): Promise<T | null> {
  if (!client) return null;
  // Em dev, sem cache: a edição no Studio aparece ao recarregar a página.
  if (process.env.NODE_ENV === "development") {
    return client.fetch<T>(query, params, { cache: "no-store" });
  }
  // Publicado: a página é regerada em segundo plano no máximo a cada
  // REVALIDATE_SECONDS, sem depender do webhook (que exige um segredo no
  // ambiente de deploy). Com o webhook configurado, a tag atualiza na hora.
  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });
}
