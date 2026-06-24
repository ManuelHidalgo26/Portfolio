import { NextResponse } from "next/server";

// Siempre dinámico: depende de los headers de la request.
export const dynamic = "force-dynamic";

function isPrivateIp(ip: string): boolean {
  return (
    !ip ||
    ip === "::1" ||
    ip === "::ffff:127.0.0.1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  );
}

function countryName(code: string): string {
  try {
    return new Intl.DisplayNames(["es"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export async function GET(request: Request) {
  // 1) Header de Vercel (producción): país ya resuelto, gratis.
  let code = request.headers.get("x-vercel-ip-country") ?? "";

  // 2) Fallback (no-Vercel): geo-IP por la IP real del cliente.
  if (!code) {
    const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
    if (ip && !isPrivateIp(ip)) {
      try {
        const r = await fetch(`https://ipapi.co/${ip}/country/`, { cache: "no-store" });
        if (r.ok) code = (await r.text()).trim();
      } catch {
        // best-effort: si falla, devolvemos "no detectado"
      }
    }
  }

  if (!code || code.length !== 2) {
    return NextResponse.json({ detected: false });
  }

  code = code.toUpperCase();
  return NextResponse.json({
    detected: true,
    countryCode: code,
    countryName: countryName(code),
    isArgentina: code === "AR",
  });
}
