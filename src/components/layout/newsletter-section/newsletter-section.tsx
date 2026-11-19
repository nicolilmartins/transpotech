"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSharedTexts } from "@/components/layout/shared-texts";
import type { NewsletterFormValues } from "@/lib/newsletter.schema";

// zod + schema (~100KB) só baixam no foco do campo ou no envio: a seção fica
// abaixo da dobra e o HTML dela não depende da validação.
const loadValidation = () =>
  Promise.all([
    import("@hookform/resolvers/zod"),
    import("@/lib/newsletter.schema"),
  ]);

const newsletterResolver: Resolver<NewsletterFormValues> = async (
  values,
  context,
  options
) => {
  const [{ zodResolver }, { newsletterSchema }] = await loadValidation();
  return zodResolver(newsletterSchema)(values, context, options);
};

export function NewsletterSection({ showGlow = true }: { showGlow?: boolean }) {
  const [sent, setSent] = useState(false);
  const { newsletter: texts } = useSharedTexts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({ resolver: newsletterResolver });

  const onSubmit = async (data: NewsletterFormValues) => {
    // Sem backend por ora — confirma o cadastro localmente (padrão use-submit-lead).
    await new Promise((r) => setTimeout(r, 400));
    reset();
    setSent(true);
    void data;
  };

  return (
    <Section>
      {/* Card horizontal — ocupa toda a largura dentro do padding da seção */}
      <div className="relative isolate flex w-full flex-col gap-10 overflow-hidden rounded-2xl bg-neutral-900 p-8 ring-1 ring-white/10 lg:flex-row lg:items-center lg:gap-16 lg:p-12">
        {/* Blur de fundo — laranja à direita, verde à esquerda (dentro do card,
            recortado pelo overflow-hidden). */}
        {showGlow && (
          <>
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[420px] -rotate-45 rounded-full bg-primary-500/25 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 -z-10 size-[420px] -rotate-45 rounded-full bg-secondary-500/35 blur-[110px]" />
          </>
        )}

        {/* Texto */}
        <div className="flex flex-1 flex-col gap-4">
        <h2 className="text-h3 text-neutral-50">
          <span className="font-normal">{texts.titleTop}</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">{texts.titleAccent}</span>
        </h2>
        <p className="max-w-[440px] text-body leading-[1.35] text-neutral-400">
          {texts.description}
        </p>
      </div>

      {/* Formulário — apenas e-mail + botão */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => sent && setSent(false)}
        onFocus={() => void loadValidation()}
        className="relative flex flex-1 flex-col gap-3 lg:justify-center"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="nl-email" className="sr-only">
              E-mail
            </label>
            <Input
              tone="dark"
              id="nl-email"
              type="email"
              autoComplete="email"
              placeholder={texts.emailPlaceholder}
              invalid={!!errors.email}
              aria-describedby={errors.email ? "nl-email-error" : undefined}
              {...register("email")}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="shrink-0 justify-center"
          >
            {texts.buttonLabel}
          </Button>
        </div>
          {errors.email && (
            <p id="nl-email-error" role="alert" className="text-body text-error">
              {errors.email.message}
            </p>
          )}
          {sent && !errors.email && (
            <p
              role="status"
              className="inline-flex items-start gap-2 text-body font-semibold text-accent"
            >
              <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0" />
              {texts.successMessage}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
