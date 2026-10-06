// ID do projeto e dataset não são segredo (aparecem nas URLs das imagens e o
// dataset é de leitura pública): ficam no código para o site ler o Sanity sem
// configurar variável no ambiente de deploy. A variável, se existir, prevalece.
export const SANITY_PROJECT_ID = "7yx694ed";
export const SANITY_DATASET = "production";

// Leitura por nome literal: o Next só embute no bundle do client as
// referências estáticas a process.env (o sanity.config também roda no browser).
export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || SANITY_DATASET;

// Data fixa: o Content Lake congela o comportamento da API nessa versão.
export const sanityApiVersion = "2026-09-01";

// Defesa contra variável malformada no ambiente; com ela inválida o site lê
// o conteúdo local de src/data.
export const isSanityConfigured = /^[a-z0-9-]+$/.test(sanityProjectId);
