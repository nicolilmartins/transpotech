// Leitura por nome literal: o Next só embute no bundle do client as
// referências estáticas a process.env (o sanity.config também roda no browser).
export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Data fixa: o Content Lake congela o comportamento da API nessa versão.
export const sanityApiVersion = "2026-09-01";

// Sem projeto configurado o site lê os arquivos de src/data (fallback de
// desenvolvimento até o conteúdo ser importado).
export const isSanityConfigured = /^[a-z0-9-]+$/.test(sanityProjectId);
