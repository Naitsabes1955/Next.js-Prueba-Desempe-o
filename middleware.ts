import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/favorites" || pathname.startsWith("/favorites")) {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favorites", "/favorites/:path*"],
};
