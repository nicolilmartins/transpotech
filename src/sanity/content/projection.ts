import { imageProjection } from "../image";
import type { Fields, PageDefinition } from "./fields";

function fieldsProjection(fields: Fields): string {
  const parts = Object.entries(fields).map(([name, field]) => {
    switch (field.kind) {
      case "image":
        return `"${name}": ${name}${imageProjection}`;
      case "references":
        return `"${name}": ${name}[]._ref`;
      case "list":
        return `"${name}": ${name}[]${fieldsProjection(field.of)}`;
      default:
        return name;
    }
  });
  return `{ ${parts.join(", ")} }`;
}

/** Projeção GROQ do documento da página, com as imagens já resolvidas. */
export function pageProjection(page: PageDefinition): string {
  const sections = Object.entries(page.sections).map(
    ([name, section]) => `"${name}": ${name}${fieldsProjection(section.fields)}`,
  );
  return `{ ${sections.join(", ")} }`;
}
