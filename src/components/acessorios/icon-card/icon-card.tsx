import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { TextLink } from "@/components/ui/text-link";

// Geometria padrão das ilustrações 3D nos cards claros, igual à usada em
// "Por que solicitar peças com a TranspoTech?" e nas seções equivalentes.
const ART_BOX = {
  width: 178.49,
  height: 133.867,
  left: -35,
  top: -18,
  maskX: 14.486,
  maskY: 0,
  flip: true,
};

export type IconCardProps = {
  title: string;
  description: string;
  /** Ícone Lucide em círculo laranja. Ignorado quando há `art`. */
  Icon?: LucideIcon;
  /** Ilustração 3D saindo pelo canto superior, no lugar do ícone. */
  art?: StaticImageData;
  /** CTA opcional no rodapé do card (faixa laranja-clara). */
  ctaLabel?: string;
  ctaHref?: string;
};

// Mesmo card de "O que sua operação precisa?" (Peças/Baterias): ícone em
// círculo laranja + título + descrição, com CTA opcional no rodapé. A largura
// segue o grid flex-wrap da seção (1 → 2 → 3 colunas, última linha centralizada).
export function IconCard({
  title,
  description,
  Icon,
  art,
  ctaLabel,
  ctaHref,
}: IconCardProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]">
      {/* Com ilustração o texto é empurrado para baixo e ancorado na base, como
          nos demais cards claros com arte; com ícone, o layout segue o original. */}
      <div
        className={`relative flex flex-1 flex-col overflow-hidden rounded-xl bg-[#fbfbfb] p-6 ${
          art ? "min-h-[240px] justify-end lg:min-h-[280px]" : "gap-8"
        }`}
      >
        {art ? (
          <CardImageIcon src={art} {...ART_BOX} />
        ) : (
          Icon && (
            <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
              <Icon className="size-6 text-white lg:size-7" aria-hidden />
            </div>
          )
        )}
        <div
          className={`relative flex flex-col gap-4 ${
            art ? "mt-[124px] lg:mt-[140px]" : ""
          }`}
        >
          <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
            {title}
          </h3>
          <p className="text-body leading-[1.35] text-neutral-600">
            {description}
          </p>
        </div>
      </div>
      {ctaLabel && ctaHref && (
        <TextLink href={ctaHref} className="w-full px-6 py-4 text-left">
          {ctaLabel}
        </TextLink>
      )}
    </div>
  );
}
