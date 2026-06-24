"use client";

import { useEffect, useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  // Pre-carga el asunto y el mensaje cuando se llega desde el cotizador.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const asunto = params.get("asunto");
    const mensaje = params.get("mensaje");
    if (asunto || mensaje) {
      setForm((prev) => ({
        ...prev,
        subject: asunto ?? prev.subject,
        message: mensaje ?? prev.message,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Mailto fallback — replace with Resend/EmailJS when ready
    try {
      const mailto = `mailto:hidalgomanu@hotmail.com?subject=${encodeURIComponent(
        form.subject || `Contacto desde portfolio — ${form.name}`
      )}&body=${encodeURIComponent(
        `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )}`;
      window.location.href = mailto;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg-card)",
    border: "1px solid var(--bg-border)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "var(--text)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
    marginBottom: "8px",
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-4 py-16 text-center rounded-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}
      >
        <CheckCircle size={40} style={{ color: "#22c55e" }} />
        <h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
          ¡Mensaje enviado!
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Te respondo a la brevedad. Gracias por escribirme.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
          className="mt-2 text-sm underline"
          style={{ color: "var(--accent)" }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--bg-border)")}
          />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--bg-border)")}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Asunto</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="¿De qué se trata?"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--bg-border)")}
        />
      </div>

      <div>
        <label style={labelStyle}>Mensaje</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Contame sobre tu proyecto o idea..."
          style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--bg-border)")}
        />
      </div>

      {status === "error" && (
        <div
          className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl"
          style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <AlertCircle size={16} />
          Algo salió mal. Intentá de nuevo o escribime directamente.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "var(--accent-dim)", color: "#fff" }}
      >
        {status === "loading" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={16} />
            Enviar mensaje
          </>
        )}
      </button>

      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        También podés escribirme directamente a{" "}
        <a
          href="mailto:hidalgomanu@hotmail.com"
          style={{ color: "var(--accent)" }}
          className="hover:underline"
        >
          hidalgomanu@hotmail.com
        </a>
      </p>
    </form>
  );
}
