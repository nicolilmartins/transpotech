import { TextLink } from "@/components/ui/text-link";
import { Recycle, Zap, Droplet, HelpCircle, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/lib/routes";

type Need = {
  title: string;
  description: string;
  cta: string;
  Icon: LucideIcon;
};

const needs: Need[] = [
  {
    title: "Desgaste ou reposição",
    description:
      "Para componentes que precisam ser substituídos por uso, desgaste ou perda de desempenho.",
    cta: "Solicitar reposição",
    Icon: Recycle,
  },
  {
    title: "Parte elétrica ou energia",
    description:
      "Para demandas relacionadas ao funcionamento elétrico, alimentação, carregamento ou desempenho.",
    cta: "Solicitar avaliação",
    Icon: Zap,
  },
  {
    title: "Parte hidráulica ou movimentação",
    description:
      "Para demandas relacionadas à elevação, movimentação, vazamentos, força ou funcionamento operacional.",
    cta: "Solicitar avaliação",
    Icon: Droplet,
  },
  {
    title: "Não sei qual peça preciso",
    description:
      "Descreva o problema, envie foto ou informe o diagnóstico técnico, se tiver.",
    cta: "Receber orientação",
    Icon: HelpCircle,
  },
];

export function NeedsSection() {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[560px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-800">
          Qual é a sua necessidade?
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          A solicitação pode começar pelo problema, tipo de manutenção{" "}
          <br className="hidden lg:inline" />
          ou urgência da operação.
        </p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {needs.map((need) => (
          <div
            key={need.title}
            className="flex w-full flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <need.Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {need.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {need.description}
                </p>
              </div>
            </div>
            <TextLink
              href={ROUTES.ORCAMENTO}
              className="w-full px-6 py-4 text-left"
            >
              {need.cta}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
