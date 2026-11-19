import {
  UserX,
  UserMinus,
  Banknote,
  Scale,
  FileWarning,
  PackageX,
  Gavel,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import type { SectionContent } from "@/sanity/content/fields";
import type { canalTransparenciaPage } from "@/sanity/content/pages/canal-transparencia";

type ScopeContent = SectionContent<typeof canalTransparenciaPage.sections.scope>;

// Ícone de cada tópico, na ordem dos tópicos editados no Studio.
const topicIcons: LucideIcon[] = [
  UserX,
  UserMinus,
  Banknote,
  Scale,
  FileWarning,
  PackageX,
  Gavel,
  TriangleAlert,
];

export function ScopeSection({ content }: { content: ScopeContent }) {
  return (
    <Section
      id="escopo"
      className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20"
    >
      {/* Cabeçalho — à esquerda, no topo */}
      <div className="flex flex-col gap-4 lg:w-[420px] lg:shrink-0">
        <h2 className="text-h3 text-neutral-800">
          <span className="font-normal">{content.titleTop}</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">
            {content.titleAccent}
          </span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-500">
          {content.description}
        </p>
      </div>

      {/* Cards — ícone laranja + tópico; todos do mesmo tamanho */}
      <ul className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-3">
        {content.topics.map((item, i) => {
          const Icon = topicIcons[i];
          return (
            <li
              key={item.title}
              className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3"
            >
              <Icon aria-hidden className="size-5 shrink-0 text-primary-500" />
              <span className="text-body text-neutral-800">{item.title}</span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
