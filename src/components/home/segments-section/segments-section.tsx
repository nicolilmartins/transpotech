"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import {
  Factory,
  Warehouse,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import illustration from "@/assets/images/stats/illustration-segment.webp";
import {
  cssEase,
  playOnScroll,
  prefersReducedMotion,
  prepareFrom,
} from "@/lib/motion";
import { useNearViewport } from "@/hooks/use-near-viewport";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

// Marcador de cada segmento na ilustração, na ordem dos segmentos editados no
// Studio.
type Marker = {
  /** Ícone exibido no card mobile (desktop usa os marcadores na ilustração) */
  icon: LucideIcon;
  color: "green" | "orange";
  side: "left" | "right";
  label: { left: string; top: string };
  line: { left: string; top: string; width: string };
  dot: { left: string; top: string };
  delay: number;
};

const markerArts: Marker[] = [
  {
    icon: Factory,
    color: "green",
    side: "left",
    label: { left: "6.1%", top: "5.67%" },
    line: { left: "7.6%", top: "14.48%", width: "31.19%" },
    dot: { left: "38.8%", top: "14.49%" },
    delay: 360,
  },
  {
    icon: Warehouse,
    color: "green",
    side: "left",
    label: { left: "2.16%", top: "58.16%" },
    line: { left: "0%", top: "66.97%", width: "31.19%" },
    dot: { left: "31.08%", top: "66.98%" },
    delay: 450,
  },
  {
    icon: Store,
    color: "orange",
    side: "right",
    label: { left: "78.96%", top: "24.72%" },
    line: { left: "62.57%", top: "32.29%", width: "31.19%" },
    dot: { left: "62.85%", top: "32.24%" },
    delay: 540,
  },
  {
    icon: Truck,
    color: "orange",
    side: "right",
    label: { left: "78.18%", top: "64.02%" },
    line: { left: "64.37%", top: "72.93%", width: "31.19%" },
    dot: { left: "64.4%", top: "73%" },
    delay: 630,
  },
];

type SegmentsContent = SectionContent<typeof homePage.sections.segments>;

