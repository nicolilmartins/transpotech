"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const SPACING = 18;
const RADIUS = 160;
const FAR = -9999;
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

// O site monta dezenas de instâncias (até 3 por página + formulários). Em vez
// de um mousemove por instância, com getBoundingClientRect e repintura da área
// inteira a cada evento, um único listener agenda um rAF que lê os rects das
// instâncias perto da viewport e depois escreve os transforms, em lote.
type Instance = {
  root: HTMLDivElement;
  spot: HTMLDivElement;
  mesh: HTMLDivElement;
  near: boolean;
  shown: boolean;
};

const instances = new Set<Instance>();
let mouseX = 0;
let mouseY = 0;
let raf = 0;

const place = (inst: Instance, x: number, y: number) => {
  // Inteiros: o spot e a malha são camadas próprias; a soma dos dois
  // translates dá zero no eixo da malha, que fica no mesmo pixel do tile.
  const tx = Math.round(x) - RADIUS;
  const ty = Math.round(y) - RADIUS;
  const mx = ((tx % SPACING) + SPACING) % SPACING;
  const my = ((ty % SPACING) + SPACING) % SPACING;
  inst.spot.style.transform = `translate(${tx}px, ${ty}px)`;
  inst.mesh.style.transform = `translate(${-mx}px, ${-my}px)`;
};

const hide = (inst: Instance) => {
  if (!inst.shown) return;
  inst.shown = false;
  inst.spot.style.transform = `translate(${FAR}px, ${FAR}px)`;
};

const flush = () => {
  raf = 0;
  const visible: Instance[] = [];
  for (const inst of instances) {
    if (inst.near) visible.push(inst);
    else hide(inst);
  }
  const rects = visible.map((inst) => inst.root.getBoundingClientRect());
  visible.forEach((inst, i) => {
    const rect = rects[i];
    const near =
      mouseX >= rect.left - RADIUS &&
      mouseX <= rect.right + RADIUS &&
      mouseY >= rect.top - RADIUS &&
      mouseY <= rect.bottom + RADIUS;
    if (!near) {
      hide(inst);
      return;
    }
    inst.shown = true;
    place(inst, mouseX - rect.left, mouseY - rect.top);
  });
};

const onMove = (event: MouseEvent) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  if (!raf) raf = requestAnimationFrame(flush);
};

const register = (inst: Instance) => {
  if (instances.size === 0) {
    window.addEventListener("mousemove", onMove, { passive: true });
  }
  instances.add(inst);
};

const unregister = (inst: Instance) => {
  instances.delete(inst);
  if (instances.size === 0) {
    window.removeEventListener("mousemove", onMove);
    cancelAnimationFrame(raf);
    raf = 0;
  }
};

/**
 * Malha sutil revelada num círculo ao redor do cursor. O círculo é uma camada
 * de 2×RADIUS com máscara fixa, movida por transform (só compositor); a malha
 * dentro dela anda o inverso, módulo SPACING, para ficar presa à grade da seção.
 */
export function HoverMesh({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sem mouse (toque) o círculo nunca aparece: nem observer nem listener.
    if (!window.matchMedia(FINE_POINTER).matches) return;
    const root = rootRef.current;
    const spot = spotRef.current;
    const mesh = meshRef.current;
    if (!root || !spot || !mesh) return;

    const inst: Instance = { root, spot, mesh, near: false, shown: false };
    // Margem = RADIUS: o círculo aparece com o cursor até RADIUS fora da seção.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inst.near = entry.isIntersecting;
        if (!inst.near) hide(inst);
      },
      { rootMargin: `${RADIUS}px` }
    );
    observer.observe(root);
    register(inst);

    return () => {
      observer.disconnect();
      unregister(inst);
    };
  }, []);

  const size = RADIUS * 2;
  const mask = `radial-gradient(circle ${RADIUS}px at 50% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 42%, transparent 80%)`;

  const spotStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: size,
    height: size,
    transform: `translate(${FAR}px, ${FAR}px)`,
    willChange: "transform",
    maskImage: mask,
    WebkitMaskImage: mask,
  };

  const meshStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: size + SPACING,
    height: size + SPACING,
    willChange: "transform",
    backgroundImage: [
      "radial-gradient(circle, rgba(255,148,72,0.5) 0 1px, transparent 1.6px)",
      "linear-gradient(to right, transparent 0 8.5px, rgba(255,148,72,0.12) 8.5px 9.5px, transparent 9.5px)",
      "linear-gradient(to bottom, transparent 0 8.5px, rgba(255,148,72,0.12) 8.5px 9.5px, transparent 9.5px)",
    ].join(", "),
    backgroundSize: `${SPACING}px ${SPACING}px`,
  };

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={className}
      style={{ overflow: "hidden" }}
    >
      {/* Oculto em tela de toque: as duas camadas com will-change viram
          camadas de GPU mesmo paradas fora da tela. */}
      <div
        ref={spotRef}
        style={spotStyle}
        className="[@media(hover:none),(pointer:coarse)]:hidden"
      >
        <div ref={meshRef} style={meshStyle} />
      </div>
    </div>
  );
}
