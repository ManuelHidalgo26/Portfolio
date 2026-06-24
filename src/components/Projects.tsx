"use client";

import { useTranslations, useLocale } from "next-intl";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ProjectCard from "./ProjectCard";
import { getProjects, type Locale } from "@/lib/projects";

export default function Projects() {
  const t = useTranslations("projectsSection");
  const locale = useLocale() as Locale;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const featured = getProjects(locale).filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={ref} className="mb-14">
          <p
            className="text-sm font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            {t("title")}
          </h2>
          <p
            className="mt-4 text-base max-w-xl leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Ver todos */}
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
