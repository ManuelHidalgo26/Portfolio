import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Idiomas soportados
  locales: ["es", "en"],
  // Español por defecto
  defaultLocale: "es",
  // El idioma por defecto va sin prefijo (/), el resto con prefijo (/en)
  localePrefix: "as-needed",
});
