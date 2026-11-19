import { defineArrayMember, defineField, defineType } from "sanity";
import type { ArticleCategory, ArticleType } from "@/data/articles";

// Record força a lista a acompanhar os tipos do site: categoria nova em
// ArticleCategory sem entrada aqui não compila (e vice-versa).
const categories = {
  Institucional: true,
  Locação: true,
  "Empilhadeiras novas": true,
  Automação: true,
  "Cases de cliente": true,
} satisfies Record<ArticleCategory, true>;

const types = {
  Notícia: true,
  Guia: true,
  Case: true,
} satisfies Record<ArticleType, true>;

const toOptions = (values: object) =>
  Object.keys(values).map((value) => ({ title: value, value }));

export const article = defineType({
  name: "article",
  title: "Artigos do Portal de Conteúdo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço (URL)",
      description:
        "Final do link do artigo: /empresa/portal-de-conteudo/<endereço>. Gere a partir do título e evite mudar depois de publicado, para não quebrar links já compartilhados.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      description: "Também vira filtro na listagem do Portal de Conteúdo.",
      type: "string",
      options: { list: toOptions(categories), layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Tipo",
      description: "Aparece na etiqueta do artigo em destaque.",
      type: "string",
      options: { list: toOptions(types), layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      description:
        "Texto curto dos cards e da abertura do artigo. Também é a descrição usada pelo Google.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Data de publicação",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Tempo de leitura (minutos)",
      description: 'O site mostra como "5 min".',
      type: "number",
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "Equipe TranspoTech",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Imagem de capa",
      description: "O texto alternativo usado no site é o título do artigo.",
      type: "imageWithAlt",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Corpo do artigo",
      description:
        'Cada "Título de seção" vira um item do sumário "Neste artigo". O resumo já abre o artigo; não repita aqui.',
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Parágrafo", value: "normal" },
            { title: "Título de seção", value: "h2" },
          ],
          lists: [{ title: "Lista com marcadores", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "Endereço",
                    description:
                      "Link completo (https://...), e-mail (mailto:...) ou telefone (tel:...).",
                    type: "url",
                    validation: (r) =>
                      r
                        .required()
                        .uri({ scheme: ["https", "http", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      description:
        'Posição na listagem (menor aparece primeiro). O primeiro artigo é a "Notícia em destaque" do Portal de Conteúdo.',
      type: "number",
      validation: (r) => r.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Ordem na listagem",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Data de publicação (mais recente)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
