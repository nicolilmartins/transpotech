import { defineConfig, defineLocaleResourceBundle } from "sanity";
import { structureTool } from "sanity/structure";
import { ptBRLocale } from "@sanity/locale-pt-br";
import { fixedTypes, schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

// O build do Studio (sanity deploy/dev) só expõe variáveis SANITY_STUDIO_*.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "transpotech",
  title: "TranspoTech",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), ptBRLocale()],
  // A tradução oficial diz "Todos os campos"; o cliente pediu "Tudo".
  i18n: {
    bundles: [
      defineLocaleResourceBundle({
        locale: "pt-BR",
        namespace: "studio",
        resources: { "inputs.object.field-group-tabs.all-fields-title": "Tudo" },
      }),
    ],
  },
  schema: {
    types: schemaTypes,
    // Tipos fixos não aparecem no menu "criar novo".
    templates: (templates) =>
      templates.filter(({ schemaType }) => !fixedTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      fixedTypes.has(schemaType)
        ? actions.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : actions,
  },
});
