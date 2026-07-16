import {
  Wrench,
  CalendarCheck,
  RefreshCw,
  FileText,
  Package,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";

type ServiceCard = {
  title: string;
  description: string;
  cta: string;
  Icon: LucideIcon;
};

const services: ServiceCard[] = [
  {
    title: "Manutenção corretiva",
    description:
      "Atendimento para diagnóstico e correção de falhas em empilhadeiras e equipamentos de movimentação.",
    cta: "Solicitar corretiva",
    Icon: Wrench,
  },
  {
    title: "Manutenção preventiva",
    description:
      "Revisões planejadas para reduzir falhas, preservar componentes e aumentar a confiabilidade da frota.",
    cta: "Agendar preventiva",
    Icon: CalendarCheck,
  },
  {
    title: "Serviços multimarcas",
    description:
      "Atendimento técnico para diferentes marcas de empilhadeiras e equipamentos de movimentação.",
    cta: "Consultar atendimento",
    Icon: RefreshCw,
  },
  {
    title: "Contrato de manutenção",
    description:
      "Planos recorrentes para empresas que precisam de previsibilidade, acompanhamento técnico e suporte contínuo.",
    cta: "Conhecer contrato",
    Icon: FileText,
  },
  {
    title: "Peças e componentes",
    description:
      "Apoio com peças, pneus, baterias e carregadores para manter sua operação funcionando.",
    cta: "Solicitar peças",
    Icon: Package,
  },
  {
    title: "Diagnóstico técnico",
    description:
      "Avaliação da frota para identificar riscos, priorizar manutenções e orientar decisões operacionais.",
    cta: "Avaliar equipamento",
    Icon: Stethoscope,
  },
];

export function PortfolioSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-4">
        <div className="flex max-w-[560px] flex-col gap-4">
          <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
            Portfólio de serviços
          </p>
          <h2 className="text-h3 font-normal text-neutral-800">
            <span className="lg:block">Serviços para manter</span>{" "}
            <span className="lg:block font-bold">sua frota disponível</span>
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            A TranspoTech apoia empresas que precisam reduzir paradas, aumentar
            a segurança e manter seus equipamentos de movimentação funcionando
            com eficiência.
          </p>
        </div>
        <TextLink href={ROUTES.CONTATO} className="shrink-0">
          Abrir um chamado
        </TextLink>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <service.Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {service.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {service.description}
                </p>
              </div>
            </div>
            <TextLink
              href={ROUTES.ORCAMENTO}
              className="w-full px-6 py-4 text-left"
            >
              {service.cta}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
