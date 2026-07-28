"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  compararCustos,
  DEFAULT_INPUTS,
  type ResultadoEquipamento,
  type SimuladorInputs,
} from "@/data/glp-vs-eletrica";
import { formatBRL, formatBRLInteiro, formatMeses } from "@/lib/format";

type FieldKey = keyof SimuladorInputs;

const fields: {
  key: FieldKey;
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}[] = [
  {
    key: "turnos",
    label: "Nr. de turnos de trabalho",
    min: 1,
    max: 3,
    step: 0.5,
    format: (v) =>
      `${v.toLocaleString("pt-BR")} ${v === 1 ? "turno" : "turnos"}`,
  },
  {
    key: "cilindro",
    label: "Valor do cilindro de gás P20",
    min: 100,
    max: 350,
    step: 10,
    format: (v) => formatBRLInteiro(v),
  },
  {
    key: "kwh",
    label: "Valor do kWh",
    min: 0.3,
    max: 1.2,
    step: 0.01,
    format: (v) => formatBRL(v),
  },
];

// Trilha fina cinza + thumb laranja (mesmo slider dos filtros do catálogo).
const sliderClass =
  "h-1 w-full appearance-none rounded-full bg-neutral-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110";

type MetricRow = {
  label: string;
  fmt: (r: ResultadoEquipamento) => string;
};

const metricRows: MetricRow[] = [
  { label: "Custo por hora", fmt: (r) => formatBRL(r.custoHora) },
  { label: "Custo por mês", fmt: (r) => formatBRL(r.custoMes) },
  { label: "Custo por ano", fmt: (r) => formatBRL(r.custoAno) },
  { label: "Custo em 5 anos", fmt: (r) => formatBRL(r.custoCincoAnos) },
  {
    label: "Preço / retorno do investimento",
    fmt: (r) =>
      r.eletrica
        ? formatMeses(r.paybackMeses ?? Infinity)
        : formatBRLInteiro(r.preco ?? 0),
  },
];

const valueColor = (r: ResultadoEquipamento) =>
  r.eletrica ? "text-secondary-600" : "text-neutral-800";

