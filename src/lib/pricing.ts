// ─────────────────────────────────────────────────────────────
//  COTIZADOR — Precios editables
//  Cambiá los números acá y se actualiza todo el cotizador.
//  Los precios están en USD. "local" = cliente Argentina,
//  "exterior" = cliente del exterior. ARS se calcula con exchangeRate.
//  Los textos (label/description) son bilingües: { es, en }.
// ─────────────────────────────────────────────────────────────

import type { Locale, Localized } from "./projects";

export type Region = "local" | "exterior";
export type Currency = "USD" | "ARS";
export type Money = { local: number; exterior: number };

export type BaseType = {
  id: string;
  label: Localized;
  description: Localized;
  price: Money;
};

export type AddOn = {
  id: string;
  label: Localized;
  description: Localized;
  price: Money;
  quantifiable?: boolean; // permite elegir cantidad (ej: páginas extra)
};

export type MaintenancePlan = {
  id: string;
  label: Localized;
  description: Localized;
  price: Money; // mensual
};

// Versiones con los textos resueltos a un idioma (las consumen los componentes)
export type LocalizedBaseType = { id: string; label: string; description: string; price: Money };
export type LocalizedAddOn = {
  id: string;
  label: string;
  description: string;
  price: Money;
  quantifiable?: boolean;
};
export type LocalizedMaintenancePlan = { id: string; label: string; description: string; price: Money };

export const config = {
  // Número de WhatsApp en formato internacional, sin "+" ni espacios.
  whatsappNumber: "5493513421977",
  // Cuántos pesos vale 1 USD (editá según el dólar del momento).
  exchangeRate: 1200,
};

export const baseTypes: BaseType[] = [
  {
    id: "landing",
    label: { es: "Landing page", en: "Landing page" },
    description: {
      es: "Una sola página para presentar un producto, servicio o evento.",
      en: "A single page to present a product, service or event.",
    },
    price: { local: 250, exterior: 550 },
  },
  {
    id: "multipagina",
    label: { es: "Sitio multipágina", en: "Multi-page site" },
    description: {
      es: "Sitio institucional de hasta 5 secciones (inicio, servicios, nosotros, contacto…).",
      en: "Institutional site with up to 5 sections (home, services, about, contact…).",
    },
    price: { local: 500, exterior: 1100 },
  },
  {
    id: "ecommerce",
    label: { es: "Ecommerce", en: "Ecommerce" },
    description: {
      es: "Tienda online con catálogo de productos y carrito de compras.",
      en: "Online store with product catalog and shopping cart.",
    },
    price: { local: 1500, exterior: 3500 },
  },
  {
    id: "webapp",
    label: { es: "Web app / SaaS", en: "Web app / SaaS" },
    description: {
      es: "Aplicación a medida con login y estructura para tu lógica de negocio.",
      en: "Custom application with login and a structure for your business logic.",
    },
    price: { local: 2500, exterior: 6000 },
  },
];

