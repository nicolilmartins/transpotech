import { TextLink } from "@/components/ui/text-link";
import {
  Zap,
  Flame,
  MoveVertical,
  MoveHorizontal,
  CalendarClock,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/lib/routes";

type ForkliftType = {
  title: string;
  description: string;
  cta: string;
  Icon: LucideIcon;
};

const types: ForkliftType[] = [
  {
    title: "Empilhadeiras elétricas",
    description:
      "Indicadas para operações internas, centros de distribuição, supermercados, indústrias e ambientes que exigem menor emissão local e operação mais silenciosa.",
    cta: "Solicitar indicação",
    Icon: Zap,
  },
  {
    title: "Empilhadeiras a combustão",
    description:
      "Indicadas para áreas externas, pisos mais exigentes, movimentação de cargas maiores e operações com demanda intensa.",
    cta: "Solicitar indicação",
    Icon: Flame,
  },
  {
    title: "Empilhadeiras retráteis",
    description:
      "Indicadas para porta-paletes, corredores, armazenagem vertical e operações que precisam ganhar eficiência em altura.",
    cta: "Solicitar indicação",
    Icon: MoveVertical,
  },
  {
    title: "Paleteiras e transpaleteiras",
    description:
      "Indicadas para movimentação horizontal, abastecimento, separação de pedidos e apoio operacional.",
    cta: "Solicitar indicação",
    Icon: MoveHorizontal,
  },
  {
    title: "Short rental",
    description:
      "Para picos sazonais, inventários, aumento temporário de demanda, novos contratos ou testes antes de uma decisão de compra.",
    cta: "Quero uma locação temporária",
    Icon: CalendarClock,
  },
  {
    title: "Frota sob demanda",
    description:
      "Para empresas que precisam expandir, renovar ou terceirizar parte da frota com mais previsibilidade.",
    cta: "Solicitar indicação",
    Icon: Boxes,
  },
];

export function ForkliftTypesSection() {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
          Nós te ajudamos
        </p>
        <h2 className="text-h2 font-normal text-neutral-800">
          Não sabe qual
          <br />
          empilhadeira locar?
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Você não precisa chegar com o modelo definido. A TranspoTech avalia
          sua operação e indica a melhor opção conforme tipo de carga, altura de
          elevação, ambiente, piso, urgência e prazo de locação.
        </p>
      </div>

      {/* Cards — mesmo layout da seção "Serviços" da home */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((type) => (
          <div
            key={type.title}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <type.Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-h5 font-semibold leading-[1.3] text-neutral-800">
                  {type.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {type.description}
                </p>
              </div>
            </div>
            <TextLink
              href={ROUTES.ORCAMENTO}
              className="w-full px-6 py-4 text-left"
            >
              {type.cta}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
