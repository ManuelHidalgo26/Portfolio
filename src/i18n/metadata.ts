import type { Metadata } from "next";

/**
 * Genera el bloque `alternates` (canonical + hreflang) para una ruta dada.
 * `path` es la ruta SIN prefijo de locale, p. ej. "/" o "/about".
 * El español va sin prefijo y el inglés con "/en".
 */
export function alternatesFor(path: string): Metadata["alternates"] {
  const enPath = path === "/" ? "/en" : `/en${path}`;
  return {
    canonical: path,
    languages: {
      es: path,
      en: enPath,
    },
  };
}
