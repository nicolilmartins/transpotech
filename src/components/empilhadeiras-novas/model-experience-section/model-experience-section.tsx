"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { ResolvedForkliftDetail } from "@/data/forklift-details";

// Palco full-bleed do modelo: a imagem surge inteira no fundo claro e, ao chegar
// ao topo, é fixada e ampliada até preencher a tela (estilo Porsche).
export function ModelExperienceSection({
  detail,
}: {
  detail: ResolvedForkliftDetail;
}) {
  const introRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    const zoom = zoomRef.current;
    if (!intro || !zoom) return;

    // Só no desktop: entrada + pin/zoom (a imagem cresce até preencher a tela).
    // No mobile a imagem fica ESTÁTICA (box), sem pin/zoom.
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        // Entrada: a imagem surge (fade + sobe) ao entrar — aparece INTEIRA no
        // fundo claro antes de qualquer zoom.
        gsap.set(zoom, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: intro,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(zoom, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
            }),
        });

        // Pin + zoom: quando a imagem contida chega ao topo, ela é fixada por um
        // curto trecho e ampliada — mantendo-se centralizada — até preencher a
        // tela. offsetWidth/Height = tamanho base (não afetado pelo scale).
        ScrollTrigger.create({
          trigger: intro,
          start: "top top",
          end: "+=90%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const w = zoom.offsetWidth || 1;
            const h = zoom.offsetHeight || 1;
            const target = Math.min(
              2,
              Math.max(window.innerWidth / w, window.innerHeight / h)
            );
            gsap.set(zoom, { scale: 1 + p * (target - 1) });
          },
        });

        ScrollTrigger.refresh();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={introRef}
      className="relative flex items-center justify-center overflow-hidden bg-[#fdfdfd] px-5 py-12 sm:px-6 lg:h-[100svh] lg:py-0 lg:px-16"
    >
      {/* Card — no mobile é uma box estática; no desktop começa contido (1312px,
          radius 24px) e cresce até preencher a tela. Recortes (contain) ganham
          um fundo cinza suave; fotos (cover) preenchem o card. */}
      <div
        ref={zoomRef}
        className="relative h-[300px] w-full max-w-[1312px] origin-center overflow-hidden rounded-[24px] will-change-transform sm:h-[400px] lg:h-[600px]"
        style={
          detail.media.hero.fit === "contain"
            ? { background: "linear-gradient(150deg, #efeeeb 0%, #d6d4d0 100%)" }
            : undefined
        }
      >
        <Image
          src={detail.media.hero.src}
          alt={detail.media.hero.alt}
          fill
          priority
          sizes="100vw"
          className={
            detail.media.hero.fit === "contain"
              ? "object-contain p-6 lg:p-12"
              : "object-cover object-center"
          }
        />
        {/* Overlay para legibilidade na base — só nas fotos de ambiente (cover);
            em recortes sobre fundo claro o gradiente escuro sujaria. */}
        {detail.media.hero.fit !== "contain" && (
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
          />
        )}
      </div>
    </div>
  );
}
