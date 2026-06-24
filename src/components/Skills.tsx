"use client";

import { useInView } from "react-intersection-observer";

type Skill = { name: string; icon: string };

const categories: { label: string; skills: Skill[] }[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "◐" },
      { name: "SASS", icon: "Ss" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "⬡" },
      { name: "Express", icon: "Ex" },
      { name: "Prisma", icon: "◈" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Socket.io", icon: "⇄" },
      { name: "Redis", icon: "◆" },
      { name: "REST API", icon: "⇌" },
    ],
  },
  {
    label: "Desktop",
    skills: [
      { name: ".NET 9", icon: "N" },
      { name: "C#", icon: "C#" },
      { name: "Avalonia", icon: "◇" },
      { name: "EF Core", icon: "Ef" },
      { name: "SQLite", icon: "🗄" },
    ],
  },
  {
    label: "Herramientas",
    skills: [
      { name: "Git", icon: "⑂" },
      { name: "GitHub", icon: "⊙" },
      { name: "Vite", icon: "⚡" },
      { name: "Postman", icon: "📮" },
      { name: "Vercel", icon: "▲" },
    ],
  },
];

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-default hover:scale-105"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
        color: "var(--text)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
        (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
        (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
      }}
    >
      <span
        className="text-xs font-mono w-6 text-center shrink-0"
        style={{ color: "var(--accent)" }}
      >
        {skill.icon}
      </span>
      {skill.name}
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="skills"
      className="py-24 px-6"
      style={{ borderTop: "1px solid var(--bg-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="mb-14">
          <p
            className="text-sm font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            Skills
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Tecnologías
          </h2>
          <p
            className="mt-4 text-base max-w-xl leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Stack completo para construir y desplegar productos web modernos.
          </p>
        </div>

        <div
          className="flex flex-col gap-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          {categories.map((cat) => (
            <div key={cat.label}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
