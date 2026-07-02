import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

const checklist = [
  "Tipo de equipamento",
  "Medida do pneu atual",
  "Tipo de piso",
  "Ambiente interno ou externo",
  "Carga movimentada",
  "Intensidade de uso",
  "Horas de operação por dia",
  "Condição atual do pneu",
  "Cidade/UF",
  "Urgência da troca",
];

export function ConsiderSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col gap-10 lg:flex-row lg:gap-16"
    >
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 font-normal text-neutral-50">
            O que considerar antes
            <br />
            de solicitar pneus?
          </h2>
          <p className="max-w-[460px] text-body leading-[1.35] text-neutral-400">
            Marque ou anote o que se aplica à sua operação. Quanto mais detalhes,
            mais precisa a cotação.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          href={ROUTES.ORCAMENTO}
          className="self-start"
        >
          Enviar informações para cotação
        </Button>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex-[1.3]">
        {checklist.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <CircleCheck aria-hidden className="size-5 shrink-0 text-primary-500" />
            <span className="text-body text-neutral-200">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
