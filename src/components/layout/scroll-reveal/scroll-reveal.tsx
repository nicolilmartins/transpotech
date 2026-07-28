"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STAGGER = 0.06;

/**
 * Entrada gradual (fade + slide) em cascata. Cada "bloco" da seção (cabeçalho,
 * linha de cards, etc.) dispara um ScrollTrigger separado: ao entrar na viewport,
 * seus itens entram um de cada vez com stagger. Seções com revelação própria
 * usam `data-reveal-skip`.
 *
 * Reexecuta a cada troca de rota (`pathname`): o componente vive no layout raiz
 * e não desmonta em navegação client-side, então sem isso só a primeira página
 * carregada ganharia os efeitos.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggers: ScrollTrigger[] = [];
    let raf = 0;
    let idle = 0;

    const init = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main section:not([data-reveal-skip]), footer:not([data-reveal-skip])"
        )
      );
      if (sections.length === 0) return;

      const isDecorative = (el: HTMLElement) =>
        el.getAttribute("aria-hidden") === "true" ||
        getComputedStyle(el).pointerEvents === "none";

      const is3DScene = (el: HTMLElement) => {
        const cs = getComputedStyle(el);
        return cs.transformStyle === "preserve-3d" || cs.perspective !== "none";
      };

      const isVisualUnit = (el: HTMLElement) => {
        const cs = getComputedStyle(el);
        const hasBg =
          (cs.backgroundColor !== "rgba(0, 0, 0, 0)" &&
            cs.backgroundColor !== "transparent") ||
          cs.backgroundImage !== "none";
        const hasBorder =
          parseFloat(cs.borderTopWidth) > 0 ||
          parseFloat(cs.borderBottomWidth) > 0 ||
          parseFloat(cs.borderLeftWidth) > 0 ||
          parseFloat(cs.borderRightWidth) > 0;
        return hasBg || hasBorder;
      };

      const childrenToReveal = (el: HTMLElement) =>
        is3DScene(el)
          ? []
          : (Array.from(el.children) as HTMLElement[]).filter(
              (child) => !isDecorative(child)
            );

      const atomsOf = (el: HTMLElement): HTMLElement[] => {
        if (isVisualUnit(el)) return [el];
        const kids = childrenToReveal(el);
        return kids.length === 0 ? [el] : kids.flatMap(atomsOf);
      };

      for (const section of sections) {
        for (const block of childrenToReveal(section)) {
          const atoms = atomsOf(block);
          if (atoms.length === 0) continue;

          gsap.set(atoms, { opacity: 0, y: 16 });

          const st = ScrollTrigger.create({
            trigger: block,
            start: "top 90%",
            once: true,
            onEnter: () => {
              gsap.to(atoms, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: STAGGER,
                overwrite: "auto",
              });
            },
          });
          triggers.push(st);
        }
      }

      // Em navegação client-side o layout da nova página acabou de montar;
      // recalcula as posições para os triggers dispararem no ponto certo.
      ScrollTrigger.refresh();
    };

    // ScrollReveal vive no layout raiz, acima dos Suspense boundaries do App
    // Router. Seções e componentes interativos da página (com estado próprio)
    // hidratam DEPOIS do shell; mutar o DOM antes disso faz o React encontrar
    // opacity/transform/display inline ausentes no HTML do servidor (hydration
    // mismatch — o GSAP inclusive força display:inline-block em <span>).
    //
    // A hidratação do React roda como tasks de prioridade normal no scheduler e
    // ocupa a thread principal. requestIdleCallback só dispara quando a thread
    // fica ociosa, ou seja, depois que a hidratação termina.
    //
    // IMPORTANTE: sem `timeout`. Um timeout forçaria o callback a rodar mesmo
    // com a thread ocupada — e em dev (Turbopack a compilar + hidratar páginas
    // pesadas) a hidratação passa fácil de 1,5s, disparando o GSAP no meio dela
    // (hydration mismatch). Sem timeout, se a página nunca ficar ociosa o init
    // simplesmente não roda e o conteúdo aparece sem animação (degradação
    // segura — nunca fica oculto nem quebra a hidratação). Dois rAF após o load
    // dão margem extra para a hidratação assíncrona do App Router concluir.
    // Espera DOIS períodos ociosos consecutivos antes de mexer no DOM. A
    // hidratação do App Router (páginas dentro de Suspense boundaries) roda em
    // vários chunks, cedendo a thread entre eles; um único requestIdleCallback
    // pode cair numa dessas brechas e disparar o GSAP no meio da hidratação
    // (hydration mismatch). Dois "idle" seguidos indicam a thread realmente
    // livre — hidratação concluída. Fallback: rAF duplo onde não há idle.
    const whenIdle = (fn: () => void) => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => fn());
      } else {
        raf = requestAnimationFrame(() => {
          raf = requestAnimationFrame(fn);
        });
      }
    };
    const start = () => whenIdle(() => whenIdle(init));

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      window.removeEventListener("load", start);
      cancelAnimationFrame(raf);
      if (idle && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle);
      }
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
