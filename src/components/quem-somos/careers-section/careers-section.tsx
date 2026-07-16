import {
  Award,
  GraduationCap,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";

// PLACEHOLDER: confirmar a URL real do portal de carreiras (Gupy).
const GUPY_URL = "https://transpotech.gupy.io";

// Botão do portal de carreiras — renderizado no cabeçalho (desktop) e após os
// cards (mobile), via `className` de visibilidade.
function GupyButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={GUPY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`h-12 w-fit items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-body font-semibold text-neutral-50 transition-colors duration-200 hover:bg-primary-600 ${className}`}
    >
      Ver vagas no Gupy
    </a>
  );
}

type Perk = { title: string; description: string; Icon: LucideIcon };

const perks: Perk[] = [
  {
    title: "Great Place to Work",
    description: "Única do setor certificada, por quatro anos consecutivos.",
    Icon: Award,
  },
  {
    title: "Plano de capacitação técnica",
    description: "Formação e desenvolvimento contínuo para toda a equipe.",
    Icon: GraduationCap,
  },
  {
    title: "Diversidade e inclusão",
    description: "Ambiente plural, incluindo mulheres nas áreas de mecânica.",
    Icon: Users,
  },
  {
    title: "Presença regional",
    description: "Unidades em PR, SC, RS, SP e GO, perto de onde você está.",
    Icon: MapPin,
  },
];

export function CareersSection() {
  return (
    <Section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
      {/* Cabeçalho + botão — à esquerda. No mobile o botão é ocultado aqui e
          reaparece depois dos cards. */}
      <div className="flex flex-col gap-10 lg:w-[400px] lg:shrink-0 lg:gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
            Trabalhe conosco
          </p>
          <h2 className="text-h3 font-normal text-neutral-800">
            Faça parte do time{" "}
            <span className="font-bold">TranspoTech</span>
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            Somos uma das empresas certificadas Great Place to Work, com mais de
            800 colaboradores em 11 unidades. Conheça as oportunidades abertas no
            nosso portal de carreiras.
          </p>
        </div>

        <GupyButton className="hidden lg:inline-flex" />
      </div>

      {/* Diferenciais — 2 colunas x 2 linhas, no estilo dos cards "Por que
          empresas escolhem a TranspoTech" (ícone no topo, conteúdo embaixo). */}
      <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-rows-2">
        {perks.map((perk) => (
          <div
            key={perk.title}
            className="flex min-h-[180px] flex-col justify-between gap-6 overflow-hidden rounded-xl bg-[#F7F6F6] p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)]"
          >
            <perk.Icon
              aria-hidden
              className="size-7 text-secondary-600 lg:size-8"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                {perk.title}
              </h3>
              <p className="text-body-sm leading-[1.35] text-neutral-600">
                {perk.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botão no mobile — depois dos cards */}
      <GupyButton className="inline-flex lg:hidden" />
    </Section>
  );
}
