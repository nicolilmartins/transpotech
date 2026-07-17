export type ToastVariant = "info" | "success" | "warning" | "error";

export type ToastInput = {
  title: string;
  description?: string;
};

export type AppToastProps = {
  variant: ToastVariant;
  title: string;
  description?: string;
  /** Injetado pelo react-toastify ao renderizar o toast. */
  closeToast?: () => void;
};
