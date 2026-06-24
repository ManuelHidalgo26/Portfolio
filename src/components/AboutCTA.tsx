"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function AboutCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* About brief */}
      <section
        id="about"
        className="py-24 px-6"
        style={{ borderTop: "1px solid var(--bg-border)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            ref={ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div>
              <p
                className="text-sm font-medium uppercase tracking-widest mb-3"
                style={{ color: "var(--accent)" }}
              >
                Sobre mí
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                style={{ color: "var(--text)" }}
              >
                Desarrollador Full Stack
                <br />
                <span style={{ color: "var(--accent)" }}>con visión de producto</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Soy Manuel, desarrollador Full Stack con base en Argentina.
                Me especializo en construir aplicaciones web modernas — desde
                el diseño de la interfaz hasta el despliegue en producción.
              </p>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--text-muted)" }}
              >
                Trabajo con{" "}
                <span style={{ color: "var(--text)" }}>React, Next.js y Node.js</span>,
                y tengo experiencia tanto en proyectos de clientes reales como
                en el desarrollo de plataformas propias.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Más sobre mí
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "4", label: "Proyectos construidos" },
                { number: "1", label: "Cliente en producción" },
                { number: "3", label: "Apps full-stack" },
                { number: "100%", label: "Compromiso" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--bg-border)",
                  }}
                >
                  <p
                    className="text-3xl font-bold mb-1 font-mono"
                    style={{ color: "var(--accent)" }}
                  >
                    {stat.number}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        className="py-24 px-6"
        style={{ borderTop: "1px solid var(--bg-border)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ color: "var(--text)" }}
          >
            ¿Tienes un proyecto
            <br />
            <span style={{ color: "var(--accent)" }}>en mente?</span>
          </h2>
          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            Estoy disponible para proyectos freelance y posiciones full-time.
            Hablemos sobre cómo puedo ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              style={{ background: "var(--accent-dim)", color: "#fff" }}
            >
              <Mail size={18} />
              Escribime
            </Link>
            <a
              href="https://www.linkedin.com/in/manuel-hidalgo-casta%C3%B1os-29116b299/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: "transparent",
                border: "1px solid var(--bg-border)",
                color: "var(--text)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--bg-border)")}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
