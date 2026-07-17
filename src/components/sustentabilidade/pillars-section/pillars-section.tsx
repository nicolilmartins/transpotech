import { Leaf, Users, ShieldCheck, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";

type Pillar = {
  title: string;
  description: string;
  items: string[];
  Icon: LucideIcon;
};

const pillars: Pillar[] = [
  {
    title: "Ambiental",
    description:
      "Práticas e soluções que apoiam operações mais eficientes, conscientes e alinhadas à redução de impactos.",
    items: [
      "Eficiência operacional",
      "Soluções elétricas e baterias",
      "Uso responsável de recursos",
      "Apoio a operações mais sustentáveis",
      "Logística reversa, descarte correto de materiais e fluidos",
      "Produção de 172 mil kWh/ano",
    ],
    Icon: Leaf,
  },
  {
    title: "Social",
    description:
      "Iniciativas voltadas à inclusão, equidade, desenvolvimento de pessoas e impacto positivo na comunidade.",
    items: [
      "Equidade social",
      "Mulheres Mecânicas",
      "Projetos comunitários",
      "Desenvolvimento de talentos",
    ],
    Icon: Users,
  },
  {
    title: "Governança",
    description:
      "Práticas e canais que reforçam ética, transparência, escuta e responsabilidade corporativa.",
    items: [
      "Canal da Transparência",
      "Ouvidoria Digital",
      "Conduta ética",
      "Relações responsáveis",
    ],
    Icon: ShieldCheck,
  },
];

// Card no estilo do CompareCard (layout/compare-section), sem
// ilustração e com acento verde (secondary) em todos.
function PillarCard({ title, description, items, Icon }: Pillar) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl">
      {/* Zona do título — fundo #F7F6F6 + blur verde bem suave (acende no hover) */}
      <div className="relative overflow-hidden bg-[#f7f6f6] px-6 pb-6 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-600 opacity-[0.1] blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.28]"
        />
        <Icon className="relative size-8 text-secondary-600" aria-hidden />
        <h3 className="relative mt-4 text-h6 font-semibold text-secondary-600">
          {title}
        </h3>
        <p className="relative mt-3 max-w-[88%] text-body leading-[1.35] text-neutral-600">
          {description}
        </p>
      </div>

      {/* Zona dos tópicos — mesmo #F7F6F6 a 40% (divisão) + leve linha */}
      <div className="relative flex-1 border-t border-black/[0.04] bg-[#f7f6f6]/40 px-6 pb-8 pt-6 lg:px-8">
        <ul className="relative z-10 flex flex-col gap-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary-600"
              />
              <span className="max-w-[88%] text-body leading-[1.35] text-neutral-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PillarsSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h3 text-neutral-800">
          <span className="lg:block font-normal">Comprometidos com</span>{" "}
          <span className="lg:block font-bold text-primary-500">
            um futuro mais sustentável
          </span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Operações mais eficientes e de menor impacto, pessoas valorizadas e
          relações cada vez mais éticas e transparentes.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.title} {...pillar} />
        ))}
      </div>

    </Section>
  );
}
