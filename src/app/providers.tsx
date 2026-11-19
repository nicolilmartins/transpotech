"use client";

import dynamic from "next/dynamic";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

// Toast só aparece depois de um envio de formulário: o container sai do bundle
// inicial e carrega após a hidratação. `toast()` chamado antes de ele montar
// fica na fila da lib e é exibido na montagem. Sem import do
// ReactToastify.css: o container da v11 injeta o mesmo CSS sozinho, e o import
// duplicava esse CSS no bundle que bloqueia a renderização.
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        icon={false}
        closeButton={false}
        // Zera o card padrão da lib — o visual fica todo no AppToast.
        style={
          {
            "--toastify-toast-width": "400px",
            "--toastify-toast-bd-radius": "var(--radius-xl)",
            "--toastify-toast-padding": "0px",
            "--toastify-toast-min-height": "0px",
            "--toastify-toast-shadow": "none",
            "--toastify-color-light": "transparent",
          } as React.CSSProperties
        }
      />
    </QueryClientProvider>
  );
}
