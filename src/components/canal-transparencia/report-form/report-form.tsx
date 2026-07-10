"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Paperclip, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  reportSchema,
  reportRelations,
  reportTypes,
  type ReportFormValues,
} from "@/lib/report.schema";

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
  return `CT-${stamp}-${rand}`;
}

export function ReportForm() {
  const [protocol, setProtocol] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: { identify: "anonimo" },
  });

  const identify = watch("identify");

  const onSubmit = async (data: ReportFormValues) => {
    // Sem backend — simula o envio e gera um número de protocolo (placeholder).
    await new Promise((r) => setTimeout(r, 500));
    const code = generateProtocol();
    setProtocol(code);
    toast.success("Relato enviado. Guarde seu número de protocolo.");
    reset({ identify: "anonimo" });
    void data;
  };

  return (
    <Section
      id="relato"
      className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start lg:gap-30"
    >
      <div className="flex flex-col gap-4 lg:pt-2">
        <h2 className="text-h3 font-normal text-neutral-800">Faça um relato</h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Preencha as informações abaixo para registrar uma situação relacionada
          à ética, integridade ou conduta.
        </p>
      </div>

      {protocol ? (
        <div className="flex w-full flex-col items-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 lg:p-8">
          <CheckCircle2 aria-hidden className="size-10 text-success" />
          <h3 className="font-heading text-h5 font-semibold text-neutral-800">
            Relato enviado
          </h3>
          <p className="text-body leading-[1.35] text-neutral-600">
            Guarde o número de protocolo abaixo para acompanhar o andamento.
          </p>
          <p className="rounded-lg bg-white px-4 py-3 font-heading text-h6 font-semibold text-neutral-800">
            {protocol}
          </p>
          <Button variant="outline" size="lg" onClick={() => setProtocol(null)}>
            Fazer outro relato
          </Button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 lg:p-8"
        >
          {/* Identificação */}
          <fieldset className="flex flex-col gap-3">
            <legend className={labelBase}>Deseja se identificar?</legend>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
              {[
                { value: "sim", label: "Sim, quero me identificar" },
                { value: "anonimo", label: "Não, prefiro anônimo" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register("identify")}
                    className="size-4 accent-primary-500"
                  />
                  <span className="text-body text-neutral-800">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {identify === "anonimo" && (
              <p className="text-body-sm text-neutral-500">
                Ao optar pelo anonimato, evite incluir informações que possam te
                identificar indiretamente.
              </p>
            )}
          </fieldset>

          {/* Relação + Tipo */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rf-relation" className={labelBase}>
                Relação com a TranspoTech *
              </label>
              <div className="relative">
                <select
                  id="rf-relation"
                  defaultValue=""
                  aria-invalid={!!errors.relation}
                  {...register("relation")}
                  className={`${inputBase} w-full appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {reportRelations.map((relation) => (
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
              <label htmlFor="rf-type" className={labelBase}>
                Tipo de relato *
              </label>
              <div className="relative">
                <select
                  id="rf-type"
                  defaultValue=""
                  aria-invalid={!!errors.type}
                  {...register("type")}
                  className={`${inputBase} w-full appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {reportTypes.map((type) => (
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

          {/* Local + Data */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rf-location" className={labelBase}>
                Local ou unidade relacionada
              </label>
              <input
                id="rf-location"
                type="text"
                placeholder="Ex.: Curitiba/PR, unidade SC"
                {...register("location")}
                className={inputBase}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rf-date" className={labelBase}>
                Data aproximada do ocorrido
              </label>
              <input
                id="rf-date"
                type="date"
                {...register("occurredAt")}
                className={inputBase}
              />
            </div>
          </div>

          {/* Pessoas envolvidas */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="rf-people" className={labelBase}>
              Pessoas envolvidas (se souber)
            </label>
            <input
              id="rf-people"
              type="text"
              placeholder="Nomes, cargos ou áreas envolvidas"
              {...register("people")}
              className={inputBase}
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="rf-description" className={labelBase}>
              Descrição do relato *
            </label>
            <textarea
              id="rf-description"
              rows={5}
              placeholder="Descreva o ocorrido com o máximo de detalhes possível."
              aria-invalid={!!errors.description}
              {...register("description")}
              className="min-h-[140px] rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error"
            />
            {errors.description && (
              <p className="text-body-sm text-error">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Anexos */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="rf-files" className={labelBase}>
              Anexos (opcional)
            </label>
            <label
              htmlFor="rf-files"
              className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-body text-neutral-700 hover:border-neutral-300"
            >
              <Paperclip aria-hidden className="size-5 text-neutral-500" />
              Escolher arquivos
            </label>
            <input id="rf-files" type="file" multiple className="sr-only" />
            <p className="text-body-sm text-neutral-500">
              O envio de arquivos é simulado nesta versão.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="self-start"
            >
              Enviar relato
            </Button>
            <p className="text-body-sm text-neutral-500">
              Após o envio, exibimos um número de protocolo (placeholder até
              integração com o sistema de tratamento).
            </p>
          </div>
        </form>
      )}
    </Section>
  );
}
