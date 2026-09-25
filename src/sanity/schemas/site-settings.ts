import { defineField, defineType } from "sanity";

const socialField = (name: string, title: string) =>
  defineField({
    name,
    title,
    description:
      "Link completo do perfil. Vazio, o ícone continua no rodapé sem destino.",
    type: "url",
    validation: (r) => r.uri({ scheme: ["https", "http"] }),
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  groups: [
    { name: "links", title: "Links externos" },
    { name: "social", title: "Redes sociais" },
    { name: "seo", title: "SEO padrão" },
  ],
  fields: [
    defineField({
      name: "careersUrl",
      title: "Portal de carreiras (Gupy)",
      description:
        'Destino de "Trabalhe conosco" no menu e no rodapé e do botão "Ver vagas no Gupy" em Quem Somos.',
      type: "url",
      group: "links",
      validation: (r) => r.required().uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "ouvidorDigitalUrl",
      title: "Canal de relatos (Ouvidor Digital)",
      description:
        'Destino de "Fazer um relato" no Canal da Transparência e de "Acessar Canal da Transparência" na Ouvidoria Digital.',
      type: "url",
      group: "links",
      validation: (r) => r.required().uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "social",
      title: "Redes sociais",
      description: "Ícones do rodapé.",
      type: "object",
      group: "social",
      options: { collapsible: false },
      fields: [
        socialField("facebook", "Facebook"),
        socialField("instagram", "Instagram"),
        socialField("linkedin", "LinkedIn"),
        socialField("youtube", "YouTube"),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO padrão",
      description:
        "Usado pelo Google e nas pré-visualizações de links compartilhados quando a página não define os próprios.",
      type: "object",
      group: "seo",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "description",
          title: "Descrição para o Google",
          description:
            "Texto que aparece abaixo do título nos resultados de busca. Ideal: até 160 caracteres.",
          type: "text",
          rows: 3,
          validation: (r) => r.required().max(200),
        }),
        defineField({
          name: "shareDescription",
          title: "Descrição ao compartilhar",
          description:
            "Texto da pré-visualização em WhatsApp, LinkedIn e outras redes.",
          type: "text",
          rows: 3,
          validation: (r) => r.required().max(200),
        }),
        defineField({
          name: "shareImage",
          title: "Imagem ao compartilhar",
          description: "Opcional. Proporção 1200 × 630 px.",
          type: "imageWithAlt",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configurações do site" };
    },
  },
});
