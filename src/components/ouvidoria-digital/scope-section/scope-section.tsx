import {
  MessageSquareWarning,
  Lightbulb,
  ThumbsUp,
  CircleHelp,
  ClipboardList,
  Headset,
  Handshake,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";

type Topic = { title: string; Icon: LucideIcon };

const topics: Topic[] = [
  { title: "Reclamações", Icon: MessageSquareWarning },
  { title: "Sugestões", Icon: Lightbulb },
  { title: "Elogios", Icon: ThumbsUp },
  { title: "Dúvidas", Icon: CircleHelp },
  { title: "Solicitações gerais", Icon: ClipboardList },
  { title: "Experiência com atendimento", Icon: Headset },
  { title: "Relacionamento com unidades", Icon: Handshake },
  { title: "Feedback sobre processos", Icon: MessageSquareText },
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
          <span className="font-normal">Quando usar a</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">Ouvidoria Digital?</span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-500">
          Use este canal para registrar manifestações sobre atendimento,
          relacionamento, serviços, processos ou experiências com a TranspoTech.
        </p>
      </div>

      {/* Cards — ícone laranja + tópico (uma linha); todos do mesmo tamanho */}
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
