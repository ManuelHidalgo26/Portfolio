import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers de las APIs de navegación de Next.js que respetan el routing localizado
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
