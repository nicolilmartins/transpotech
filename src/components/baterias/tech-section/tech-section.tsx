"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import illo1 from "@/assets/images/baterias-tech/illo-1.webp";
import illo2 from "@/assets/images/baterias-tech/illo-2.webp";
import illo3 from "@/assets/images/baterias-tech/illo-3.webp";
import mask1 from "@/assets/images/baterias-tech/mask-1.png";
import mask2 from "@/assets/images/baterias-tech/mask-2.png";

// Conta o número principal (primeiro grupo de dígitos), preservando sufixos.
const countValue = (value: string, progress: number) =>
  value.replace(/\d+/, (digits) =>
    String(Math.round(parseInt(digits, 10) * progress))
  );

// Posicionamento da ilustração seguindo o Figma. Todos os valores em `cqw`
// (1cqw = 1% da largura do card) para que a composição escale com o card,
// mantendo o objeto ancorado no canto direito, sangrando pelas bordas.
type Media = {
  illo: StaticImageData;
  left: string;
  // Centro vertical do objeto como fração da ALTURA do card (fiel ao Figma,
  // independente da altura real do card). A caixa usa -translate-y-1/2.
  centerY: string;
  width: string;
  height: string;
  // Máscara: pode ser a máscara do Figma (`url(...)` + size/position) ou um
  // gradiente radial (closest-side garante 0 nas bordas → sem "linha").
  maskImage: string;
  maskSize?: string;
  maskPosition?: string;
  objectPosition: string;
  // Filtro opcional na imagem (ex.: reforço de saturação).
  filter?: string;
};

type Stat = {
  value: string;
  label: string;
  countdownFrom?: number;
  labelWidth: number;
  media: Media;
};

const stats: Stat[] = [
  {
    value: "3x mais",
    label: "Mais vida útil do que baterias chumbo-ácidas",
    labelWidth: 185,
    media: {
      illo: illo1,
      left: "44.96cqw",
      centerY: "39.55%",
      width: "74.68cqw",
      height: "66.76cqw",
      maskImage: `url(${mask1.src})`,
      maskSize: "69.57cqw 69.78cqw",
      maskPosition: "1.82cqw -1.78cqw",
      objectPosition: "center",
    },
  },
  {
    value: "30%",
    label: "Redução no consumo de energia",
    labelWidth: 160,
    media: {
      illo: illo2,
      left: "56.29cqw",
      centerY: "48%",
      width: "51.78cqw",
      height: "46.29cqw",
      maskImage:
        "radial-gradient(ellipse closest-side at 50% 50%, #000 60%, transparent 100%)",
      objectPosition: "center",
    },
  },
  // Contador decrescente: parte de countdownFrom e chega a 0.
  {
    value: "0",
    label: "Salas de baterias necessárias",
    countdownFrom: 10,
    labelWidth: 160,
    media: {
      illo: illo3,
      left: "46.48cqw",
      centerY: "49.93%",
      width: "60.85cqw",
      height: "54.40cqw",
      maskImage: `url(${mask2.src})`,
      maskSize: "78cqw 70.8cqw",
      maskPosition: "0.5cqw -6.5cqw",
      objectPosition: "bottom",
      filter: "saturate(1.2)",
    },
  },
];

// Máscara alpha (Figma) aplicada à caixa da ilustração, para o objeto se fundir
// ao fundo do card.
const maskStyle = (m: Media): CSSProperties => ({
  left: m.left,
  top: m.centerY,
  width: m.width,
  height: m.height,
  maskImage: m.maskImage,
  WebkitMaskImage: m.maskImage,
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskMode: "alpha",
  ...(m.maskSize ? { maskSize: m.maskSize, WebkitMaskSize: m.maskSize } : {}),
  ...(m.maskPosition
    ? { maskPosition: m.maskPosition, WebkitMaskPosition: m.maskPosition }
    : {}),
});

const displayValue = (s: Stat, progress: number) =>
  s.countdownFrom != null
    ? String(Math.round(s.countdownFrom * (1 - progress)))
    : countValue(s.value, progress);

export function TechSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardElRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Card "ativo" no mobile: aquele que passa pelo centro da viewport.
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cardElRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActiveCard(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    cardElRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    stats.forEach((s, i) => {
      const node = numberRefs.current[i];
      if (node) node.textContent = displayValue(s, 0);
    });

    const counters = stats.map(() => ({ progress: 0 }));
    const tweens: gsap.core.Tween[] = [];

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        stats.forEach((s, i) => {
          tweens.push(
            gsap.to(counters[i], {
              progress: 1,
              duration: 1.8,
              ease: "power3.out",
              onUpdate: () => {
                const node = numberRefs.current[i];
                if (node) node.textContent = displayValue(s, counters[i].progress);
              },
            })
          );
        });
      },
    });

    return () => {
      trigger.kill();
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      {/* Cabeçalho */}
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Tecnologia
        </p>
        <h2 className="text-h2 font-normal text-neutral-800">
          Especialistas em baterias{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">de Íons de Lítio</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Distribuidores autorizados das marcas líderes em carregadores e
          baterias tracionárias e de arranque. Tecnologia que reduz custo, libera
          espaço e elimina paradas para troca de bateria.
        </p>
      </div>

      {/* Estatísticas — cards com imagem no mesmo estilo da home */}
      <div ref={statsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            ref={(node) => {
              cardElRefs.current[i] = node;
            }}
            className="group relative flex min-h-[160px] flex-1 flex-col gap-1 overflow-hidden rounded-3xl bg-[#f9f9f9] p-4 lg:h-[172px] lg:p-5"
          >
            {/* Camada da ilustração — geometria e máscara do Figma. Cresce
                levemente no hover (igual à home). */}
            <div className="pointer-events-none absolute inset-0 [container-type:inline-size]">
              <div className="absolute -translate-y-1/2" style={maskStyle(s.media)}>
                <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                  <Image
                    src={s.media.illo}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="select-none object-cover"
                    style={{
                      objectPosition: s.media.objectPosition,
                      ...(s.media.filter ? { filter: s.media.filter } : {}),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Glow laranja radial no rodapé — hover (desktop) / card ativo (mobile) */}
            <div
              aria-hidden
              className={`pointer-events-none absolute left-1/2 top-[165px] h-[66px] w-[162px] -translate-x-1/2 rounded-full bg-primary-500 blur-[77px] transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 ${
                activeCard === i ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="relative flex flex-col gap-2">
              <span
                ref={(node) => {
                  numberRefs.current[i] = node;
                }}
                className="font-heading text-h2 font-bold leading-[1.3] text-secondary-600"
              >
                {s.value}
              </span>
              <span
                className="text-body leading-[1.35] text-neutral-600"
                style={{ maxWidth: s.labelWidth }}
              >
                {s.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
