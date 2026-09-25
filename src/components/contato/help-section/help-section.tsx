import {
  Forklift,
  CalendarClock,
  Wrench,
  Package,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { contatoPage } from "@/sanity/content/pages/contato";

type HelpContent = SectionContent<typeof contatoPage.sections.help>;

// Destino e ícone de cada card, na ordem dos cards editados no Studio.
const cardLinks: { href: string; Icon: LucideIcon }[] = [
  { href: "#solicitacao", Icon: Forklift },
  { href: ROUTES.LOCACAO, Icon: CalendarClock },
  { href: ROUTES.SERVICOS, Icon: Wrench },
  { href: "#solicitacao", Icon: Package },
  { href: ROUTES.AUTOMACAO, Icon: LineChart },
];

export function HelpSection({ content }: { content: HelpContent }) {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[560px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
          {content.eyebrow}
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          <span className="lg:block">{content.titleTop}</span>{" "}
          <span className="lg:block font-bold">{content.titleBottom}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {content.cards.map((card, i) => {
          const { href, Icon } = cardLinks[i];
          return (
            <div
              key={card.title}
              className="flex w-full flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)] sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_2rem)/3)]"
            >
              <div className="flex flex-1 flex-col gap-8 rounded-xl bg-surface-subtle p-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                  <Icon className="size-6 text-white lg:size-7" aria-hidden />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                    {card.title}
                  </h3>
                  <p className="text-body leading-[1.35] text-neutral-600">
                    {card.description}
                  </p>
                </div>
              </div>
              <TextLink href={href} className="w-full px-6 py-4 text-left">
                {card.ctaLabel}
              </TextLink>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
