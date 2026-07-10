import {
  ShieldCheck,
  Lock,
  EyeOff,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";

type Commitment = { title: string; description: string; Icon: LucideIcon };

const commitments: Commitment[] = [
  {
    title: "Tratamento responsável",
    description:
      "Os relatos são avaliados com seriedade e encaminhados conforme sua natureza.",
    Icon: ShieldCheck,
  },
  {
    title: "Confidencialidade",
    description:
      "As informações são tratadas com confidencialidade conforme políticas internas e requisitos aplicáveis.",
    Icon: Lock,
  },
  {
    title: "Possibilidade de anonimato",
    description:
      "O usuário pode optar por não se identificar, quando essa opção estiver disponível no formulário.",
    Icon: EyeOff,
  },
  {
    title: "Não retaliação",
    description:
      "A empresa deve tratar relatos de boa-fé com responsabilidade e sem tolerância a retaliações.",
    Icon: ShieldAlert,
  },
];

export function CommitmentsSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-h3 font-normal text-neutral-50">
          Nossos compromissos
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {commitments.map((item) => (
          <div
            key={item.title}
            className="flex min-h-[240px] flex-col justify-between overflow-hidden rounded-xl bg-[rgba(251,251,251,0.05)] p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:h-[299px]"
          >
            <item.Icon className="size-7 text-white/50 lg:size-8" aria-hidden />
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold text-neutral-200">
                {item.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
