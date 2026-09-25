import { defineField, defineType } from "sanity";

export const unit = defineType({
  name: "unit",
  title: "Unidades",
  type: "document",
  fields: [
    defineField({
      name: "city",
      title: "Cidade",
      description: 'Cidade e UF separadas por " - ", ex.: "Curitiba - PR".',
      type: "string",
      validation: (r) =>
        r
          .required()
          .regex(/^.+ - [A-Z]{2}$/, { name: "Cidade - UF" })
          .error('Use o formato "Cidade - UF", ex.: "Curitiba - PR".'),
    }),
    defineField({
      name: "note",
      title: "Complemento",
      description:
        'Opcional. Diferencia unidades da mesma cidade, ex.: "Seminovas". Aparece nos cards das páginas Contato e Quem Somos.',
      type: "string",
    }),
    defineField({
      name: "footerNote",
      title: "Complemento no rodapé",
      description:
        "Opcional. Versão curta do complemento para o rodapé, exibida entre parênteses. Vazio, o rodapé usa o complemento acima.",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefone",
      description: 'Como deve aparecer no rodapé, ex.: "(41) 3377-3303".',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "address",
      title: "Endereço",
      description:
        "Rua, número e bairro (sem cidade). Usado no card da página Contato e na busca do Google Maps.",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Foto da fachada",
      description: "Aparece na galeria de unidades da página Quem Somos.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "googleProfileUrl",
      title: "Perfil no Google",
      description:
        'Link do perfil oficial da unidade no Google. Vazio, o botão "Conhecer unidade" abre a busca do endereço no Google Maps.',
      type: "url",
      validation: (r) => r.uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "order",
      title: "Ordem no rodapé e na página Contato",
      description: "Número menor aparece primeiro.",
      type: "number",
      validation: (r) => r.required().integer(),
    }),
    defineField({
      name: "galleryOrder",
      title: "Ordem na galeria de Quem Somos",
      description:
        "Número menor aparece primeiro. Vazio, a unidade vai para o fim da galeria.",
      type: "number",
      validation: (r) => r.integer(),
    }),
  ],
  orderings: [
    {
      title: "Ordem no rodapé",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Ordem na galeria de Quem Somos",
      name: "galleryOrderAsc",
      by: [{ field: "galleryOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { city: "city", note: "note", subtitle: "phone", media: "image" },
    prepare({ city, note, subtitle, media }) {
      return {
        title: note ? `${city} · ${note}` : (city ?? "Unidade sem cidade"),
        subtitle,
        media,
      };
    },
  },
});
