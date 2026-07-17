"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "@/lib/query-client";

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
