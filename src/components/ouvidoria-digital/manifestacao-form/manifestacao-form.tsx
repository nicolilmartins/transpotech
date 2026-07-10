"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Paperclip, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  manifestacaoSchema,
  manifestacaoRelations,
  manifestacaoTypes,
  type ManifestacaoFormValues,
} from "@/lib/manifestacao.schema";

// Inputs em estilo "linha" (padrão do formulário da página Contato): fundo
// transparente, sem caixa, apenas uma linha embaixo que fica laranja no foco.
const inputBase =
  "h-11 rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error";
const labelBase = "text-body-sm font-semibold text-neutral-700";

function generateProtocol(): string {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `OUV-${stamp}-${rand}`;
}

export function ManifestacaoForm() {
  const [protocol, setProtocol] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ManifestacaoFormValues>({
    resolver: zodResolver(manifestacaoSchema),
  });

  const onSubmit = async (data: ManifestacaoFormValues) => {
    // Sem backend — simula o envio e gera um número de protocolo (placeholder).
    await new Promise((r) => setTimeout(r, 500));
    setProtocol(generateProtocol());
    toast.success("Manifestação enviada. Guarde seu número de protocolo.");
    reset();
    void data;
  };

  return (
    <Section
      id="manifestacao"
      className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start lg:gap-30"
    >
      <div className="flex flex-col gap-4 lg:pt-2">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
          Canal de escuta
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Envie sua manifestação
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Preencha o formulário para registrar sua manifestação. As informações
          ajudam a direcionar sua demanda corretamente.
        </p>
      </div>

      {protocol ? (
        <div className="flex w-full flex-col items-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 lg:p-8">
          <CheckCircle2 aria-hidden className="size-10 text-success" />
          <h3 className="font-heading text-h5 font-semibold text-neutral-800">
            Manifestação enviada
          </h3>
          <p className="text-body leading-[1.35] text-neutral-600">
            Guarde o número de protocolo abaixo para acompanhar o andamento.
          </p>
          <p className="rounded-lg bg-white px-4 py-3 font-heading text-h6 font-semibold text-neutral-800">
            {protocol}
          </p>
          <Button variant="outline" size="lg" onClick={() => setProtocol(null)}>
            Enviar outra manifestação
          </Button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 lg:p-8"
        >
          {/* Nome + Contato */}
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mf-name" className={labelBase}>
                Nome *
              </label>
              <input
                id="mf-name"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
                className={inputBase}
              />
              {errors.name && (
                <p className="text-body-sm text-error">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mf-contact" className={labelBase}>
                E-mail ou telefone *
              </label>
              <input
                id="mf-contact"
                type="text"
                placeholder="email@empresa.com ou (00) 00000-0000"
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

          {/* Relação + Tipo */}
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mf-relation" className={labelBase}>
                Relação com a TranspoTech *
              </label>
              <div className="relative">
                <select
                  id="mf-relation"
                  defaultValue=""
                  aria-invalid={!!errors.relation}
                  {...register("relation")}
                  className={`${inputBase} w-full appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {manifestacaoRelations.map((relation) => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
                />
              </div>
              {errors.relation && (
                <p className="text-body-sm text-error">
                  {errors.relation.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="mf-type" className={labelBase}>
                Tipo de manifestação *
              </label>
              <div className="relative">
                <select
                  id="mf-type"
                  defaultValue=""
                  aria-invalid={!!errors.type}
                  {...register("type")}
                  className={`${inputBase} w-full appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {manifestacaoTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
                />
              </div>
              {errors.type && (
                <p className="text-body-sm text-error">{errors.type.message}</p>
              )}
            </div>
          </div>

          {/* Unidade / cidade */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="mf-location" className={labelBase}>
              Unidade ou cidade relacionada *
            </label>
            <input
              id="mf-location"
              type="text"
              placeholder="Ex.: Curitiba/PR"
              aria-invalid={!!errors.location}
              {...register("location")}
              className={inputBase}
            />
            {errors.location && (
              <p className="text-body-sm text-error">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Mensagem */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="mf-message" className={labelBase}>
              Mensagem *
            </label>
            <textarea
              id="mf-message"
              rows={5}
              placeholder="Descreva sua manifestação com o máximo de detalhes possível."
              aria-invalid={!!errors.message}
              {...register("message")}
              className="min-h-[140px] rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error"
            />
            {errors.message && (
              <p className="text-body-sm text-error">{errors.message.message}</p>
            )}
          </div>

          {/* Detalhes opcionais (recolhível) */}
          <details className="group rounded-xl border border-neutral-200 bg-neutral-50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-body font-semibold text-neutral-700">
              Detalhes opcionais (empresa, número de pedido, anexos)
              <ChevronDown
                aria-hidden
                className="size-5 text-neutral-500 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="flex flex-col gap-5 px-4 pb-4 pt-1">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mf-company" className={labelBase}>
                    Empresa
                  </label>
                  <input
                    id="mf-company"
                    type="text"
                    autoComplete="organization"
                    {...register("company")}
                    className={inputBase}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mf-order" className={labelBase}>
                    Número de pedido
                  </label>
                  <input
                    id="mf-order"
                    type="text"
                    {...register("orderNumber")}
                    className={inputBase}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="mf-files" className={labelBase}>
                  Anexos
                </label>
                <label
                  htmlFor="mf-files"
                  className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-body text-neutral-700 hover:border-neutral-300"
                >
                  <Paperclip aria-hidden className="size-5 text-neutral-500" />
                  Escolher arquivos
                </label>
                <input id="mf-files" type="file" multiple className="sr-only" />
                <p className="text-body-sm text-neutral-500">
                  O envio de arquivos é simulado nesta versão.
                </p>
              </div>
            </div>
          </details>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="self-start"
            >
              Enviar manifestação
            </Button>
            <p className="text-body-sm text-neutral-500">
              Após o envio, exibimos um número de protocolo (placeholder até
              integração com o sistema de atendimento).
            </p>
          </div>
        </form>
      )}
    </Section>
  );
}
