"use client";

import {
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
  type Ref,
} from "react";
import { gsap } from "@/lib/gsap";

// Moldura com parallax sutil: a imagem "anda dentro do frame" conforme o
// scroll — chega mais baixa quando a seção entra na viewport, sobe levemente
// até o estado de descanso e volta quando o usuário retorna para cima.
// O progresso é calculado por getBoundingClientRect a cada scroll (rAF), em
// vez de ScrollTrigger com posições absolutas — imune a pins e a mudanças de
// altura por imagens lazy acima da seção. Com prefers-reduced-motion, fica
// estático.
const RANGE = 6; // deslocamento máximo em % (±)

type ParallaxFrameProps = {
  /** Classes da moldura (tamanho, cantos etc.) — o clip fica por conta do componente. */
  className?: string;
  /** Ref externa para a moldura (ex.: animações de entrada da seção). */
  ref?: Ref<HTMLDivElement>;
  /** Desativa o parallax/zoom: a imagem fica estática dentro da moldura. */
  noParallax?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"div">, "className" | "children" | "ref">;

export function ParallaxFrame({
  className = "",
  ref,
  noParallax = false,
  children,
  ...rest
}: ParallaxFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    frameRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    if (noParallax) return;
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setY = gsap.quickSetter(inner, "yPercent");
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = frame entrando por baixo; 1 = frame saindo por cima.
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height))
      );
      setY(RANGE - RANGE * 2 * progress);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [noParallax]);

  return (
    <div
      {...rest}
      ref={setRefs}
      className={`relative overflow-hidden ${className}`}
    >
      {noParallax ? (
        // Estático: a imagem preenche a moldura sem zoom nem deslocamento.
        children
      ) : (
        // scale cobre o deslocamento de ±6% sem expor as bordas do frame
        <div
          ref={innerRef}
          className="absolute inset-0 scale-[1.13] will-change-transform"
        >
          {children}
        </div>
      )}
    </div>
  );
}
