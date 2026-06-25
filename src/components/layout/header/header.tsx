"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoTranspotech } from "@/components/ui/logo";
import { MegaMenu, megaMenus } from "./mega-menu";

const MEGA_MENU_ID = "megamenu-panel";

type NavItem = { label: string };

const navItems: NavItem[] = [
  { label: "Produtos" },
  { label: "Serviços" },
  { label: "Automação" },
  { label: "Empresa" },
  { label: "Contato" },
];

function useHeaderState() {
  const [onDark, setOnDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const DARK_LINE = 70;
    const HIDE_THRESHOLD = 120;
    let raf = 0;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;

      const els = document.querySelectorAll<HTMLElement>("[data-header-dark]");
      let dark = false;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= DARK_LINE && rect.bottom >= DARK_LINE) dark = true;
      });
      setOnDark(dark);

      if (scrollY > lastScrollY.current && scrollY > HIDE_THRESHOLD) {
        setHidden(true);
      } else if (scrollY < lastScrollY.current || scrollY <= 0) {
        setHidden(false);
      }

      lastScrollY.current = scrollY;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { onDark, hidden };
}

export function Header() {
  const { onDark, hidden } = useHeaderState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  // Abre/fecha o megamenu com pequeno atraso no fechar (ponte de hover entre o
  // gatilho e o painel, evitando flicker no espaço entre eles).
  const openMenu = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenLabel(label);
    setMegaOpen(true);
  };
  const keepMenuOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  };

  const activeConfig = openLabel ? megaMenus[openLabel] : null;

  // Fecha ao redimensionar para desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fecha o megamenu com Escape.
  useEffect(() => {
    if (!megaOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [megaOpen]);

  const pillBg = onDark ? "bg-neutral-900/60" : "bg-white/80";
  const textColor = onDark ? "text-neutral-50" : "text-neutral-800";

  return (
    <header
      role="banner"
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-transform duration-300 ease-in-out",
        // Mantém visível quando menu está aberto.
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      {/* Wrapper de largura — separa o centramento da estilização do pill */}
      <div className="relative mx-auto mt-[30px] w-[1312px] max-w-[calc(100%-32px)]">
        {/* Pill */}
        <div
          className={[
            "flex items-center justify-between rounded-[200px] py-4 pl-6 pr-4",
            "backdrop-blur-md transition-colors duration-300",
            pillBg,
            "lg:pl-8",
          ].join(" ")}
        >
          {/* Esquerda: Logo + Desktop Nav */}
          <div className="flex items-center gap-4 lg:gap-20">
            <Link href="/" className="shrink-0" aria-label="TranspoTech — página inicial">
              <LogoTranspotech
                className={[
                  "h-8 w-[174px] transition-colors duration-300",
                  onDark ? "text-neutral-50" : "text-logo-ink",
                ].join(" ")}
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-2" role="list">
                {navItems.map((item) => {
                  const hasMenu = megaMenus[item.label] != null;
                  const isActive = hasMenu && megaOpen && openLabel === item.label;
                  return (
                    <li
                      key={item.label}
                      onMouseEnter={
                        hasMenu ? () => openMenu(item.label) : undefined
                      }
                      onMouseLeave={hasMenu ? scheduleCloseMega : undefined}
                    >
                      <Link
                        href="#"
                        aria-haspopup={hasMenu ? "menu" : undefined}
                        aria-expanded={hasMenu ? isActive : undefined}
                        aria-controls={hasMenu ? MEGA_MENU_ID : undefined}
                        className={[
                          "group relative flex h-6 items-center justify-center gap-1",
                          "px-2 py-1 text-body font-normal transition-colors duration-300",
                          textColor,
                        ].join(" ")}
                      >
                        {item.label}
                        {hasMenu && (
                          <ChevronDown
                            className={[
                              "size-5 transition-transform duration-200",
                              isActive ? "rotate-180" : "",
                            ].join(" ")}
                            aria-hidden
                          />
                        )}
                        <span
                          aria-hidden
                          className={[
                            "pointer-events-none absolute inset-x-2 bottom-0 h-0.5 origin-center rounded-full bg-primary-400 transition duration-200",
                            isActive
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
                          ].join(" ")}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Direita: Desktop CTAs | Mobile CTA + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Desktop CTAs */}
            <Button
              variant="gray"
              size="lg"
              className={[
                "hidden lg:flex",
                onDark ? "!bg-white/15 !text-neutral-50 hover:!bg-white/25" : "",
              ].join(" ")}
            >
              Calcular orçamento
            </Button>
            <Button variant="primary" size="lg" className="hidden lg:flex">
              Fale com vendas
            </Button>

            {/* Mobile: CTA primário */}
            <Button variant="primary" size="md" className="flex lg:hidden">
              Fale com vendas
            </Button>

            {/* Mobile: hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex size-10 items-center justify-center rounded-full transition-colors hover:bg-black/10 lg:hidden ${textColor}`}
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Desktop: megamenu (Produtos / Serviços / Empresa) */}
        {activeConfig && (
          <MegaMenu
            id={MEGA_MENU_ID}
            open={megaOpen}
            config={activeConfig}
            onPointerEnter={keepMenuOpen}
            onPointerLeave={scheduleCloseMega}
            onNavigate={() => setMegaOpen(false)}
          />
        )}

        {/* Mobile: menu suspenso */}
        {menuOpen && (
          <div className="mt-2 flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-lg lg:hidden">
            <nav aria-label="Menu mobile">
              <ul role="list" className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-body font-medium text-neutral-800 hover:bg-neutral-50"
                    >
                      {item.label}
                      {megaMenus[item.label] != null && (
                        <ChevronDown className="size-4 text-neutral-400" aria-hidden />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4">
              <Button variant="gray" size="lg" className="w-full justify-center">
                Calcular orçamento
              </Button>
              <Button variant="primary" size="lg" className="w-full justify-center">
                Fale com vendas
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
