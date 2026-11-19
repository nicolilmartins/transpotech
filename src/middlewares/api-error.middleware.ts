import type { AxiosError } from "axios";
import { showToast } from "@/components/ui/toast";

type ApiErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
};

export function handleApiError(error: AxiosError<ApiErrorResponse>) {
  const status = error.response?.status;
  const data = error.response?.data;

  const message =
    data?.message ??
    data?.error ??
    "Tente novamente em alguns instantes, por favor.";

  if (status === 404) {
    showToast.error({
      title: "Não encontramos o que você procura",
      description: "Verifique as informações e tente novamente.",
    });
    return;
  }

  if (status !== undefined && status >= 500) {
    showToast.error({
      title: "Tivemos um imprevisto por aqui",
      description: "Tente novamente em alguns instantes, por favor.",
    });
    return;
  }

  showToast.error({
    title: "Algo não saiu como esperado",
    description: message,
  });
}
