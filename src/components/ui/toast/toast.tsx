"use client";

import { toast } from "react-toastify";
import {
  CircleAlert,
  CircleCheck,
  Info,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import type { AppToastProps, ToastInput, ToastVariant } from "./toast.types";

// Cada variante usa uma cor do design system: verde (accent/ESG) para sucesso,
// verde-escuro institucional para info e os tokens de feedback para aviso/erro.
const variants: Record<
  ToastVariant,
  { Icon: LucideIcon; iconColor: string; gradient: string }
> = {
  info: {
    Icon: Info,
    iconColor: "text-secondary-500",
    gradient: "from-secondary-500/15",
  },
  success: {
    Icon: CircleCheck,
    iconColor: "text-accent",
    gradient: "from-accent/15",
  },
  warning: {
    Icon: TriangleAlert,
    iconColor: "text-warning",
    gradient: "from-warning/15",
  },
  error: {
    Icon: CircleAlert,
    iconColor: "text-error",
    gradient: "from-error/15",
  },
};

export function AppToast({
  variant,
  title,
  description,
  closeToast,
}: AppToastProps) {
  const { Icon, iconColor, gradient } = variants[variant];

  return (
    <div
      className={`relative flex w-full items-start gap-4 rounded-xl bg-white bg-gradient-to-br ${gradient} via-white to-white p-4 pr-11 shadow-lg`}
    >
      {/* Ícone em caixa branca — mesmo padrão dos cards da seção de automação */}
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${iconColor}`}
      >
        <Icon aria-hidden className="size-5" />
      </span>

      <div className="flex flex-col gap-1 pt-0.5">
        <p className="text-body font-semibold leading-[1.3] text-neutral-800">
          {title}
        </p>
        {description ? (
          <p className="text-body-sm leading-[1.35] text-neutral-600">
            {description}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={closeToast}
        aria-label="Fechar notificação"
        className="absolute right-3 top-3 text-neutral-400 transition-colors hover:text-neutral-600"
      >
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}

function fire(variant: ToastVariant, { title, description }: ToastInput) {
  toast(
    <AppToast variant={variant} title={title} description={description} />
  );
}

/** Dispara toasts no padrão visual do site. Usar no lugar de `toast.*`. */
export const showToast = {
  info: (input: ToastInput) => fire("info", input),
  success: (input: ToastInput) => fire("success", input),
  warning: (input: ToastInput) => fire("warning", input),
  error: (input: ToastInput) => fire("error", input),
};
