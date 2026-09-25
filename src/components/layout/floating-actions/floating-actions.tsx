"use client";

import { useEffect, useRef, useState } from "react";
import { IntentLink } from "@/components/ui/intent-link";
import { MapPin, Phone, Plus } from "lucide-react";
import { cssEase, prefersReducedMotion, tweenStyle } from "@/lib/motion";
import { ROUTES } from "@/lib/routes";

// "Nossas unidades" leva à seção de unidades da página de contato; "Contatos"
// ao rodapé, que traz os canais de atendimento e existe em todas as páginas.
const options = [
  {
    label: "Nossas unidades",
    href: `${ROUTES.CONTATO}#unidades`,
    Icon: MapPin,
  },
  { label: "Contatos", href: "#rodape", Icon: Phone },
];

const chip = "rounded-full bg-neutral-50 shadow-[0_2px_5px_rgba(0,0,0,0.15)]";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const iconRef = useRef<SVGSVGElement>(null);

  // Estado inicial (fechado) — opções invisíveis
  useEffect(() => {
    optionRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translate(0px, 8px)";
      el.style.pointerEvents = "none";
    });
  }, []);

  // Anima ao abrir/fechar. Antes da primeira abertura não há o que fechar
  // (o estado fechado já foi aplicado acima).
  const hasOpened = useRef(false);
  useEffect(() => {
    if (open) hasOpened.current = true;
    if (!hasOpened.current) return;
    const opts = optionRefs.current.filter((el) => el !== null);
    const icon = iconRef.current;
    const reduced = prefersReducedMotion();
    if (open) {
      opts.forEach((el) => (el.style.pointerEvents = "auto"));
      // Cascata a partir do último (o mais próximo do botão).
      opts.forEach((el, i) =>
        tweenStyle(
          el,
          { opacity: "1", transform: "translate(0px, 0px)" },
          {
            duration: reduced ? 0 : 0.2,
            delay: reduced ? 0 : (opts.length - 1 - i) * 0.06,
            easing: cssEase.power1Out,
          }
        )
      );
      if (icon) {
        tweenStyle(
          icon,
          { transform: "rotate(45deg)" },
          { duration: reduced ? 0 : 0.2, easing: cssEase.power1Out }
        );
      }
    } else {
      opts.forEach((el, i) =>
        tweenStyle(
          el,
          { opacity: "0", transform: "translate(0px, 8px)" },
          {
            duration: reduced ? 0 : 0.15,
            delay: reduced ? 0 : i * 0.06,
            easing: cssEase.power1In,
            // Cliques voltam a passar só ao fim da cascata inteira.
            onComplete:
              i === opts.length - 1
                ? () => opts.forEach((o) => (o.style.pointerEvents = "none"))
                : undefined,
          }
        )
      );
      if (icon) {
        tweenStyle(
          icon,
          { transform: "rotate(0deg)" },
          { duration: reduced ? 0 : 0.2, easing: cssEase.power1Out }
        );
      }
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
          <IntentLink
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
          </IntentLink>
        ))}
      </div>

      {/* Botão flutuante (+ / ×) */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Fechar ações rápidas" : "Abrir ações rápidas"}
        aria-expanded={open}
        className="flex size-14 items-center justify-center rounded-full bg-primary-500 text-neutral-50 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Plus ref={iconRef} className="size-6" />
      </button>
    </div>
  );
}
