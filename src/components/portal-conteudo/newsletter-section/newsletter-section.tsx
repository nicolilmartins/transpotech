"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  newsletterSchema,
  newsletterThemes,
  type NewsletterFormValues,
} from "@/lib/newsletter.schema";

export function NewsletterSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    // Sem backend por ora — confirma o cadastro localmente (padrão use-submit-lead).
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Pronto! Você vai receber nossos conteúdos por e-mail.");
    reset();
    void data;
  };

  return (
    <Section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
      {/* Texto */}
      <div className="flex flex-1 flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Receba conteúdos
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Receba conteúdos no seu e-mail
        </h2>
        <p className="max-w-[420px] text-body leading-[1.35] text-neutral-600">
          1 e-mail por mês com guias, cases e tendências. Sem spam. Você cancela
          quando quiser.
        </p>
      </div>

      {/* Formulário */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nl-name" className="text-body-sm font-semibold text-neutral-700">
              Nome *
            </label>
            <input
              id="nl-name"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
              className="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-body text-neutral-800 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error"
            />
            {errors.name && (
              <p className="text-body-sm text-error">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="nl-email" className="text-body-sm font-semibold text-neutral-700">
              E-mail *
            </label>
            <input
              id="nl-email"
              type="email"
              autoComplete="email"
              placeholder="email@empresa.com"
              aria-invalid={!!errors.email}
              {...register("email")}
              className="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-body text-neutral-800 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error"
            />
            {errors.email && (
              <p className="text-body-sm text-error">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="nl-theme" className="text-body-sm font-semibold text-neutral-700">
            Tema de interesse *
          </label>
          <div className="relative">
            <select
              id="nl-theme"
              defaultValue=""
              aria-invalid={!!errors.theme}
              {...register("theme")}
              className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-4 pr-10 text-body text-neutral-800 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error"
            >
              <option value="" disabled>
                Selecione o tema
              </option>
              {newsletterThemes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
            />
          </div>
          {errors.theme && (
            <p className="text-body-sm text-error">{errors.theme.message}</p>
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
          <p className="-mt-3 text-body-sm text-error">{errors.consent.message}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="self-start"
        >
          Quero receber
        </Button>
      </form>
    </Section>
  );
}
