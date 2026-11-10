import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth";

const publicRoutes = ["/"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((route) => pathname === route);
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublicRoute || !isAuthRoute) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