export function SimulatorSection() {
  const [inputs, setInputs] = useState<SimuladorInputs>(DEFAULT_INPUTS);
  const [showFilters, setShowFilters] = useState(false);
  const { glp, baterias } = compararCustos(inputs);
  const colunas = [glp, ...baterias];

  const isDefault =
    inputs.turnos === DEFAULT_INPUTS.turnos &&
    inputs.cilindro === DEFAULT_INPUTS.cilindro &&
    inputs.kwh === DEFAULT_INPUTS.kwh;

  const setField = (key: FieldKey, raw: string) =>
    setInputs((prev) => ({ ...prev, [key]: Number(raw) }));

  // Painel de filtros reutilizado no aside (desktop) e no bottom sheet (mobile).
  const filtersPanel = (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-body-lg font-semibold text-neutral-800">
          Ajuste os valores
        </h2>
        <p className="text-body-sm leading-[1.4] text-neutral-600">
          Partem de médias de referência no Brasil.
          <br />
          Arraste para a sua operação.
        </p>
      </div>

      <div className="flex flex-col">
        {fields.map((f) => (
          // Linha divisória acima de cada filtro (como no catálogo, sem seta).
          <div
            key={f.key}
            className="flex flex-col gap-2 border-t border-neutral-200 pt-5 [&:not(:first-child)]:mt-5"
          >
            <span className="text-body-sm font-semibold text-neutral-700">
              {f.label}
            </span>
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={inputs[f.key]}
              onChange={(e) => setField(f.key, e.target.value)}
              aria-label={`${f.label}: ${f.format(inputs[f.key])}`}
              aria-valuetext={f.format(inputs[f.key])}
              className={sliderClass}
            />
            <div className="flex items-center justify-between text-[12px] text-neutral-400">
              <span>{f.format(f.min)}</span>
              <span className="font-semibold text-primary-500">
                {f.format(inputs[f.key])}
              </span>
              <span>{f.format(f.max)}</span>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="gray"
        size="md"
        onClick={() => setInputs(DEFAULT_INPUTS)}
        disabled={isDefault}
        className="w-full"
      >
        Restaurar médias
      </Button>
    </div>
  );

  return (
    <Section className="flex flex-col gap-8 pt-0 lg:gap-10">
      {/* Botão de filtros (mobile) — mesmo padrão do catálogo de empilhadeiras */}
      <button
        type="button"
        onClick={() => setShowFilters(true)}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-neutral-800/10 px-5 text-body font-semibold text-neutral-700 lg:hidden"
      >
        <SlidersHorizontal aria-hidden className="size-5" />
        Ajustar valores
      </button>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr]">
        {/* Filtros — sem box (só o fundo do site); no mobile viram bottom sheet */}
        <aside className="hidden lg:flex">{filtersPanel}</aside>

        {/* Comparação — box cinza com card branco interno para os equipamentos */}
        <ComparisonTable colunas={colunas} />
      </div>

      {/* Nota de rodapé — mesma ressalva da planilha comercial */}
      <p className="max-w-[820px] text-body-sm leading-[1.5] text-neutral-500">
        <strong className="font-semibold text-neutral-600">Importante:</strong>{" "}
        o retorno do investimento (pay-back) considera apenas a economia
        energética. Não entram no cálculo fatores que ampliam ainda mais a
        vantagem do lítio, como MTBF (tempo entre falhas), custo de manutenção,
        intervalo de manutenção (250h no GLP × 1.000h na elétrica) e custo de
        peças. Valores de referência para os modelos RC4425C (GLP) e RCE25-35
        (elétrica lítio).
      </p>

      {/* Filtros como bottom sheet no mobile (mesmo padrão do catálogo) */}
      {showFilters &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex flex-col justify-end lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Ajustar valores"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowFilters(false)}
              aria-hidden
            />
            <div className="relative z-10 flex max-h-[88svh] flex-col overflow-hidden rounded-t-2xl bg-white">
              <div className="flex items-center justify-between border-b border-neutral-200 p-5">
                <h2 className="font-heading text-h6 font-semibold text-neutral-800">
                  Ajustar valores
                </h2>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  aria-label="Fechar"
                  className="flex size-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                {filtersPanel}
              </div>
              <div className="border-t border-neutral-200 p-5">
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="h-12 w-full rounded-full bg-primary-500 text-body font-semibold text-neutral-50 transition-colors hover:bg-primary-600"
                >
                  Ver comparação
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </Section>
  );
}

// Dica de scroll (mobile): rola o box um pouco para a direita e volta duas
// vezes (dois "vai e volta" suaves em seno), mostrando que dá para arrastar.
function nudgeScrollHint(el: HTMLElement) {
  const peak = 48;
  const humps = 2;
  const duration = 2600;
  const start = performance.now();
  const step = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    // ((p*humps) % 1) reinicia o seno a cada hump → dois arcos 0 → pico → 0.
    el.scrollLeft = peak * Math.sin(((p * humps) % 1) * Math.PI);
    if (p < 1) requestAnimationFrame(step);
    else el.scrollLeft = 0;
  };
  requestAnimationFrame(step);
}

// ─── Tabela comparativa: rótulos no card cinza, equipamentos no card branco ───
function ComparisonTable({ colunas }: { colunas: ResultadoEquipamento[] }) {
  const lastRow = metricRows.length - 1;
  const boxRef = useRef<HTMLDivElement>(null);

  // Ao entrar na viewport (uma vez), se houver rolagem horizontal — só no
  // mobile, onde a tabela não cabe — dispara a dica de arrastar.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (box.scrollWidth > box.clientWidth + 8) nudgeScrollHint(box);
      },
      { threshold: 0.4 }
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    // Sem padding à esquerda: a coluna de rótulos (sticky) encosta na borda do
    // box e não deixa nada vazar por trás dela. pt extra dá espaço para as
    // empilhadeiras transbordarem o topo do card branco. min-w-0 deixa o box
    // encolher e rolar internamente no mobile.
    <div
      ref={boxRef}
      className="flex min-w-0 overflow-x-auto rounded-2xl bg-neutral-50 pb-3 pt-8 sm:pb-4 sm:pt-9"
    >
      <table className="min-w-[560px] flex-1 table-fixed border-separate border-spacing-0 text-left">
        <colgroup>
          <col className="w-[160px]" />
          <col className="w-4" />
          {colunas.map((c) => (
            <col key={c.id} />
          ))}
        </colgroup>
        <thead>
          {/* Coluna de rótulos fixa (sticky): os cards de equipamento arrastam
              "para trás" dela. align-top sobe o título para a linha do topo do
              card branco. */}
          <tr>
            <th className="sticky left-0 z-20 bg-neutral-50 pl-4 pr-4 pt-2 align-top text-left">
              {/* Estende o cinza para cima cobrindo a faixa onde as
                  empilhadeiras transbordam (acima da linha do cabeçalho). */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-full h-12 bg-neutral-50"
              />
              <span className="block font-heading text-xl font-bold leading-[1.15] text-neutral-800">
                Comparar
                <br />
                máquinas
              </span>
            </th>
            <td aria-hidden />
            {colunas.map((c, i) => (
              <th
                key={c.id}
                scope="col"
                className={`bg-white px-3 pb-4 pt-4 text-center align-bottom ${
                  i === 0 ? "rounded-tl-xl" : ""
                } ${i === colunas.length - 1 ? "rounded-tr-xl" : ""}`}
              >
                <span className="flex flex-col items-center gap-2">
                  {/* -mt negativo faz a empilhadeira transbordar o topo do card */}
                  <span className="relative -mt-8 h-16 w-full sm:-mt-9">
                    <Image
                      src={c.image}
                      alt={c.nome}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-body font-bold text-neutral-800">
                      {c.nomeCurto}
                    </span>
                    <span className="text-[12px] font-normal leading-tight text-neutral-500">
                      {c.motor}
                    </span>
                  </span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metricRows.map((row, ri) => {
            const last = ri === lastRow;
            return (
              <tr key={row.label}>
                <th
                  scope="row"
                  className={`sticky left-0 z-20 border-t border-neutral-200 bg-neutral-50 py-4 pl-4 pr-4 align-middle text-body-sm ${
                    last ? "font-bold text-neutral-800" : "font-medium text-neutral-600"
                  }`}
                >
                  {row.label}
                </th>
                <td aria-hidden />
                {colunas.map((c, i) => (
                  <td
                    key={c.id}
                    className={`border-t border-neutral-100 px-3 py-4 text-center text-body font-bold ${
                      last ? "bg-secondary-600/10" : "bg-white"
                    } ${valueColor(c)} ${last && i === 0 ? "rounded-bl-xl" : ""} ${
                      last && i === colunas.length - 1 ? "rounded-br-xl" : ""
                    }`}
                  >
                    {row.fmt(c)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Espaço à direita como conteúdo rolável — ao chegar no fim do scroll
          horizontal o fundo cinza do box aparece à direita do último card
          (o padding-right no próprio container de scroll é ignorado no fim). */}
      <div aria-hidden className="w-3 shrink-0 sm:w-4" />
    </div>
  );
}
