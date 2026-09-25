import { defineArrayMember, defineField, defineType } from "sanity";
import { sanityApiVersion } from "../env";

// Os valores são as chaves de FaqPageKey em src/sanity/queries/faq.ts: cada
// página do site busca o documento pela chave, então elas não podem mudar.
const faqPages = [
  { value: "automacao", title: "Automação intralogística" },
  { value: "baterias", title: "Baterias e carregadores" },
  { value: "canal-transparencia", title: "Canal da transparência" },
  { value: "contato", title: "Contato" },
  {
    value: "empilhadeiras",
    title: "Empilhadeiras novas e Locação de empilhadeiras",
  },
  { value: "ouvidoria", title: "Ouvidoria digital" },
  { value: "pecas", title: "Peças" },
  { value: "pneus", title: "Pneus" },
  { value: "seminovas", title: "Empilhadeiras seminovas" },
  { value: "servicos", title: "Serviços" },
];

export const faqPage = defineType({
  name: "faqPage",
  title: "Perguntas frequentes",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Página",
      description:
        "Página do site onde estas perguntas aparecem. Cada página tem um único documento.",
      type: "string",
      options: { list: faqPages, layout: "radio" },
      validation: (r) =>
        r.required().custom(async (page, context) => {
          if (!page) return true;
          const id = context.document?._id.replace(/^drafts\./, "");
          const duplicate = await context
            .getClient({ apiVersion: sanityApiVersion })
            .fetch<boolean>(
              `count(*[_type == "faqPage" && page == $page && !(_id in [$id, "drafts." + $id])]) > 0`,
              { page, id },
            );
          return duplicate
            ? "Já existe um documento de perguntas para esta página."
            : true;
        }),
    }),
    defineField({
      name: "items",
      title: "Perguntas",
      description:
        "Aparecem no site na ordem desta lista; arraste para reordenar.",
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          name: "faqItem",
          title: "Pergunta",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Pergunta",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "answer",
              title: "Resposta",
              type: "text",
              rows: 4,
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { page: "page", items: "items" },
    prepare({ page, items }: { page?: string; items?: unknown[] }) {
      return {
        title:
          faqPages.find((p) => p.value === page)?.title ??
          "Página não definida",
        subtitle: `${items?.length ?? 0} pergunta(s)`,
      };
    },
  },
});
