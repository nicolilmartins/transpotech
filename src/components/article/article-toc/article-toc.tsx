import { articleSections } from "../article-sections";

// Sumário/índice do artigo — tópicos como links âncora para as seções do corpo.
export function ArticleToc() {
  return (
    <nav
      aria-label="Sumário do artigo"
      className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-4"
    >
      <span className="text-body-sm font-semibold text-neutral-800">
        Neste artigo
      </span>
      <ul className="flex flex-col gap-2">
        {articleSections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-body-sm leading-[1.35] text-neutral-600 transition-colors hover:text-primary-500"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
