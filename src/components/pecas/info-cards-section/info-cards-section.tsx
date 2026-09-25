import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import type { SectionContent } from "@/sanity/content/fields";
import type { pecasPage } from "@/sanity/content/pages/pecas";

type InfoCardsContent = SectionContent<typeof pecasPage.sections.infoCards>;

export function InfoCardsSection({ content }: { content: InfoCardsContent }) {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      {/* Cabeçalho — alinhado à esquerda */}
      <div className="flex max-w-[640px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-50">
          {content.title}{" "}
          <br className="hidden lg:inline" />
          {content.titleMiddle}{" "}
          <span className="text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          {content.description}
        </p>
      </div>

      {/* Tópicos — linhas divisórias + tick laranja por linha */}
      <div className="w-full">
        <ul className="flex flex-col border-t border-white/10">
          {content.topics.map((topic) => (
            <li
              key={topic.title}
              className="group relative flex flex-col gap-3 border-b border-white/10 py-10 transition-colors lg:flex-row lg:gap-16 lg:py-12"
            >
              {/* Linha precisa à esquerda — fica laranja no hover */}
              <span
                aria-hidden
                className="absolute left-0 top-10 h-9 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-primary-500 lg:top-12"
              />

              <h3 className="pl-6 font-heading text-h4 font-normal text-neutral-100 transition-colors duration-300 group-hover:text-primary-500 lg:w-1/2 lg:pl-8">
                {topic.title}
              </h3>

              <p className="pl-6 text-body leading-[1.5] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-50 lg:w-1/2 lg:pl-0">
                {topic.items.map((item) => item.text).join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <Button variant="primary" size="lg" href="#solicitar-pecas">
        {content.buttonLabel}
      </Button>
    </Section>
  );
}