export function SegmentsSection({ content }: { content: SegmentsContent }) {
  const markers = content.items.map((item, i) => ({ ...item, ...markerArts[i] }));
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerLabelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useNearViewport(sectionRef, () => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    // Timeline do cabeçalho e dos marcadores; cada item no seu atraso.
    const fade = { duration: 0.7, easing: cssEase.power1Out };
    const anims = [
      ...prepareFrom(labelRef.current, { opacity: 0, y: 16 }, fade),
      ...prepareFrom(h2Ref.current, { opacity: 0, y: 16 }, { ...fade, delay: 0.08 }),
      ...prepareFrom(descRef.current, { opacity: 0, y: 16 }, { ...fade, delay: 0.16 }),
    ];

    // Ilustração (desktop)
    anims.push(
      ...prepareFrom(illustrationRef.current, { opacity: 0 }, { ...fade, delay: 0.24 })
    );

    // Marcadores (desktop) — cada um no seu delay original. O ponto nasce
    // pequeno e cresce até o tamanho final; a linha é "desenhada" a partir do
    // ponto em direção ao rótulo (clip-path preserva o gradiente exato).
    markers.forEach((m, i) => {
      const d = m.delay / 1000;
      const line = lineRefs.current[i];
      const dot = dotRefs.current[i];
      const label = markerLabelRefs.current[i];

      if (dot) {
        anims.push(
          ...prepareFrom(
            dot,
            { scale: 0, opacity: 0 },
            { duration: 0.45, delay: d, easing: cssEase.backOut(1.6) }
          )
        );
      }
      if (line) {
        // Nos marcadores da esquerda o ponto fica na ponta DIREITA da linha
        // (revela da direita para a esquerda); nos da direita, o inverso.
        const reveal = line.animate(
          [
            {
              clipPath:
                m.side === "left"
                  ? "inset(0% 0% 0% 100%)"
                  : "inset(0% 100% 0% 0%)",
            },
            { clipPath: "inset(0% 0% 0% 0%)" },
          ],
          {
            duration: 600,
            delay: (d + 0.15) * 1000,
            easing: cssEase.power2Out,
            fill: "both",
          }
        );
        reveal.pause();
        anims.push(reveal);
      }
      if (label) {
        anims.push(
          ...prepareFrom(label, { opacity: 0, y: 16 }, { ...fade, delay: d + 0.3 })
        );
      }
    });

    return playOnScroll(section, 0.8, anims);
  });

  return (
    <section ref={sectionRef} data-reveal-skip className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 py-12 sm:px-6 lg:gap-16 lg:px-16 lg:py-20">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex w-[626px] max-w-full flex-col items-center gap-4">
          <p
            ref={labelRef}
            className="text-body font-semibold leading-[1.35] text-primary-500"
          >
            {content.eyebrow}
          </p>
          <h2
            ref={h2Ref}
            className="w-[426px] max-w-full text-h2 font-bold leading-[1.1] text-neutral-800"
          >
            {content.title}
          </h2>
        </div>
        <p
          ref={descRef}
          className="w-[507px] max-w-full text-body leading-6 text-neutral-600"
        >
          {content.description}
        </p>
      </div>

      {/* Mobile — ilustração do desktop no topo */}
      <div className="relative w-full lg:hidden">
        <Image
          src={illustration}
          alt="Ilustração isométrica de um polo logístico com indústria, centros de distribuição, varejo e veículos em operação"
          // Sem `sizes`, o srcset 1x/2x partia da largura do arquivo (w=1920).
          sizes="(min-width: 640px) calc(100vw - 48px), calc(100vw - 40px)"
          className="h-auto w-full"
        />
      </div>

      {/* Mobile — grid simples de segmentos (sem animação própria) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {markers.map((m, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-xl bg-neutral-50 p-5"
          >
            <m.icon className="size-6 text-secondary-500" aria-hidden />
            <h3 className="font-heading text-lg font-bold text-neutral-800">
              {m.title}
            </h3>
            <p className="text-body leading-6 text-neutral-600">
              {m.description}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop — composição: ilustração + marcadores por setor */}
      <div className="relative mx-auto hidden aspect-[1281/449] w-full max-w-[1281px] lg:block">
        {/* Ilustração do polo logístico */}
        <div
          ref={illustrationRef}
          className="absolute"
          style={{
            left: "21.46%",
            top: "0%",
            width: "57.5%",
            height: "92.34%",
          }}
        >
          <Image
            src={illustration}
            alt="Ilustração isométrica de um polo logístico com indústria, centros de distribuição, varejo e veículos em operação"
            fill
            sizes="(min-width: 1440px) 740px, 52vw"
            className="object-contain"
          />
        </div>

        {markers.map((m, i) => {
          const dotColor =
            m.color === "green" ? "bg-secondary-500" : "bg-primary-500";
          const haloColor =
            m.color === "green" ? "bg-secondary-500/30" : "bg-primary-500/30";
          const lineGradient =
            m.side === "left"
              ? "bg-gradient-to-r from-transparent to-secondary-500/60"
              : "bg-gradient-to-r from-primary-500/60 to-transparent";

          return (
            <Fragment key={i}>
              {/* Linha conectora */}
              <div
                ref={(node) => { lineRefs.current[i] = node; }}
                aria-hidden
                className={`absolute h-px ${lineGradient}`}
                style={{
                  left: m.line.left,
                  top: m.line.top,
                  width: m.line.width,
                }}
              />

              {/* Marcador (halo + núcleo) */}
              <div
                ref={(node) => { dotRefs.current[i] = node; }}
                aria-hidden
                className="absolute size-10"
                style={{
                  left: `calc(${m.dot.left} - 20px)`,
                  top: `calc(${m.dot.top} - 20px)`,
                }}
              >
                <span
                  className={`absolute inset-0 rounded-full blur-[5px] ${haloColor}`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${dotColor}`}
                />
              </div>

              {/* Rótulo */}
              <div
                ref={(node) => { markerLabelRefs.current[i] = node; }}
                className="absolute flex w-[21%] flex-col gap-4"
                style={{ left: m.label.left, top: m.label.top }}
              >
                <h3 className="whitespace-nowrap font-heading text-[24px] font-bold leading-[1.3] text-neutral-800">
                  {m.title}
                </h3>
                <p className="text-body leading-6 text-neutral-600">
                  {m.description}
                </p>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
