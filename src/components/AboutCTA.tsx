"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Mail } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Link } from "@/i18n/navigation";
import CountUpStat from "./CountUpStat";

const statNumbers = ["4", "1", "3", "100%"];

export default function AboutCTA() {
  const t = useTranslations("aboutCta");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const statLabels = t.raw("stats") as string[];
  const bold = (chunks: React.ReactNode) => <span style={{ color: "var(--accent)" }}>{chunks}</span>;
  const boldText = (chunks: React.ReactNode) => <span style={{ color: "var(--text)" }}>{chunks}</span>;

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
                {t("eyebrow")}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                style={{ color: "var(--text)" }}
              >
                {t("titleLine1")}
                <br />
                <span style={{ color: "var(--accent)" }}>{t("titleLine2")}</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {t("p1")}
              </p>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--text-muted)" }}
              >
                {t.rich("p2", { b: boldText })}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {t("moreAbout")}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {statNumbers.map((number, i) => (
                <div
                  key={i}
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
                    <CountUpStat value={number} />
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {statLabels[i]}
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
            {t.rich("ctaTitle", { b: bold })}
          </h2>
          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              style={{ background: "var(--accent-dim)", color: "#fff" }}
            >
              <Mail size={18} />
              {t("ctaWrite")}
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
