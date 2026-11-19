import Image from "next/image";
import { Section } from "@/components/ui/section";
import type { SectionContent } from "@/sanity/content/fields";
import type { sustentabilidadePage } from "@/sanity/content/pages/sustentabilidade";
type InitiativesContent = SectionContent<
  typeof sustentabilidadePage.sections.initiatives
>;

export function InitiativesSection({ content }: { content: InitiativesContent }) {
  return (
    <Section id="destaques" className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
          {content.eyebrow}
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          {content.titleRegular}{" "}
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {content.items.map((initiative) => (
          // Cards informativos, sem link: as iniciativas não têm página própria.
          <article
            key={initiative.title}
            className="flex h-full flex-col rounded-xl bg-neutral-50 p-2"
          >
            {/* Imagem com pequena borda do card ao redor (padding do article + cantos). */}
            <div className="relative h-[196px] w-full overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={initiative.image}
                alt={initiative.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
                {initiative.title}
              </h3>
              <p className="flex-1 text-body leading-[1.35] text-neutral-600">
                {initiative.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
