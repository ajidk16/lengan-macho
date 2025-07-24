import type { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";

export function middleware(req: NextRequest) {
  return withAuth(req);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
