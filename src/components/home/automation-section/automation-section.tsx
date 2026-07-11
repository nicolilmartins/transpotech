"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { CircleCheck } from "lucide-react";
import automacao from "@/assets/images/automacao.png";
import { gsap } from "@/lib/gsap";

const bullets = [
  "Menos gargalos entre o recebimento, armazenagem e expedição",
  "Mais pedidos processados com a mesma equipe",
  "Ociosidade reduzida e melhor aproveitamento do espaço",
  "Evolução por etapas - do básico à automacão completa",
];

export function AutomationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const bulletRefs = useRef<HTMLLIElement[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    tl.from(h2Ref.current, { opacity: 0, y: 16, duration: 0.7, ease: "power1.out" }, 0)
      .from(descRef.current, { opacity: 0, y: 16, duration: 0.7, ease: "power1.out" }, 0.12)
      .from(imageRef.current, { opacity: 0, x: 28, duration: 0.7, ease: "power1.out" }, 0.16)
      .from(bulletRefs.current, { opacity: 0, y: 16, duration: 0.7, ease: "power1.out", stagger: 0.09 }, 0.24)
      .from(buttonRef.current, { opacity: 0, y: 16, duration: 0.7, ease: "power1.out" }, 0.6);
  }, { scope: sectionRef });

  return (
    <Section
      ref={sectionRef}
      data-reveal-skip
      className="flex flex-col items-start"
    >
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Coluna de texto */}
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-10">
            <div className="flex w-[600px] max-w-full flex-col gap-4">
              <h2
                ref={h2Ref}
                className="w-[542px] max-w-full text-h2 text-neutral-800"
              >
                <span className="font-normal">
                  Automação intralogística para{" "}
                </span>
                <span className="font-bold text-primary-500">
                  alta produtividade
                </span>
              </h2>
              <p
                ref={descRef}
                className="w-[512px] max-w-full text-body leading-[1.35] text-neutral-600"
              >
                Para empresas que precisam evoluir o fluxo intralogístico, a
                TranspoTech também atua com soluções de automação voltadas à
                eficiência operacional.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <li
                  key={b}
                  ref={(node) => {
                    if (node) bulletRefs.current[i] = node;
                  }}
                  className="flex items-center gap-2"
                >
                  <CircleCheck
                    className="size-5 shrink-0 text-neutral-600"
                    aria-hidden
                  />
                  <span className="text-body leading-[1.35] text-neutral-600">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div ref={buttonRef} className="hidden self-start lg:block">
            <Button variant="primary" size="lg">
              Locar empilhadeira
            </Button>
          </div>
        </div>

        {/* Imagem — desliza da direita junto da cascata */}
        <ParallaxFrame
          ref={imageRef}
          className="order-2 min-h-[280px] min-w-0 flex-1 self-stretch rounded-xl lg:order-none lg:min-h-0"
        >
          <Image
            src={automacao}
            alt="Empilhadeira em operação"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </ParallaxFrame>

        {/* Botão — após a imagem no mobile */}
        <div className="order-3 self-start lg:hidden">
          <Button variant="primary" size="lg">
            Locar empilhadeira
          </Button>
        </div>
      </div>
    </Section>
  );
}
