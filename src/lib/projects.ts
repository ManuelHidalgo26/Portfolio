export type Locale = "es" | "en";

export type Localized = { es: string; en: string };

export type ProjectType =
  | "fullstack"
  | "frontend"
  | "backend"
  | "client"
  | "desktop";

export type CaseSection = { title: Localized; detail: Localized };

export type CaseStudy = {
  year: string;
  context: Localized;
  role: Localized;
  highlights: Localized[];
  decisions: CaseSection[];
};

export type Project = {
  slug: string;
  title: string;
  description: Localized;
  longDescription: Localized;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  type: ProjectType;
  caseStudy?: CaseStudy;
};

// Versión con los textos ya resueltos a un idioma (la consumen los componentes)
export type LocalizedCaseSection = { title: string; detail: string };
export type LocalizedCaseStudy = {
  year: string;
  context: string;
  role: string;
  highlights: string[];
  decisions: LocalizedCaseSection[];
};
export type LocalizedProject = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  type: ProjectType;
  typeLabel: string;
  caseStudy?: LocalizedCaseStudy;
};

export const typeMeta: Record<
  ProjectType,
  { label: Localized; bg: string; color: string }
> = {
  client: {
    label: { es: "Cliente real", en: "Real client" },
    bg: "rgba(34,197,94,0.15)",
    color: "#22c55e",
  },
  fullstack: {
    label: { es: "Full Stack", en: "Full Stack" },
    bg: "rgba(99,102,241,0.15)",
    color: "var(--accent)",
  },
  frontend: {
    label: { es: "Frontend", en: "Frontend" },
    bg: "rgba(56,189,248,0.15)",
    color: "#38bdf8",
  },
  backend: {
    label: { es: "Backend", en: "Backend" },
    bg: "rgba(251,146,60,0.15)",
    color: "#fb923c",
  },
  desktop: {
    label: { es: "Desktop", en: "Desktop" },
    bg: "rgba(232,121,249,0.15)",
    color: "#e879f9",
  },
};

