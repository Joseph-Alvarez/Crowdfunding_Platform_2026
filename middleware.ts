import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Definir las rutas públicas (no requieren autenticación)
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/dashboard/inversor",
  "/contact",
  "/auth/(.*)",
]);

// Middleware principal de Clerk
export default clerkMiddleware((auth, req: NextRequest) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

// Configuración de Next.js para aplicar el middleware
export const config = {
  matcher: [
    // Excluir archivos internos y estáticos de Next.js
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Siempre ejecutar en rutas API
    "/(api|trpc)(.*)",
  ],
};
