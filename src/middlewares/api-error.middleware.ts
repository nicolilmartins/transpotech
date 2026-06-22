import type { AxiosError } from "axios";
import { toast } from "react-toastify";

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
    "Não foi possível concluir a operação. Tente novamente.";

  if (status === 404) {
    toast.error("Recurso não encontrado.");
    return;
  }

  if (status !== undefined && status >= 500) {
    toast.error("Erro interno no servidor. Tente novamente mais tarde.");
    return;
  }

  toast.error(message);
}
