import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import { getAuthCookie } from "./cookie";
import {
  PUBLIC_ROUTES,
  API_PUBLIC_PREFIX,
  ADMIN_ROUTES,
} from "@/constants/auth";

export async function withAuth(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Izinkan API auth & file statik
  if (pathname.startsWith(API_PUBLIC_PREFIX) || pathname.startsWith("/_next")) {
    console.log("Allowing API/static path");
    return NextResponse.next();
  }

  const token = getAuthCookie(req);
  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  console.log("Auth state:", {
    hasToken: !!token,
    isPublic,
    isAdminRoute,
    publicRoutes: PUBLIC_ROUTES,
    adminRoutes: ADMIN_ROUTES,
  });

  // Jika punya token & akses halaman publik → redirect ke dashboard
  if (token && (await verifyToken(token)) && isPublic) {
    const payload = await verifyToken(token);
    console.log("User authenticated, redirecting from public page:", payload);
    if (payload?.role === "ADMIN") {
      console.log("Redirecting admin to /admin");
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    console.log("Redirecting user to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Jika tidak punya token & akses halaman privat → redirect login
  if (!token || !(await verifyToken(token))) {
    if (!isPublic) {
      console.log("No valid token, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    console.log("No token but accessing public page, allowing");
    return NextResponse.next();
  }

  // Cek akses admin
  if (isAdminRoute) {
    const payload = await verifyToken(token);
    console.log("Checking admin access:", payload);
    if (payload?.role !== "ADMIN") {
      console.log("Non-admin accessing admin route, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  console.log("Allowing request to proceed");
  return NextResponse.next();
}
