"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Minus,
  Plus,
  MessageCircle,
  Send,
  Globe,
  MapPin,
} from "lucide-react";
import {
  addOns,
  baseTypes,
  config,
  formatMoney,
  maintenancePlans,
  priceValue,
  type AddOn,
  type Currency,
  type Region,
} from "@/lib/pricing";

export default function Quoter() {
  const [region, setRegion] = useState<Region>("local");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [baseId, setBaseId] = useState<string>("landing");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [maintenanceId, setMaintenanceId] = useState<string>("none");
  const [geo, setGeo] = useState<{ countryName: string; isArgentina: boolean } | null>(null);

  // Detección de país por IP (auto-selecciona la región al cargar).
  useEffect(() => {
    let cancelled = false;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d.detected) return;
        setGeo({ countryName: d.countryName, isArgentina: d.isArgentina });
        setRegion(d.isArgentina ? "local" : "exterior");
        if (!d.isArgentina) setCurrency("USD");
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Exterior siempre en USD
  const changeRegion = (r: Region) => {
    setRegion(r);
    if (r === "exterior") setCurrency("USD");
  };

  const detectedRegion: Region | null = geo ? (geo.isArgentina ? "local" : "exterior") : null;
  const mismatch = detectedRegion !== null && detectedRegion !== region;

  const toggleAddon = (a: AddOn) =>
    setSelected((prev) => {
      const next = { ...prev };
      if (next[a.id]) delete next[a.id];
      else next[a.id] = 1;
      return next;
    });

  const setQty = (id: string, q: number) =>
    setSelected((prev) => ({ ...prev, [id]: Math.max(1, Math.min(50, q)) }));

  const base = baseTypes.find((b) => b.id === baseId)!;
  const maintenance = maintenancePlans.find((m) => m.id === maintenanceId)!;
  const chosenAddOns = addOns.filter((a) => selected[a.id]);

  const { oneTime, monthly } = useMemo(() => {
    const basePrice = priceValue(base.price, region, currency);
    const addOnsPrice = chosenAddOns.reduce(
      (sum, a) => sum + priceValue(a.price, region, currency) * selected[a.id],
      0
    );
    return {
      oneTime: basePrice + addOnsPrice,
      monthly: priceValue(maintenance.price, region, currency),
    };
  }, [base, chosenAddOns, selected, maintenance, region, currency]);

  const summaryText = useMemo(() => {
    const lines: string[] = [];
    lines.push("¡Hola Manuel! Armé un presupuesto en tu cotizador:");
    lines.push("");
    lines.push(`• Tipo de sitio: ${base.label} — ${formatMoney(priceValue(base.price, region, currency), currency)}`);
    if (chosenAddOns.length) {
      lines.push("• Agregados:");
      chosenAddOns.forEach((a) => {
        const qty = selected[a.id];
        const unit = priceValue(a.price, region, currency);
        const label = a.quantifiable && qty > 1 ? `${a.label} (×${qty})` : a.label;
        lines.push(`   - ${label} — ${formatMoney(unit * qty, currency)}`);
      });
    }
    if (maintenanceId !== "none") {
      lines.push(`• Mantenimiento: ${maintenance.label} — ${formatMoney(monthly, currency)}/mes`);
    }
    lines.push("");
    lines.push(`TOTAL (pago único): ${formatMoney(oneTime, currency)}`);
    if (monthly > 0) lines.push(`+ ${formatMoney(monthly, currency)}/mes de mantenimiento`);
    lines.push("");
    lines.push(`Región elegida: ${region === "local" ? "Argentina" : "Exterior"}`);
    if (geo) {
      lines.push(`📍 País detectado (IP): ${geo.countryName}`);
      if (mismatch) lines.push("⚠️ La región elegida NO coincide con el país detectado");
    }
    return lines.join("\n");
  }, [base, chosenAddOns, selected, maintenance, maintenanceId, monthly, oneTime, region, currency, geo, mismatch]);

  const whatsappHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(summaryText)}`;
  const formHref = `/contact?asunto=${encodeURIComponent("Presupuesto desde el cotizador")}&mensaje=${encodeURIComponent(summaryText)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ── Opciones ── */}
      <div className="lg:col-span-2 flex flex-col gap-10">
        {/* Toggles */}
        <div>
          <div className="flex flex-wrap gap-6">
            <Toggle
              label="¿De dónde sos?"
              options={[
                { id: "local", label: "Argentina", icon: <MapPin size={14} /> },
                { id: "exterior", label: "Exterior", icon: <Globe size={14} /> },
              ]}
              value={region}
              onChange={(v) => changeRegion(v as Region)}
            />
            <Toggle
              label="Moneda"
              options={[
                { id: "USD", label: "USD" },
                { id: "ARS", label: "ARS", disabled: region === "exterior" },
              ]}
              value={currency}
              onChange={(v) => setCurrency(v as Currency)}
            />
          </div>
          {geo && (
            <p className="mt-3 text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
              <MapPin size={12} style={{ color: "var(--accent)" }} />
              Detectamos que estás en{" "}
              <span style={{ color: "var(--text)" }}>{geo.countryName}</span>
              {mismatch && " — verificá la región seleccionada"}
            </p>
          )}
        </div>

        {/* 1. Base */}
        <Step n={1} title="Elegí el tipo de sitio">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {baseTypes.map((b) => {
              const active = b.id === baseId;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBaseId(b.id)}
                  className="text-left p-4 rounded-2xl transition-all"
                  style={{
                    background: active ? "rgba(99,102,241,0.08)" : "var(--bg-card)",
                    border: `1px solid ${active ? "var(--accent)" : "var(--bg-border)"}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {b.label}
                    </span>
                    <span className="text-sm font-mono shrink-0" style={{ color: "var(--accent)" }}>
                      {formatMoney(priceValue(b.price, region, currency), currency)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {b.description}
                  </p>
                </button>
              );
            })}
          </div>
        </Step>

        {/* 2. Add-ons */}
        <Step n={2} title="Agregá lo que necesites">
          <div className="flex flex-col gap-2">
            {addOns.map((a) => {
              const active = !!selected[a.id];
              const qty = selected[a.id] ?? 1;
              return (
                <div
                  key={a.id}
                  className="rounded-2xl transition-all"
                  style={{
                    background: active ? "rgba(99,102,241,0.06)" : "var(--bg-card)",
                    border: `1px solid ${active ? "rgba(99,102,241,0.4)" : "var(--bg-border)"}`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleAddon(a)}
                    className="w-full text-left flex items-start gap-3 p-4"
                  >
                    <span
                      className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        background: active ? "var(--accent-dim)" : "transparent",
                        border: `1px solid ${active ? "var(--accent-dim)" : "var(--bg-border)"}`,
                        color: "#fff",
                      }}
                    >
                      {active && <Check size={13} />}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                          {a.label}
                        </span>
                        <span className="text-sm font-mono shrink-0" style={{ color: active ? "var(--accent)" : "var(--text-muted)" }}>
                          {a.quantifiable ? "+ " : ""}
                          {formatMoney(priceValue(a.price, region, currency), currency)}
                          {a.quantifiable ? " c/u" : ""}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>
                        {a.description}
                      </p>
                    </div>
                  </button>

                  {/* Stepper para items cuantificables */}
                  {active && a.quantifiable && (
                    <div className="flex items-center gap-3 px-4 pb-4 pl-12">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Cantidad
                      </span>
                      <div className="flex items-center gap-2">
                        <Stepper onClick={() => setQty(a.id, qty - 1)}><Minus size={14} /></Stepper>
                        <span className="text-sm font-mono w-6 text-center" style={{ color: "var(--text)" }}>
                          {qty}
                        </span>
                        <Stepper onClick={() => setQty(a.id, qty + 1)}><Plus size={14} /></Stepper>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Step>

        {/* 3. Maintenance */}
        <Step n={3} title="Mantenimiento mensual (opcional)">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {maintenancePlans.map((m) => {
              const active = m.id === maintenanceId;
              const price = priceValue(m.price, region, currency);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaintenanceId(m.id)}
                  className="text-left p-4 rounded-2xl transition-all"
                  style={{
                    background: active ? "rgba(99,102,241,0.08)" : "var(--bg-card)",
                    border: `1px solid ${active ? "var(--accent)" : "var(--bg-border)"}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {m.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>
                    {m.description}
                  </p>
                  <span className="text-sm font-mono" style={{ color: "var(--accent)" }}>
                    {price > 0 ? `${formatMoney(price, currency)}/mes` : "Gratis"}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>
      </div>

      {/* ── Resumen sticky ── */}
      <div className="lg:col-span-1">
        <div
          className="lg:sticky lg:top-24 rounded-2xl p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
            Tu presupuesto
          </h3>

          <div className="flex flex-col gap-3 mb-5">
            <SummaryLine
              label={base.label}
              value={formatMoney(priceValue(base.price, region, currency), currency)}
            />
            {chosenAddOns.map((a) => {
              const qty = selected[a.id];
              return (
                <SummaryLine
                  key={a.id}
                  label={a.quantifiable && qty > 1 ? `${a.label} ×${qty}` : a.label}
                  value={formatMoney(priceValue(a.price, region, currency) * qty, currency)}
                  muted
                />
              );
            })}
          </div>

          <div className="pt-5" style={{ borderTop: "1px solid var(--bg-border)" }}>
            <div className="flex items-end justify-between gap-2">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Desde
              </span>
              <span className="text-2xl font-bold font-mono" style={{ color: "var(--text)" }}>
                {formatMoney(oneTime, currency)}
              </span>
            </div>
            {monthly > 0 && (
              <div className="flex items-center justify-between gap-2 mt-2">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  + Mantenimiento
                </span>
                <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                  {formatMoney(monthly, currency)}/mes
                </span>
              </div>
            )}
          </div>

          <p className="text-[11px] leading-relaxed mt-4 mb-5" style={{ color: "var(--text-muted)" }}>
            Precio estimado. El valor final puede variar según el alcance real del proyecto.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-transform hover:scale-[1.02]"
              style={{ background: "#22c55e", color: "#062b14" }}
            >
              <MessageCircle size={16} />
              Pedir por WhatsApp
            </a>
            <a
              href={formHref}
              className="inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-colors"
              style={{ background: "transparent", border: "1px solid var(--bg-border)", color: "var(--text)" }}
            >
              <Send size={15} />
              Enviar por el formulario
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Subcomponentes ───────────────────────────────────────────

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0"
          style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent)" }}
        >
          {n}
        </span>
        <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Toggle({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string; icon?: React.ReactNode; disabled?: boolean }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      <div
        className="inline-flex p-1 rounded-xl gap-1"
        style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}
      >
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              disabled={o.disabled}
              onClick={() => onChange(o.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: active ? "var(--accent-dim)" : "transparent",
                color: active ? "#fff" : "var(--text-muted)",
              }}
            >
              {o.icon}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Stepper({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
      style={{ background: "var(--bg)", border: "1px solid var(--bg-border)", color: "var(--text)" }}
    >
      {children}
    </button>
  );
}

function SummaryLine({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span style={{ color: muted ? "var(--text-muted)" : "var(--text)" }}>{label}</span>
      <span className="font-mono shrink-0" style={{ color: muted ? "var(--text-muted)" : "var(--text)" }}>
        {value}
      </span>
    </div>
  );
}
