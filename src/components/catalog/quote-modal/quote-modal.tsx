"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGSAP } from "@gsap/react";
import { X, Check, Plus } from "lucide-react";
import { gsap } from "@/lib/gsap";
import badgeImage from "@/assets/images/stats/card-badge.webp";
import { Button } from "@/components/ui/button";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactRequestSchema,
  type ContactRequestValues,
} from "@/lib/contact-request.schema";
import type { Forklift } from "@/types/forklift.types";

const labelBase = "text-body-sm font-semibold text-neutral-700";

type QuoteModalProps = {
  onClose: () => void;
  /** Lista completa de equipamentos que podem ser incluídos no orçamento. */
  forklifts: Forklift[];
  /** Equipamento que abriu o modal (já pré-selecionado). */
  initialSelectedId: string | null;
};

// Passo único: o modal abre direto no formulário de dados, com o equipamento
// escolhido já selecionado. O botão "+" abre uma lista para incluir outros.
export function QuoteModal({
  onClose,
  forklifts,
  initialSelectedId,
}: QuoteModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    initialSelectedId ? [initialSelectedId] : []
  );
  const [addOpen, setAddOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);

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

  // Clique fora do "+" fecha a lista de equipamentos.
  useEffect(() => {
    if (!addOpen) return;
    const onDown = (e: MouseEvent) => {
      if (addRef.current && !addRef.current.contains(e.target as Node)) {
        setAddOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [addOpen]);

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
    reset();
    setSent(true);
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

      {sent ? (
        <QuoteSentCard onClose={onClose} />
      ) : (
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
          <form
            id="quote-form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                Seus dados
              </h3>
              <p className="text-body-sm leading-[1.4] text-neutral-600">
                Preencha seus dados e retornaremos com a proposta.
              </p>
            </div>

            {/* Resumo dos equipamentos — imagens + botão "+" para incluir outros */}
            <div className="flex flex-col gap-3 rounded-xl bg-neutral-50 p-3">
              <span className="text-body-sm font-semibold text-neutral-700">
                {selectedForklifts.length}{" "}
                {selectedForklifts.length === 1
                  ? "equipamento selecionado"
                  : "equipamentos selecionados"}
              </span>
              <div className="flex flex-wrap items-center gap-2">
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

                {/* Botão "+" — abre a lista das outras opções */}
                <div ref={addRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setAddOpen((o) => !o)}
                    aria-expanded={addOpen}
                    aria-label="Incluir outro equipamento"
                    className={`flex size-14 shrink-0 items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                      addOpen
                        ? "border-primary-500 bg-primary-50/40 text-primary-500"
                        : "border-neutral-300 text-neutral-500 hover:border-primary-500 hover:text-primary-500"
                    }`}
                  >
                    <Plus className="size-6" aria-hidden />
                  </button>

                  {addOpen && (
                    <div className="absolute left-0 top-full z-20 mt-2 w-72 max-w-[calc(100vw-3rem)] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_16px_32px_-8px_rgba(0,0,0,0.24)]">
                      <p className="border-b border-neutral-100 px-3 py-2 text-body-sm font-semibold text-neutral-700">
                        Incluir equipamentos
                      </p>
                      {/* Altura p/ ~5 itens visíveis (cada linha ~64px) antes de rolar. */}
                      <ul className="max-h-80 overflow-y-auto p-1.5">
                        {forklifts.map((f) => {
                          const checked = selectedIds.includes(f.id);
                          return (
                            <li key={f.id}>
                              <button
                                type="button"
                                onClick={() => toggle(f.id)}
                                className={`flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition-colors ${
                                  checked
                                    ? "bg-primary-50/40"
                                    : "hover:bg-neutral-50"
                                }`}
                              >
                                <span
                                  aria-hidden
                                  className={`flex size-5 shrink-0 items-center justify-center rounded border ${
                                    checked
                                      ? "border-primary-500 bg-primary-500"
                                      : "border-neutral-300 bg-white"
                                  }`}
                                >
                                  {checked && (
                                    <Check className="size-3.5 text-neutral-50" />
                                  )}
                                </span>
                                <span className="relative size-10 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                                  <Image
                                    src={f.image}
                                    alt=""
                                    fill
                                    sizes="40px"
                                    className="object-contain"
                                  />
                                </span>
                                <span className="flex min-w-0 flex-col">
                                  <span className="truncate text-body-sm font-semibold text-neutral-800">
                                    {f.name}
                                  </span>
                                  <span className="truncate text-body-sm text-neutral-500">
                                    {f.brand} · {f.capacity}
                                  </span>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="q-name" className={labelBase}>
                Nome *
              </label>
              <Input
                id="q-name"
                type="text"
                autoComplete="name"
                placeholder="Digite seu nome completo."
                invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-body-sm text-error">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="q-company" className={labelBase}>
                  Empresa *
                </label>
                <Input
                  id="q-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Informe o nome da empresa."
                  invalid={!!errors.company}
                  {...register("company")}
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
                <Input
                  id="q-contact"
                  type="text"
                  placeholder="Telefone, WhatsApp ou e-mail."
                  invalid={!!errors.contact}
                  {...register("contact")}
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
              <Input
                id="q-city"
                type="text"
                placeholder="Informe onde sua operação está localizada"
                invalid={!!errors.cityUf}
                {...register("cityUf")}
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
              <Textarea
                id="q-message"
                rows={3}
                placeholder="Volume, prazo, aplicação ou o que precisar detalhar."
                invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-body-sm text-error">
                  {errors.message.message}
                </p>
              )}
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                invalid={!!errors.consent}
                {...register("consent")}
                className="mt-1"
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
        </div>

        {/* Ações — pb respeita a safe-area do iOS (home indicator) no bottom sheet */}
        <div className="flex items-center justify-between gap-3 border-t border-neutral-200 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:p-6">
          <Button variant="gray" size="lg" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            form="quote-form"
            disabled={isSubmitting || selectedIds.length === 0}
          >
            Enviar solicitação
          </Button>
        </div>
      </div>
      )}
    </div>,
    document.body
  );
}

// Confirmação compacta exibida no lugar do formulário após o envio.
// Anima com GSAP (mesma lib do site): card entra com fade + escala, selo
// (imagem card-badge) com "pop", seguidos do texto e do botão.
function QuoteSentCard({ onClose }: { onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const revealRefs = useRef<HTMLElement[]>([]);

  const setReveal = (el: HTMLElement | null, i: number) => {
    if (el) revealRefs.current[i] = el;
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline()
        .from(
          cardRef.current,
          { opacity: 0, y: 12, scale: 0.94, duration: 0.4, ease: "power2.out" },
          0
        )
        .from(
          badgeRef.current,
          { scale: 0, duration: 0.5, ease: "back.out(1.7)" },
          0.1
        )
        .from(
          revealRefs.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.4,
            ease: "power1.out",
            stagger: 0.08,
          },
          0.3
        );
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="relative z-10 flex w-full max-w-[400px] flex-col items-center gap-5 rounded-t-2xl bg-white p-8 text-center shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] sm:rounded-2xl"
    >
      {/* Selo de sucesso — mesmo tratamento dos cards (CardImageIcon): máscara
          radial que dissolve o fundo, sem o corte quadrado da imagem. Centrado
          na caixa (o selo fica no centro do arquivo). */}
      <span ref={badgeRef} className="relative block size-32">
        <CardImageIcon
          src={badgeImage}
          width={199.939}
          height={149.954}
          left={-36}
          top={-11}
          maskX={25.211}
          maskY={8.043}
          flip={false}
        />
      </span>

      <div className="flex flex-col gap-2">
        <h2
          ref={(el) => setReveal(el, 0)}
          className="font-heading text-h6 font-semibold text-neutral-800"
        >
          Sua solicitação foi enviada!
        </h2>
        <p
          ref={(el) => setReveal(el, 1)}
          className="text-body leading-[1.4] text-neutral-600"
        >
          Em breve retornaremos com sua proposta.
        </p>
      </div>

      <div ref={(el) => setReveal(el, 2)} className="w-full">
        <Button
          variant="primary"
          size="lg"
          onClick={onClose}
          className="w-full justify-center"
        >
          Concluir
        </Button>
      </div>
    </div>
  );
}
