// GSAP + ScrollTrigger (~117KB) fora do bundle inicial: nenhum componente
// importa "@/lib/gsap" estaticamente, então o chunk só baixa quando a primeira
// animação com pin é preparada (o resto é nativo, em lib/motion).
// Memoizado: um download e um registro de plugin.
export type GsapModule = typeof import("./gsap");
export type Gsap = GsapModule["gsap"];

let pending: Promise<GsapModule> | null = null;
let loaded: GsapModule | undefined;

export function loadGsap(): Promise<GsapModule> {
  pending ??= import("./gsap").then(
    (mod) => (loaded = mod),
    (error: unknown) => {
      // Permite nova tentativa (ex.: rede instável) na próxima animação.
      pending = null;
      throw error;
    },
  );
  return pending;
}

/** O módulo, se alguma animação da página já o baixou; sem disparar download. */
export const loadedGsap = (): GsapModule | undefined => loaded;

/**
 * Roda `setup` quando o GSAP estiver carregado e devolve o cleanup para o
 * efeito: se o componente desmontar antes do download, `setup` não roda.
 * Falha no download: `setup` não roda e a animação não acontece.
 */
export function withGsap(
  setup: (mod: GsapModule) => (() => void) | void,
): () => void {
  let disposed = false;
  let cleanup: (() => void) | void;
  loadGsap().then(
    (mod) => {
      if (!disposed) cleanup = setup(mod);
    },
    () => {},
  );
  return () => {
    disposed = true;
    cleanup?.();
  };
}
