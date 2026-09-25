import { ShieldCheck, MessageSquare, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { sustentabilidadePage } from "@/sanity/content/pages/sustentabilidade";

type GovernanceContent = SectionContent<
  typeof sustentabilidadePage.sections.governance
>;

// Ícone e destino de cada canal, na ordem dos canais editados no Studio.
const channelLinks: { href: string; Icon: LucideIcon }[] = [
  { href: ROUTES.CANAL_TRANSPARENCIA, Icon: ShieldCheck },
  { href: ROUTES.OUVIDORIA, Icon: MessageSquare },
];

export function GovernanceSection({ content }: { content: GovernanceContent }) {
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {content.channels.map((channel, i) => {
          const { href, Icon } = channelLinks[i];
          return (
            <div
              key={channel.title}
              className="flex flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
            >
              <div className="flex flex-1 flex-col gap-8 rounded-xl bg-surface-subtle p-6 lg:p-8">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                  <Icon className="size-6 text-white lg:size-7" aria-hidden />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                    {channel.title}
                  </h3>
                  <p className="text-body leading-[1.35] text-neutral-600">
                    {channel.description}
                  </p>
                </div>
              </div>
              <TextLink
                href={href}
                className="w-full px-6 py-4 text-left lg:px-8"
              >
                {channel.ctaLabel}
              </TextLink>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
