import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { bateriasPage } from "@/sanity/content/pages/baterias";

type BatteryTypesContent = SectionContent<typeof bateriasPage.sections.batteryTypes>;
type BatteryType = BatteryTypesContent["types"][number];

// Destino do link de cada card, na ordem dos cards editados no Studio.
const hrefs = [ROUTES.SIMULADOR, ROUTES.SIMULADOR, ROUTES.CONTATO];

function BatteryCard({ title, description, fits, cta, href }: BatteryType & { href: string }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl">
      {/* Zona do título — glow laranja bem suave que acende no hover */}
      <div className="relative overflow-hidden bg-white/5 px-6 pb-6 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 opacity-[0.12] blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.35]"
        />
        <h3 className="relative text-h6 font-semibold text-neutral-50">{title}</h3>
        <p className="relative mt-3 text-body leading-[1.35] text-neutral-300">
          {description}
        </p>
      </div>

      {/* Zona dos tópicos — divisão por linha sutil + bullets de acento */}
      <div className="relative flex flex-1 flex-col gap-8 bg-white/[0.07] px-6 pb-8 pt-6 lg:px-8">
        <ul className="flex flex-1 flex-col gap-2.5">
          {fits.map(({ text: fit }) => (
            <li key={fit} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-500"
              />
              <span className="text-body leading-[1.35] text-neutral-300">
                {fit}
              </span>
            </li>
          ))}
        </ul>

        <TextLink href={href} className="w-full border-t border-white/10 pt-6">
          {cta}
        </TextLink>
      </div>
    </div>
  );
}

export function BatteryTypesSection({ content }: { content: BatteryTypesContent }) {
  return (
    <Section data-header-dark className="flex flex-col gap-10 lg:gap-12">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-50">
          {content.titleRegular}{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-300">
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
        {content.types.map((type, i) => (
          <BatteryCard key={type.title} {...type} href={hrefs[i]} />
        ))}
      </div>

      {/* Faixa — dúvida entre tecnologias */}
      <div className="flex flex-col gap-10 rounded-2xl bg-white/5 sm:gap-6 p-6 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between lg:p-8">
        <p className="max-w-[640px] text-body leading-[1.35] text-neutral-300">
          {content.bannerText}
        </p>
        <Button
          variant="primary"
          size="lg"
          href={ROUTES.SIMULADOR}
          className="shrink-0"
        >
          {content.bannerButtonLabel}
        </Button>
      </div>
    </Section>
  );
}
