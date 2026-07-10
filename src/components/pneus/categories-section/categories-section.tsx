import { TextLink } from "@/components/ui/text-link";
import {
  Forklift,
  Truck,
  Tractor,
  Trees,
  Ship,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/lib/routes";

type Category = {
  title: string;
  description: string;
  cta: string;
  Icon: LucideIcon;
};

const categories: Category[] = [
  {
    title: "Pneus para Empilhadeiras",
    description:
      "Disponíveis nos tipos press-on, pneumático e sólido, conforme a aplicação e o piso da operação.",
    cta: "Solicitar pneu para empilhadeira",
    Icon: Forklift,
  },
  {
    title: "Pneus OTR (Off-The-Road)",
    description:
      "Para escavadeiras, motoniveladoras, retroescavadeiras, carregadeiras, tratores de esteira e compactação.",
    cta: "Solicitar pneu OTR",
    Icon: Truck,
  },
  {
    title: "Pneus Agrícolas",
    description:
      "Para tratores, colheitadeiras, plantadeiras, pulverizadores e máquinas de henificação no campo.",
    cta: "Solicitar pneu agrícola",
    Icon: Tractor,
  },
  {
    title: "Pneus Florestais",
    description:
      "Para skidders, fellers (derrubadoras), processadores, transportadores florestais e máquinas de exploração.",
    cta: "Solicitar pneu florestal",
    Icon: Trees,
  },
  {
    title: "Pneus Portuários",
    description:
      "Para reach stackers, carretas portuárias, empilhadeiras de porto, empurradores e equipamentos de contêiner.",
    cta: "Solicitar pneu portuário",
    Icon: Ship,
  },
];

export function CategoriesSection() {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[640px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-800">
          Escolha a categoria mais
          <br />
          próxima da <span className="font-bold">sua necessidade</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Os pneus devem ser escolhidos conforme equipamento, ambiente, piso,
          carga e intensidade de uso.
        </p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <div
            key={category.title}
            className="flex w-full flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <category.Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-h5 font-semibold leading-[1.3] text-neutral-800">
                  {category.title}
                </h3>
                <p className="min-h-[86px] text-body leading-[1.35] text-neutral-600">
                  {category.description}
                </p>
              </div>
            </div>
            <TextLink
              href={ROUTES.ORCAMENTO}
              className="w-full px-6 py-4 text-left"
            >
              {category.cta}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
