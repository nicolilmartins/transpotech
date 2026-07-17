"use client";

import { useRef, useState, type ReactNode } from "react";

type SnapCarouselProps = {
  /** Classes do trilho (container com scroll-snap) — vêm da seção. */
  trackClassName: string;
  /** Quantidade de itens navegáveis (marcados com data-snap-item). */
  count: number;
  /**
   * Prefixo do rótulo acessível de cada bolinha (string serializável, para
   * poder vir de Server Components). O número (1-based) é acrescentado.
   * Ex.: "Ir para o case" → "Ir para o case 1".
   */
  dotLabel?: string;
  children: ReactNode;
};

/**
 * Carrossel de scroll-snap com bolinhas de paginação sincronizadas ao scroll
 * (mobile). Os itens navegáveis devem ter o atributo data-snap-item; elementos
 * sem o atributo (ex.: imagem só de desktop) são ignorados na paginação.
 */
export function SnapCarousel({
  trackClassName,
  count,
  dotLabel = "Ir para o item",
  children,
}: SnapCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const snapItems = () =>
    Array.from(
      trackRef.current?.querySelectorAll<HTMLElement>("[data-snap-item]") ?? []
    );

  // Item mais próximo do início do trilho = ativo (snap-start alinha os dois).
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let nearest = 0;
    let best = Infinity;
    snapItems().forEach((el, i) => {
      const distance = Math.abs(el.offsetLeft - track.scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    const item = snapItems()[i];
    if (!track || !item) return;
    track.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="flex w-full flex-col items-center gap-10 lg:gap-16">
      <div ref={trackRef} onScroll={onScroll} className={trackClassName}>
        {children}
      </div>

      {/* Paginação */}
      <div className="relative flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`${dotLabel} ${i + 1}`}
            aria-current={i === active}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "h-2 w-4 bg-neutral-100"
                : "size-2 bg-neutral-600 hover:bg-neutral-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
