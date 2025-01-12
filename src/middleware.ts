import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = request.nextUrl;

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/chat-bot", request.url));
  }

  // If the user is not logged in and accessing "/" or "/chat-bot", redirect to "/auth"
  if (!token && (pathname === "/" || pathname === "/chat-bot")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ["/", "/chat-bot"],
};
