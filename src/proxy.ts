import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const SESSION_SECRET = process.env.SESSION_SECRET || "alcao-admin-secret-key";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "alcao2024";

function validateToken(token: string): boolean {
  const expected = btoa(`${ADMIN_PASSWORD}:${SESSION_SECRET}:admin-session`);
  return token === expected;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (not /api/admin/auth which is the login endpoint)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow the auth API endpoint through
  if (pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  const session = request.cookies.get("admin_session");

  if (!session || !validateToken(session.value)) {
    // For API routes, return 401
    if (pathname.startsWith("/api/admin")) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // For admin pages, let the layout handle showing the login form
    // We pass a header so the layout knows auth failed
    const response = NextResponse.next();
    response.headers.set("x-admin-auth", "false");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("x-admin-auth", "true");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
