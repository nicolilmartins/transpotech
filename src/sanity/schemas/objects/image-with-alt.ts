import { defineField, defineType } from "sanity";

// Sem crop/hotspot: o site usa as dimensões originais do asset (ver
// src/sanity/image.ts), e um recorte feito no Studio não chegaria à página.
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Imagem",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      description:
        "Descreve a imagem para leitores de tela e Google. Deixe vazio se for só decorativa.",
      type: "string",
    }),
  ],
});
