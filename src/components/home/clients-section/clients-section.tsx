"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import logo1 from "@/assets/images/clients/logo1.svg";
import logo2 from "@/assets/images/clients/logo2.svg";
import logo3 from "@/assets/images/clients/logo3.svg";
import logo4 from "@/assets/images/clients/logo4.svg";
import logo5 from "@/assets/images/clients/logo5.svg";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const logos = [logo1, logo2, logo3, logo4, logo5];

export function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Marquee GSAP: substitui @keyframes marquee
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 40,
      repeat: -1,
    });

    return () => { tween.kill(); };
  }, []);

  // Fade-in da seção ao entrar na viewport
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const carousel = carouselRef.current;
    if (!section || !title || !carousel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.from(title, { opacity: 0, y: 12, duration: 0.7, ease: "power1.out" });
        gsap.from(carousel, { opacity: 0, duration: 0.7, ease: "power1.out", delay: 0.15 });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-reveal-skip
      className="relative isolate mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 overflow-hidden py-12 lg:py-16"
    >
      <p
        ref={titleRef}
        className="text-center font-heading text-[18px] font-normal leading-[1.3] text-neutral-800"
      >
        Empresas que confiam na TranspoTech
      </p>

      <div
        ref={carouselRef}
        className="relative h-[109px] w-full overflow-hidden"
      >
        {/* Track do carrossel — 2 cópias para loop contínuo */}
        <div ref={trackRef} className="flex h-full w-max items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex h-full shrink-0 items-center gap-10 pr-10 lg:gap-[90px] lg:pr-[90px]"
            >
              {logos.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  className="h-9 w-auto shrink-0"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Fades nas bordas */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[247px] bg-gradient-to-r from-[#fdfdfd] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[247px] bg-gradient-to-l from-[#fdfdfd] to-transparent" />
      </div>
    </section>
  );
}
