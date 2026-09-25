import { defineField, defineType } from "sanity";

export const esgProject = defineType({
  name: "esgProject",
  title: "Projetos sociais ESG",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do projeto",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      description:
        "Aparece em laranja acima do nome. Ex.: Educação e juventude.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      description: "Texto curto do card; o site mostra no máximo três linhas.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Imagem",
      description: "O texto alternativo usado no site é o nome do projeto.",
      type: "imageWithAlt",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      description: "Posição do projeto na página (menor aparece primeiro).",
      type: "number",
      validation: (r) => r.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Ordem na página",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
