import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "./lib/data/controllers/auth.controller";

export async function middleware(request: NextRequest) {
  if (
    ["/", "/new"].includes(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith("/edit")
  ) {
    const accessToken = request.cookies.get("accessToken");
    if (!accessToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      return response;
    }
    try {
      const valid = await jwtVerify(accessToken.value);
      if (valid) {
        return NextResponse.next();
      } else {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("accessToken");
        return response;
      }
    } catch (error: any) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      return response;
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    const accessToken = request.cookies.get("accessToken");
    const response = NextResponse.next();
    response.cookies.delete("accessToken");
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  }
}
