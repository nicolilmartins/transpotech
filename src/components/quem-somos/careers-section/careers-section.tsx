import {
  Award,
  GraduationCap,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import type { SectionContent } from "@/sanity/content/fields";
import type { quemSomosPage } from "@/sanity/content/pages/quem-somos";

// Botão do portal de carreiras — renderizado no cabeçalho (desktop) e após os
// cards (mobile), via `className` de visibilidade.
function GupyButton({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`h-12 w-fit items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-body font-semibold text-neutral-50 transition-colors duration-200 hover:bg-primary-600 ${className}`}
    >
      {label}
    </a>
  );
}

// Ícone de cada diferencial, na ordem dos cards editados no Studio.
const perkIcons: LucideIcon[] = [Award, GraduationCap, Users, MapPin];

type CareersSectionProps = {
  /** URL do portal de carreiras (siteSettings). */
  careersUrl: string;
  content: SectionContent<typeof quemSomosPage.sections.careers>;
};

export function CareersSection({ careersUrl, content }: CareersSectionProps) {
  return (
    <Section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
      {/* Cabeçalho + botão — à esquerda. No mobile o botão é ocultado aqui e
          reaparece depois dos cards. */}
      <div className="flex flex-col gap-10 lg:w-[400px] lg:shrink-0 lg:gap-16">
        <div className="flex flex-col gap-4">
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

        <GupyButton
          href={careersUrl}
          label={content.buttonLabel}
          className="hidden lg:inline-flex"
        />
      </div>

      {/* Diferenciais — 2 colunas x 2 linhas, no estilo dos cards "Por que
          empresas escolhem a TranspoTech" (ícone no topo, conteúdo embaixo). */}
      <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-rows-2">
        {content.perks.map((perk, i) => {
          const Icon = perkIcons[i];
          return (
            <div
              key={perk.title}
              className="flex min-h-[180px] flex-col justify-between gap-6 overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)]"
            >
              <Icon
                aria-hidden
                className="size-7 text-secondary-600 lg:size-8"
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                  {perk.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {perk.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão no mobile — depois dos cards */}
      <GupyButton
        href={careersUrl}
        label={content.buttonLabel}
        className="inline-flex lg:hidden"
      />
    </Section>
  );
}
