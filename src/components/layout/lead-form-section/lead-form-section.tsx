"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, PencilLine, X } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CityAutocomplete } from "@/components/ui/city-autocomplete";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BlurRevealTitle } from "@/components/ui/blur-reveal-title";
import { HoverMesh } from "@/components/layout/hover-mesh";
import { useSharedTexts } from "@/components/layout/shared-texts";
import {
  contactRequestSchema,
  type ContactRequestValues,
} from "@/lib/contact-request.schema";

const labelBase = "text-body font-semibold text-neutral-700";

// Opções de período de locação (1 a 60 meses) — campo com busca na locação.
function rentalPeriodOptions(singular: string, plural: string) {
  return Array.from({ length: 60 }, (_, i) => {
    const n = i + 1;
    return { value: String(n), label: `${n} ${n === 1 ? singular : plural}` };
  });
}

type LeadFormSectionProps = {
  /** Primeira linha do título (peso normal). */
  titleTop: string;
  /** Segunda linha do título (negrito + laranja). */
  titleBottom: string;
  /** Texto de apoio / CTA para o formulário. */
  description: string;
  /** Placeholder da mensagem — específico por página; sem ele, o dos textos comuns. */
  messagePlaceholder?: string;
  /** Rótulo do botão de envio; sem ele, o dos textos comuns. */
  submitLabel?: string;
  /** id de âncora da seção. */
  id?: string;
  /** Mostra o campo "Período de locação (meses)" (só na locação). */
  withRentalPeriod?: boolean;
};

