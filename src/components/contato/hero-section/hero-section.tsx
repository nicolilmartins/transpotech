"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import {
  contactRequestSchema,
  type ContactRequestValues,
} from "@/lib/contact-request.schema";

const labelBase = "text-body-sm font-semibold text-neutral-700";

export function ContatoHeroSection() {
  const [sent, setSent] = useState(false);

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
    reset();
    setSent(true);
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
        <BlurRevealTitle
          className="text-h2 text-neutral-800"
          segments={[
            { text: "Entre em contato", className: "font-normal", br: true },
            { text: "com a TranspoTech", className: "font-bold" },
          ]}
        />
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
        onChange={() => sent && setSent(false)}
        className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-6 lg:p-8"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-name" className={labelBase}>
            Nome *
          </label>
          <Input
            id="ct-name"
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
            <label htmlFor="ct-company" className={labelBase}>
              Empresa *
            </label>
            <Input
              id="ct-company"
              type="text"
              autoComplete="organization"
              placeholder="Informe o nome da empresa."
              invalid={!!errors.company}
              {...register("company")}
            />
            {errors.company && (
              <p className="text-body-sm text-error">{errors.company.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ct-contact" className={labelBase}>
              Contato *
            </label>
            <Input
              id="ct-contact"
              type="text"
              placeholder="Telefone, WhatsApp ou e-mail."
              invalid={!!errors.contact}
              {...register("contact")}
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
          <Input
            id="ct-city"
            type="text"
            placeholder="Informe onde sua operação está localizada"
            invalid={!!errors.cityUf}
            {...register("cityUf")}
          />
          {errors.cityUf && (
            <p className="text-body-sm text-error">{errors.cityUf.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-message" className={labelBase}>
            Mensagem *
          </label>
          <Textarea
            id="ct-message"
            rows={3}
            placeholder="Descreva sua operação, equipamento, urgência, cidade ou o que você precisa resolver."
            invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-body-sm text-error">{errors.message.message}</p>
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

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full self-start lg:w-auto"
          >
            Enviar solicitação
          </Button>
          {sent && (
            <p
              role="status"
              className="inline-flex items-start gap-2 text-body-sm font-semibold text-success"
            >
              <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0" />
              Sua solicitação foi enviada! Em breve retornaremos com sua
              proposta.
            </p>
          )}
        </div>
      </form>
    </Section>
  );
}
