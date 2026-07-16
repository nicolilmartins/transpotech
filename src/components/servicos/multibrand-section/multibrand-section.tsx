"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Section } from "@/components/ui/section";
import logoYale from "@/assets/Logos/logo-yale.webp";
import logoClark from "@/assets/Logos/logo-clark.webp";
import logoHyster from "@/assets/Logos/logo-hyster.webp";
import logoToyota from "@/assets/Logos/logo-toyota.webp";
import logoLinde from "@/assets/Logos/logo-linde.webp";
import logoPaletrans from "@/assets/Logos/logo-paletrans.webp";
import logoJungheinrich from "@/assets/Logos/logo-jungheinrich.webp";
import logoCrown from "@/assets/Logos/logo-crown.webp";

type Brand = { name: string; logo: StaticImageData; heightClass?: string };

// Altura padrão dos logos = h-7 (mobile) / h-9 (sm+). Yale e Crown vêm com menos
// margem interna, então aparentam maiores — reduzimos a altura para equilibrar.
const brands: Brand[] = [
  { name: "Yale", logo: logoYale, heightClass: "h-5 sm:h-7" },
  { name: "Clark", logo: logoClark },
  { name: "Hyster", logo: logoHyster },
  { name: "Toyota", logo: logoToyota },
  { name: "Linde", logo: logoLinde },
  { name: "Paletrans", logo: logoPaletrans },
  { name: "Jungheinrich", logo: logoJungheinrich },
  { name: "Crown", logo: logoCrown, heightClass: "h-5 sm:h-7" },
];

// Bolinhas nos quatro cantos de cada célula — cantos compartilhados se sobrepõem
// exatamente, marcando as interseções das linhas da grade (laranja bem sutil).
const corners = [
  "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
];

const LINE_COLOR = "rgba(245,130,32,0.1)"; // primary-500 / 10%

export function MultibrandSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const header = headerRef.current;
    const grid = gridRef.current;
    const footer = footerRef.current;
    if (!header || !grid) return;

    const headerItems = Array.from(header.children) as HTMLElement[];
    const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", grid);
    const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", grid);
    const logos = gsap.utils.toArray<HTMLElement>("[data-logo]", grid);
    const lines = [grid, ...cells];

    // Estados iniciais: cabeçalho/logos entram (fade + slide); linhas e bolinhas
    // começam transparentes e aparecem.
    gsap.set(headerItems, { opacity: 0, y: 16 });
    gsap.set(lines, { borderColor: "rgba(245,130,32,0)" });
    gsap.set(dots, { opacity: 0 });
    gsap.set(logos, { opacity: 0, y: 16 });
    if (footer) gsap.set(footer, { opacity: 0, y: 16 });

    const triggers = [
      ScrollTrigger.create({
        trigger: header,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(headerItems, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.06,
          }),
      }),
      ScrollTrigger.create({
        trigger: grid,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(lines, {
            borderColor: LINE_COLOR,
            duration: 0.6,
            ease: "power2.out",
          })
            .to(
              dots,
              { opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.015 },
              0.1
            )
            .to(
              logos,
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.06,
              },
              0.15
            );
          if (footer)
            tl.to(
              footer,
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
              0.35
            );
        },
      }),
    ];

    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <Section data-reveal-skip className="flex flex-col gap-10 lg:gap-12">
      <div
        ref={headerRef}
        className="mx-auto flex max-w-[640px] flex-col items-center gap-4 text-center"
      >
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Assistência multimarcas
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Manutenção para empilhadeiras de{" "}
          <span className="font-bold text-primary-500">todas as marcas</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Nossa equipe conectada ao departamento de peças garante agilidade no
          atendimento e o menor custo para sua operação.
        </p>
      </div>

      {/* Grade de marcas — linhas finas laranja com bolinhas nas interseções,
          sobre fundo branco. Hover: blur laranja nos cantos + logo cresce. */}
      <div className="flex flex-col gap-6">
        <div
          ref={gridRef}
          className="grid grid-cols-2 border-l border-t border-primary-500/10 sm:grid-cols-4"
        >
          {brands.map((brand) => (
            <div
              key={brand.name}
              data-cell
              className="group relative isolate flex min-h-[104px] items-center justify-center border-b border-r border-primary-500/10 px-3 py-5 sm:min-h-[140px] sm:px-4 sm:py-8"
            >
              {/* Glow laranja suave subindo da base no hover (padrão dos cards de
                  números da home). Recortado à célula para não invadir a linha. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
              >
                <div className="absolute bottom-0 left-1/2 h-[66px] w-[162px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-400 opacity-0 blur-[77px] transition-opacity duration-300 group-hover:opacity-60" />
              </div>

              {/* Bolinhas nas interseções das linhas */}
              {corners.map((pos) => (
                <span
                  key={pos}
                  data-dot
                  aria-hidden
                  className={`absolute size-1.5 rounded-full bg-primary-500/20 ${pos}`}
                />
              ))}

              <span data-logo className="inline-flex">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  className={`${brand.heightClass ?? "h-7 sm:h-9"} w-auto max-w-[105px] object-contain transition-transform duration-300 group-hover:scale-105 sm:max-w-[150px]`}
                />
              </span>
            </div>
          ))}
        </div>
        <p
          ref={footerRef}
          className="text-center text-body-sm leading-[1.35] text-neutral-500"
        >
          Também atendemos equipamentos importados e chineses, todas as marcas e
          modelos, elétricos e a combustão.
        </p>
      </div>
    </Section>
  );
}
