import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Quoter from "@/components/Quoter";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("cotizadorTitle"),
    description: t("cotizadorDescription"),
    alternates: alternatesFor("/cotizador"),
  };
}

export default async function CotizadorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cotizadorPage" });

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            {t("title")}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {t("subtitle")}
          </p>
        </div>

        <Quoter />
      </div>
    </main>
  );
}
