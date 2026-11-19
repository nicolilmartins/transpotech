import type { ArticleSection } from "../article-sections";

// Sumário/índice do artigo — tópicos como links âncora para as seções do corpo.
export function ArticleToc({
  sections,
  title,
}: {
  sections: ArticleSection[];
  title: string;
}) {
  return (
    <nav
      aria-label="Sumário do artigo"
      className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-4"
    >
      <span className="text-body font-semibold text-neutral-800">
        {title}
      </span>
      <ul className="flex flex-col gap-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-body leading-[1.35] text-neutral-600 transition-colors hover:text-primary-500"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
