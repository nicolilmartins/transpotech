import { type NextRequest, NextResponse } from "next/server";
import { getRdStationApiKey } from "@/lib/env";
import { leadRequestSchema } from "@/lib/contact-request.schema";
import {
  buildRdConversion,
  sendRdConversion,
} from "@/services/rd-station.service";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Limite por IP em memória: vale por instância do servidor (na Vercel, cada
// instância tem o seu). Segura rajada de um mesmo robô, não ataque distribuído.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] >= RATE_WINDOW_MS) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Muitas tentativas" }, { status: 429 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Payload grande demais" }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ message: "Payload inválido" }, { status: 400 });
  }

  const parsed = leadRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
  }

  // Honeypot preenchido: responde sucesso para o robô não tentar de novo.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const conversion = buildRdConversion(parsed.data, {
    clientTrackingId: req.cookies.get("_rdtrk")?.value,
    trafficSource: req.cookies.get("__trf.src")?.value,
  });

  if (!getRdStationApiKey()) {
    // Sem chave em dev: devolve o payload montado para conferir na aba Network.
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ dryRun: true, conversion });
    }
    console.error("[leads] RD_STATION_API_KEY ausente");
    return NextResponse.json({ message: "Envio não configurado" }, { status: 500 });
  }

  try {
    await sendRdConversion(conversion);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[leads] falha no envio ao RD Station", error);
    return NextResponse.json({ message: "Falha ao registrar o lead" }, { status: 502 });
  }
}
