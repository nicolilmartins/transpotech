import { documentTypeOf } from "./content/fields";
import { pages } from "./content/pages";

// Tipos de documento do Studio, sem importar os schemas (que puxam o pacote
// `sanity` inteiro): o webhook de revalidação recusa tipo fora desta lista.
// Os de página derivam de ./content/pages; os demais, mantenha em sincronia
// com schemaTypes em ./schemas (o Studio não sobe se divergirem).
export const pageDocumentTypes = pages.map((page) => documentTypeOf(page.key));

export const documentTypes = [
  ...pageDocumentTypes,
  "siteSettings",
  "forkliftNew",
  "forkliftUsed",
  "article",
  "unit",
  "esgProject",
  "faqPage",
];
