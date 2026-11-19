import type { SectionProps } from "./section.types";

// Padding responsivo padrão TranspoTech (mobile-first):
//   mobile (base) → 20px lateral / 48px topo-base
//   sm (tablet)   → 24px lateral
//   lg (desktop)  → 64px lateral / 80px topo-base (inclui telas de 1440px)
//   2xl (>1440)   → 120px lateral (desktop maior)
// max-w-[1440px] trava o conteúdo em telas largas; o fundo full-bleed fica nas
// divs pai (page.tsx), então o cap só afeta o conteúdo, não a cor de fundo.
const PADDING = "px-5 py-12 sm:px-6 lg:px-16 lg:py-20";
const WRAP = "mx-auto w-full max-w-[1440px]";
const BLEED = "py-12 lg:py-20";

export function Section({
  as: Tag = "section",
  bleed = false,
  className = "",
  children,
  ...rest
}: SectionProps) {
  const base = bleed ? BLEED : `${WRAP} ${PADDING}`;

  return (
    <Tag className={`${base} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
