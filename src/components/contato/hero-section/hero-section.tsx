"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CityAutocomplete } from "@/components/ui/city-autocomplete";
import { Textarea } from "@/components/ui/textarea";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import type { ContactRequestValues } from "@/lib/contact-request.schema";
import {
  contactResolver,
  loadContactValidation,
} from "@/lib/contact-request.resolver";
import type { SectionContent } from "@/sanity/content/fields";
import type { contatoPage } from "@/sanity/content/pages/contato";

type ContatoHeroContent = SectionContent<typeof contatoPage.sections.hero>;

const labelBase = "text-body font-semibold text-neutral-700";

export function ContatoHeroSection({ content }: { content: ContatoHeroContent }) {
  const [sent, setSent] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestValues>({ resolver: contactResolver });

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
        <p className="text-body font-semibold uppercase tracking-wide text-primary-500">
          {content.eyebrow}
        </p>
        <BlurRevealTitle
          className="text-h2 text-neutral-800"
          segments={[
            { text: content.titleTop, className: "font-normal", br: true },
            { text: content.titleBottom, className: "font-bold" },
          ]}
        />
        <p className="max-w-[520px] text-body leading-[1.5] text-neutral-600">
          {content.description}
        </p>
      </div>

      {/* Direita — formulário */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => sent && setSent(false)}
        onFocus={() => void loadContactValidation()}
        className="flex flex-col gap-5 rounded-2xl border-2 border-neutral-100 bg-white p-6 lg:p-8"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-name" className={labelBase}>
            {content.nameLabel} *
          </label>
          <Input
            id="ct-name"
            type="text"
            autoComplete="name"
            placeholder={content.namePlaceholder}
            invalid={!!errors.name}
            aria-describedby={errors.name ? "ct-name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="ct-name-error" className="text-body text-error">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-company" className={labelBase}>
            {content.companyLabel} *
          </label>
          <Input
            id="ct-company"
            type="text"
            autoComplete="organization"
            placeholder={content.companyPlaceholder}
            invalid={!!errors.company}
            aria-describedby={errors.company ? "ct-company-error" : undefined}
            {...register("company")}
          />
          {errors.company && (
            <p id="ct-company-error" className="text-body text-error">
              {errors.company.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ct-phone" className={labelBase}>
              {content.phoneLabel} *
            </label>
            <Input
              id="ct-phone"
              type="tel"
              autoComplete="tel"
              placeholder={content.phonePlaceholder}
              invalid={!!errors.phone}
              aria-describedby={errors.phone ? "ct-phone-error" : undefined}
              {...register("phone")}
            />
            {errors.phone && (
              <p id="ct-phone-error" className="text-body text-error">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ct-email" className={labelBase}>
              {content.emailLabel} *
            </label>
            <Input
              id="ct-email"
              type="email"
              autoComplete="email"
              placeholder={content.emailPlaceholder}
              invalid={!!errors.email}
              aria-describedby={errors.email ? "ct-email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="ct-email-error" className="text-body text-error">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-city" className={labelBase}>
            {content.cityLabel} *
          </label>
          <Controller
            control={control}
            name="cityUf"
            render={({ field }) => (
              <CityAutocomplete
                id="ct-city"
                name={field.name}
                placeholder={content.cityPlaceholder}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={!!errors.cityUf}
              />
            )}
          />
          {errors.cityUf && (
            <p id="ct-city-error" className="text-body text-error">
              {errors.cityUf.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-message" className={labelBase}>
            {content.messageLabel} *
          </label>
          <Textarea
            id="ct-message"
            rows={3}
            placeholder={content.messagePlaceholder}
            invalid={!!errors.message}
            aria-describedby={errors.message ? "ct-message-error" : undefined}
            {...register("message")}
          />
          {errors.message && (
            <p id="ct-message-error" className="text-body text-error">
              {errors.message.message}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <Checkbox
            invalid={!!errors.consent}
            aria-describedby={errors.consent ? "ct-consent-error" : undefined}
            {...register("consent")}
            className="mt-1"
          />
          <span className="text-body leading-[1.35] text-neutral-600">
            {content.consentLabel}
          </span>
        </label>
        {errors.consent && (
          <p id="ct-consent-error" className="-mt-3 text-body text-error">
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
            {content.submitLabel}
          </Button>
          {sent && (
            <p
              role="status"
              className="inline-flex items-start gap-2 text-body font-semibold text-success"
            >
              <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0" />
              {content.successMessage}
            </p>
          )}
        </div>
      </form>
    </Section>
  );
}
