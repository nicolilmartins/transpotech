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
import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getSharedTexts } from "@/sanity/queries/shared";
// Mesmas fotos do comparativo da página de simulação (src/data/glp-vs-eletrica.ts).
import imgEletrica from "@/assets/images/empilhadeiras/rce_1.webp";
import imgGlp from "@/assets/images/empilhadeiras/rc_44_1.webp";

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
  image: StaticImageData;
  imageAlt: string;
  points: ComparePoint[];
  accent: "primary" | "secondary";
};

// Comparativo elétrica (lítio) × GLP — critérios e copy baseados no
// comparativo TranspoTech (textos em sanity/content/pages/shared.ts).
// Elétrica com acento verde (eletrificação/ESG) e GLP em laranja. Cada
// critério usa o mesmo ícone nos dois cards, por posição.
const pointIcons: LucideIcon[] = [
  DollarSign,
  Wrench,
  Gauge,
  Leaf,
  Disc3,
  LifeBuoy,
  Fuel,
];

const cardVisuals: Pick<CompareItem, "image" | "imageAlt" | "accent">[] = [
  {
    image: imgEletrica,
    imageAlt: "Empilhadeira elétrica a lítio STILL RCE",
    accent: "secondary",
  },
  {
    image: imgGlp,
    imageAlt: "Empilhadeira a GLP STILL RC 44-25 C",
    accent: "primary",
  },
];

function CompareCard({
  title,
  description,
  image,
  imageAlt,
  points,
  accent,
}: CompareItem) {
  const isPrimary = accent === "primary";
  const accentText = isPrimary ? "text-primary-500" : "text-secondary-600";
  const glowBg = isPrimary ? "bg-primary-500" : "bg-secondary-600";

  return (
    // Card branco no formato do comparativo da página de simulação: a
    // empilhadeira fica no topo e transborda a borda superior do card. Por
    // isso o card não usa overflow-hidden — o recorte do blur fica numa
    // camada própria.
    <div className="group relative flex flex-col rounded-2xl bg-white px-6 pb-8 lg:px-8">
      {/* Blur de acento — só aparece no hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <div
          className={`absolute left-1/2 top-24 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full ${glowBg} opacity-0 blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.28]`}
        />
      </div>

      {/* Empilhadeira — -mt negativo faz transbordar o topo do card */}
      <div className="relative -mt-12 h-44 w-full sm:h-52 lg:-mt-16 lg:h-60">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 420px, 90vw"
          className="object-contain"
        />
      </div>

      <div className="relative mt-4">
        <h3 className={`text-h6 font-semibold ${accentText}`}>{title}</h3>
        <p className="mt-3 text-body leading-[1.35] text-neutral-600">
          {description}
        </p>
      </div>

      <ul className="relative mt-6 flex flex-col gap-4 border-t border-black/[0.06] pt-6">
        {points.map(({ Icon, label, text }, i) => (
          <li key={i} className="flex items-start gap-3">
            <Icon
              aria-hidden
              className={`mt-0.5 size-5 shrink-0 ${accentText}`}
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-body font-semibold text-neutral-800">
                {label}
              </span>
              <span className="text-body leading-[1.35] text-neutral-600">
                {text}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

type CompareSectionProps = {
  /** CTA opcional ao fim da seção (ex.: home). Sem os dois, não renderiza. */
  ctaLabel?: string;
  ctaHref?: string;
};

export async function CompareSection({
  ctaLabel,
  ctaHref,
}: CompareSectionProps = {}) {
  const { compare: content } = await getSharedTexts();
  const items: CompareItem[] = content.cards.map((card, i) => ({
    ...cardVisuals[i],
    title: card.title,
    description: card.description,
    points: card.points.map((point, j) => ({ ...point, Icon: pointIcons[j] })),
  }));

  return (
    <Section className="flex flex-col items-center gap-12 lg:gap-16">
      <div className="flex max-w-[640px] flex-col gap-4 text-center">
        <h2 className="text-h2 text-neutral-800">
          <span className="lg:block font-normal">{content.titleTop}</span>{" "}
          <span className="lg:block font-bold text-primary-500">
            {content.titleAccent}
          </span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          {content.description}
        </p>
      </div>

      {/* Caixa cinza com os cards brancos dentro, como no simulador. pt extra
          dá espaço para as empilhadeiras transbordarem o topo; no mobile o gap
          maior acomoda o transbordo do segundo card. */}
      <div className="grid w-full grid-cols-1 items-stretch gap-16 rounded-3xl bg-neutral-50 p-4 pt-16 sm:p-6 sm:pt-20 lg:grid-cols-2 lg:gap-6 lg:pt-24">
        {items.map((item, i) => (
          <CompareCard key={i} {...item} />
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
