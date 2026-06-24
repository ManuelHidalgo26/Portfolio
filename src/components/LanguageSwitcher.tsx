"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className="inline-flex p-0.5 rounded-lg gap-0.5"
      style={{ background: "var(--bg-card)", border: "1px solid var(--bg-border)" }}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            aria-label={`Cambiar idioma a ${l.toUpperCase()}`}
            aria-current={active ? "true" : undefined}
            className="px-2 py-1 rounded-md text-xs font-semibold uppercase transition-all"
            style={{
              background: active ? "var(--accent-dim)" : "transparent",
              color: active ? "#fff" : "var(--text-muted)",
            }}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
