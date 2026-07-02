"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

const items = [
  "Volume diário superior a 500 pedidos",
  "Mais de 1.000 SKUs ativos",
  "Picos sazonais marcados",
  "Falta de mão de obra qualificada",
  "Crescimento previsto acima de 20% a.a.",
  "Necessidade de rastreabilidade fim a fim",
  "Erros de separação acima de 1%",
  "Operação em mais de 1 turno",
];

// Gradiente verde → laranja aplicado ao item marcado (mesma paleta dos cases).
const checkedGradient =
  "linear-gradient(90deg, rgba(20,107,85,0.35) 0%, rgba(231,128,40,0.22) 100%)";

export function ReadinessSection() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    items.map(() => false)
  );
  const count = checked.filter(Boolean).length;

  const toggle = (index: number) =>
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));

  return (
    <Section
      data-header-dark
      className="flex flex-col gap-10 lg:flex-row lg:gap-16"
    >
      {/* Esquerda — título + descrição + diagnóstico (número grande) + botão */}
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
            Sua operação está pronta?
          </p>
          <h2 className="text-h3 font-normal text-neutral-50">
            Checklist de prontidão para automação
          </h2>
          <p className="max-w-[460px] text-body leading-[1.35] text-neutral-400">
            Marque o que se aplica. Os pontos acendem o caminho mais provável
            (parcial × completa).
          </p>
        </div>

        {/* Diagnóstico — número grande, fora de card */}
        <div className="flex flex-col gap-1">
          <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
            Diagnóstico rápido
          </p>
          <p className="flex items-baseline gap-3">
            <span className="font-heading text-[72px] font-bold leading-none text-neutral-50 lg:text-[104px]">
              {count}
            </span>
            <span className="text-h5 text-neutral-400">de {items.length}</span>
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          href={ROUTES.ORCAMENTO}
          className="self-start"
        >
          Quero o diagnóstico completo
        </Button>
      </div>

      {/* Direita — card único de checklist (glassy) */}
      <div className="flex-1 self-start rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-sm sm:p-3">
        <ul className="flex flex-col">
          {items.map((item, i) => {
            const isChecked = checked[i];
            return (
              <li key={item} className={i > 0 ? "border-t border-white/5" : ""}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={isChecked}
                  className="flex w-full items-center gap-4 rounded-lg px-4 py-3.5 text-left transition-colors"
                  style={
                    isChecked ? { background: checkedGradient } : undefined
                  }
                >
                  <span
                    aria-hidden
                    className={`flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                      isChecked
                        ? "border-primary-500 bg-primary-500"
                        : "border-white/25 bg-white/5"
                    }`}
                  >
                    {isChecked && <Check className="size-3.5 text-neutral-50" />}
                  </span>
                  <span
                    className={`text-body transition-colors ${
                      isChecked ? "text-neutral-50" : "text-neutral-300"
                    }`}
                  >
                    {item}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
