import type { StaticImageData } from "next/image";

/**
 * Descrição do conteúdo editável de uma página. Uma definição só gera o schema
 * do Studio, a projeção GROQ, o seed e o tipo que o componente recebe; os
 * `default` são o conteúdo atual do site (fallback sem Sanity, campo vazio no
 * CMS e fonte do seed).
 */
type FieldBase = { title: string; description?: string };

export type StringField = FieldBase & { kind: "string"; default: string };
export type TextField = FieldBase & { kind: "text"; default: string };
export type ImageField = FieldBase & {
  kind: "image";
  default: StaticImageData;
  /** Alt atual da foto; vazio = decorativa. O alt preenchido no Studio tem prioridade. */
  alt?: string;
};

/**
 * Lista ordenada de documentos de outro tipo (ex.: artigos em destaque). O
 * valor é a lista de _id; quem exibe busca os documentos pela própria query.
 */
export type ReferencesField = FieldBase & {
  kind: "references";
  to: string;
  default: string[];
  max?: number;
};

/** Imagem com o alt já resolvido (Studio ou o atual do código). */
export type ContentImage = StaticImageData & { alt: string };
export type ListField<I extends Fields = Fields> = FieldBase & {
  kind: "list";
  /** Nome de cada item no Studio (ex.: "Card"). */
  itemTitle: string;
  of: I;
  default: DefaultValues<I>[];
  /**
   * Quantidade presa à atual: o layout (ou arte/ícone por posição no código)
   * depende do número de itens.
   */
  fixed?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- lista aninhada de qualquer formato
export type Field = StringField | TextField | ImageField | ReferencesField | ListField<any>;
export type Fields = Record<string, Field>;

export type FieldValue<F extends Field> =
  F extends ListField<infer I>
    ? Values<I>[]
    : F extends ImageField
      ? ContentImage
      : F extends ReferencesField
        ? string[]
        : string;

export type Values<F extends Fields> = { [K in keyof F]: FieldValue<F[K]> };

/** Formato dos `default` na definição: imagem importada, sem alt resolvido. */
export type DefaultValue<F extends Field> =
  F extends ListField<infer I>
    ? DefaultValues<I>[]
    : F extends ImageField
      ? StaticImageData
      : F extends ReferencesField
        ? string[]
        : string;
export type DefaultValues<F extends Fields> = { [K in keyof F]: DefaultValue<F[K]> };

export type Section<F extends Fields = Fields> = { title: string; fields: F };
export type PageDefinition<S extends Record<string, Section> = Record<string, Section>> = {
  /** Chave estável; o tipo e o _id do documento derivam dela (ver documentTypeOf). */
  key: string;
  /** Nome da página no Studio. */
  title: string;
  sections: S;
};

/** Conteúdo de uma seção, para tipar a prop do componente. */
export type SectionContent<S extends Section> = Values<S["fields"]>;
/** Conteúdo da página inteira, como `getPage` devolve. */
export type PageContent<P extends PageDefinition> = {
  [K in keyof P["sections"]]: SectionContent<P["sections"][K]>;
};

export const field = {
  /** Texto de uma linha (título, rótulo de botão). */
  string: (title: string, value: string, description?: string): StringField => ({
    kind: "string",
    title,
    default: value,
    description,
  }),
  /** Parágrafo. */
  text: (title: string, value: string, description?: string): TextField => ({
    kind: "text",
    title,
    default: value,
    description,
  }),
  /**
   * Foto (não use para ilustração posicionada ou com pontos sobre ela). Passe
   * `alt` para foto com conteúdo; sem `alt`, a foto é decorativa (alt="").
   */
  image: (
    title: string,
    value: StaticImageData,
    options: { alt?: string; description?: string } | string = {},
  ): ImageField => {
    const { alt, description } =
      typeof options === "string" ? { alt: undefined, description: options } : options;
    return { kind: "image", title, default: value, alt, description };
  },
  references: (
    title: string,
    to: string,
    value: string[],
    options: { max?: number; description?: string } = {},
  ): ReferencesField => ({
    kind: "references",
    title,
    to,
    default: value,
    max: options.max,
    description: options.description,
  }),
  list: <I extends Fields>(
    title: string,
    itemTitle: string,
    of: I,
    value: DefaultValues<I>[],
    options: { fixed?: boolean; description?: string } = {},
  ): ListField<I> => ({
    kind: "list",
    title,
    itemTitle,
    of,
    default: value,
    fixed: options.fixed,
    description: options.description,
  }),
};

export function defineSection<F extends Fields>(title: string, fields: F): Section<F> {
  return { title, fields };
}

export function definePage<S extends Record<string, Section>>(
  page: PageDefinition<S>,
): PageDefinition<S> {
  return page;
}

/** Tipo (e _id) do documento da página no Sanity: "page_" + chave. */
export function documentTypeOf(key: string): string {
  return `page_${key.replaceAll("-", "_")}`;
}