export const addOns: AddOn[] = [
  {
    id: "diseno",
    label: { es: "Diseño personalizado", en: "Custom design" },
    description: {
      es: "Diseño único hecho a medida, sin templates.",
      en: "A unique, tailor-made design, no templates.",
    },
    price: { local: 200, exterior: 400 },
  },
  {
    id: "pagina-extra",
    label: { es: "Página / sección extra", en: "Extra page / section" },
    description: {
      es: "Sumá páginas o secciones adicionales a tu sitio.",
      en: "Add extra pages or sections to your site.",
    },
    price: { local: 80, exterior: 160 },
    quantifiable: true,
  },
  {
    id: "form",
    label: { es: "Formulario de contacto", en: "Contact form" },
    description: {
      es: "Formulario que te envía los mensajes por email.",
      en: "A form that sends you messages by email.",
    },
    price: { local: 50, exterior: 100 },
  },
  {
    id: "whatsapp",
    label: { es: "Integración WhatsApp", en: "WhatsApp integration" },
    description: {
      es: "Botón flotante o checkout directo a WhatsApp.",
      en: "Floating button or direct checkout to WhatsApp.",
    },
    price: { local: 40, exterior: 80 },
  },
  {
    id: "blog",
    label: { es: "Blog / noticias", en: "Blog / news" },
    description: {
      es: "Sección de blog o novedades autoadministrable.",
      en: "Self-manageable blog or news section.",
    },
    price: { local: 250, exterior: 500 },
  },
  {
    id: "seo",
    label: { es: "SEO básico", en: "Basic SEO" },
    description: {
      es: "Metadata, sitemap y buenas prácticas para posicionar en Google.",
      en: "Metadata, sitemap and best practices to rank on Google.",
    },
    price: { local: 120, exterior: 250 },
  },
  {
    id: "multidioma",
    label: { es: "Multidioma", en: "Multilingual" },
    description: {
      es: "Tu sitio disponible en dos o más idiomas.",
      en: "Your site available in two or more languages.",
    },
    price: { local: 180, exterior: 380 },
  },
  {
    id: "admin",
    label: { es: "Panel de administración", en: "Admin panel" },
    description: {
      es: "Cargá y editá el contenido vos mismo, sin tocar código.",
      en: "Add and edit content yourself, without touching code.",
    },
    price: { local: 400, exterior: 850 },
  },
  {
    id: "pagos",
    label: { es: "Pasarela de pagos", en: "Payment gateway" },
    description: {
      es: "Cobrá online con MercadoPago o Stripe.",
      en: "Accept online payments with MercadoPago or Stripe.",
    },
    price: { local: 250, exterior: 500 },
  },
  {
    id: "auth",
    label: { es: "Login / usuarios", en: "Login / users" },
    description: {
      es: "Registro e inicio de sesión con roles de usuario.",
      en: "Sign-up and login with user roles.",
    },
    price: { local: 300, exterior: 650 },
  },
  {
    id: "dashboard",
    label: { es: "Dashboard / métricas", en: "Dashboard / metrics" },
    description: {
      es: "Panel con datos y estadísticas de tu negocio.",
      en: "A panel with data and statistics for your business.",
    },
    price: { local: 400, exterior: 850 },
  },
  {
    id: "animaciones",
    label: { es: "Animaciones avanzadas", en: "Advanced animations" },
    description: {
      es: "Microinteracciones y transiciones para destacar.",
      en: "Microinteractions and transitions to stand out.",
    },
    price: { local: 120, exterior: 250 },
  },
  {
    id: "backend",
    label: { es: "Backend / base de datos", en: "Backend / database" },
    description: {
      es: "API y base de datos a medida para tu lógica de negocio.",
      en: "Custom API and database for your business logic.",
    },
    price: { local: 400, exterior: 850 },
  },
  {
    id: "api",
    label: { es: "Integración API / automatización", en: "API integration / automation" },
    description: {
      es: "Conectá servicios externos o automatizá procesos.",
      en: "Connect external services or automate processes.",
    },
    price: { local: 350, exterior: 750 },
  },
];

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: "none",
    label: { es: "Sin mantenimiento", en: "No maintenance" },
    description: {
      es: "Te entrego el sitio terminado y queda 100% tuyo.",
      en: "I hand over the finished site and it's 100% yours.",
    },
    price: { local: 0, exterior: 0 },
  },
  {
    id: "basic",
    label: { es: "Básico", en: "Basic" },
    description: {
      es: "Hosting, backups y actualizaciones menores.",
      en: "Hosting, backups and minor updates.",
    },
    price: { local: 30, exterior: 60 },
  },
  {
    id: "plus",
    label: { es: "Plus", en: "Plus" },
    description: {
      es: "Cambios mensuales y soporte prioritario.",
      en: "Monthly changes and priority support.",
    },
    price: { local: 70, exterior: 150 },
  },
];

// ── Helpers ──────────────────────────────────────────────────

export function getBaseTypes(locale: Locale): LocalizedBaseType[] {
  return baseTypes.map((b) => ({
    id: b.id,
    label: b.label[locale],
    description: b.description[locale],
    price: b.price,
  }));
}

export function getAddOns(locale: Locale): LocalizedAddOn[] {
  return addOns.map((a) => ({
    id: a.id,
    label: a.label[locale],
    description: a.description[locale],
    price: a.price,
    quantifiable: a.quantifiable,
  }));
}

export function getMaintenancePlans(locale: Locale): LocalizedMaintenancePlan[] {
  return maintenancePlans.map((m) => ({
    id: m.id,
    label: m.label[locale],
    description: m.description[locale],
    price: m.price,
  }));
}

export function priceValue(money: Money, region: Region, currency: Currency): number {
  const usd = money[region];
  return currency === "ARS" ? usd * config.exchangeRate : usd;
}

export function formatMoney(amount: number, currency: Currency): string {
  // Separador de miles manual (evita diferencias de locale entre server y cliente).
  const n = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return currency === "ARS" ? `ARS $${n}` : `USD $${n}`;
}
