import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre mí — Manuel Hidalgo",
  description:
    "Full Stack Developer con experiencia en React, Next.js y Node.js. Conocé mi trayectoria, certificados y stack tecnológico.",
};

const timeline = [
  {
    year: "2022",
    title: "Inicio en programación",
    description:
      "Empecé aprendiendo HTML, CSS y JavaScript de forma autodidacta. Completé el curso de Desarrollo Web en CoderHouse.",
  },
  {
    year: "2023",
    title: "Especialización en React",
    description:
      "Me enfoqué en el ecosistema React: hooks, context, routing. Obtuve las certificaciones de JavaScript y React en CoderHouse.",
  },
  {
    year: "2024",
    title: "Primer cliente real",
    description:
      "Desarrollé el sitio web completo para HyenaFuel, una marca real de suplementos deportivos. Primer proyecto con deploy en producción para un cliente.",
  },
  {
    year: "2025",
    title: "Full Stack & Next.js",
    description:
      "Amplié el stack con Node.js, Express y MongoDB. Construí mi primera plataforma full-stack propia —rifas con autenticación y dashboard— y este portfolio.",
  },
  {
    year: "2026",
    title: "Plataformas SaaS y apps de escritorio",
    description:
      "Construí HyenaHub, una plataforma SaaS para entrenadores con chat en tiempo real, cobros y reportes (Next.js + Prisma + PostgreSQL + Socket.io), y GymForge, un sistema de gestión de gimnasios de escritorio offline-first en .NET 9 con Avalonia. Sumé Prisma, PostgreSQL, Redis y .NET a mi stack.",
  },
];

const certificates = [
  { title: "React JS", institution: "CoderHouse", year: "2023", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)", color: "#818cf8" },
  { title: "Desarrollo Frontend", institution: "CoderHouse", year: "2023", bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.3)", color: "#38bdf8" },
  { title: "JavaScript", institution: "CoderHouse", year: "2022", bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.3)", color: "#eab308" },
  { title: "Desarrollo Web", institution: "CoderHouse", year: "2022", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", color: "#22c55e" },
];

const stack = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "SASS"] },
  { category: "Backend", items: ["Node.js", "Express", "Prisma", "PostgreSQL", "MongoDB", "Socket.io", "Redis", "REST API"] },
  { category: "Desktop", items: [".NET 9", "C#", "Avalonia", "EF Core", "SQLite"] },
  { category: "Herramientas", items: ["Git", "GitHub", "Vite", "Vercel", "Railway"] },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="mb-20">
          <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Sobre mí
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight" style={{ color: "var(--text)" }}>
            Desarrollador Full Stack
            <br />
            <span style={{ color: "var(--accent)" }}>apasionado por construir</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Hola, soy <span style={{ color: "var(--text)" }}>Manuel Hidalgo Castaños</span>,
                desarrollador Full Stack con base en Argentina. Me especializo en construir
                productos web modernos — desde el diseño de la interfaz hasta el deploy en producción.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Mi stack principal es <span style={{ color: "var(--text)" }}>React y Next.js</span> en
                el frontend, y <span style={{ color: "var(--text)" }}>Node.js + MongoDB</span> en el
                backend. Tengo experiencia trabajando con clientes reales y desarrollando plataformas propias.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Estoy disponible para proyectos freelance y oportunidades full-time.
                Si tenés un proyecto en mente, me encantaría escucharte.
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
              {[
                { number: "4", label: "Proyectos construidos" },
                { number: "1", label: "Cliente real" },
                { number: "3+", label: "Años aprendiendo" },
                { number: "4", label: "Certificaciones" },
              ].map((stat) => (
                <div key={stat.label} className="p-5 rounded-2xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}>
                  <p className="text-3xl font-bold mb-1 font-mono" style={{ color: "var(--accent)" }}>{stat.number}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20" style={{ borderTop: "1px solid var(--bg-border)", paddingTop: "5rem" }}>
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Trayectoria</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>
            Cómo llegué hasta acá
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
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Formación</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>Certificaciones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div key={cert.title} className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: cert.bg, border: `1px solid ${cert.border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
                  🎓
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text)" }}>{cert.title}</p>
                  <p className="text-xs" style={{ color: cert.color }}>{cert.institution} · {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mb-20" style={{ borderTop: "1px solid var(--bg-border)", paddingTop: "5rem" }}>
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Stack</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>Tecnologías que uso</h2>
          <div className="flex flex-col gap-8">
            {stack.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
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
            ¿Trabajamos juntos?
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            Estoy disponible para proyectos freelance y posiciones full-time.
            Escribime y te respondo en menos de 24 horas.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-dim)", color: "#fff" }}>
            Ponerse en contacto
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </main>
  );
}
