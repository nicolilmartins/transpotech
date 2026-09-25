import { Leaf, Users, ShieldCheck, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import type { SectionContent } from "@/sanity/content/fields";
import type { sustentabilidadePage } from "@/sanity/content/pages/sustentabilidade";

type PillarsContent = SectionContent<typeof sustentabilidadePage.sections.pillars>;
type Pillar = PillarsContent["pillars"][number] & { Icon: LucideIcon };

// Ícone de cada pilar, na ordem dos pilares editados no Studio.
const pillarIcons: LucideIcon[] = [Leaf, Users, ShieldCheck];

// Card no estilo do CompareCard (layout/compare-section), sem
// ilustração e com acento verde (secondary) em todos.
function PillarCard({ title, description, items, Icon }: Pillar) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl">
      {/* Zona do título — fundo neutral-50 + blur verde bem suave (acende no hover) */}
      <div className="relative overflow-hidden bg-neutral-50 px-6 pb-6 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-600 opacity-[0.1] blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.28]"
        />
        <Icon className="relative size-8 text-secondary-600" aria-hidden />
        <h3 className="relative mt-4 text-h6 font-semibold text-secondary-600">
          {title}
        </h3>
        <p className="relative mt-3 max-w-[88%] text-body leading-[1.35] text-neutral-600">
          {description}
        </p>
      </div>

      {/* Zona dos tópicos — mesmo neutral-50 a 40% (divisão) + leve linha */}
      <div className="relative flex-1 border-t border-black/[0.04] bg-neutral-50/40 px-6 pb-8 pt-6 lg:px-8">
        <ul className="relative z-10 flex flex-col gap-2.5">
          {items.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary-600"
              />
              <span className="max-w-[88%] text-body leading-[1.35] text-neutral-700">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PillarsSection({ content }: { content: PillarsContent }) {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h3 text-neutral-800">
          <span className="lg:block font-normal">{content.titleTop}</span>{" "}
          <span className="lg:block font-bold text-primary-500">
            {content.titleAccent}
          </span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
        {content.pillars.map((pillar, i) => (
          <PillarCard key={pillar.title} {...pillar} Icon={pillarIcons[i]} />
        ))}
      </div>

    </Section>
  );
}
