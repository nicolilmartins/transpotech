import { FileText, Wrench, Headset, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { ouvidoriaPage } from "@/sanity/content/pages/ouvidoria";

type CommercialRedirectContent = SectionContent<
  typeof ouvidoriaPage.sections.commercialRedirect
>;

// Ícone e destino de cada card, na ordem dos cards editados no Studio.
const cardLinks: { href: string; Icon: LucideIcon }[] = [
  { href: `${ROUTES.CONTATO}#solicitacao`, Icon: FileText },
  { href: ROUTES.SERVICOS, Icon: Wrench },
  { href: ROUTES.CONTATO, Icon: Headset },
];

export function CommercialRedirectSection({
  content,
}: {
  content: CommercialRedirectContent;
}) {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
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

      {/* Cards — mesmo estilo da seção "Manutenção preventiva..." da home */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.cards.map((item, i) => {
          const { href, Icon } = cardLinks[i];
          return (
            <div
              key={item.title}
              className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
            >
              <div className="flex flex-1 flex-col gap-8 rounded-xl bg-surface-subtle p-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                  <Icon className="size-6 text-white lg:size-7" aria-hidden />
                </div>
                <div className="flex flex-col gap-4">
                  {/* Reserva 2 linhas de título e 2 de texto → cards uniformes */}
                  <h3 className="min-h-[2.6em] font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 min-h-[2.7em] text-body leading-[1.35] text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </div>
              <TextLink href={href} className="w-full px-6 py-4 text-left">
                {item.linkLabel}
              </TextLink>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
