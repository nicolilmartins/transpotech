import { defineArrayMember, defineField, defineType } from "sanity";
import type { IconKey } from "@/data/forklift-details";
import {
  forkliftCardFields,
  forkliftGroups,
  forkliftOrderings,
  forkliftPreview,
} from "./forklift-fields";

const iconTitles: Record<IconKey, string> = {
  gauge: "Medidor",
  shield: "Escudo",
  zap: "Raio",
  shuffle: "Setas cruzadas",
  wifi: "Conexão sem fio",
  badge: "Selo",
  sliders: "Controles deslizantes",
  wrench: "Chave inglesa",
  pin: "Marcador de mapa",
};

const iconOptions = Object.entries(iconTitles).map(([value, title]) => ({ value, title }));

const DEFAULT_HINT = "Deixe vazio para usar o conteúdo padrão das empilhadeiras novas.";

export const forkliftNew = defineType({
  name: "forkliftNew",
  title: "Empilhadeiras novas",
  type: "document",
  groups: forkliftGroups,
  fields: [
    ...forkliftCardFields,
    defineField({
      name: "madeInBrazil",
      title: "Fabricação nacional",
      description: "Exibe o selo da bandeira do Brasil sobre a foto.",
      type: "boolean",
      group: "card",
      initialValue: false,
    }),
    defineField({
      name: "tagline",
      title: "Frase de apresentação",
      description: `Usada na descrição da página para o Google. ${DEFAULT_HINT}`,
      type: "string",
      group: "detail",
    }),
    defineField({
      name: "highlights",
      title: "Destaques rápidos",
      description: DEFAULT_HINT,
      type: "array",
      group: "detail",
      // Oculto até a página exibir (hoje nenhuma seção usa este campo).
      hidden: true,
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "intro",
      title: "Cabeçalho dos atributos",
      description: `Título em duas partes (a segunda em laranja) e texto. ${DEFAULT_HINT}`,
      type: "object",
      group: "detail",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "titleTop", title: "Título — primeira parte", type: "string" }),
        defineField({
          name: "titleBottom",
          title: "Título — parte em destaque",
          type: "string",
        }),
        defineField({ name: "description", title: "Texto", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "blocks",
      title: "Atributos do modelo",
      description: DEFAULT_HINT,
      type: "array",
      group: "detail",
      of: [
        defineArrayMember({
          type: "object",
          name: "detailBlock",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              options: { list: iconOptions },
              // Oculto: a seção de atributos não exibe ícone.
              hidden: true,
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Foto do palco",
      description:
        "Imagem grande que amplia ao rolar a página. Vazio: usa a foto do equipamento, inteira.",
      type: "imageWithAlt",
      group: "detail",
    }),
    defineField({
      name: "heroFit",
      title: "Enquadramento da foto do palco",
      type: "string",
      group: "detail",
      options: {
        list: [
          { value: "cover", title: "Preencher (foto de ambiente)" },
          { value: "contain", title: "Inteira (recorte com fundo transparente)" },
        ],
        layout: "radio",
      },
      initialValue: "cover",
      hidden: ({ parent }) => !parent?.heroImage,
    }),
    defineField({
      name: "cardImages",
      title: "Fotos dos atributos",
      description: `Uma por atributo, na mesma ordem. ${DEFAULT_HINT}`,
      type: "array",
      group: "detail",
      // Oculto até a página exibir (hoje nenhuma seção usa este campo).
      hidden: true,
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "galleryWide",
      title: "Galeria — foto ampla",
      description: `Preencha junto com o par de fotos. ${DEFAULT_HINT}`,
      type: "imageWithAlt",
      group: "detail",
      // Oculto até a página exibir (hoje nenhuma seção usa este campo).
      hidden: true,
      validation: (r) =>
        r.custom((value, context) => {
          const pair = (context.parent as { galleryPair?: unknown[] } | undefined)
            ?.galleryPair;
          return !value && pair?.length ? "Preencha a foto ampla junto com o par." : true;
        }),
    }),
    defineField({
      name: "galleryPair",
      title: "Galeria — par de fotos",
      description: "Exatamente duas fotos, exibidas lado a lado.",
      type: "array",
      group: "detail",
      // Oculto até a página exibir (hoje nenhuma seção usa este campo).
      hidden: true,
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (r) =>
        r.custom((value, context) => {
          const wide = (context.parent as { galleryWide?: unknown } | undefined)?.galleryWide;
          if (!value?.length) return wide ? "Adicione duas fotos junto com a foto ampla." : true;
          return value.length === 2 ? true : "Use exatamente duas fotos.";
        }),
    }),
    defineField({
      name: "datasheetHref",
      title: "Link da ficha técnica",
      description: `Endereço do PDF ou página (ex.: /contato). ${DEFAULT_HINT}`,
      type: "url",
      group: "detail",
      validation: (r) =>
        r.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
    }),
  ],
  orderings: forkliftOrderings,
  preview: forkliftPreview,
});
