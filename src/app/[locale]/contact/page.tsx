import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: alternatesFor("/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-sm font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text)" }}
          >
            {t("title")}
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Info */}
        <div
          className="flex flex-wrap gap-6 mb-12 p-6 rounded-2xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}
        >
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
              {t("availLabel")}
            </p>
            <p className="text-sm font-medium flex items-center gap-2" style={{ color: "var(--text)" }}>
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
              {t("availValue")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
              {t("responseLabel")}
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
              {t("responseValue")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
              {t("modeLabel")}
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
              {t("modeValue")}
            </p>
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </main>
  );
}
