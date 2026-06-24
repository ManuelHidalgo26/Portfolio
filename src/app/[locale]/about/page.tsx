import type { Metadata } from "next";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: alternatesFor("/about"),
  };
}

type TimelineItem = { year: string; title: string; description: string };
type Certificate = { title: string; institution: string; year: string };

const certStyles = [
  { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)", color: "#818cf8" },
  { bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.3)", color: "#38bdf8" },
  { bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.3)", color: "#eab308" },
  { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", color: "#22c55e" },
];

const statNumbers = ["4", "1", "3+", "4"];

const stackItems = [
  ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "SASS"],
  ["Node.js", "Express", "Prisma", "PostgreSQL", "MongoDB", "Socket.io", "Redis", "REST API"],
  [".NET 9", "C#", "Avalonia", "EF Core", "SQLite"],
  ["Git", "GitHub", "Vite", "Vercel", "Railway"],
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const bold = { b: (chunks: React.ReactNode) => <span style={{ color: "var(--text)" }}>{chunks}</span> };
  const timeline = t.raw("timeline") as TimelineItem[];
  const certificates = t.raw("certificates") as Certificate[];
  const statLabels = t.raw("stats") as string[];
  const stackCategories = [t("stackFrontend"), t("stackBackend"), t("stackDesktop"), t("stackTools")];

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="mb-20">
          <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight" style={{ color: "var(--text)" }}>
            {t("titleLine1")}
            <br />
            <span style={{ color: "var(--accent)" }}>{t("titleLine2")}</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {t.rich("p1", bold)}
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {t.rich("p2", bold)}
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {t("p3")}
              </p>
              <div className="flex items-center gap-5 pt-2">
                <a href="https://github.com/ManuelHidalgo26" target="_blank" rel="noopener noreferrer"
                  className="link-muted inline-flex items-center gap-2 text-sm font-medium">
                  <Github size={16} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/manuel-hidalgo-casta%C3%B1os-29116b299/" target="_blank" rel="noopener noreferrer"
                  className="link-muted inline-flex items-center gap-2 text-sm font-medium">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="mailto:hidalgomanu@hotmail.com"
                  className="link-muted inline-flex items-center gap-2 text-sm font-medium">
                  <Mail size={16} /> Email
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {statNumbers.map((number, i) => (
                <div key={i} className="p-5 rounded-2xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}>
                  <p className="text-3xl font-bold mb-1 font-mono" style={{ color: "var(--accent)" }}>{number}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{statLabels[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20" style={{ borderTop: "1px solid var(--bg-border)", paddingTop: "5rem" }}>
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>{t("timelineEyebrow")}</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>
            {t("timelineTitle")}
          </h2>
          <div className="flex flex-col gap-6">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0"
                  style={{ background: "var(--bg-card)", border: "2px solid var(--accent-dim)", color: "var(--accent)" }}>
                  {item.year.slice(2)}
                </div>
                <div className="flex-1 p-5 rounded-2xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>{item.year}</span>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="mb-20" style={{ borderTop: "1px solid var(--bg-border)", paddingTop: "5rem" }}>
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>{t("certsEyebrow")}</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>{t("certsTitle")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert, i) => {
              const style = certStyles[i] ?? certStyles[0];
              return (
                <div key={cert.title} className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: style.bg, border: `1px solid ${style.border}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: "rgba(255,255,255,0.05)" }}>
                    🎓
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text)" }}>{cert.title}</p>
                    <p className="text-xs" style={{ color: style.color }}>{cert.institution} · {cert.year}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stack */}
        <div className="mb-20" style={{ borderTop: "1px solid var(--bg-border)", paddingTop: "5rem" }}>
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>{t("stackEyebrow")}</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>{t("stackTitle")}</h2>
          <div className="flex flex-col gap-8">
            {stackCategories.map((category, i) => (
              <div key={category}>
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stackItems[i].map((item) => (
                    <span key={item} className="text-sm px-3 py-1.5 rounded-lg font-mono"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)", color: "var(--text)" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-10 text-center"
          style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            {t("ctaTitle")}
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            {t("ctaSubtitle")}
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-dim)", color: "#fff" }}>
            {t("ctaButton")}
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </main>
  );
}
