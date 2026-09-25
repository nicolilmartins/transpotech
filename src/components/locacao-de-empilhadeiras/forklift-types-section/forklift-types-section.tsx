import { TextLink } from "@/components/ui/text-link";
import {
  Zap,
  Flame,
  MoveVertical,
  MoveHorizontal,
  CalendarClock,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/lib/routes";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { locacaoPage } from "@/sanity/content/pages/locacao";

// Ícone de cada card, na ordem dos cards editados no Studio.
const icons: LucideIcon[] = [Zap, Flame, MoveVertical, MoveHorizontal, CalendarClock, Boxes];

type ForkliftTypesContent = SectionContent<typeof locacaoPage.sections.forkliftTypes>;

export function ForkliftTypesSection({ content }: { content: ForkliftTypesContent }) {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-primary-500">
          {content.eyebrow}
        </p>
        <h2 className="text-h2 font-normal text-neutral-800">
          <LineBreaks text={content.title} brClassName="hidden lg:inline" />
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      {/* Cards — mesmo layout da seção "Serviços" da home */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((type, i) => {
          const Icon = icons[i];
          return (
            <div
              key={type.title}
              className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
            >
              <div className="flex flex-1 flex-col gap-8 rounded-xl bg-surface-subtle p-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                  <Icon className="size-6 text-white lg:size-7" aria-hidden />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                    {type.title}
                  </h3>
                  <p className="text-body leading-[1.35] text-neutral-600">
                    {type.description}
                  </p>
                </div>
              </div>
              <TextLink
                href={ROUTES.CONTATO}
                className="w-full px-6 py-4 text-left"
              >
                {type.cta}
              </TextLink>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
