import { TextLink } from "@/components/ui/text-link";

export type TopicCardProps = {
  title: string;
  description: string;
  /** Tópicos com bullet de acento. */
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Rótulo curto acima do título (ex.: "Mais aplicada"). */
  tag?: string;
  /** Cor do glow e dos bullets: laranja (padrão) ou verde. */
  accent?: "primary" | "secondary";
};

const ACCENT_BG = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
} as const;

// Card do bloco dark (tipos de bateria, níveis de solução em acessórios):
// zona do título com glow que acende no hover + zona de tópicos.
export function TopicCard({
  title,
  description,
  items,
  ctaLabel,
  ctaHref,
  tag,
  accent = "primary",
}: TopicCardProps) {
  const accentBg = ACCENT_BG[accent];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl">
      {/* Zona do título — glow de acento bem suave que acende no hover */}
      <div className="relative overflow-hidden bg-white/5 px-6 pb-6 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full ${accentBg} opacity-[0.12] blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.35]`}
        />
        {/* Texto do rótulo fica claro (contraste AA); o acento vai no ponto */}
        {tag && (
          <p className="relative mb-3 flex items-center gap-2 text-body font-semibold uppercase tracking-wide text-neutral-300">
            <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${accentBg}`} />
            {tag}
          </p>
        )}
        <h3 className="relative text-h6 font-semibold text-neutral-50">{title}</h3>
        <p className="relative mt-3 text-body leading-[1.35] text-neutral-300">
          {description}
        </p>
      </div>

      {/* Zona dos tópicos — divisão por linha sutil + bullets de acento */}
      <div className="relative flex flex-1 flex-col gap-8 bg-white/[0.07] px-6 pb-8 pt-6 lg:px-8">
        <ul className="flex flex-1 flex-col gap-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-2 size-1.5 shrink-0 rounded-full ${accentBg}`}
              />
              <span className="text-body leading-[1.35] text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <TextLink href={ctaHref} className="w-full border-t border-white/10 pt-6">
          {ctaLabel}
        </TextLink>
      </div>
    </div>
  );
}
