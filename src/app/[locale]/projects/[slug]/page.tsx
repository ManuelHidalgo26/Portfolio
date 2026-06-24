import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Github } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projects, getProject, typeMeta, type Locale } from "@/lib/projects";
import { alternatesFor } from "@/i18n/metadata";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const project = getProject(slug, locale as Locale);
  if (!project) return { title: t("notFound") };
  const suffix = t("caseStudySuffix");
  return {
    title: `${project.title} — ${suffix} | Manuel Hidalgo`,
    description: project.description,
    alternates: alternatesFor(`/projects/${slug}`),
    openGraph: {
      title: `${project.title} — ${suffix}`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "caseStudy" });
  const project = getProject(slug, locale as Locale);
  if (!project) notFound();

  const meta = typeMeta[project.type];
  const cs = project.caseStudy;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/projects"
          className="link-muted inline-flex items-center gap-2 text-sm font-medium mb-10"
        >
          <ArrowLeft size={16} />
          {t("back")}
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="inline-block text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: meta.bg, color: meta.color }}
          >
            {project.typeLabel}
          </span>
          {cs?.year && (
            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              {cs.year}
            </span>
          )}
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-5"
          style={{ color: "var(--text)" }}
        >
          {project.title}
        </h1>

        <p
          className="text-lg leading-relaxed mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          {project.description}
        </p>

        {/* Links */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
                style={{ background: "var(--accent-dim)", color: "#fff" }}
              >
                {t("liveDemo")}
                <ExternalLink size={15} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                style={{
                  background: "transparent",
                  border: "1px solid var(--bg-border)",
                  color: "var(--text)",
                }}
              >
                <Github size={15} />
                {t("viewCode")}
              </a>
            )}
          </div>
        )}

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-12">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg font-mono"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "var(--text-muted)",
                border: "1px solid var(--bg-border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {cs ? (
          <div className="flex flex-col gap-12">
            {/* Contexto */}
            <Section label={t("problem")}>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {cs.context}
              </p>
            </Section>

            {/* Rol */}
            <Section label={t("myRole")}>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {cs.role}
              </p>
            </Section>

            {/* Highlights */}
            <Section label={t("whatIBuilt")}>
              <ul className="flex flex-col gap-3">
                {cs.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent)" }}
                    >
                      <Check size={13} />
                    </span>
                    <span className="text-base leading-relaxed" style={{ color: "var(--text)" }}>
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Decisiones técnicas */}
            <Section label={t("techDecisions")}>
              <div className="flex flex-col gap-4">
                {cs.decisions.map((d) => (
                  <div
                    key={d.title}
                    className="p-5 rounded-2xl"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}
                  >
                    <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {d.detail}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        ) : (
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {project.longDescription}
          </p>
        )}

        {/* CTA */}
        <div
          className="mt-16 rounded-2xl p-8 text-center"
          style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}
        >
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3" style={{ color: "var(--text)" }}>
            {t("ctaTitle")}
          </h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            {t("ctaSubtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-dim)", color: "#fff" }}
          >
            {t("ctaButton")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </main>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: "var(--accent)" }}
      >
        {label}
      </p>
      {children}
    </section>
  );
}
