"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Plus } from "lucide-react";
import { gsap } from "@/lib/gsap";

const options = [
  { label: "Nossas unidades", href: "#unidades", Icon: MapPin },
  { label: "Contatos", href: "#contato", Icon: Phone },
];

const chip = "rounded-full bg-neutral-50 shadow-[0_2px_5px_rgba(0,0,0,0.15)]";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const iconRef = useRef<SVGSVGElement>(null);

  // Estado inicial (fechado) — opções invisíveis
  useEffect(() => {
    gsap.set(optionRefs.current, { opacity: 0, y: 8, pointerEvents: "none" });
  }, []);

  // Anima ao abrir/fechar
  useEffect(() => {
    if (open) {
      gsap.set(optionRefs.current, { pointerEvents: "auto" });
      gsap.to(optionRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power1.out",
        stagger: { each: 0.06, from: "end" },
      });
      gsap.to(iconRef.current, { rotation: 45, duration: 0.2, ease: "power1.out" });
    } else {
      gsap.to(optionRefs.current, {
        opacity: 0,
        y: 8,
        duration: 0.15,
        ease: "power1.in",
        stagger: 0.06,
        onComplete: () => {
          gsap.set(optionRefs.current, { pointerEvents: "none" });
        },
      });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.2, ease: "power1.out" });
    }
  }, [open]);

  // Fecha ao clicar fora ou pressionar Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-40 lg:bottom-8 lg:right-16">
      {/* Opções — flutuam acima do botão */}
      <div className="absolute bottom-full right-0 mb-3 flex flex-col items-end gap-3">
        {options.map((option, index) => (
          <Link
            key={option.label}
            href={option.href}
            ref={(node) => { optionRefs.current[index] = node; }}
            tabIndex={open ? 0 : -1}
            aria-hidden={!open}
            onClick={() => setOpen(false)}
            className="group/opt flex items-center gap-2"
          >
            <span
              className={`${chip} whitespace-nowrap px-3 py-1 text-body font-semibold leading-6 text-neutral-800`}
            >
              {option.label}
            </span>
            <span
              className={`${chip} flex size-12 items-center justify-center text-neutral-800 transition-colors group-hover/opt:bg-neutral-100`}
            >
              <option.Icon className="size-6" />
            </span>
          </Link>
        ))}
      </div>

      {/* Botão flutuante (+ / ×) */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Fechar ações rápidas" : "Abrir ações rápidas"}
        aria-expanded={open}
        className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-primary-300 to-primary-500 text-neutral-50 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Plus ref={iconRef} className="size-6" />
      </button>
    </div>
  );
}
