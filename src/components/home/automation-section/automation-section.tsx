"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import automacao from "@/assets/images/automacao.png";

const bullets = [
  "Menos gargalos entre o recebimento, armazenagem e expedição",
  "Mais pedidos processados com a mesma equipe",
  "Ociosidade reduzida e melhor aproveitamento do espaço",
  "Evolução por etapas - do básico à automacão completa",
];

const baseTransition = "transition-all duration-700 ease-out";

export function AutomationSection() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Dispara a cascata quando a seção entra na viewport.
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
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cada elemento entra com fade + deslize, escalonado (cascata).
  const reveal = (delay: number, from: "up" | "right" = "up") => ({
    opacity: revealed ? 1 : 0,
    transform: revealed
      ? "none"
      : from === "right"
        ? "translateX(28px)"
        : "translateY(16px)",
    transitionDelay: `${delay}ms`,
  });

  return (
    <section
      ref={ref}
      data-reveal-skip
      className="flex flex-col items-start px-4 py-16 sm:px-8 lg:px-16 lg:py-20"
    >
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Coluna de texto */}
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-10">
            <div className="flex w-[600px] max-w-full flex-col gap-4">
              <h2
                className={`w-[542px] max-w-full text-h2 text-neutral-800 ${baseTransition}`}
                style={reveal(0)}
              >
                <span className="font-normal">
                  Automação intralogística para{" "}
                </span>
                <span className="font-bold text-primary-500">
                  alta produtividade
                </span>
              </h2>
              <p
                className={`w-[512px] max-w-full text-body leading-[1.35] text-neutral-600 ${baseTransition}`}
                style={reveal(120)}
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
                  className={`flex items-center gap-2 ${baseTransition}`}
                  style={reveal(240 + i * 90)}
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

          <div
            className={`self-start ${baseTransition}`}
            style={reveal(240 + bullets.length * 90)}
          >
            <Button variant="primary" size="lg">
              Locar empilhadeira
            </Button>
          </div>
        </div>

        {/* Imagem — desliza da direita junto da cascata */}
        <div
          className={`relative min-h-[280px] min-w-0 flex-1 self-stretch overflow-hidden rounded-xl lg:min-h-0 ${baseTransition}`}
          style={reveal(160, "right")}
        >
          <Image
            src={automacao}
            alt="Empilhadeira em operação"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
