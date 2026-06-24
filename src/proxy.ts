import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Aplica a todo menos /api, internos de Next/Vercel y archivos con punto (assets)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
