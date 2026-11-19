import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import type { ArticleSection } from "../article-sections";

// Mesmo esquema aceito pelo campo de link no Studio; o renderer repete a
// checagem para um valor gravado fora do Studio (API/import) não virar
// javascript: no href.
const SAFE_HREF = /^(https?:|mailto:|tel:)/i;

function buildComponents(sections: ArticleSection[]): PortableTextComponents {
  const idByKey = new Map(sections.map((s) => [s.key, s.id]));

  return {
    block: {
      normal: ({ children }) => <p>{children}</p>,
      h2: ({ children, value }) => (
        <h2
          id={idByKey.get(value._key)}
          className="mt-4 scroll-mt-28 font-heading text-h5 font-semibold text-neutral-800"
        >
          {children}
        </h2>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="flex flex-col gap-3 pl-1">{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex gap-3">
          <span
            aria-hidden
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary-500"
          />
          <span>{children}</span>
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ children, value }) => {
        const href: unknown = value?.href;
        if (typeof href !== "string" || !SAFE_HREF.test(href)) {
          return <>{children}</>;
        }
        const external = /^https?:/i.test(href);
        return (
          <a
            href={href}
            className="font-semibold text-primary-500 underline underline-offset-2 transition-colors hover:text-primary-600"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        );
      },
    },
  };
}

export function ArticlePortableText({
  value,
  sections,
}: {
  value: PortableTextBlock[];
  sections: ArticleSection[];
}) {
  return <PortableText value={value} components={buildComponents(sections)} />;
}
