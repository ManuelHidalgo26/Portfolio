export type CaseSection = { title: string; detail: string };

export type CaseStudy = {
  year: string;
  context: string;
  role: string;
  highlights: string[];
  decisions: CaseSection[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  type: "fullstack" | "frontend" | "backend" | "client" | "desktop";
  caseStudy?: CaseStudy;
};

export const typeMeta: Record<
  Project["type"],
  { label: string; bg: string; color: string }
> = {
  client: { label: "Cliente real", bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
  fullstack: { label: "Full Stack", bg: "rgba(99,102,241,0.15)", color: "var(--accent)" },
  frontend: { label: "Frontend", bg: "rgba(56,189,248,0.15)", color: "#38bdf8" },
  backend: { label: "Backend", bg: "rgba(251,146,60,0.15)", color: "#fb923c" },
  desktop: { label: "Desktop", bg: "rgba(232,121,249,0.15)", color: "#e879f9" },
};

export const projects: Project[] = [
  {
    slug: "hyena-fuel",
    title: "HyenaFuel",
    description:
      "Sitio web para una marca real de suplementos deportivos. Diseño, desarrollo y deploy completo para cliente.",
    longDescription:
      "Proyecto freelance para HyenaFuel, una marca de suplementos deportivos. Diseñé y desarrollé el sitio completo: catálogo de productos, integración con MercadoPago y panel de administración.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "MongoDB", "MercadoPago"],
    liveUrl: "https://www.hyenafuel.com/",
    githubUrl: "https://github.com/ManuelHidalgo26/hyena-fuel",
    featured: true,
    type: "client",
    caseStudy: {
      year: "2024",
      context:
        "HyenaFuel es una marca real de suplementos deportivos que vendía por redes sociales y necesitaba dar el salto a su propia tienda online: un catálogo ordenado, cobros reales y una forma simple de administrar productos sin depender de un desarrollador para cada cambio.",
      role:
        "Tomé el proyecto de punta a punta: diseño de la interfaz, desarrollo del frontend y del backend, integración de la pasarela de pagos y deploy en producción bajo su propio dominio.",
      highlights: [
        "Catálogo de productos con categorías y fichas individuales",
        "Checkout con MercadoPago, procesando pagos reales en producción",
        "Panel de administración para cargar y editar productos sin tocar código",
        "Sitio en vivo en hyenafuel.com, optimizado para mobile y SEO",
      ],
      decisions: [
        {
          title: "Next.js para SEO y velocidad",
          detail:
            "Una tienda necesita cargar rápido y posicionar en Google. Elegí Next.js por el renderizado del lado del servidor: las fichas de producto se sirven pre-renderizadas, mejorando el tiempo de carga y el posicionamiento.",
        },
        {
          title: "API propia en Express + MongoDB",
          detail:
            "Backend REST en Express con MongoDB para productos y pedidos. MongoDB me dio flexibilidad para iterar el modelo de datos mientras el catálogo y las reglas del negocio se terminaban de definir.",
        },
        {
          title: "Integración con MercadoPago",
          detail:
            "Implementé el flujo de pago con la pasarela más usada en Argentina: creación de preferencias, redirección al checkout y confirmación de la orden del lado del backend.",
        },
      ],
    },
  },
  {
    slug: "hyena-hub",
    title: "HyenaHub",
    description:
      "Plataforma SaaS para entrenadores: gestión de clientes, rutinas, cobros y mensajería en tiempo real.",
    longDescription:
      "Plataforma full-stack para entrenadores y gimnasios. Gestión de clientes y rutinas, seguimiento de progreso, generación de reportes en PDF y chat en tiempo real. Backend en Express + Prisma sobre PostgreSQL, con autenticación JWT, Socket.io y Pusher para realtime, Redis para presencia y una capa de seguridad con Helmet y rate-limiting. Frontend en Next.js con React Query y NextAuth.",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "Socket.io", "Redis", "NextAuth", "TypeScript"],
    liveUrl: "https://hyenahub.app/",
    githubUrl: "https://github.com/ManuelHidalgo26/hyenahub",
    featured: true,
    type: "fullstack",
    caseStudy: {
      year: "2026",
      context:
        "Los entrenadores personales manejan a sus clientes con planillas de Excel y WhatsApp: rutinas sueltas, cobros que se pierden y cero seguimiento del progreso. HyenaHub centraliza todo en una sola plataforma, tanto para el entrenador como para el cliente.",
      role:
        "Diseñé y construí la plataforma full-stack completa: la arquitectura de datos, un backend con tiempo real y seguridad de producción, y el frontend con la experiencia del entrenador y la del cliente.",
      highlights: [
        "Gestión de clientes, rutinas y seguimiento de progreso",
        "Chat en tiempo real entre entrenador y cliente",
        "Registro de cobros y generación de reportes en PDF",
        "Autenticación con roles y capa de seguridad de producción",
      ],
      decisions: [
        {
          title: "Prisma + PostgreSQL",
          detail:
            "Los datos (clientes, rutinas, pagos) son fuertemente relacionales, así que elegí PostgreSQL con Prisma como ORM. Eso me dio tipado end-to-end entre la base y el código, y migraciones seguras a medida que el modelo crecía.",
        },
        {
          title: "Tiempo real con Socket.io y Redis",
          detail:
            "El chat y las notificaciones usan Socket.io, con un adapter de Redis para que el sistema escale a múltiples instancias sin perder mensajes ni el estado de presencia de los usuarios.",
        },
        {
          title: "Seguridad desde el día uno",
          detail:
            "Sesiones con JWT, headers endurecidos con Helmet, rate-limiting contra abuso y validación de entrada con Zod en cada endpoint. La seguridad no fue un agregado al final, sino parte del diseño.",
        },
        {
          title: "Monorepo con workspaces",
          detail:
            "Backend (Express) y frontend (Next.js) viven en un único repo con npm workspaces, compartiendo tipos y simplificando el desarrollo y el deploy.",
        },
      ],
    },
  },
  {
    slug: "gymforge",
    title: "GymForge",
    description:
      "App de escritorio Windows para gestión de gimnasios. Offline-first: socios, membresías, caja y control de acceso sin internet.",
    longDescription:
      "Sistema de gestión de gimnasios para Windows, offline-first, pensado para el mercado AR/LATAM. Maneja socios, membresías, control de acceso, caja con arqueo, cobros y ventas — todo funcionando sin conexión sobre SQLite local. Construido en .NET 9 con Avalonia para la UI, arquitectura limpia con MediatR y FluentValidation, EF Core como ORM y sidecars HTTP para hardware (fiscal, biometría, accesos). Se distribuye como un único .exe autocontenido.",
    tags: [".NET 9", "C#", "Avalonia", "EF Core", "SQLite", "MediatR"],
    featured: true,
    type: "desktop",
    caseStudy: {
      year: "2026",
      context:
        "Muchos gimnasios de Argentina y LATAM trabajan con internet inestable o directamente sin conexión. GymForge es un sistema de gestión de escritorio que funciona 100% offline: socios, membresías, caja y control de acceso, sin depender de la nube ni de un navegador.",
      role:
        "Diseñé la arquitectura y desarrollé la aplicación de escritorio en .NET, desde el modelo de datos local y la lógica de negocio hasta la interfaz y la distribución como ejecutable.",
      highlights: [
        "Funciona sin internet sobre SQLite local (offline-first)",
        "Gestión de socios, membresías y control de acceso (gatekeeper)",
        "Caja con arqueo, cobros y ventas en pesos (ARS)",
        "Se distribuye como un único .exe autocontenido, sin instalación",
      ],
      decisions: [
        {
          title: "Avalonia para una UI moderna sobre .NET",
          detail:
            "Elegí Avalonia con patrón MVVM en lugar de atarme a WPF: me dio una UI moderna y la puerta abierta a multiplataforma, sobre .NET 9.",
        },
        {
          title: "Arquitectura limpia con MediatR",
          detail:
            "Separé la lógica en casos de uso con MediatR y validación con FluentValidation. La UI queda fina y el dominio es testeable de forma aislada con xUnit.",
        },
        {
          title: "Offline-first con EF Core + SQLite",
          detail:
            "Toda la data vive en SQLite local en modo WAL. La app no necesita internet para operar; una sincronización con PostgreSQL en la nube queda planteada como evolución futura.",
        },
        {
          title: "Sidecars para hardware",
          detail:
            "El control fiscal, la biometría y los lectores de acceso se manejan como servicios HTTP locales (sidecars), desacoplando el hardware del resto de la aplicación.",
        },
      ],
    },
  },
  {
    slug: "raffles-platform",
    title: "Raffles Platform",
    description:
      "Plataforma web para crear y participar en rifas. Autenticación, dashboard de usuario y UI animada.",
    longDescription:
      "Aplicación full-stack para la gestión de rifas online. Incluye sistema de autenticación, dashboard personal, creación de rifas con fecha de cierre y UI con animaciones Framer Motion.",
    tags: ["React", "Node.js", "MongoDB", "Framer Motion", "Radix UI"],
    githubUrl: "https://github.com/ManuelHidalgo26/Raffles",
    featured: false,
    type: "fullstack",
    caseStudy: {
      year: "2025",
      context:
        "Organizar rifas a mano es un lío: vender los números, llevar registro de quién pagó y sortear con transparencia. Raffles es una plataforma para crear y gestionar rifas online de punta a punta.",
      role:
        "Construí la aplicación full-stack: la autenticación, el dashboard de usuario, la creación de rifas y la interfaz con animaciones.",
      highlights: [
        "Creación de rifas con fecha de cierre y cantidad de números",
        "Autenticación de usuarios y dashboard personal",
        "Interfaz animada con Framer Motion y componentes accesibles",
      ],
      decisions: [
        {
          title: "React + Vite",
          detail:
            "Frontend en React con Vite para un desarrollo ágil y un bundle liviano, en una SPA centrada en el dashboard del usuario.",
        },
        {
          title: "Backend Node + MongoDB",
          detail:
            "API en Node con MongoDB para usuarios y rifas, con autenticación basada en tokens y un modelo de datos simple de iterar.",
        },
        {
          title: "UX con Radix + Framer Motion",
          detail:
            "Componentes accesibles de Radix UI como base, y Framer Motion para transiciones que hacen la experiencia más pulida y clara.",
        },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
