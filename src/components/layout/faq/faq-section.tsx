"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";
import { gsap } from "@/lib/gsap";

export type FaqItem = { question: string; answer: string };

type FaqSectionProps = {
  /** Primeira parte do título (peso normal). */
  titleRegular: string;
  /** Segunda parte do título (destaque laranja, negrito). */
  titleAccent: string;
  items: FaqItem[];
};

export function FaqSection({ titleRegular, titleAccent, items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const isOpen = i === openIndex;
      if (reduce) {
        panel.style.height = isOpen ? "auto" : "0px";
        return;
      }
      gsap.to(panel, {
        height: isOpen ? panel.scrollHeight : 0,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          if (isOpen) panel.style.height = "auto";
        },
      });
    });
  }, [openIndex]);

  return (
    <Section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
      <h2 className="text-h2 text-neutral-800 lg:w-[400px] lg:shrink-0">
        <span className="font-normal">{titleRegular}</span>
        <span className="font-bold text-primary-500">{titleAccent}</span>
      </h2>

      {/* bg opaco (= fundo da seção) cobre a malha SÓ atrás das perguntas, sem
          removê-la do título à esquerda nem das demais seções. */}
      <ul className="flex flex-1 flex-col bg-[#fdfdfd]">
        {items.map((faq, i) => {
          const isOpen = i === openIndex;
          return (
            <li key={faq.question} className="border-b border-neutral-200">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-body font-semibold text-neutral-800">
                    {faq.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={`size-5 shrink-0 text-neutral-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                ref={(node) => {
                  panelRefs.current[i] = node;
                }}
                className="h-0 overflow-hidden"
                style={i === 0 ? { height: "auto" } : undefined}
              >
                <p className="pb-5 text-body leading-[1.35] text-neutral-600">
                  {faq.answer}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
