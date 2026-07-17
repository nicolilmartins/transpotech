import {
  DollarSign,
  Wrench,
  Gauge,
  Leaf,
  Disc3,
  LifeBuoy,
  Fuel,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

type ComparePoint = {
  Icon: LucideIcon;
  /** Critério comparado (mesmo rótulo nos dois cards). */
  label: string;
  /** Descrição específica deste tipo de empilhadeira. */
  text: string;
};

type CompareItem = {
  title: string;
  description: string;
  points: ComparePoint[];
  accent: "primary" | "secondary";
};

// Comparativo elétrica (lítio) × GLP — critérios e copy baseados no
// comparativo TranspoTech. Elétrica com acento verde (eletrificação/ESG) e
// GLP em laranja. Cada critério usa o mesmo ícone nos dois cards.
const items: CompareItem[] = [
  {
    title: "Elétrica (lítio)",
    description: "A mesma força. Muito mais economia.",
    points: [
      {
        Icon: DollarSign,
        label: "Custo de energia",
        text: "R$ 400,00 em energia elétrica — até 90% de economia no dia a dia.",
      },
      {
        Icon: Wrench,
        label: "Custo de manutenção",
        text: "Até 70% de economia: menos peças, menos paradas e menos custos.",
      },
      {
        Icon: Gauge,
        label: "Desempenho",
        text: "Mesmo desempenho e força da combustão para as mesmas aplicações.",
      },
      {
        Icon: Leaf,
        label: "Impacto ambiental",
        text: "Zero emissão de gases, mais sustentável e amiga do meio ambiente.",
      },
      {
        Icon: Disc3,
        label: "Frenagem e segurança",
        text: "Frenagem regenerativa reduz o uso do freio, evita fadiga e economiza em manutenções.",
      },
      {
        Icon: LifeBuoy,
        label: "Pneus",
        text: "Menor desgaste dos pneus pelo menor uso do freio.",
      },
      {
        Icon: Fuel,
        label: "Armazenagem de gás",
        text: "Dispensa cilindros: mais segurança, melhor qualidade do ar e otimização de espaço (m²).",
      },
    ],
    accent: "secondary",
  },
  {
    title: "GLP",
    description: "Força que você conhece. Combustível que você paga.",
    points: [
      {
        Icon: DollarSign,
        label: "Custo de energia",
        text: "R$ 4.000,00 em combustível (GLP) — valor de simulação.",
      },
      {
        Icon: Wrench,
        label: "Custo de manutenção",
        text: "Mais componentes de desgaste: sistema de combustível, motor, transmissão, carburador, correias e radiadores.",
      },
      {
        Icon: Gauge,
        label: "Desempenho",
        text: "Força e desempenho dependem do combustível e exigem aquecimento do motor.",
      },
      {
        Icon: Leaf,
        label: "Impacto ambiental",
        text: "Emite gases poluentes, contribuindo para a poluição do ar.",
      },
      {
        Icon: Disc3,
        label: "Frenagem e segurança",
        text: "Maior uso do pedal de freio, gerando fadiga do operador e mais desgaste do sistema.",
      },
      {
        Icon: LifeBuoy,
        label: "Pneus",
        text: "Maior desgaste dos pneus devido ao uso mais frequente do freio.",
      },
      {
        Icon: Fuel,
        label: "Armazenagem de gás",
        text: "Exige armazenamento físico de cilindros, ocupando espaço e com cuidados de segurança.",
      },
    ],
    accent: "primary",
  },
];

function CompareCard({ title, description, points, accent }: CompareItem) {
  const isPrimary = accent === "primary";
  const accentText = isPrimary ? "text-primary-500" : "text-secondary-600";
  const glowBg = isPrimary ? "bg-primary-500" : "bg-secondary-600";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl">
      {/* Zona do título — fundo #F7F6F6 + blur de acento bem suave (acende no hover) */}
      <div className="relative overflow-hidden bg-[#f7f6f6] px-6 pb-6 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full ${glowBg} opacity-[0.1] blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.28]`}
        />
        <h3 className={`relative text-h6 font-semibold ${accentText}`}>
          {title}
        </h3>
        <p className="relative mt-3 text-body leading-[1.35] text-neutral-600">
          {description}
        </p>
      </div>

      {/* Zona dos tópicos — mesmo #F7F6F6 a 40% (divisão) + leve linha */}
      <div className="relative flex-1 border-t border-black/[0.04] bg-[#f7f6f6]/40 px-6 pb-8 pt-6 lg:px-8">
        <ul className="relative z-10 flex flex-col gap-4">
          {points.map(({ Icon, label, text }) => (
            <li key={label} className="flex items-start gap-3">
              <Icon
                aria-hidden
                className={`mt-0.5 size-5 shrink-0 ${accentText}`}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-body-sm font-semibold text-neutral-800">
                  {label}
                </span>
                <span className="text-body-sm leading-[1.35] text-neutral-600">
                  {text}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type CompareSectionProps = {
  /** CTA opcional ao fim da seção (ex.: home). Sem os dois, não renderiza. */
  ctaLabel?: string;
  ctaHref?: string;
};

export function CompareSection({ ctaLabel, ctaHref }: CompareSectionProps = {}) {
  return (
    <Section className="flex flex-col items-center gap-12 lg:gap-16">
      <div className="flex max-w-[640px] flex-col gap-4 text-center">
        <h2 className="text-h2 text-neutral-800">
          <span className="lg:block font-normal">
            Empilhadeira elétrica ou GLP:
          </span>{" "}
          <span className="lg:block font-bold text-primary-500">
            qual escolher?
          </span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          As duas movimentam as mesmas cargas, mas brilham em operações
          diferentes. Veja qual encaixa melhor na sua rotina antes de escolher
          o modelo.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <CompareCard key={item.title} {...item} />
        ))}
      </div>

      {ctaLabel && ctaHref && (
        <Button variant="primary" size="lg" href={ctaHref}>
          {ctaLabel}
        </Button>
      )}
    </Section>
  );
}
