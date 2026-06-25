"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo1 from "@/assets/images/clients/logo1.svg";
import logo2 from "@/assets/images/clients/logo2.svg";
import logo3 from "@/assets/images/clients/logo3.svg";
import logo4 from "@/assets/images/clients/logo4.svg";
import logo5 from "@/assets/images/clients/logo5.svg";

const logos = [logo1, logo2, logo3, logo4, logo5];

export function ClientsSection() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Fade-in gradual quando a seção entra na viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-reveal-skip
      className="relative isolate flex flex-col items-center gap-8 overflow-hidden py-16"
    >
      <p
        className="text-center font-heading text-[18px] font-normal leading-[1.3] text-neutral-800 transition-all duration-700 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "none" : "translateY(12px)",
        }}
      >
        Empresas que confiam na TranspoTech
      </p>

      <div
        className="relative h-[109px] w-full overflow-hidden transition-opacity duration-700 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transitionDelay: "150ms",
        }}
      >
        {/* Track do carrossel — 2 cópias idênticas para loop contínuo */}
        <div className="flex h-full w-max items-center animate-marquee">
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
