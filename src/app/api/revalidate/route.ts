import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { documentTypes } from "@/sanity/document-types";

type WebhookPayload = { _type?: string };

// Só as tags usadas por sanityFetch: impede revalidar tags internas do Next.
const REVALIDATABLE_TYPES = new Set<string>(documentTypes);

// Chamado pelo webhook do Sanity a cada publicação. Projeção do webhook no
// Sanity: {_type}. A assinatura HMAC usa SANITY_REVALIDATE_SECRET; sem ela
// qualquer um poderia forçar a regeração das páginas.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Webhook não configurado" }, { status: 500 });
  }

  try {
    // true = espera o Content Lake refletir a publicação antes de responder,
    // para a regeração não ler a versão anterior.
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Assinatura inválida" }, { status: 401 });
    }
    if (!body?._type || !REVALIDATABLE_TYPES.has(body._type)) {
      return NextResponse.json({ message: "Payload sem _type válido" }, { status: 400 });
    }

    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: body._type });
  } catch {
    return NextResponse.json({ message: "Payload inválido" }, { status: 400 });
  }
}
