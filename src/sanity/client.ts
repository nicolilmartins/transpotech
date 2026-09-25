import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./env";

// Dataset público só para leitura: nenhum token no site. useCdn desligado
// porque a revalidação por webhook precisa ler o conteúdo recém-publicado, e
// o CDN da API do Sanity pode devolver a versão anterior por alguns segundos.
const client = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  /** Tipos de documento lidos pela query; o webhook revalida por `_type`. */
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
  // Em dev não há webhook chegando: sem cache, a edição no Studio aparece
  // ao recarregar a página.
  if (process.env.NODE_ENV === "development") {
    return client.fetch<T>(query, params, { cache: "no-store" });
  }
  return client.fetch<T>(query, params, {
    cache: "force-cache",
    next: { tags },
  });
}
