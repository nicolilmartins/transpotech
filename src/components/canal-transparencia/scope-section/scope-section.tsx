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

type Topic = { title: string; Icon: LucideIcon };

const topics: Topic[] = [
  { title: "Assédio moral ou sexual", Icon: UserX },
  { title: "Discriminação", Icon: UserMinus },
  { title: "Fraude ou corrupção", Icon: Banknote },
  { title: "Conflito de interesses", Icon: Scale },
  { title: "Descumprimento de políticas internas", Icon: FileWarning },
  { title: "Uso indevido de recursos", Icon: PackageX },
  { title: "Conduta antiética", Icon: Gavel },
  { title: "Outras situações sensíveis", Icon: TriangleAlert },
];

export function ScopeSection() {
  return (
    <Section
      id="escopo"
      className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20"
    >
      {/* Cabeçalho — à esquerda, no topo */}
      <div className="flex flex-col gap-4 lg:w-[420px] lg:shrink-0">
        <h2 className="text-h3 text-neutral-800">
          <span className="font-normal">Quando usar o</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">
            Canal da Transparência?
          </span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-500">
          Este canal deve ser utilizado para relatos relacionados a condutas
          incompatíveis com os princípios da TranspoTech.
        </p>
      </div>

      {/* Cards — ícone laranja + tópico; todos do mesmo tamanho */}
      <ul className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-3">
        {topics.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-3 rounded-xl bg-[#F7F6F6] px-4 py-3"
          >
            <item.Icon aria-hidden className="size-5 shrink-0 text-primary-500" />
            <span className="text-body text-neutral-800">{item.title}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
