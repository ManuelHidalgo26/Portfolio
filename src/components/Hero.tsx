"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, Github, Linkedin } from "lucide-react";

export default function Hero() {
  const dotRef = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax on the glow
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      dotRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background glow */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Available badge */}
      <div
        className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-8"
        style={{
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.25)",
          color: "var(--accent)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "#22c55e" }}
        />
        Disponible para proyectos
      </div>

      {/* Name */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
        <span style={{ color: "var(--text)" }}>Manuel</span>
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hidalgo
        </span>
      </h1>

      {/* Title */}
      <p
        className="text-lg md:text-xl font-medium mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        Full Stack Developer
      </p>

      {/* Description */}
      <p
        className="max-w-xl text-base md:text-lg leading-relaxed mb-10"
        style={{ color: "var(--text-muted)" }}
      >
        Construyo aplicaciones web rápidas y escalables con{" "}
        <span style={{ color: "var(--text)" }}>React</span>,{" "}
        <span style={{ color: "var(--text)" }}>Node.js</span> y{" "}
        <span style={{ color: "var(--text)" }}>Next.js</span>.
        Desde el diseño hasta el deploy.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105"
          style={{ background: "var(--accent-dim)", color: "#fff" }}
        >
          Ver mis proyectos
          <ArrowDown size={16} />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105"
          style={{
            background: "transparent",
            border: "1px solid var(--bg-border)",
            color: "var(--text)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--bg-border)")}
        >
          Hablemos
        </Link>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/ManuelHidalgo26"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/manuel-hidalgo-casta%C3%B1os-29116b299/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
