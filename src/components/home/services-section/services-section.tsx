import { ShieldCheck, Wrench, LayoutDashboard, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

// Ícone e destino de cada card, na ordem dos cards editados no Studio.
type ServiceCardLink = {
  icon: LucideIcon;
  /** Destino do CTA — âncoras da página de serviços (manutenção). */
  href: string;
};

const cardLinks: ServiceCardLink[] = [
  { icon: ShieldCheck, href: `${ROUTES.SERVICOS}#solicitar-servico` },
  { icon: Wrench, href: `${ROUTES.SERVICOS}#solicitar-servico` },
  { icon: LayoutDashboard, href: `${ROUTES.SERVICOS}#multimarcas` },
];

type ServicesContent = SectionContent<typeof homePage.sections.services>;

export function ServicesSection({ content }: { content: ServicesContent }) {
  const cards = content.cards.map((card, i) => ({ ...card, ...cardLinks[i] }));

  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-[67px]">
      {/* Cabeçalho centralizado */}
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <div className="flex w-[535px] max-w-full flex-col items-center gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            {content.eyebrow}
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-bold">{content.titleBold}</span>
            <span className="font-normal">{content.titleRegular}</span>
          </h2>
        </div>
        <p className="w-[507px] max-w-full text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      {/* Cards — todos do mesmo tamanho */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-surface-subtle p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <card.icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                {/* Reserva 2 linhas de título e 2 de texto → cards uniformes */}
                <h3 className="min-h-[2.6em] font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {card.title.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="line-clamp-2 min-h-[2.7em] text-body leading-[1.35] text-neutral-600">
                  {card.description}
                </p>
              </div>
            </div>
            <TextLink
              href={card.href}
              className="w-full px-6 py-4 text-left"
            >
              {card.cta}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
