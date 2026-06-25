"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Plus } from "lucide-react";

const options = [
  { label: "Nossas unidades", href: "#unidades", Icon: MapPin },
  { label: "Contatos", href: "#contato", Icon: Phone },
];

const chip = "rounded-full bg-neutral-50 shadow-[0_2px_5px_rgba(0,0,0,0.15)]";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora ou pressionar Escape.
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
    // Fixo no canto inferior direito do viewport: 64px lateral, 32px inferior.
    // Posição independente da largura da janela.
    <div ref={ref} className="fixed bottom-8 right-16 z-40">
      {/* Opções — flutuam acima do botão, sem deslocar sua posição */}
      <div className="absolute bottom-full right-0 mb-3 flex flex-col items-end gap-3">
        {options.map((option, index) => (
          <Link
            key={option.label}
            href={option.href}
            tabIndex={open ? 0 : -1}
            aria-hidden={!open}
            onClick={() => setOpen(false)}
            style={{
              transitionDelay: open
                ? `${(options.length - 1 - index) * 60}ms`
                : "0ms",
            }}
            className={`group/opt flex items-center gap-2 transition-all duration-200 ${
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0"
            }`}
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
        <Plus
          className={`size-6 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
    </div>
  );
}
