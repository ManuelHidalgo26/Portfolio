// ─────────────────────────────────────────────────────────────
//  COTIZADOR — Precios editables
//  Cambiá los números acá y se actualiza todo el cotizador.
//  Los precios están en USD. "local" = cliente Argentina,
//  "exterior" = cliente del exterior. ARS se calcula con exchangeRate.
// ─────────────────────────────────────────────────────────────

export type Region = "local" | "exterior";
export type Currency = "USD" | "ARS";
export type Money = { local: number; exterior: number };

export type BaseType = {
  id: string;
  label: string;
  description: string;
  price: Money;
};

export type AddOn = {
  id: string;
  label: string;
  description: string;
  price: Money;
  quantifiable?: boolean; // permite elegir cantidad (ej: páginas extra)
};

export type MaintenancePlan = {
  id: string;
  label: string;
  description: string;
  price: Money; // mensual
};

export const config = {
  // Número de WhatsApp en formato internacional, sin "+" ni espacios.
  whatsappNumber: "5493513421977",
  // Cuántos pesos vale 1 USD (editá según el dólar del momento).
  exchangeRate: 1200,
};

export const baseTypes: BaseType[] = [
  {
    id: "landing",
    label: "Landing page",
    description: "Una sola página para presentar un producto, servicio o evento.",
    price: { local: 250, exterior: 550 },
  },
  {
    id: "multipagina",
    label: "Sitio multipágina",
    description: "Sitio institucional de hasta 5 secciones (inicio, servicios, nosotros, contacto…).",
    price: { local: 500, exterior: 1100 },
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    description: "Tienda online con catálogo de productos y carrito de compras.",
    price: { local: 1500, exterior: 3500 },
  },
  {
    id: "webapp",
    label: "Web app / SaaS",
    description: "Aplicación a medida con login y estructura para tu lógica de negocio.",
    price: { local: 2500, exterior: 6000 },
  },
];

export const addOns: AddOn[] = [
  {
    id: "diseno",
    label: "Diseño personalizado",
    description: "Diseño único hecho a medida, sin templates.",
    price: { local: 200, exterior: 400 },
  },
  {
    id: "pagina-extra",
    label: "Página / sección extra",
    description: "Sumá páginas o secciones adicionales a tu sitio.",
    price: { local: 80, exterior: 160 },
    quantifiable: true,
  },
  {
    id: "form",
    label: "Formulario de contacto",
    description: "Formulario que te envía los mensajes por email.",
    price: { local: 50, exterior: 100 },
  },
  {
    id: "whatsapp",
    label: "Integración WhatsApp",
    description: "Botón flotante o checkout directo a WhatsApp.",
    price: { local: 40, exterior: 80 },
  },
  {
    id: "blog",
    label: "Blog / noticias",
    description: "Sección de blog o novedades autoadministrable.",
    price: { local: 250, exterior: 500 },
  },
  {
    id: "seo",
    label: "SEO básico",
    description: "Metadata, sitemap y buenas prácticas para posicionar en Google.",
    price: { local: 120, exterior: 250 },
  },
  {
    id: "multidioma",
    label: "Multidioma",
    description: "Tu sitio disponible en dos o más idiomas.",
    price: { local: 180, exterior: 380 },
  },
  {
    id: "admin",
    label: "Panel de administración",
    description: "Cargá y editá el contenido vos mismo, sin tocar código.",
    price: { local: 400, exterior: 850 },
  },
  {
    id: "pagos",
    label: "Pasarela de pagos",
    description: "Cobrá online con MercadoPago o Stripe.",
    price: { local: 250, exterior: 500 },
  },
  {
    id: "auth",
    label: "Login / usuarios",
    description: "Registro e inicio de sesión con roles de usuario.",
    price: { local: 300, exterior: 650 },
  },
  {
    id: "dashboard",
    label: "Dashboard / métricas",
    description: "Panel con datos y estadísticas de tu negocio.",
    price: { local: 400, exterior: 850 },
  },
  {
    id: "animaciones",
    label: "Animaciones avanzadas",
    description: "Microinteracciones y transiciones para destacar.",
    price: { local: 120, exterior: 250 },
  },
  {
    id: "backend",
    label: "Backend / base de datos",
    description: "API y base de datos a medida para tu lógica de negocio.",
    price: { local: 400, exterior: 850 },
  },
  {
    id: "api",
    label: "Integración API / automatización",
    description: "Conectá servicios externos o automatizá procesos.",
    price: { local: 350, exterior: 750 },
  },
];

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: "none",
    label: "Sin mantenimiento",
    description: "Te entrego el sitio terminado y queda 100% tuyo.",
    price: { local: 0, exterior: 0 },
  },
  {
    id: "basic",
    label: "Básico",
    description: "Hosting, backups y actualizaciones menores.",
    price: { local: 30, exterior: 60 },
  },
  {
    id: "plus",
    label: "Plus",
    description: "Cambios mensuales y soporte prioritario.",
    price: { local: 70, exterior: 150 },
  },
];

// ── Helpers ──────────────────────────────────────────────────

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
