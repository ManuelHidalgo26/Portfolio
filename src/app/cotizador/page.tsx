import type { Metadata } from "next";
import Quoter from "@/components/Quoter";

export const metadata: Metadata = {
  title: "Cotizador de páginas web — Manuel Hidalgo",
  description:
    "Armá tu sitio web y mirá el precio en tiempo real. Elegí el tipo de sitio, sumá los agregados que necesites y pedí tu presupuesto por WhatsApp.",
};

export default function CotizadorPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
            Cotizador
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Armá tu web y mirá el precio
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Elegí el tipo de sitio, sumá los agregados que necesites y el total
            se actualiza solo. Cuando estés listo, pedime el presupuesto en un clic.
          </p>
        </div>

        <Quoter />
      </div>
    </main>
  );
}
