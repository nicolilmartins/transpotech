"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/lib/newsletter.schema";

export function NewsletterSection({ showGlow = true }: { showGlow?: boolean }) {
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
    <Section>
      {/* Card horizontal — ocupa toda a largura dentro do padding da seção */}
      <div className="relative isolate flex w-full flex-col gap-10 overflow-hidden rounded-2xl bg-[#181616] p-8 ring-1 ring-white/10 lg:flex-row lg:items-center lg:gap-16 lg:p-12">
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
          <span className="font-normal">Inteligência logística</span>
          <br />
          <span className="font-bold text-primary-500">direto no seu e-mail</span>
        </h2>
        <p className="max-w-[440px] text-body leading-[1.35] text-neutral-400">
          Guias práticos, cases reais e tendências de intralogística para apoiar
          as decisões da sua operação.
        </p>
      </div>

      {/* Formulário — apenas e-mail + botão */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-1 flex-col gap-3 lg:justify-center"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="nl-email" className="sr-only">
              E-mail
            </label>
            <input
              id="nl-email"
              type="email"
              autoComplete="email"
              placeholder="email@empresa.com"
              aria-invalid={!!errors.email}
              {...register("email")}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-body text-neutral-50 placeholder:text-neutral-500 focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="shrink-0 justify-center"
          >
            Quero receber
          </Button>
        </div>
          {errors.email && (
            <p className="text-body-sm text-error">{errors.email.message}</p>
          )}
        </form>
      </div>
    </Section>
  );
}
