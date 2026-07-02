import { Section } from "@/components/ui/section";

type Step = { label: string; title: string; description: string };

const steps: Step[] = [
  {
    label: "Etapa 01",
    title: "Diagnóstico",
    description: "Visita técnica, análise de dados e mapeamento de fluxos atuais.",
  },
  {
    label: "Etapa 02",
    title: "Concepção",
    description: "Modelagem da solução, simulações e business case com TIR e payback.",
  },
  {
    label: "Etapa 03",
    title: "Engenharia",
    description:
      "Projeto detalhado, especificação de equipamentos, software e integrações.",
  },
  {
    label: "Etapa 04",
    title: "Implantação",
    description:
      "Fabricação, instalação e comissionamento com mínimo impacto à operação.",
  },
  {
    label: "Etapa 05",
    title: "Go-live",
    description: "Treinamento, ramp-up assistido e estabilização da operação.",
  },
  {
    label: "Etapa 06",
    title: "Operação contínua",
    description: "Manutenção, evolução e otimização ao longo do ciclo de vida.",
  },
];

export function ProcessSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-12">
      <div className="flex flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Como entregamos
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          O processo do projeto, da ideia à operação
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Etapas claras para reduzir risco e acelerar a captura de valor.
        </p>
      </div>

      <ol className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step.label}
            className="flex min-h-[180px] flex-col gap-3 rounded-xl bg-neutral-50 p-6"
          >
            <span className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
              {step.label}
            </span>
            <h3 className="font-heading text-h6 font-semibold text-neutral-800">
              {step.title}
            </h3>
            <p className="text-body-sm leading-[1.35] text-neutral-600">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
