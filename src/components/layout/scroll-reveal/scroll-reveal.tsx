"use client";

import { useEffect } from "react";

const STEP = 150; // intervalo entre itens revelados em sequência

/**
 * Entrada gradual (fade + slide) em cascata. Cada "bloco" da seção (cabeçalho,
 * linha de cards, etc.) é observado separadamente: ao entrar na viewport, seus
 * itens entram um de cada vez. Assim o título aparece ao chegar no topo da
 * seção e os cards só quando o usuário rola até eles — um após o outro.
 *
 * Títulos, textos e botões são revelados individualmente (descemos nos wrappers
 * sem fundo/borda); cards (com fundo/borda) e cenas 3D são revelados como uma
 * unidade, para não conflitar com seus próprios transforms/transições.
 *
 * Usa a Web Animations API (`element.animate`) em vez de mutar `className`/
 * `style`: assim não alteramos atributos que o React controla, evitando erros de
 * hidratação. Seções com revelação própria usam `data-reveal-skip`.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof Element.prototype.animate !== "function") return;

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

    // Filhos reveláveis: não decorativos; em cenas 3D, nenhum (revela como bloco).
    const childrenToReveal = (el: HTMLElement) =>
      is3DScene(el)
        ? []
        : (Array.from(el.children) as HTMLElement[]).filter(
            (child) => !isDecorative(child)
          );

    // Átomos a revelar: desce em wrappers; para em folhas, cards e cenas 3D.
    const atomsOf = (el: HTMLElement): HTMLElement[] => {
      if (isVisualUnit(el)) return [el];
      const kids = childrenToReveal(el);
      return kids.length === 0 ? [el] : kids.flatMap(atomsOf);
    };

    // Animações criadas pausadas no 1º quadro (opacity 0 → escondido). Ao entrar
    // na viewport, ajustamos o delay em cascata e damos play. Como a WAAPI não
    // toca em className/style, o React não enxerga divergência na hidratação.
    const blockAnims = new Map<Element, Animation[]>();
    const allAnims: Animation[] = [];

    const reveal = (atom: HTMLElement): Animation => {
      const anim = atom.animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 900, easing: "ease-out", fill: "both" }
      );
      anim.pause();
      anim.currentTime = 0;
      allAnims.push(anim);
      return anim;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const anims = blockAnims.get(entry.target) ?? [];
          anims.forEach((anim, i) => {
            anim.effect?.updateTiming({ delay: i * STEP });
            anim.play();
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    for (const section of sections) {
      for (const block of childrenToReveal(section)) {
        const anims = atomsOf(block).map(reveal);
        blockAnims.set(block, anims);
        observer.observe(block);
      }
    }

    return () => {
      observer.disconnect();
      allAnims.forEach((anim) => anim.cancel());
    };
  }, []);

  return null;
}
