import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";

type BatteryType = {
  title: string;
  description: string;
  fits: string[];
  cta: string;
};

const types: BatteryType[] = [
  {
    title: "Chumbo-ácida",
    description:
      "Tecnologia tradicional, amplamente usada em empilhadeiras elétricas.",
    fits: [
      "Operações de 1 turno",
      "Investimento inicial menor",
      "Estrutura com sala de baterias e equipe de manutenção",
    ],
    cta: "Solicitar avaliação",
  },
  {
    title: "Íons de lítio (Li-ion)",
    description:
      "Tecnologia moderna, com carga rápida e por oportunidade.",
    fits: [
      "Operações 24/7 ou multi-turno",
      "Operações sem sala de baterias dedicada",
      "Quem busca ganho de produtividade e disponibilidade",
    ],
    cta: "Avaliar migração para lítio",
  },
  {
    title: "Tração e demais tecnologias",
    description:
      "Outras configurações ou tecnologias específicas conforme equipamento, autonomia e aplicação.",
    fits: [
      "Equipamentos com requisito técnico específico",
      "Substituição direta com compatibilidade validada",
      "Operações que precisam preservar a tecnologia atual",
    ],
    cta: "Falar com especialista",
  },
];

function BatteryCard({ title, description, fits, cta }: BatteryType) {
  const href = cta === "Falar com especialista" ? ROUTES.CONTATO : ROUTES.ORCAMENTO;

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
          {fits.map((fit) => (
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

export function BatteryTypesSection() {
  return (
    <Section data-header-dark className="flex flex-col gap-10 lg:gap-12">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-50">
          Tipos de baterias{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">para empilhadeiras</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-300">
          A escolha entre tecnologias depende da rotina de uso, turnos, espaço
          operacional e investimento. A TranspoTech ajuda a indicar a alternativa
          certa para sua operação.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
        {types.map((type) => (
          <BatteryCard key={type.title} {...type} />
        ))}
      </div>

      {/* Faixa — dúvida entre tecnologias */}
      <div className="flex flex-col gap-10 rounded-2xl bg-white/5 sm:gap-6 p-6 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between lg:p-8">
        <p className="max-w-[640px] text-body leading-[1.35] text-neutral-300">
          Em dúvida entre tecnologias? A equipe TranspoTech avalia rotina, turnos
          e disponibilidade pra recomendar a melhor opção.
        </p>
        <Button
          variant="primary"
          size="lg"
          href={ROUTES.ORCAMENTO}
          className="shrink-0"
        >
          Avaliar tecnologia ideal
        </Button>
      </div>
    </Section>
  );
}
