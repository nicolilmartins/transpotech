import {
  defineArrayMember,
  defineField,
  defineType,
  type FieldDefinition,
  type StringRule,
} from "sanity";
import { documentTypeOf, type Field, type Fields, type PageDefinition } from "./fields";
import { SectionField } from "./section-field";

// Aviso (não erro) quando o texto passa bastante do atual: o layout foi
// desenhado para o tamanho de hoje e pode quebrar linha a mais.
function lengthWarning(current: string) {
  return (rule: StringRule) =>
    rule
      .custom((value) =>
        value && current && value.length > Math.ceil(current.length * 1.3)
          ? `Bem maior que o texto original (${current.length} caracteres): confira se o layout não quebrou.`
          : true,
      )
      .warning();
}

function toField(name: string, field: Field): FieldDefinition {
  switch (field.kind) {
    case "string":
      return defineField({
        name,
        title: field.title,
        description: field.description,
        type: "string",
        validation: lengthWarning(field.default),
      });
    case "text":
      return defineField({
        name,
        title: field.title,
        description: field.description,
        type: "text",
        rows: 3,
        validation: lengthWarning(field.default),
      });
    case "image":
      return defineField({
        name,
        title: field.title,
        description: field.description,
        type: "imageWithAlt",
      });
    case "references":
      return defineField({
        name,
        title: field.title,
        description: field.description,
        type: "array",
        of: [defineArrayMember({ type: "reference", to: [{ type: field.to }] })],
        validation: (rule) => (field.max ? rule.max(field.max).unique() : rule.unique()),
      });
    case "list": {
      const firstText = Object.entries(field.of as Fields).find(
        ([, f]) => f.kind === "string" || f.kind === "text",
      )?.[0];
      const firstImage = Object.entries(field.of as Fields).find(([, f]) => f.kind === "image")?.[0];
      const count = field.default.length;
      return defineField({
        name,
        title: field.title,
        description:
          field.description ??
          (field.fixed ? `Exatamente ${count} itens: o layout depende dessa quantidade.` : undefined),
        type: "array",
        of: [
          defineArrayMember({
            name: "item",
            title: field.itemTitle,
            type: "object",
            fields: toFields(field.of),
            preview: { select: { title: firstText ?? "", media: firstImage ?? "" } },
          }),
        ],
        validation: field.fixed
          ? (rule) => rule.length(count).error(`Use exatamente ${count} itens.`)
          : undefined,
      });
    }
  }
}

function toFields(fields: Fields): FieldDefinition[] {
  return Object.entries(fields).map(([name, field]) => toField(name, field));
}

/** Documento único da página: uma seção por objeto, na ordem da página. */
export function pageDocumentType(page: PageDefinition) {
  return defineType({
    name: documentTypeOf(page.key),
    title: page.title,
    type: "document",
    fields: Object.entries(page.sections).map(([name, section]) =>
      defineField({
        name,
        title: section.title,
        description: "Campo vazio mantém o conteúdo atual do site.",
        type: "object",
        options: { collapsible: true, collapsed: true },
        components: { field: SectionField },
        fields: toFields(section.fields),
      }),
    ),
    preview: { prepare: () => ({ title: page.title }) },
  });
}
