"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { key: "inicio", href: "/" },
  { key: "proyectos", href: "/#projects" },
  { key: "cotizador", href: "/cotizador" },
  { key: "sobreMi", href: "/about" },
  { key: "contacto", href: "/contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--bg-border)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Avatar */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            style={{
              background: "linear-gradient(135deg, var(--accent-dim), #a78bfa)",
              boxShadow: "0 0 0 2px rgba(129,140,248,0.2)",
            }}
          >
            MH
          </div>
          <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--text)" }}>
            MH<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: language + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              background: "var(--accent-dim)",
              color: "#fff",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg"
            style={{ color: "var(--text-muted)" }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(10,10,10,0.97)", borderBottom: "1px solid var(--bg-border)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm py-2"
              style={{ color: "var(--text-muted)" }}
              onClick={() => setOpen(false)}
            >
              {t(l.key)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-medium text-center py-3 rounded-lg mt-2"
            style={{ background: "var(--accent-dim)", color: "#fff" }}
            onClick={() => setOpen(false)}
          >
            {t("cta")}
          </Link>
        </div>
      )}
    </header>
  );
}
