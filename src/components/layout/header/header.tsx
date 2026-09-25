"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IntentLink } from "@/components/ui/intent-link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoTranspotech } from "@/components/ui/logo";
import { MegaMenu, getMegaMenus } from "./mega-menu";
import { ROUTES } from "@/lib/routes";

const MEGA_MENU_ID = "megamenu-panel";

type NavItem = { label: string; href?: string };

const navItems: NavItem[] = [
  { label: "Produtos" },
  { label: "Serviços", href: ROUTES.SERVICOS },
  { label: "Automação", href: ROUTES.AUTOMACAO },
  { label: "Empresa" },
  { label: "Contato", href: ROUTES.CONTATO },
];

function useHeaderState(menuOpen: boolean) {
  const [onDark, setOnDark] = useState(false);
  const [onHero, setOnHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const DARK_LINE = 70;

    // Detecção de seções (dark + hero) — listener leve (não é animação)
    const crosses = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top <= DARK_LINE && rect.bottom >= DARK_LINE;
    };
    const updateDark = () => {
      let dark = false;
      document
        .querySelectorAll<HTMLElement>("[data-header-dark]")
        .forEach((el) => {
          if (crosses(el)) dark = true;
        });
      setOnDark(dark);

      let hero = false;
      document
        .querySelectorAll<HTMLElement>("[data-header-hero]")
        .forEach((el) => {
          if (crosses(el)) hero = true;
        });
      setOnHero(hero);
    };

    updateDark();
    window.addEventListener("scroll", updateDark, { passive: true });
    window.addEventListener("resize", updateDark);

    // Hide/show pela direção do scroll. Substitui um ScrollTrigger
    // (start "top+=120 top", sem end) para não baixar o GSAP em toda página:
    // mesma regra — só reage com o scroll dentro de [120, fim da página], e a
    // saída da faixa conta como um último passo (ex.: subir abaixo de 120
    // mostra o header).
    const HIDE_THRESHOLD = 120;
    const clampScroll = () => {
      const max = Math.max(
        HIDE_THRESHOLD,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      return Math.min(Math.max(window.scrollY, HIDE_THRESHOLD), max);
    };
    let lastScroll = clampScroll();
    let frame = 0;
    const updateHidden = () => {
      frame = 0;
      const current = clampScroll();
      if (current === lastScroll) return;
      const scrollingDown = current > lastScroll;
      lastScroll = current;
      setHidden(scrollingDown && !menuOpenRef.current);
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(updateHidden);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateDark);
      window.removeEventListener("resize", updateDark);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { onDark, onHero, hidden };
}

type HeaderProps = {
  /** URL do portal de carreiras (siteSettings), destino de "Trabalhe conosco". */
  careersUrl: string;
};

export function Header({ careersUrl }: HeaderProps) {
  const megaMenus = useMemo(() => getMegaMenus(careersUrl), [careersUrl]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { onDark, onHero, hidden } = useHeaderState(menuOpen);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileExpanded(null);
  };

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

  // Fecha o megamenu com Escape. Se o foco estava no gatilho ou no painel,
  // devolve ao gatilho (senão o foco sumiria junto com o painel, que fica inert).
  useEffect(() => {
    if (!megaOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = openLabel ? triggerRefs.current[openLabel] : null;
      const panel = document.getElementById(MEGA_MENU_ID);
      const active = document.activeElement;
      setMegaOpen(false);
      if (trigger && active && (trigger === active || panel?.contains(active))) {
        trigger.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, openLabel]);

  // Sobre a hero: fundo laranja claro #FFF4ED opaco (legível sobre a imagem).
  // Demais seções: comportamento atual (dark / branco translúcido).
  const pillBg = onHero
    ? "bg-[#fff4ed]"
    : onDark
      ? "bg-neutral-900/60"
      : "bg-white/80";
  // Pill claro (laranja na hero OU branco translúcido nas seções claras) → texto
  // escuro. Só fica claro quando sobre seção dark que NÃO é hero.
  const darkPill = onDark && !onHero;
  const textColor = darkPill ? "text-neutral-50" : "text-neutral-800";

  return (
    <header
      role="banner"
      className={[
        "fixed inset-x-0 top-[var(--app-banner-h,0px)] z-50",
        "transition-[transform,top] duration-300 ease-in-out",
        // Mantém visível quando menu está aberto.
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      {/* Wrapper de largura — padding lateral responsivo igual ao do primitivo
          Section (20/24/64/120px) com cap em 1440px, alinhando o header ao
          conteúdo das páginas: a 1440px o pill mede 1312px. */}
      <div className="mx-auto mt-[30px] w-full max-w-[1440px] px-5 sm:px-6 lg:px-16">
        {/* Caixa de conteúdo — contexto de posicionamento do megamenu/menu mobile */}
        <div className="relative">
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
            <IntentLink href="/" className="shrink-0" aria-label="TranspoTech: página inicial">
              <LogoTranspotech
                className={[
                  "h-8 w-[174px] transition-colors duration-300",
                  darkPill ? "text-neutral-50" : "text-logo-ink",
                ].join(" ")}
              />
            </IntentLink>

            {/* Desktop nav */}
            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-2" role="list">
                {navItems.map((item) => {
                  const hasMenu = megaMenus[item.label] != null;
                  const isActive = hasMenu && megaOpen && openLabel === item.label;
                  const triggerClass = [
                    "group relative flex h-6 items-center justify-center gap-1",
                    "px-2 py-1 text-body font-normal transition-colors duration-300",
                    textColor,
                  ].join(" ");
                  const underline = (
                    <span
                      aria-hidden
                      className={[
                        "pointer-events-none absolute inset-x-2 bottom-0 h-0.5 origin-center rounded-full bg-primary-400 transition duration-200",
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
                      ].join(" ")}
                    />
                  );
                  return (
                    <li
                      key={item.label}
                      onMouseEnter={
                        hasMenu ? () => openMenu(item.label) : undefined
                      }
                      onMouseLeave={hasMenu ? scheduleCloseMega : undefined}
                    >
                      {hasMenu ? (
                        <button
                          type="button"
                          ref={(el) => {
                            triggerRefs.current[item.label] = el;
                          }}
                          aria-haspopup="menu"
                          aria-expanded={isActive}
                          aria-controls={MEGA_MENU_ID}
                          // detail 0 = ativado por teclado (Enter/Espaço): alterna.
                          // Clique de mouse só garante aberto, porque o hover já
                          // abriu e alternar fecharia o painel sob o cursor.
                          onClick={(event) => {
                            if (event.detail === 0 && isActive) {
                              setMegaOpen(false);
                            } else {
                              openMenu(item.label);
                            }
                          }}
                          className={`${triggerClass} cursor-pointer`}
                        >
                          {item.label}
                          <ChevronDown
                            className={[
                              "size-5 transition-transform duration-200",
                              isActive ? "rotate-180" : "",
                            ].join(" ")}
                            aria-hidden
                          />
                          {underline}
                        </button>
                      ) : (
                        <IntentLink href={item.href ?? "#"} className={triggerClass}>
                          {item.label}
                          {underline}
                        </IntentLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Direita: Desktop CTAs (ocultas no mobile) | Hamburger (mobile) */}
          <div className="flex items-center gap-2">
            {/* Desktop CTAs — a visibilidade fica no wrapper (o Button tem display
                próprio e ignoraria `hidden`/`lg:hidden` na própria className). */}
            <div className="hidden items-center gap-2 lg:flex">
              <Button
                variant="gray"
                size="lg"
                href={ROUTES.SIMULADOR}
                className={
                  darkPill ? "!bg-white/15 !text-neutral-50 hover:!bg-white/25" : ""
                }
              >
                Simular economia
              </Button>
              <Button variant="primary" size="lg" href={ROUTES.CONTATO}>
                Fale com vendas
              </Button>
            </div>

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

        {/* Mobile: menu suspenso (acordeão com submenus do megamenu) */}
        {menuOpen && (
          <div className="mt-2 flex max-h-[calc(100dvh-120px)] flex-col gap-1 overflow-y-auto rounded-2xl bg-white p-4 shadow-lg lg:hidden">
            <nav aria-label="Menu mobile">
              <ul role="list" className="flex flex-col">
                {navItems.map((item) => {
                  const menu = megaMenus[item.label];
                  const expanded = mobileExpanded === item.label;
                  return (
                    <li key={item.label}>
                      {menu ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={expanded}
                            onClick={() =>
                              setMobileExpanded(expanded ? null : item.label)
                            }
                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-body font-medium text-neutral-800 hover:bg-neutral-50"
                          >
                            {item.label}
                            <ChevronDown
                              className={`size-4 text-neutral-400 transition-transform duration-200 ${
                                expanded ? "rotate-180" : ""
                              }`}
                              aria-hidden
                            />
                          </button>
                          {expanded && (
                            <div className="flex flex-col gap-3 px-2 pb-2 pt-1">
                              {menu.columns.map((col) => (
                                <div
                                  key={col.title}
                                  className="flex flex-col gap-1"
                                >
                                  <p className="px-2 text-body font-semibold leading-6 text-neutral-400">
                                    {col.title}
                                  </p>
                                  {col.items.map((sub) => {
                                    const external =
                                      sub.href.startsWith("http");
                                    return (
                                    <IntentLink
                                      key={sub.title}
                                      href={sub.href}
                                      onClick={closeMobileMenu}
                                      target={external ? "_blank" : undefined}
                                      rel={
                                        external
                                          ? "noopener noreferrer"
                                          : undefined
                                      }
                                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-neutral-50"
                                    >
                                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-primary-500">
                                        <sub.Icon className="size-5" aria-hidden />
                                      </span>
                                      <span className="flex min-w-0 flex-col">
                                        <span className="text-body font-medium leading-tight text-neutral-800">
                                          {sub.title}
                                        </span>
                                        <span className="text-body leading-snug text-neutral-500">
                                          {sub.subtitle}
                                        </span>
                                      </span>
                                    </IntentLink>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <IntentLink
                          href={item.href ?? "#"}
                          onClick={closeMobileMenu}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-body font-medium text-neutral-800 hover:bg-neutral-50"
                        >
                          {item.label}
                        </IntentLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex flex-col items-center gap-2 border-t border-neutral-100 pt-4">
              <Button
                variant="gray"
                size="lg"
                href={ROUTES.SIMULADOR}
                onClick={closeMobileMenu}
                className="w-full"
              >
                Simular economia
              </Button>
              <Button
                variant="primary"
                size="lg"
                href={ROUTES.CONTATO}
                onClick={closeMobileMenu}
                className="w-full"
              >
                Fale com vendas
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
