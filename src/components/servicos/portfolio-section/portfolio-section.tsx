import {
  Wrench,
  CalendarCheck,
  RefreshCw,
  FileText,
  Package,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { servicosPage } from "@/sanity/content/pages/servicos";

// Ícone e destino do CTA de cada card, na ordem dos cards editados no Studio.
// Destino: âncora desta página ou da página do produto citado.
const cardExtras: { href: string; Icon: LucideIcon }[] = [
  { href: "#solicitar-servico", Icon: Wrench },
  { href: "#solicitar-servico", Icon: CalendarCheck },
  { href: "#multimarcas", Icon: RefreshCw },
  { href: "#solicitar-servico", Icon: FileText },
  { href: `${ROUTES.PECAS}#solicitar-pecas`, Icon: Package },
  { href: "#solicitar-servico", Icon: Stethoscope },
];

type PortfolioContent = SectionContent<typeof servicosPage.sections.portfolio>;

export function PortfolioSection({ content }: { content: PortfolioContent }) {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-4">
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
        <TextLink href="#solicitar-servico" className="shrink-0">
          {content.linkLabel}
        </TextLink>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((service, i) => {
          const { href, Icon } = cardExtras[i];
          return (
          <div
            key={service.title}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-surface-subtle p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {service.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {service.description}
                </p>
              </div>
            </div>
            <TextLink
              href={href}
              className="w-full px-6 py-4 text-left"
            >
              {service.cta}
            </TextLink>
          </div>
          );
        })}
      </div>
    </Section>
  );
}
