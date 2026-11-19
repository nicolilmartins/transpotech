"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Foco de diálogo modal: ao abrir, leva o foco para `initialFocus`; enquanto
 * aberto, o Tab circula só dentro de `container`; ao fechar, devolve o foco a
 * quem estava focado antes (o botão que abriu).
 */
export function useModalFocus(
  active: boolean,
  container: RefObject<HTMLElement | null>,
  initialFocus: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    initialFocus.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !container.current) return;
      const items = Array.from(
        container.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.getClientRects().length > 0);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const outside = !container.current.contains(current);
      if (e.shiftKey && (current === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [active, container, initialFocus]);
}
