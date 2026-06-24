"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";

const navLinks = [
  { key: "inicio", href: "/" },
  { key: "proyectos", href: "/projects" },
  { key: "cotizador", href: "/cotizador" },
  { key: "sobreMi", href: "/about" },
  { key: "contacto", href: "/contact" },
] as const;

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");

  return (
    <footer
      className="px-6 py-12"
      style={{ borderTop: "1px solid var(--bg-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="font-semibold text-lg tracking-tight"
            style={{ color: "var(--text)" }}
          >
            MH<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ManuelHidalgo26"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/manuel-hidalgo-casta%C3%B1os-29116b299/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:hidalgomanu@hotmail.com"
              aria-label="Email"
              className="transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-8 text-center text-xs"
          style={{ borderTop: "1px solid var(--bg-border)", color: "var(--text-muted)" }}
        >
          © {new Date().getFullYear()} Manuel Hidalgo Castaños — {tf("rights")}
        </div>
      </div>
    </footer>
  );
}
