import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { pageDocumentTypes } from "./document-types";
import { schemaTypes, singletonTypes } from "./schemas";

const pageTypes = new Set<string>(pageDocumentTypes);

function singleton(S: StructureBuilder, name: string, title: string) {
  return S.listItem()
    .title(title)
    .id(name)
    .child(S.document().schemaType(name).documentId(name).title(title));
}

// Singleton abre direto no documento de _id igual ao nome do tipo. As páginas
// ficam agrupadas em "Páginas"; os demais tipos viram listas, na ordem de
// schemaTypes.
export const structure: StructureResolver = (S) => {
  const documents = schemaTypes.filter((type) => type.type === "document");
  const pages = documents.filter((type) => pageTypes.has(type.name));

  return S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Páginas")
        .id("pages")
        .child(
          S.list()
            .title("Páginas")
            .items(pages.map((type) => singleton(S, type.name, type.title ?? type.name))),
        ),
      S.divider(),
      ...documents
        .filter((type) => !pageTypes.has(type.name))
        .map((type) =>
          singletonTypes.has(type.name)
            ? singleton(S, type.name, type.title ?? type.name)
            : S.documentTypeListItem(type.name),
        ),
    ]);
};
