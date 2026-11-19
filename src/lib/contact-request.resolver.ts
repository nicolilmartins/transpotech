import type { Resolver } from "react-hook-form";
import type { ContactRequestValues } from "./contact-request.schema";

// zod + schema (~100KB) só baixam quando o visitante interage com o formulário
// (foco em um campo) ou envia — o HTML do formulário não depende da validação.
// O import é memoizado pelo bundler: o foco já deixa tudo pronto para o envio.
export const loadContactValidation = () =>
  Promise.all([
    import("@hookform/resolvers/zod"),
    import("./contact-request.schema"),
  ]);

export const contactResolver: Resolver<ContactRequestValues> = async (
  values,
  context,
  options
) => {
  const [{ zodResolver }, { contactRequestSchema }] = await loadContactValidation();
  return zodResolver(contactRequestSchema)(values, context, options);
};
