"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  contactRequestSchema,
  type ContactRequestValues,
} from "@/lib/contact-request.schema";

// Inputs em estilo "linha": fundo transparente, sem caixa, apenas uma linha
// embaixo (borda inferior) que fica laranja no foco.
const inputBase =
  "h-11 rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error";
const labelBase = "text-body-sm font-semibold text-neutral-700";

export function ContatoHeroSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestValues>({
    resolver: zodResolver(contactRequestSchema),
  });

  const onSubmit = async (data: ContactRequestValues) => {
    // Sem backend — simula o envio (padrão dos demais formulários).
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Solicitação enviada! A equipe TranspoTech entrará em contato.");
    reset();
    void data;
  };

  return (
    <Section
      id="solicitacao"
      data-header-hero
      className="grid grid-cols-1 gap-10 pt-[128px] lg:grid-cols-2 lg:items-start lg:gap-16 lg:pt-[152px]"
    >
      {/* Esquerda — texto */}
      <div className="flex flex-col gap-4 lg:pt-2">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
          Contato
        </p>
        <h1 className="text-h2 font-bold text-neutral-800">
          Entre em contato com a TranspoTech
        </h1>
        <p className="max-w-[520px] text-body leading-[1.5] text-neutral-600">
          Agende uma visita, proponha uma parceria, tire dúvidas ou fale com a
          nossa equipe de imprensa. Preencha o formulário ao lado e retornamos em
          até 2 dias úteis.
        </p>
      </div>

      {/* Direita — formulário */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-6 lg:p-8"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-name" className={labelBase}>
            Nome *
          </label>
          <input
            id="ct-name"
            type="text"
            autoComplete="name"
            placeholder="Digite seu nome completo."
            aria-invalid={!!errors.name}
            {...register("name")}
            className={inputBase}
          />
          {errors.name && (
            <p className="text-body-sm text-error">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ct-company" className={labelBase}>
              Empresa *
            </label>
            <input
              id="ct-company"
              type="text"
              autoComplete="organization"
              placeholder="Informe o nome da empresa."
              aria-invalid={!!errors.company}
              {...register("company")}
              className={inputBase}
            />
            {errors.company && (
              <p className="text-body-sm text-error">{errors.company.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ct-contact" className={labelBase}>
              Contato *
            </label>
            <input
              id="ct-contact"
              type="text"
              placeholder="Telefone, WhatsApp ou e-mail."
              aria-invalid={!!errors.contact}
              {...register("contact")}
              className={inputBase}
            />
            {errors.contact && (
              <p className="text-body-sm text-error">{errors.contact.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-city" className={labelBase}>
            Cidade/UF *
          </label>
          <input
            id="ct-city"
            type="text"
            placeholder="Informe onde sua operação está localizada"
            aria-invalid={!!errors.cityUf}
            {...register("cityUf")}
            className={inputBase}
          />
          {errors.cityUf && (
            <p className="text-body-sm text-error">{errors.cityUf.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-message" className={labelBase}>
            Mensagem *
          </label>
          <textarea
            id="ct-message"
            rows={3}
            placeholder="Descreva sua operação, equipamento, urgência, cidade ou o que você precisa resolver."
            aria-invalid={!!errors.message}
            {...register("message")}
            className="min-h-[72px] rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error"
          />
          {errors.message && (
            <p className="text-body-sm text-error">{errors.message.message}</p>
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

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="self-start"
        >
          Enviar solicitação
        </Button>
      </form>
    </Section>
  );
}
