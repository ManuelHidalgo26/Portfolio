import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, type Locale } from "@/lib/projects";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("projectsTitle"),
    description: t("projectsDescription"),
    alternates: alternatesFor("/projects"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const projects = getProjects(locale as Locale);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
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
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
