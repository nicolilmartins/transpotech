import { getRdStationApiKey } from "@/lib/env";
import { LEAD_FORM_CONVERSIONS } from "@/lib/lead-forms";
import type { LeadRequest } from "@/types/lead.types";

// Contrato: https://developers.rdstation.com/reference/conversao (POST
// /platform/conversions com api_key na query).
const RD_CONVERSIONS_URL = "https://api.rd.services/platform/conversions";

/** Cookies do script de monitoramento do RD, se instalado no site. */
export type RdTrackingCookies = {
  clientTrackingId?: string;
  trafficSource?: string;
};

export type RdConversionBody = {
  event_type: "CONVERSION";
  event_family: "CDP";
  payload: Record<string, unknown>;
};

export function buildRdConversion(
  lead: LeadRequest,
  tracking: RdTrackingCookies = {},
): RdConversionBody {
  return {
    event_type: "CONVERSION",
    event_family: "CDP",
    payload: {
      conversion_identifier: LEAD_FORM_CONVERSIONS[lead.form],
      name: lead.name,
      email: lead.email,
      company_name: lead.company,
      mobile_phone: lead.phone,
      // Campos personalizados já criados na conta do RD.
      cf_cidade_uf: lead.cityUf,
      cf_mensagem: lead.message,
      ...(lead.form === "locacao-de-empilhadeiras" && lead.periodMonths
        ? { cf_periodo_de_locacao_meses: lead.periodMonths }
        : {}),
      legal_bases: [
        { category: "communications", type: "consent", status: "granted" },
      ],
      ...(tracking.clientTrackingId
        ? { client_tracking_id: tracking.clientTrackingId }
        : {}),
      ...(tracking.trafficSource
        ? { traffic_source: tracking.trafficSource }
        : {}),
    },
  };
}

export async function sendRdConversion(body: RdConversionBody): Promise<void> {
  const url = `${RD_CONVERSIONS_URL}?api_key=${encodeURIComponent(getRdStationApiKey())}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`RD Station respondeu ${response.status}: ${detail}`);
  }
}
