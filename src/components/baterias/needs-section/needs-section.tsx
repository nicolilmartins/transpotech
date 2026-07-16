import { TextLink } from "@/components/ui/text-link";
import {
  Battery,
  PlugZap,
  Gauge,
  RefreshCw,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
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
    title: "Baterias para equipamentos",
    description:
      "Para reposição, substituição ou avaliação conforme equipamento, autonomia e intensidade de uso.",
    cta: "Solicitar bateria",
    Icon: Battery,
  },
  {
    title: "Carregadores",
    description:
      "Para operações que precisam carregar equipamentos com segurança, compatibilidade e rotina adequada.",
    cta: "Solicitar carregador",
    Icon: PlugZap,
  },
  {
    title: "Análise de autonomia",
    description:
      "Para entender se a bateria atual atende aos turnos, picos e rotina operacional.",
    cta: "Avaliar autonomia",
    Icon: Gauge,
  },
  {
    title: "Troca ou modernização",
    description:
      "Para avaliar alternativas de energia, redução de paradas ou melhor aproveitamento dos equipamentos.",
    cta: "Avaliar modernização",
    Icon: RefreshCw,
  },
  {
    title: "Não sei o que preciso",
    description:
      "Informe o equipamento, rotina de carregamento, turnos e problema encontrado para receber orientação.",
    cta: "Receber orientação",
    Icon: HelpCircle,
  },
];

export function NeedsSection() {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <h2 className="text-h2 font-normal text-neutral-800">
        O que sua operação precisa?
      </h2>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {needs.map((need) => (
          <div
            key={need.title}
            className="flex w-full flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <need.Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {need.title}
                </h3>
                <p className="line-clamp-2 min-h-[2.7em] text-body leading-[1.35] text-neutral-600">
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
