import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos — Manuel Hidalgo",
  description: "Todos los proyectos de Manuel Hidalgo: ecommerce full-stack, cliente real, plataformas web y landing pages.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p
            className="text-sm font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            Portfolio
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text)" }}
          >
            Todos los proyectos
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Desde clientes reales hasta plataformas propias — cada proyecto
            refleja una solución concreta a un problema real.
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
