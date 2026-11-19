"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadedGsap } from "@/lib/load-gsap";
import { cssEase, prepareFromEach } from "@/lib/motion";

const STAGGER = 0.06;

const SECTION_SELECTOR =
  "main section:not([data-reveal-skip]), footer:not([data-reveal-skip])";

// Seções até uma altura de tela abaixo da viewport já são preparadas (blocos
// descobertos e ocultos), para que ao chegarem estejam prontas para animar.
const PREPARE_MARGIN = "0px 0px 100% 0px";

// Mesmo ponto do antigo ScrollTrigger `start: "top 90%"`: o bloco entra quando
// o topo dele passa de 90% da altura da viewport.
const REVEAL_MARGIN = "0px 0px -10% 0px";
const REVEAL_LINE = 0.9;

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

// `data-reveal-atom`: entra como um bloco só, sem descer nos filhos
// (ex.: mapas SVG interativos, cujos paths controlam a própria opacidade).
const atomsOf = (el: HTMLElement): HTMLElement[] => {
  if (isVisualUnit(el) || el.hasAttribute("data-reveal-atom")) return [el];
  const kids = childrenToReveal(el);
  return kids.length === 0 ? [el] : kids.flatMap(atomsOf);
};

// Fade + slide de 16px, 0.8s power2.out. Nativo para o GSAP não baixar em
// página sem animação com pin.
const hide = (atoms: HTMLElement[]) =>
  prepareFromEach(
    atoms,
    { opacity: 0, y: 16 },
    { duration: 0.8, stagger: STAGGER, easing: cssEase.power2Out }
  );

// Topo acima da linha de entrada: visível agora ou já rolado para cima.
const isPastLine = (entry: IntersectionObserverEntry, fallbackLine: number) =>
  entry.boundingClientRect.top < (entry.rootBounds?.bottom ?? fallbackLine);

/**
 * Entrada gradual (fade + slide) em cascata. Cada "bloco" da seção (cabeçalho,
 * linha de cards, etc.) é revelado separadamente: ao entrar na viewport, seus
 * itens entram um de cada vez com stagger. Seções com revelação própria usam
 * `data-reveal-skip`.
 *
 * Performance: a descoberta dos blocos lê estilo computado de muitos
 * elementos (força recálculo de estilo). Por isso ela só acontece quando a
 * seção se aproxima da viewport, em lote por callback do IntersectionObserver
 * — todas as leituras antes de qualquer escrita —, e a entrada de cada bloco
 * é detectada por IntersectionObserver em vez de um ScrollTrigger por bloco.
 *
 * Reexecuta a cada troca de rota (`pathname`): o componente vive no layout raiz
 * e não desmonta em navegação client-side, então sem isso só a primeira página
 * carregada ganharia os efeitos.
 */
export function ScrollReveal() {
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  useEffect(() => {
    const isNavigation = !isFirstRun.current;
    isFirstRun.current = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let idle = 0;
    let disposed = false;
    let prepareObserver: IntersectionObserver | undefined;
    let revealObserver: IntersectionObserver | undefined;
    // Entradas preparadas (elementos ocultos) aguardando o bloco chegar à linha.
    const pendingByBlock = new Map<Element, Animation[]>();
    const prepared = new WeakSet<Element>();

    const onReveal: IntersectionObserverCallback = (entries, observer) => {
      const line = window.innerHeight * REVEAL_LINE;
      for (const entry of entries) {
        if (!isPastLine(entry, line)) continue;
        observer.unobserve(entry.target);
        pendingByBlock.get(entry.target)?.forEach((a) => a.play());
        pendingByBlock.delete(entry.target);
      }
    };

    const prepare = (sections: HTMLElement[]) => {
      // Seções aninhadas entram no mesmo lote, logo após a externa, na ordem
      // do documento — como no processamento único de antes. Prepará-las
      // depois ocultaria de novo itens que a externa já está revelando.
      const batch: HTMLElement[] = [];
      for (const section of sections) {
        if (prepared.has(section)) continue;
        prepared.add(section);
        batch.push(section);
        for (const nested of section.querySelectorAll<HTMLElement>(
          SECTION_SELECTOR
        )) {
          if (prepared.has(nested)) continue;
          prepared.add(nested);
          prepareObserver?.unobserve(nested);
          batch.push(nested);
        }
      }

      // Leituras (estilo computado + posição) de todo o lote antes de qualquer
      // escrita, para o navegador recalcular estilo/layout uma vez só.
      const line = window.innerHeight * REVEAL_LINE;
      const plan: { block: HTMLElement; atoms: HTMLElement[]; now: boolean }[] =
        [];
      for (const section of batch) {
        for (const block of childrenToReveal(section)) {
          const atoms = atomsOf(block);
          if (atoms.length === 0) continue;
          plan.push({
            block,
            atoms,
            now: block.getBoundingClientRect().top < line,
          });
        }
      }

      // Bloco que já está na tela quando é preparado (banner e primeiro
      // viewport, ou recarga no meio da página) fica como veio do servidor:
      // escondê-lo para refazer a entrada fazia o conteúdo piscar e empurrava o
      // LCP para o fim do fade.
      for (const { block, atoms, now } of plan) {
        if (now) continue;
        pendingByBlock.set(block, hide(atoms));
        revealObserver?.observe(block);
      }
    };

    const init = () => {
      if (disposed) return;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)
      );
      if (sections.length === 0) return;

      revealObserver = new IntersectionObserver(onReveal, {
        rootMargin: REVEAL_MARGIN,
      });
      prepareObserver = new IntersectionObserver(
        (entries, observer) => {
          const line = window.innerHeight * 2;
          const ready: HTMLElement[] = [];
          for (const entry of entries) {
            if (!isPastLine(entry, line)) continue;
            observer.unobserve(entry.target);
            ready.push(entry.target as HTMLElement);
          }
          if (ready.length > 0) prepare(ready);
        },
        { rootMargin: PREPARE_MARGIN }
      );
      for (const section of sections) prepareObserver.observe(section);

      // Em navegação client-side o layout da nova página acabou de montar;
      // recalcula as posições dos ScrollTriggers das seções com animação
      // própria. No primeiro carregamento o ScrollTrigger já faz isso no load.
      // Sem GSAP baixado não há ScrollTrigger para recalcular.
      if (isNavigation) loadedGsap()?.ScrollTrigger.refresh();
    };

    // A descoberta dos blocos força recálculo de estilo; roda só depois da
    // hidratação para não disputar a thread com ela. As animações da Web
    // Animations API não escrevem no atributo `style`, então não há risco de
    // hydration mismatch — o adiamento é só de desempenho.
    //
    // requestIdleCallback sem `timeout`: um timeout forçaria o callback com a
    // thread ocupada. Se a página nunca ficar ociosa o init não roda e o
    // conteúdo aparece sem animação (nunca fica oculto).
    //
    // Espera DOIS períodos ociosos consecutivos: a hidratação do App Router
    // roda em vários chunks, cedendo a thread entre eles, e um único
    // requestIdleCallback pode cair numa dessas brechas. Fallback: rAF duplo
    // onde não há idle.
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
      disposed = true;
      window.removeEventListener("load", start);
      cancelAnimationFrame(raf);
      if (idle && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle);
      }
      prepareObserver?.disconnect();
      revealObserver?.disconnect();
      // Bloco ainda oculto (ex.: footer, que sobrevive à troca de rota) volta
      // ao estado do CSS; a próxima execução o prepara de novo.
      pendingByBlock.forEach((anims) => anims.forEach((a) => a.cancel()));
    };
  }, [pathname]);

  return null;
}