export const projects: Project[] = [
  {
    slug: "hyena-fuel",
    title: "HyenaFuel",
    description: {
      es: "Sitio web para una marca real de suplementos deportivos. Diseño, desarrollo y deploy completo para cliente.",
      en: "Website for a real sports supplements brand. Design, development and full deployment for a client.",
    },
    longDescription: {
      es: "Proyecto freelance para HyenaFuel, una marca de suplementos deportivos. Diseñé y desarrollé el sitio completo: catálogo de productos, integración con MercadoPago y panel de administración.",
      en: "Freelance project for HyenaFuel, a sports supplements brand. I designed and developed the complete site: product catalog, MercadoPago integration and admin panel.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "MongoDB", "MercadoPago"],
    liveUrl: "https://www.hyenafuel.com/",
    githubUrl: "https://github.com/ManuelHidalgo26/hyena-fuel",
    featured: true,
    type: "client",
    caseStudy: {
      year: "2024",
      context: {
        es: "HyenaFuel es una marca real de suplementos deportivos que vendía por redes sociales y necesitaba dar el salto a su propia tienda online: un catálogo ordenado, cobros reales y una forma simple de administrar productos sin depender de un desarrollador para cada cambio.",
        en: "HyenaFuel is a real sports supplements brand that sold through social media and needed to make the leap to its own online store: an organized catalog, real payments and a simple way to manage products without relying on a developer for every change.",
      },
      role: {
        es: "Tomé el proyecto de punta a punta: diseño de la interfaz, desarrollo del frontend y del backend, integración de la pasarela de pagos y deploy en producción bajo su propio dominio.",
        en: "I took the project end to end: interface design, frontend and backend development, payment gateway integration and production deployment under its own domain.",
      },
      highlights: [
        {
          es: "Catálogo de productos con categorías y fichas individuales",
          en: "Product catalog with categories and individual product pages",
        },
        {
          es: "Checkout con MercadoPago, procesando pagos reales en producción",
          en: "Checkout with MercadoPago, processing real payments in production",
        },
        {
          es: "Panel de administración para cargar y editar productos sin tocar código",
          en: "Admin panel to add and edit products without touching code",
        },
        {
          es: "Sitio en vivo en hyenafuel.com, optimizado para mobile y SEO",
          en: "Live site at hyenafuel.com, optimized for mobile and SEO",
        },
      ],
      decisions: [
        {
          title: { es: "Next.js para SEO y velocidad", en: "Next.js for SEO and speed" },
          detail: {
            es: "Una tienda necesita cargar rápido y posicionar en Google. Elegí Next.js por el renderizado del lado del servidor: las fichas de producto se sirven pre-renderizadas, mejorando el tiempo de carga y el posicionamiento.",
            en: "A store needs to load fast and rank on Google. I chose Next.js for server-side rendering: product pages are served pre-rendered, improving load time and search ranking.",
          },
        },
        {
          title: { es: "API propia en Express + MongoDB", en: "Custom API in Express + MongoDB" },
          detail: {
            es: "Backend REST en Express con MongoDB para productos y pedidos. MongoDB me dio flexibilidad para iterar el modelo de datos mientras el catálogo y las reglas del negocio se terminaban de definir.",
            en: "REST backend in Express with MongoDB for products and orders. MongoDB gave me flexibility to iterate the data model while the catalog and business rules were still being defined.",
          },
        },
        {
          title: { es: "Integración con MercadoPago", en: "MercadoPago integration" },
          detail: {
            es: "Implementé el flujo de pago con la pasarela más usada en Argentina: creación de preferencias, redirección al checkout y confirmación de la orden del lado del backend.",
            en: "I implemented the payment flow with the most used gateway in Argentina: preference creation, checkout redirection and order confirmation on the backend.",
          },
        },
      ],
    },
  },
  {
    slug: "hyena-hub",
    title: "HyenaHub",
    description: {
      es: "Plataforma SaaS para entrenadores: gestión de clientes, rutinas, cobros y mensajería en tiempo real.",
      en: "SaaS platform for trainers: client management, workouts, payments and real-time messaging.",
    },
    longDescription: {
      es: "Plataforma full-stack para entrenadores y gimnasios. Gestión de clientes y rutinas, seguimiento de progreso, generación de reportes en PDF y chat en tiempo real. Backend en Express + Prisma sobre PostgreSQL, con autenticación JWT, Socket.io y Pusher para realtime, Redis para presencia y una capa de seguridad con Helmet y rate-limiting. Frontend en Next.js con React Query y NextAuth.",
      en: "Full-stack platform for trainers and gyms. Client and workout management, progress tracking, PDF report generation and real-time chat. Express + Prisma backend on PostgreSQL, with JWT auth, Socket.io and Pusher for realtime, Redis for presence and a security layer with Helmet and rate-limiting. Next.js frontend with React Query and NextAuth.",
    },
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "Socket.io", "Redis", "NextAuth", "TypeScript"],
    liveUrl: "https://hyenahub.app/",
    githubUrl: "https://github.com/ManuelHidalgo26/hyenahub",
    featured: true,
    type: "fullstack",
    caseStudy: {
      year: "2026",
      context: {
        es: "Los entrenadores personales manejan a sus clientes con planillas de Excel y WhatsApp: rutinas sueltas, cobros que se pierden y cero seguimiento del progreso. HyenaHub centraliza todo en una sola plataforma, tanto para el entrenador como para el cliente.",
        en: "Personal trainers manage their clients with Excel spreadsheets and WhatsApp: scattered workouts, payments that fall through the cracks and zero progress tracking. HyenaHub centralizes everything in a single platform, for both the trainer and the client.",
      },
      role: {
        es: "Diseñé y construí la plataforma full-stack completa: la arquitectura de datos, un backend con tiempo real y seguridad de producción, y el frontend con la experiencia del entrenador y la del cliente.",
        en: "I designed and built the complete full-stack platform: the data architecture, a backend with real-time and production-grade security, and the frontend with both the trainer and client experiences.",
      },
      highlights: [
        {
          es: "Gestión de clientes, rutinas y seguimiento de progreso",
          en: "Client management, workouts and progress tracking",
        },
        {
          es: "Chat en tiempo real entre entrenador y cliente",
          en: "Real-time chat between trainer and client",
        },
        {
          es: "Registro de cobros y generación de reportes en PDF",
          en: "Payment tracking and PDF report generation",
        },
        {
          es: "Autenticación con roles y capa de seguridad de producción",
          en: "Role-based authentication and a production-grade security layer",
        },
      ],
      decisions: [
        {
          title: { es: "Prisma + PostgreSQL", en: "Prisma + PostgreSQL" },
          detail: {
            es: "Los datos (clientes, rutinas, pagos) son fuertemente relacionales, así que elegí PostgreSQL con Prisma como ORM. Eso me dio tipado end-to-end entre la base y el código, y migraciones seguras a medida que el modelo crecía.",
            en: "The data (clients, workouts, payments) is strongly relational, so I chose PostgreSQL with Prisma as the ORM. That gave me end-to-end typing between the database and the code, and safe migrations as the model grew.",
          },
        },
        {
          title: { es: "Tiempo real con Socket.io y Redis", en: "Real-time with Socket.io and Redis" },
          detail: {
            es: "El chat y las notificaciones usan Socket.io, con un adapter de Redis para que el sistema escale a múltiples instancias sin perder mensajes ni el estado de presencia de los usuarios.",
            en: "Chat and notifications use Socket.io, with a Redis adapter so the system scales across multiple instances without losing messages or user presence state.",
          },
        },
        {
          title: { es: "Seguridad desde el día uno", en: "Security from day one" },
          detail: {
            es: "Sesiones con JWT, headers endurecidos con Helmet, rate-limiting contra abuso y validación de entrada con Zod en cada endpoint. La seguridad no fue un agregado al final, sino parte del diseño.",
            en: "JWT sessions, hardened headers with Helmet, rate-limiting against abuse and input validation with Zod on every endpoint. Security wasn't a last-minute add-on, it was part of the design.",
          },
        },
        {
          title: { es: "Monorepo con workspaces", en: "Monorepo with workspaces" },
          detail: {
            es: "Backend (Express) y frontend (Next.js) viven en un único repo con npm workspaces, compartiendo tipos y simplificando el desarrollo y el deploy.",
            en: "Backend (Express) and frontend (Next.js) live in a single repo with npm workspaces, sharing types and simplifying development and deployment.",
          },
        },
      ],
    },
  },
  {
    slug: "gymforge",
    title: "GymForge",
    description: {
      es: "App de escritorio Windows para gestión de gimnasios. Offline-first: socios, membresías, caja y control de acceso sin internet.",
      en: "Windows desktop app for gym management. Offline-first: members, memberships, cash register and access control without internet.",
    },
    longDescription: {
      es: "Sistema de gestión de gimnasios para Windows, offline-first, pensado para el mercado AR/LATAM. Maneja socios, membresías, control de acceso, caja con arqueo, cobros y ventas — todo funcionando sin conexión sobre SQLite local. Construido en .NET 9 con Avalonia para la UI, arquitectura limpia con MediatR y FluentValidation, EF Core como ORM y sidecars HTTP para hardware (fiscal, biometría, accesos). Se distribuye como un único .exe autocontenido.",
      en: "Gym management system for Windows, offline-first, designed for the AR/LATAM market. It handles members, memberships, access control, cash register with reconciliation, payments and sales — all working offline on local SQLite. Built in .NET 9 with Avalonia for the UI, clean architecture with MediatR and FluentValidation, EF Core as ORM and HTTP sidecars for hardware (fiscal, biometrics, access). It ships as a single self-contained .exe.",
    },
    tags: [".NET 9", "C#", "Avalonia", "EF Core", "SQLite", "MediatR"],
    featured: true,
    type: "desktop",
    caseStudy: {
      year: "2026",
      context: {
        es: "Muchos gimnasios de Argentina y LATAM trabajan con internet inestable o directamente sin conexión. GymForge es un sistema de gestión de escritorio que funciona 100% offline: socios, membresías, caja y control de acceso, sin depender de la nube ni de un navegador.",
        en: "Many gyms in Argentina and LATAM run on unstable internet or no connection at all. GymForge is a desktop management system that works 100% offline: members, memberships, cash register and access control, without relying on the cloud or a browser.",
      },
      role: {
        es: "Diseñé la arquitectura y desarrollé la aplicación de escritorio en .NET, desde el modelo de datos local y la lógica de negocio hasta la interfaz y la distribución como ejecutable.",
        en: "I designed the architecture and developed the desktop application in .NET, from the local data model and business logic to the interface and distribution as an executable.",
      },
      highlights: [
        {
          es: "Funciona sin internet sobre SQLite local (offline-first)",
          en: "Works without internet on local SQLite (offline-first)",
        },
        {
          es: "Gestión de socios, membresías y control de acceso (gatekeeper)",
          en: "Member, membership and access control management (gatekeeper)",
        },
        {
          es: "Caja con arqueo, cobros y ventas en pesos (ARS)",
          en: "Cash register with reconciliation, payments and sales in pesos (ARS)",
        },
        {
          es: "Se distribuye como un único .exe autocontenido, sin instalación",
          en: "Ships as a single self-contained .exe, no installation required",
        },
      ],
      decisions: [
        {
          title: {
            es: "Avalonia para una UI moderna sobre .NET",
            en: "Avalonia for a modern UI on .NET",
          },
          detail: {
            es: "Elegí Avalonia con patrón MVVM en lugar de atarme a WPF: me dio una UI moderna y la puerta abierta a multiplataforma, sobre .NET 9.",
            en: "I chose Avalonia with the MVVM pattern instead of tying myself to WPF: it gave me a modern UI and an open door to cross-platform, on .NET 9.",
          },
        },
        {
          title: {
            es: "Arquitectura limpia con MediatR",
            en: "Clean architecture with MediatR",
          },
          detail: {
            es: "Separé la lógica en casos de uso con MediatR y validación con FluentValidation. La UI queda fina y el dominio es testeable de forma aislada con xUnit.",
            en: "I separated the logic into use cases with MediatR and validation with FluentValidation. The UI stays thin and the domain is testable in isolation with xUnit.",
          },
        },
        {
          title: {
            es: "Offline-first con EF Core + SQLite",
            en: "Offline-first with EF Core + SQLite",
          },
          detail: {
            es: "Toda la data vive en SQLite local en modo WAL. La app no necesita internet para operar; una sincronización con PostgreSQL en la nube queda planteada como evolución futura.",
            en: "All data lives in local SQLite in WAL mode. The app doesn't need internet to operate; cloud sync with PostgreSQL is planned as a future evolution.",
          },
        },
        {
          title: { es: "Sidecars para hardware", en: "Sidecars for hardware" },
          detail: {
            es: "El control fiscal, la biometría y los lectores de acceso se manejan como servicios HTTP locales (sidecars), desacoplando el hardware del resto de la aplicación.",
            en: "Fiscal control, biometrics and access readers are handled as local HTTP services (sidecars), decoupling the hardware from the rest of the application.",
          },
        },
      ],
    },
  },
  {
    slug: "raffles-platform",
    title: "Raffles Platform",
    description: {
      es: "Plataforma web para crear y participar en rifas. Autenticación, dashboard de usuario y UI animada.",
      en: "Web platform to create and join raffles. Authentication, user dashboard and animated UI.",
    },
    longDescription: {
      es: "Aplicación full-stack para la gestión de rifas online. Incluye sistema de autenticación, dashboard personal, creación de rifas con fecha de cierre y UI con animaciones Framer Motion.",
      en: "Full-stack application for managing online raffles. It includes an authentication system, a personal dashboard, raffle creation with a closing date and a UI with Framer Motion animations.",
    },
    tags: ["React", "Node.js", "MongoDB", "Framer Motion", "Radix UI"],
    githubUrl: "https://github.com/ManuelHidalgo26/Raffles",
    featured: false,
    type: "fullstack",
    caseStudy: {
      year: "2025",
      context: {
        es: "Organizar rifas a mano es un lío: vender los números, llevar registro de quién pagó y sortear con transparencia. Raffles es una plataforma para crear y gestionar rifas online de punta a punta.",
        en: "Running raffles by hand is a mess: selling the numbers, keeping track of who paid and drawing transparently. Raffles is a platform to create and manage online raffles end to end.",
      },
      role: {
        es: "Construí la aplicación full-stack: la autenticación, el dashboard de usuario, la creación de rifas y la interfaz con animaciones.",
        en: "I built the full-stack application: authentication, the user dashboard, raffle creation and the animated interface.",
      },
      highlights: [
        {
          es: "Creación de rifas con fecha de cierre y cantidad de números",
          en: "Raffle creation with a closing date and a number of tickets",
        },
        {
          es: "Autenticación de usuarios y dashboard personal",
          en: "User authentication and personal dashboard",
        },
        {
          es: "Interfaz animada con Framer Motion y componentes accesibles",
          en: "Animated interface with Framer Motion and accessible components",
        },
      ],
      decisions: [
        {
          title: { es: "React + Vite", en: "React + Vite" },
          detail: {
            es: "Frontend en React con Vite para un desarrollo ágil y un bundle liviano, en una SPA centrada en el dashboard del usuario.",
            en: "React frontend with Vite for agile development and a lightweight bundle, in a SPA centered on the user dashboard.",
          },
        },
        {
          title: { es: "Backend Node + MongoDB", en: "Node + MongoDB backend" },
          detail: {
            es: "API en Node con MongoDB para usuarios y rifas, con autenticación basada en tokens y un modelo de datos simple de iterar.",
            en: "Node API with MongoDB for users and raffles, with token-based authentication and a data model that's simple to iterate.",
          },
        },
        {
          title: { es: "UX con Radix + Framer Motion", en: "UX with Radix + Framer Motion" },
          detail: {
            es: "Componentes accesibles de Radix UI como base, y Framer Motion para transiciones que hacen la experiencia más pulida y clara.",
            en: "Accessible Radix UI components as the base, and Framer Motion for transitions that make the experience more polished and clear.",
          },
        },
      ],
    },
  },
];

// ── Helpers ──────────────────────────────────────────────────

function localizeCaseStudy(cs: CaseStudy, locale: Locale): LocalizedCaseStudy {
  return {
    year: cs.year,
    context: cs.context[locale],
    role: cs.role[locale],
    highlights: cs.highlights.map((h) => h[locale]),
    decisions: cs.decisions.map((d) => ({
      title: d.title[locale],
      detail: d.detail[locale],
    })),
  };
}

export function localizeProject(p: Project, locale: Locale): LocalizedProject {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description[locale],
    longDescription: p.longDescription[locale],
    tags: p.tags,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    featured: p.featured,
    type: p.type,
    typeLabel: typeMeta[p.type].label[locale],
    caseStudy: p.caseStudy ? localizeCaseStudy(p.caseStudy, locale) : undefined,
  };
}

export function getProjects(locale: Locale): LocalizedProject[] {
  return projects.map((p) => localizeProject(p, locale));
}

export function getProject(
  slug: string,
  locale: Locale
): LocalizedProject | undefined {
  const p = projects.find((proj) => proj.slug === slug);
  return p ? localizeProject(p, locale) : undefined;
}