// Seção de captação (form à esquerda, título/CTA à direita) — mesmo padrão da
// hero de Contato. Se o usuário começa a preencher e rola para longe sem
// enviar, um banner discreto no topo permite voltar e finalizar.
export function LeadFormSection({
  titleTop,
  titleBottom,
  description,
  messagePlaceholder,
  submitLabel,
  id = "solicitar",
  withRentalPeriod = false,
}: LeadFormSectionProps) {
  const uid = useId();
  const { leadForm: texts } = useSharedTexts();
  const [sent, setSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [outOfView, setOutOfView] = useState(false);
  // Só vira true quando o usuário DIGITA/SELECIONA de fato em algum campo
  // (evento de input real do DOM). Não é disparado por SSR nem por mudanças
  // programáticas de valor — o banner depende disso.
  const [engaged, setEngaged] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestValues>({
    resolver: zodResolver(contactRequestSchema),
  });

  // Detecta se a seção saiu da viewport pelo topo. Usa histerese (limiares de
  // mostrar/esconder afastados > altura do banner) porque, ao aparecer, o banner
  // empurra a seção ~53px para baixo — sem a zona morta isso re-cruzaria o limite
  // e o banner ficaria oscilando quando o usuário sobe a página.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const { bottom } = el.getBoundingClientRect();
      setOutOfView((prev) => {
        if (bottom <= 4) return true; // seção saiu por cima → mostrar
        if (bottom >= 96) return false; // voltou o bastante → esconder
        return prev; // zona morta → mantém estado
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(measure); // medição inicial fora do render
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onSubmit = async (data: ContactRequestValues) => {
    // Sem backend — simula o envio (padrão dos demais formulários).
    await new Promise((r) => setTimeout(r, 500));
    reset();
    setSent(true);
    setEngaged(false);
    void data;
  };

  const scrollToForm = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // O usuário começou a preencher NESTA página (engaged), ainda não enviou,
  // rolou a seção para fora e não descartou. engaged só fica true após input
  // real → nunca renderiza no SSR e nunca aparece sem preenchimento.
  const showBanner = engaged && !sent && outOfView && !dismissed;

  // Enquanto o banner aparece, empurra TUDO para baixo pela altura da barra
  // (--app-banner-h). O body consome via padding-top e o header — que é fixed
  // e ignoraria o padding — consome no seu `top`. Assim a barra fica acima de
  // tudo, como uma seção, sem sobrepor hero nem header.
  useEffect(() => {
    if (!showBanner) return;
    const height = bannerRef.current?.offsetHeight ?? 56;
    const root = document.documentElement;
    root.style.setProperty("--app-banner-h", `${height}px`);
    return () => {
      root.style.removeProperty("--app-banner-h");
    };
  }, [showBanner]);

  return (
    // Fundo próprio da faixa (mesmo tom do catálogo de empilhadeiras novas) —
    // o Section tem max-w e centraliza, então a cor precisa vir de um wrapper
    // full-bleed para valer de ponta a ponta em telas largas. `.form-band`
    // (globals.css) desvanece as pontas para o tom do grupo claro em volta,
    // sem linha de corte no encontro com a seção de cima e a de baixo.
    //
    // Malha própria: o fundo desta faixa é opaco e cobriria a HoverMesh do
    // grupo claro em volta (que fica em -z-10 no pai), deixando a faixa como o
    // único trecho sem a interação do cursor. `isolate` é obrigatório — sem o
    // contexto de empilhamento próprio, o -z-10 da malha cai atrás do fundo
    // desta faixa e ela some.
    <div className="form-band relative isolate">
      <HoverMesh className="pointer-events-none absolute inset-0 -z-10" />
      <Section
        as="section"
        ref={sectionRef}
        id={id}
        className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16"
      >
        {/* Título / CTA — esquerda no desktop, primeiro no mobile */}
        <div className="flex flex-col gap-4 lg:pt-2">
          <p className="text-body font-semibold uppercase tracking-wide text-primary-500">
            {texts.eyebrow}
          </p>
          <BlurRevealTitle
            as="h2"
            className="text-balance text-h2 text-neutral-800 lg:text-wrap"
            segments={[
              { text: titleTop, className: "font-normal", br: true },
              { text: titleBottom, className: "font-bold text-primary-500" },
            ]}
          />
          <p className="max-w-[520px] text-body leading-[1.5] text-neutral-600">
            {description}
          </p>
        </div>

        {/* Formulário — esquerda no desktop */}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          // Marca "começou a preencher" no primeiro input real (digitação/seleção
          // humana borbulha até aqui). É o gatilho do banner.
          onInput={() => setEngaged(true)}
          onChange={() => sent && setSent(false)}
          className="flex flex-col gap-5 rounded-2xl border-2 border-neutral-100 bg-white p-6 lg:p-8"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-name`} className={labelBase}>
              {texts.nameLabel}
            </label>
            <Input
              id={`${uid}-name`}
              type="text"
              autoComplete="name"
              placeholder={texts.namePlaceholder}
              invalid={!!errors.name}
              aria-describedby={errors.name ? `${uid}-name-error` : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id={`${uid}-name-error`} className="text-body text-error">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-company`} className={labelBase}>
              {texts.companyLabel}
            </label>
            <Input
              id={`${uid}-company`}
              type="text"
              autoComplete="organization"
              placeholder={texts.companyPlaceholder}
              invalid={!!errors.company}
              aria-describedby={errors.company ? `${uid}-company-error` : undefined}
              {...register("company")}
            />
            {errors.company && (
              <p id={`${uid}-company-error`} className="text-body text-error">{errors.company.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${uid}-phone`} className={labelBase}>
                {texts.phoneLabel}
              </label>
              <Input
                id={`${uid}-phone`}
                type="tel"
                autoComplete="tel"
                placeholder={texts.phonePlaceholder}
                invalid={!!errors.phone}
                aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                {...register("phone")}
              />
              {errors.phone && (
                <p id={`${uid}-phone-error`} className="text-body text-error">{errors.phone.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${uid}-email`} className={labelBase}>
                {texts.emailLabel}
              </label>
              <Input
                id={`${uid}-email`}
                type="email"
                autoComplete="email"
                placeholder={texts.emailPlaceholder}
                invalid={!!errors.email}
                aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p id={`${uid}-email-error`} className="text-body text-error">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-city`} className={labelBase}>
              {texts.cityLabel}
            </label>
            <Controller
              control={control}
              name="cityUf"
              render={({ field }) => (
                <CityAutocomplete
                  id={`${uid}-city`}
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  invalid={!!errors.cityUf}
                />
              )}
            />
            {errors.cityUf && (
              // CityAutocomplete não repassa aria-describedby ao input; role="alert"
              // é o que faz o erro ser anunciado.
              <p role="alert" className="text-body text-error">
                {errors.cityUf.message}
              </p>
            )}
          </div>

          {withRentalPeriod && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${uid}-period`} className={labelBase}>
                {texts.rentalPeriodLabel}
              </label>
              <Controller
                control={control}
                name="periodMonths"
                render={({ field }) => (
                  <Select
                    id={`${uid}-period`}
                    options={rentalPeriodOptions(
                      texts.monthSingular,
                      texts.monthPlural,
                    )}
                    value={field.value ?? ""}
                    onChange={(v) => {
                      field.onChange(v);
                      setEngaged(true);
                    }}
                    onBlur={field.onBlur}
                    placeholder={texts.rentalPeriodPlaceholder}
                    searchable
                    searchPlaceholder={texts.rentalPeriodSearchPlaceholder}
                  />
                )}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-message`} className={labelBase}>
              {texts.messageLabel}
            </label>
            <Textarea
              id={`${uid}-message`}
              rows={3}
              placeholder={messagePlaceholder ?? texts.messagePlaceholder}
              invalid={!!errors.message}
              aria-describedby={errors.message ? `${uid}-message-error` : undefined}
              {...register("message")}
            />
            {errors.message && (
              <p id={`${uid}-message-error`} className="text-body text-error">{errors.message.message}</p>
            )}
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              invalid={!!errors.consent}
              aria-describedby={
                errors.consent ? `${uid}-consent-error` : undefined
              }
              {...register("consent")}
              className="mt-1"
            />
            <span className="text-body leading-[1.35] text-neutral-600">
              {texts.consent}
            </span>
          </label>
          {errors.consent && (
            <p id={`${uid}-consent-error`} className="-mt-3 text-body text-error">
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
              {submitLabel ?? texts.submitLabel}
            </Button>
            {sent && (
              <p
                role="status"
                className="inline-flex items-start gap-2 text-body font-semibold text-success"
              >
                <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0" />
                {texts.successMessage}
              </p>
            )}
          </div>
        </form>

        {/* Banner full-width no topo — retomar a solicitação iniciada. Fundo
          branco, texto preto, ação sublinhada. Empurra o conteúdo para baixo
          (não sobrepõe hero nem header). */}
        {showBanner &&
          createPortal(
            <div
              ref={bannerRef}
              role="region"
              aria-label="Solicitação iniciada"
              className="lead-banner-in fixed inset-x-0 top-0 z-[300] border-b border-neutral-200 bg-white"
            >
              <div className="relative mx-auto flex min-h-[52px] w-full max-w-[1440px] items-center justify-center gap-2 px-12 py-2.5 text-center">
                <PencilLine
                  aria-hidden
                  className="size-5 shrink-0 text-primary-500"
                />
                <p className="text-body text-neutral-900">
                  {texts.resumeText}{" "}
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="font-semibold text-primary-500 underline underline-offset-2 transition-colors hover:text-primary-600"
                  >
                    {texts.resumeAction}
                  </button>
                </p>
                <button
                  type="button"
                  onClick={() => setDismissed(true)}
                  aria-label="Fechar aviso"
                  className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
            </div>,
            document.body,
          )}
      </Section>
    </div>
  );
}
