import { defineField } from "sanity";
import type { ForkliftBrand } from "@/types/forklift.types";

// Campos de card/filtro comuns a novas e seminovas (tipo Forklift).
//
// As listas fechadas reproduzem os valores que existem hoje: o catálogo de
// novas conta e filtra por igualdade de texto (catalog.tsx, facetMatch), e
// stateFromLocation (src/data/forklifts-novas.ts) só conhece as UFs listadas
// em "Localização". Valor novo aqui precisa de ajuste lá.

const brands: { value: ForkliftBrand; title: string }[] = [
  { value: "STILL", title: "STILL" },
  { value: "Linde", title: "Linde" },
  { value: "Baoli", title: "Baoli" },
];

const energyTags = ["Elétrica", "Combustão"];

const equipmentTypes = ["Contrabalançada", "Patolada", "Retrátil", "Transpaleteira"];

const applications = [
  "Armazenagem vertical e picking",
  "Carga e descarga de veículos",
  "Carga, descarga e transporte interno",
  "Movimentação horizontal e abastecimento",
  "Operações externas e cargas pesadas",
];

const energies = [
  "Elétrica",
  "Elétrica (Li-Ion)",
  "Elétrica 24V (Li-Ion)",
  "Elétrica 48V",
  "Elétrica 80V (Li-Ion)",
  "Diesel",
  "Diesel/GLP",
];

const availabilities = ["Pronta entrega", "Sob consulta"];

const locations = ["Curitiba - PR", "Joinville - SC", "Porto Alegre - RS", "São Paulo - SP"];

export const forkliftGroups = [
  { name: "card", title: "Card e filtros" },
  { name: "detail", title: "Página do equipamento" },
];

// Formatos que o catálogo converte em número para os filtros de faixa
// ("1,6 t", "2,5 – 3,5 t", "5.400 mm").
const TONS = /^\d+(,\d+)? t$|^\d+(,\d+)? – \d+(,\d+)? t$/;
const MM = /^\d{1,3}(\.\d{3})* mm$/;

export const forkliftCardFields = [
  defineField({
    name: "name",
    title: "Nome do equipamento",
    description: "Título do card e da página. Ex.: Empilhadeira Elétrica STILL RX 20.",
    type: "string",
    group: "card",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "slug",
    title: "Endereço da página (URL)",
    description:
      "Gerado a partir do nome. Mudar depois de publicado quebra links já compartilhados.",
    type: "slug",
    group: "card",
    options: { source: "name", maxLength: 96 },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "image",
    title: "Foto do equipamento",
    description:
      "Recorte com fundo transparente. O texto alternativo usado no site é o nome do equipamento.",
    type: "imageWithAlt",
    group: "card",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "brand",
    title: "Marca",
    type: "string",
    group: "card",
    options: { list: brands, layout: "radio", direction: "horizontal" },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "energyTag",
    title: "Categoria de energia",
    description: "Etiqueta cinza do card.",
    type: "string",
    group: "card",
    options: { list: energyTags, layout: "radio", direction: "horizontal" },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "equipmentType",
    title: "Tipo de equipamento",
    description: "Usado no filtro “Tipo de equipamento”.",
    type: "string",
    group: "card",
    options: { list: equipmentTypes },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "application",
    title: "Aplicação",
    description: "Subtítulo do card e da página.",
    type: "string",
    group: "card",
    options: { list: applications },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "capacity",
    title: "Capacidade",
    description: "Formato “1,6 t” ou faixa “2,5 – 3,5 t” (usado no filtro de capacidade).",
    type: "string",
    group: "card",
    validation: (r) =>
      r.required().regex(TONS, { name: "capacidade, ex.: 1,6 t ou 2,5 – 3,5 t" }),
  }),
  defineField({
    name: "energy",
    title: "Energia (especificação)",
    description: "Especificação exibida no card e usada no filtro “Energia”.",
    type: "string",
    group: "card",
    options: { list: energies },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "liftHeight",
    title: "Elevação",
    description: "Altura máxima de elevação. Formato “5.400 mm”.",
    type: "string",
    group: "card",
    validation: (r) => r.required().regex(MM, { name: "milímetros, ex.: 5.400 mm" }),
  }),
  defineField({
    name: "aisleWidth",
    title: "Corredor operacional",
    description: "Largura mínima de corredor. Formato “2.400 mm”.",
    type: "string",
    group: "card",
    validation: (r) => r.required().regex(MM, { name: "milímetros, ex.: 2.400 mm" }),
  }),
  defineField({
    name: "availability",
    title: "Disponibilidade",
    type: "string",
    group: "card",
    options: { list: availabilities, layout: "radio", direction: "horizontal" },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "location",
    title: "Localização",
    type: "string",
    group: "card",
    options: { list: locations },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "order",
    title: "Ordem",
    description: "Posição na listagem (menor aparece primeiro).",
    type: "number",
    group: "card",
    validation: (r) => r.required().integer().min(0),
  }),
];

export const forkliftOrderings = [
  {
    title: "Ordem na listagem",
    name: "orderAsc",
    by: [{ field: "order", direction: "asc" as const }],
  },
];

export const forkliftPreview = {
  select: { title: "name", subtitle: "location", media: "image" },
};
