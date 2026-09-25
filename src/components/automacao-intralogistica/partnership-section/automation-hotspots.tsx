"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { automationHotspots } from "./automation-hotspots.data";
import type { SectionContent } from "@/sanity/content/fields";
import type { automacaoPage } from "@/sanity/content/pages/automacao";

// Camada de pontos interativos sobre a ilustração, no modelo do mapa
// interativo da Dematic: botão "+" sobre cada etapa que abre um pop-up
// ancorado nele mesmo (não um modal). Só um pop-up aberto por vez; fecha no
// Escape, no clique fora e ao abrir outro ponto.
type HotspotItems = SectionContent<typeof automacaoPage.sections.hotspots>["items"];

// Texto e foto vêm do Studio; posição e lado de abertura, do .data (por índice).
export function AutomationHotspots({ content }: { content: HotspotItems }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (layerRef.current && !layerRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [openId]);

  return (
    // A camada não captura cliques (a ilustração fica livre); só os botões e os
    // pop-ups capturam.
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-20"
    >
      {content.map((item, i) => {
        const spot = { ...automationHotspots[i], ...item };
        const isOpen = openId === spot.id;
        const panelId = `${uid}-${spot.id}`;
        const openRight = spot.side === "right";
        return (
          <div
            key={spot.id}
            // O ponto aberto sobe no empilhamento: sem isso o card passa por
            // baixo dos botões que vêm depois dele no DOM.
            className={`absolute ${isOpen ? "z-30" : "z-10"}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            {/* Botão "+" — centralizado no ponto. Gira 45° quando aberto, o
                que transforma o "+" em "×" sem trocar de ícone. */}
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : spot.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={
                isOpen ? `Fechar ${spot.title}` : `Saiba mais sobre ${spot.title}`
              }
              className={`pointer-events-auto flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none ring-[3px] ring-primary-500/25 transition-[transform,background-color,color] duration-300 focus-visible:ring-primary-500/60 lg:size-7 lg:ring-4 ${
                isOpen
                  ? "rotate-45 bg-primary-500 text-neutral-50"
                  : "bg-primary-50 text-primary-500 hover:bg-primary-100"
              }`}
            >
              <Plus aria-hidden className="size-3.5 lg:size-4" />
            </button>

            {/* Pop-up ancorado no botão */}
            <div
              id={panelId}
              role="group"
              aria-label={spot.title}
              hidden={!isOpen}
              className={`pointer-events-auto absolute top-1/2 w-[220px] -translate-y-1/2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_16px_32px_-8px_rgba(0,0,0,0.24)] lg:w-[260px] ${
                openRight
                  ? "left-[calc(50%+20px)] lg:left-[calc(50%+26px)]"
                  : "right-[calc(50%+20px)] lg:right-[calc(50%+26px)]"
              }`}
            >
              {/* Foto no topo do card, como no card da Dematic. */}
              <div className="relative aspect-video w-full bg-neutral-100">
                <Image
                  src={spot.image}
                  alt=""
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 p-4">
                <p className="font-heading text-body font-semibold leading-[1.3] text-neutral-800">
                  {spot.title}
                </p>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {spot.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
