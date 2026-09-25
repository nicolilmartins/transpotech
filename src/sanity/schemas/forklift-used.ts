import { defineArrayMember, defineField, defineType } from "sanity";
import {
  forkliftCardFields,
  forkliftGroups,
  forkliftOrderings,
  forkliftPreview,
} from "./forklift-fields";

export const forkliftUsed = defineType({
  name: "forkliftUsed",
  title: "Empilhadeiras seminovas",
  type: "document",
  groups: forkliftGroups,
  fields: [
    ...forkliftCardFields,
    defineField({
      name: "year",
      title: "Ano de fabricação",
      description: "Ex.: 2020.",
      type: "string",
      group: "card",
      validation: (r) => r.required().regex(/^\d{4}$/, { name: "ano com quatro dígitos" }),
    }),
    defineField({
      name: "workedHours",
      title: "Horas trabalhadas",
      description: "Formato “6.400 h”.",
      type: "string",
      group: "card",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeria de fotos",
      description:
        "Fotos da página do equipamento; a primeira abre em destaque. Vazio: mostra só a foto do equipamento.",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
  ],
  orderings: forkliftOrderings,
  preview: forkliftPreview,
});
