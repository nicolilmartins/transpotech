"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  ClipboardCheck,
  ShieldCheck,
  Truck,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

type Card = {
  /** Título com o ponto de quebra definido: [linha de cima, linha de baixo]. */
  title: [string, string];
  description: string;
  Icon: LucideIcon;
};

const cards: Card[] = [
  {
    title: ["Revisão técnica", "completa"],
    description:
      "Cada equipamento passa por avaliação multipontos antes de entrar no estoque.",
    Icon: ClipboardCheck,
  },
  {
    title: ["Garantia", "TranspoTech"],
    description: "6 a 12 meses de garantia conforme condição do equipamento.",
    Icon: ShieldCheck,
  },
  {
    title: ["Pronta entrega", "disponível"],
    description:
      "Equipamentos prontos pra operação após inspeção e ajustes técnicos.",
    Icon: Truck,
  },
  {
    title: ["Cobertura", "nacional"],
    description:
      "10 unidades em PR, SC, RS, SP e GO para suporte próximo da sua operação.",
    Icon: MapPin,
  },
];

export function WhyBuySection() {
  const gridRef = useRef<HTMLDivElement>(null);
  // Quando QUALQUER título não cabe em uma linha, todos quebram em duas
  // (no ponto definido nos dados); quando todos cabem, ficam em uma linha.
  const [twoLines, setTwoLines] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const recalc = () => {
      const titles = Array.from(grid.querySelectorAll<HTMLElement>("h3"));
      // Probe: com nowrap, o scrollWidth revela se o texto caberia numa linha.
      let wraps = false;
      titles.forEach((el) => {
        el.style.whiteSpace = "nowrap";
        if (el.scrollWidth > el.clientWidth + 1) wraps = true;
        el.style.whiteSpace = "";
      });
      setTwoLines(wraps);

      // Descrições: equaliza pela maior altura natural, para os blocos de
      // texto (ancorados embaixo) abrirem alinhados entre os cards.
      const descriptions = Array.from(grid.querySelectorAll<HTMLElement>("p"));
      descriptions.forEach((el) => {
        el.style.minHeight = "";
      });
      const max = Math.max(
        ...descriptions.map((el) => el.getBoundingClientRect().height)
      );
      descriptions.forEach((el) => {
        el.style.minHeight = `${max}px`;
      });
    };

    recalc();
    // Webfont pode mudar as métricas (e as quebras) depois do primeiro paint.
    document.fonts?.ready.then(recalc);

    // Reage só a mudança de largura para não entrar em loop com os próprios
    // ajustes de min-height.
    let lastWidth = grid.clientWidth;
    const observer = new ResizeObserver(() => {
      if (grid.clientWidth === lastWidth) return;
      lastWidth = grid.clientWidth;
      recalc();
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <h2 className="text-h2 font-normal text-neutral-800">
        Por que comprar usada
        <br />
        <span className="font-bold text-primary-500">com a TranspoTech</span>
      </h2>

      <div
        ref={gridRef}
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {cards.map((card) => (
          <div
            key={card.title.join(" ")}
            className="flex min-h-[240px] flex-col justify-between overflow-hidden rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.18)] lg:h-[280px]"
          >
            <card.Icon className="size-7 text-primary-500 lg:size-8" aria-hidden />
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
                {card.title[0]}
                {twoLines ? <br /> : <Fragment> </Fragment>}
                {card.title[1]}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-600">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" size="lg" href={ROUTES.ORCAMENTO}>
        Consultar equipamentos
      </Button>
    </Section>
  );
}
