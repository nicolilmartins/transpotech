import Image from "next/image";
import { Section } from "@/components/ui/section";
import type { EsgProject } from "@/data/esg-projects";
import type { SectionContent } from "@/sanity/content/fields";
import type { sustentabilidadePage } from "@/sanity/content/pages/sustentabilidade";

type ProjectsSectionProps = {
  projects: EsgProject[];
  content: SectionContent<typeof sustentabilidadePage.sections.projects>;
};

export function ProjectsSection({ projects, content }: ProjectsSectionProps) {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
          {content.eyebrow}
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          {content.title}
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      {/* Cards no visual do blog da home (thumbnail à esquerda + texto),
          em duas colunas com 3 projetos de cada lado. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex gap-4 overflow-hidden rounded-xl bg-neutral-50 p-3"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg sm:w-36">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="220px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Texto — categoria + título + descrição */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-1">
              <span className="text-body font-semibold uppercase leading-[1.35] tracking-wide text-primary-500">
                {project.category}
              </span>
              <h3 className="line-clamp-2 font-heading text-lg font-semibold leading-[1.3] text-neutral-800">
                {project.title}
              </h3>
              <p className="line-clamp-3 text-body leading-[1.35] text-neutral-600">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
