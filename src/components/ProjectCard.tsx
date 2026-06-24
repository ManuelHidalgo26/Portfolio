"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { type Project, typeMeta } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const meta = typeMeta[project.type];
  const caseHref = `/projects/${project.slug}`;
  const hasCase = !!project.caseStudy;

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 30px rgba(99,102,241,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top bar accent */}
      <div
        className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />

      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Header */}
        <div>
          <span
            className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
            style={{ background: meta.bg, color: meta.color }}
          >
            {meta.label}
          </span>
          <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            {hasCase ? (
              <Link
                href={caseHref}
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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

        {/* Footer: case link + external links */}
        {(hasCase || project.githubUrl || project.liveUrl) && (
          <div
            className="flex items-center gap-4 pt-4"
            style={{ borderTop: "1px solid var(--bg-border)" }}
          >
            {hasCase && (
              <Link
                href={caseHref}
                className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                style={{ color: "var(--accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Ver caso
                <ArrowUpRight size={14} />
              </Link>
            )}

            <div className="flex items-center gap-4 ml-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <Github size={14} />
                  Código
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  Demo
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
