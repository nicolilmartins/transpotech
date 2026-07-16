"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { X, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  contactRequestSchema,
  type ContactRequestValues,
} from "@/lib/contact-request.schema";
import type { Forklift } from "@/types/forklift.types";

// Inputs em estilo "linha" (mesmo padrão do formulário da página Contato).
const inputBase =
  "h-11 rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error";
const labelBase = "text-body-sm font-semibold text-neutral-700";

type QuoteModalProps = {
  onClose: () => void;
  /** Lista completa de equipamentos que podem ser incluídos no orçamento. */
  forklifts: Forklift[];
  /** Equipamento que abriu o modal (pré-selecionado no passo 1). */
  initialSelectedId: string | null;
};

// Renderizado apenas enquanto aberto (montagem nova a cada abertura), então o
// estado já inicia no passo 1 com o equipamento clicado pré-selecionado.
export function QuoteModal({
  onClose,
  forklifts,
  initialSelectedId,
}: QuoteModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    initialSelectedId ? [initialSelectedId] : []
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestValues>({
    resolver: zodResolver(contactRequestSchema),
  });

  // Escape fecha e trava o scroll do body enquanto aberto.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const selectedForklifts = useMemo(
    () => forklifts.filter((f) => selectedIds.includes(f.id)),
    [forklifts, selectedIds]
  );

  const toggle = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const onSubmit = async (data: ContactRequestValues) => {
    // Sem backend — simula o envio (padrão dos demais formulários).
    await new Promise((r) => setTimeout(r, 500));
    toast.success(
      `Solicitação enviada para ${selectedForklifts.length} ${
        selectedForklifts.length === 1 ? "equipamento" : "equipamentos"
      }! A TranspoTech entrará em contato.`
    );
    reset();
    onClose();
    void data;
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Solicitar orçamento"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 flex max-h-[92svh] w-full min-w-0 max-w-[560px] flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] sm:rounded-2xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 p-5 lg:p-6">
          <h2 className="font-heading text-h6 font-semibold text-neutral-800">
            Solicitar orçamento
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {/* Corpo (rolável) */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5 lg:p-6">
          {step === 1 ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
                  Passo 1 de 2
                </span>
                <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                  Selecione os equipamentos
                </h3>
                <p className="text-body-sm leading-[1.4] text-neutral-600">
                  Escolha um ou mais equipamentos para incluir na mesma
                  solicitação de orçamento.
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {forklifts.map((f) => {
                  const checked = selectedIds.includes(f.id);
                  return (
                    <li key={f.id}>
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-2 transition-colors ${
                          checked
                            ? "border-primary-500 bg-primary-50/40"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(f.id)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden
                          className="flex size-5 shrink-0 items-center justify-center rounded border border-neutral-300 bg-white peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/40"
                        >
                          {checked && (
                            <Check className="size-3.5 text-neutral-50" />
                          )}
                        </span>
                        <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          <Image
                            src={f.image}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-contain"
                          />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-body font-semibold text-neutral-800">
                            {f.name}
                          </span>
                          <span className="text-body-sm text-neutral-500">
                            {f.brand} · {f.capacity}
                          </span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <form
              id="quote-form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
                  Passo 2 de 2
                </span>
                <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                  Seus dados
                </h3>
              </div>

              {/* Resumo dos equipamentos selecionados — título + fotos */}
              <div className="flex flex-col gap-3 rounded-xl bg-neutral-50 p-3">
                <span className="text-body-sm font-semibold text-neutral-700">
                  {selectedForklifts.length}{" "}
                  {selectedForklifts.length === 1
                    ? "equipamento selecionado"
                    : "equipamentos selecionados"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedForklifts.map((f) => (
                    <span
                      key={f.id}
                      title={f.name}
                      className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-white"
                    >
                      <Image
                        src={f.image}
                        alt={f.name}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="q-name" className={labelBase}>
                  Nome *
                </label>
                <input
                  id="q-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Digite seu nome completo."
                  aria-invalid={!!errors.name}
                  {...register("name")}
                  className={inputBase}
                />
                {errors.name && (
                  <p className="text-body-sm text-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="q-company" className={labelBase}>
                    Empresa *
                  </label>
                  <input
                    id="q-company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Informe o nome da empresa."
                    aria-invalid={!!errors.company}
                    {...register("company")}
                    className={inputBase}
                  />
                  {errors.company && (
                    <p className="text-body-sm text-error">
                      {errors.company.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="q-contact" className={labelBase}>
                    Contato *
                  </label>
                  <input
                    id="q-contact"
                    type="text"
                    placeholder="Telefone, WhatsApp ou e-mail."
                    aria-invalid={!!errors.contact}
                    {...register("contact")}
                    className={inputBase}
                  />
                  {errors.contact && (
                    <p className="text-body-sm text-error">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="q-city" className={labelBase}>
                  Cidade/UF *
                </label>
                <input
                  id="q-city"
                  type="text"
                  placeholder="Informe onde sua operação está localizada"
                  aria-invalid={!!errors.cityUf}
                  {...register("cityUf")}
                  className={inputBase}
                />
                {errors.cityUf && (
                  <p className="text-body-sm text-error">
                    {errors.cityUf.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="q-message" className={labelBase}>
                  Mensagem *
                </label>
                <textarea
                  id="q-message"
                  rows={3}
                  placeholder="Volume, prazo, aplicação ou o que precisar detalhar."
                  aria-invalid={!!errors.message}
                  {...register("message")}
                  className="min-h-[72px] rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error"
                />
                {errors.message && (
                  <p className="text-body-sm text-error">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  aria-invalid={!!errors.consent}
                  {...register("consent")}
                  className="mt-1 size-5 shrink-0 rounded border-neutral-300 accent-primary-500"
                />
                <span className="text-body-sm leading-[1.35] text-neutral-600">
                  Concordo com o tratamento dos meus dados conforme a Política de
                  Privacidade da TranspoTech (LGPD).
                </span>
              </label>
              {errors.consent && (
                <p className="-mt-3 text-body-sm text-error">
                  {errors.consent.message}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Ações — pb respeita a safe-area do iOS (home indicator) no bottom sheet */}
        <div className="flex items-center justify-between gap-3 border-t border-neutral-200 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:p-6">
          {step === 1 ? (
            <>
              <Button variant="gray" size="lg" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="lg"
                disabled={selectedIds.length === 0}
                onClick={() => setStep(2)}
              >
                Continuar ({selectedIds.length})
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="gray"
                size="lg"
                iconLeft={<ArrowLeft aria-hidden className="size-5" />}
                onClick={() => setStep(1)}
              >
                Voltar
              </Button>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                form="quote-form"
                disabled={isSubmitting}
              >
                Enviar solicitação
              </Button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
