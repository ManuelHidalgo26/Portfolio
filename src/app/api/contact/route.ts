import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "hidalgomanu@hotmail.com";
// Dominio de prueba de Resend (permite enviar sin verificar un dominio propio).
const FROM_EMAIL = "Portfolio <onboarding@resend.dev>";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, website } = await req.json();

    // Honeypot anti-spam: un bot rellena el campo oculto "website".
    if (website) return NextResponse.json({ ok: true });

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "missing-fields" }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "invalid-email" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "not-configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const finalSubject = subject?.trim() || `Contacto desde el portfolio — ${name}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: finalSubject,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: "send-failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
