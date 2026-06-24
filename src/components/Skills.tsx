"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiSocketdotio,
  SiRedis,
  SiDotnet,
  SiSqlite,
  SiGit,
  SiGithub,
  SiVite,
  SiPostman,
  SiVercel,
} from "react-icons/si";
import { Hash, AppWindow, Database, Webhook } from "lucide-react";

type IconCmp = React.ComponentType<{ size?: number }>;
type Skill = { name: string; Icon: IconCmp };

const categories: {
  labelKey: "frontend" | "backend" | "desktop" | "tools";
  skills: Skill[];
}[] = [
  {
    labelKey: "frontend",
    skills: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Framer Motion", Icon: SiFramer },
      { name: "SASS", Icon: SiSass },
    ],
  },
  {
    labelKey: "backend",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "Prisma", Icon: SiPrisma },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Socket.io", Icon: SiSocketdotio },
      { name: "Redis", Icon: SiRedis },
      { name: "REST API", Icon: Webhook },
    ],
  },
  {
    labelKey: "desktop",
    skills: [
      { name: ".NET 9", Icon: SiDotnet },
      { name: "C#", Icon: Hash },
      { name: "Avalonia", Icon: AppWindow },
      { name: "EF Core", Icon: Database },
      { name: "SQLite", Icon: SiSqlite },
    ],
  },
  {
    labelKey: "tools",
    skills: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Vite", Icon: SiVite },
      { name: "Postman", Icon: SiPostman },
      { name: "Vercel", Icon: SiVercel },
    ],
  },
];

function SkillBadge({ skill }: { skill: Skill }) {
  const { Icon } = skill;
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
      <span className="shrink-0 flex items-center" style={{ color: "var(--accent)" }}>
        <Icon size={18} />
      </span>
      {skill.name}
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="py-24 px-6"
      style={{ borderTop: "1px solid var(--bg-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
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
        </motion.div>

        <div className="flex flex-col gap-10">
          {categories.map((cat) => (
            <div key={cat.labelKey}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {t(cat.labelKey)}
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
