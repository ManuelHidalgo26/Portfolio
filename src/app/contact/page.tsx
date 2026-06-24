import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — Manuel Hidalgo",
  description: "Hablemos sobre tu proyecto. Estoy disponible para freelance y posiciones full-time.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-sm font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            Contacto
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text)" }}
          >
            Hablemos
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            ¿Tenés un proyecto, una idea o simplemente querés charlar?
            Escribime y te respondo a la brevedad.
          </p>
        </div>

        {/* Info */}
        <div
          className="flex flex-wrap gap-6 mb-12 p-6 rounded-2xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}
        >
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
              Disponibilidad
            </p>
            <p className="text-sm font-medium flex items-center gap-2" style={{ color: "var(--text)" }}>
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
              Disponible para proyectos
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
              Respuesta
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
              {"< 24 horas"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
              Modalidad
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
              Freelance · Full-time
            </p>
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </main>
  );
}
