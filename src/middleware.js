import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Redirect unauthenticated users trying to access protected pages
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow request to proceed if authenticated
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*"], // Applies to all /dashboard pages
};
