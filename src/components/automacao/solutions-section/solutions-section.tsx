import { TextLink } from "@/components/ui/text-link";
import {
  Layers,
  Truck,
  Package,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

type Solution = {
  title: string;
  description: string;
  cta: string;
  Icon: LucideIcon;
};

const solutions: Solution[] = [
  {
    title: "Sistemas de Armazenagem Automatizados",
    description:
      "Estantes móveis, carrosséis verticais e shuttle systems para maximizar a utilização do espaço e a eficiência do armazém.",
    cta: "Solicitar avaliação",
    Icon: Layers,
  },
  {
    title: "Sistemas de Transporte",
    description:
      "Esteiras transportadoras, AGVs (Veículos Guiados Automaticamente) e soluções de movimentação de materiais para garantir um fluxo de trabalho suave e contínuo.",
    cta: "Solicitar avaliação",
    Icon: Truck,
  },
  {
    title: "Soluções de Picking e Packing",
    description:
      "Tecnologias avançadas para picking automatizado, sistemas de embalagem e soluções de sortimento para acelerar o processamento de pedidos.",
    cta: "Solicitar avaliação",
    Icon: Package,
  },
  {
    title: "Softwares de Gerenciamento",
    description:
      "Plataformas de software robustas para gerenciamento de armazéns (WMS) e sistemas de controle de execução de armazéns (WCS) para otimizar toda a cadeia de suprimentos.",
    cta: "Solicitar avaliação",
    Icon: Cpu,
  },
];

export function SolutionsSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[640px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Soluções
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Soluções em Automação Intralogística
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Implantamos automação parcial ou completa, integrando equipamentos,
          software e operação contínua.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((solution) => (
          <div
            key={solution.title}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <solution.Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-h5 font-semibold leading-[1.3] text-neutral-800">
                  {solution.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {solution.description}
                </p>
              </div>
            </div>
            <TextLink
              href={ROUTES.ORCAMENTO}
              className="w-full px-6 py-4 text-left"
            >
              {solution.cta}
            </TextLink>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        size="lg"
        href={ROUTES.ORCAMENTO}
        className="self-start"
      >
        Avaliar minha operação
      </Button>
    </Section>
  );
}
