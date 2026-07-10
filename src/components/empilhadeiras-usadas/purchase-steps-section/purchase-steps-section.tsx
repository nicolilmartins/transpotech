"use client";

import { useEffect, useRef } from "react";
import {
  ClipboardList,
  Forklift,
  Eye,
  FileCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Step = { title: string; description: string; Icon: LucideIcon };

const steps: Step[] = [
  {
    title: "Você informa a necessidade",
    description:
      "Tipo de operação, capacidade, ambiente, energia, prazo e orçamento.",
    Icon: ClipboardList,
  },
  {
    title: "Indicação de equipamentos",
    description: "A equipe seleciona equipamentos compatíveis no estoque atual.",
    Icon: Forklift,
  },
  {
    title: "Visita técnica (opcional)",
    description:
      "Você pode visitar a unidade ou pedir vídeo do equipamento em operação.",
    Icon: Eye,
  },
  {
    title: "Laudo e proposta",
    description: "Laudo técnico, garantia e proposta comercial detalhada.",
    Icon: FileCheck,
  },
  {
    title: "Entrega e suporte pós-venda",
    description:
      "Entrega coordenada e início da garantia + suporte técnico TranspoTech.",
    Icon: Truck,
  },
];

// Linha horizontal + nós: camada base (cinza) sob a camada laranja, que é
// revelada por clip-path da esquerda para a direita conforme o scroll.
function LineMarkers({ tone }: { tone: "base" | "fill" }) {
  const isFill = tone === "fill";
  return (
    <div className="relative h-3">
      <div
        className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 ${
          isFill ? "bg-primary-500" : "bg-white/15"
        }`}
      />
      <div className="relative grid h-full grid-cols-5">
        {steps.map((step) => (
          <div key={step.title} className="flex items-center">
            <span
              className={`size-3 -translate-x-1/2 rounded-full ${
                isFill
                  ? "bg-primary-500 shadow-[0_0_12px_rgba(245,130,32,0.7)]"
                  : "bg-neutral-600"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PurchaseStepsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // A linha laranja começa apagada e "carrega" (esquerda → direita) uma única
  // vez quando a seção entra na viewport — em sincronia com a entrada dos demais
  // elementos —, e não atrelada ao scroll.
  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;
    const set = (p: number) => {
      fill.style.clipPath = `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1);
      return;
    }
    set(0);
    const state = { p: 0 };
    const tween = gsap.to(state, {
      p: 1,
      duration: 1.8,
      ease: "sine.inOut",
      paused: true,
      onUpdate: () => set(state.p),
    });
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top 90%",
      once: true,
      onEnter: () => tween.play(),
    });
    ScrollTrigger.refresh();
    return () => {
      st.kill();
      tween.kill();
    };
  }, []);

  return (
    <Section data-header-dark className="flex flex-col gap-10 lg:gap-14">
      {/* Título em duas linhas + descrição (topo esquerdo) */}
      <div className="flex max-w-[560px] flex-col gap-4">
        <h2 className="text-h2 text-neutral-50">
          <span className="font-normal">Como funciona</span>
          <br />
          <span className="font-bold text-primary-500">a compra de usada</span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-400">
          Um processo simples e transparente, do primeiro contato à entrega com
          garantia e suporte da TranspoTech.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Colunas — ícone + título + descrição, divisores entre elas */}
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={`flex flex-col gap-4 lg:px-6 ${
                i > 0 ? "lg:border-l lg:border-white/10" : ""
              }`}
            >
              <step.Icon aria-hidden className="size-6 text-neutral-200" />
              <h3 className="font-heading text-h6 font-semibold text-neutral-50">
                {step.title}
              </h3>
              <p className="text-body-sm leading-[1.4] text-neutral-400">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Linha de baixo (desktop) — cinza base + laranja que carrega no scroll */}
        <div ref={trackRef} className="relative hidden lg:block">
          <LineMarkers tone="base" />
          <div
            ref={fillRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <LineMarkers tone="fill" />
          </div>
        </div>
      </div>
    </Section>
  );
}
