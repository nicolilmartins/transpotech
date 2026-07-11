import {
  Compass,
  BadgeCheck,
  LayoutGrid,
  Wrench,
  MapPin,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";

type Reason = { title: string; description: string; Icon: LucideIcon };

const reasons: Reason[] = [
  {
    title: "Orientação técnica na escolha",
    description:
      "Apoio para escolher o equipamento conforme carga, altura, ambiente, piso, turno e intensidade de uso.",
    Icon: Compass,
  },
  {
    title: "Distribuidor autorizado",
    description:
      "Venda de equipamentos Linde, STILL e Baoli com suporte de quem conhece a operação.",
    Icon: BadgeCheck,
  },
  {
    title: "Novas e usadas no mesmo lugar",
    description:
      "Compare alternativas para compra planejada, renovação de frota ou necessidade imediata.",
    Icon: LayoutGrid,
  },
  {
    title: "Pós-venda especializado",
    description:
      "A TranspoTech também oferece serviços, peças, pneus, baterias e carregadores para manter a frota em operação.",
    Icon: Wrench,
  },
  {
    title: "Estrutura regional",
    description:
      "Atendimento por unidades e equipe técnica para apoiar empresas em diferentes regiões.",
    Icon: MapPin,
  },
  {
    title: "Soluções além da venda",
    description:
      "Além da compra, a TranspoTech pode apoiar com locação, manutenção e soluções intralogísticas.",
    Icon: Boxes,
  },
];

export function WhyChooseSection() {
  return (
    <Section className="flex flex-col items-center gap-12 lg:gap-16">
      <h2 className="max-w-[560px] text-center text-h2 font-normal text-neutral-50">
        Por que empresas escolhem a TranspoTech
      </h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="flex min-h-[240px] flex-col justify-between overflow-hidden rounded-xl bg-[rgba(251,251,251,0.05)] p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:h-[299px]"
          >
            <reason.Icon aria-hidden className="size-7 text-[#919090] lg:size-8" />
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold text-neutral-200">
                {reason.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-400">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
