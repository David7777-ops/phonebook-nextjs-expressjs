import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { vars } from "@/lib/config/vars";
import { API_URL } from "@/lib/config/constants";

const jwtSecret = new TextEncoder().encode(vars.auth.jwt.secret);

export async function middleware(request: NextRequest) {
  if (
    ["/", "/new"].includes(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith("/edit")
  ) {
    const accessToken = request.cookies.get("accessToken");
    if (!accessToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("refreshToken");
      return response;
    }

    try {
      await jwtVerify(accessToken.value, jwtSecret);
      return NextResponse.next();
    } catch (error: any) {
      if (error.name === "JWTExpired") {
        const refreshToken = request.cookies.get("refreshToken");
        if (!refreshToken) {
          const response = NextResponse.redirect(
            new URL("/login", request.url)
          );
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          return response;
        }
        const headers = new Headers({
          Cookie: `${refreshToken.name}=${refreshToken.value}; `,
        });
        const responseAccessToken = await fetch(`${API_URL}/refresh-token`, {
          headers,
        });
        const resJson = await responseAccessToken.json();
        if (resJson.success) {
          const response = NextResponse.next();
          response.cookies.set({
            name: "accessToken",
            value: resJson.accessToken,
            maxAge: 24 * 60 * 60,
            httpOnly: true,
          });
          return response;
        }
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    const accessToken = request.cookies.get("accessToken");

    const response = NextResponse.next();
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    if (accessToken) {
      if (await jwtVerify(accessToken.value, jwtSecret)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return response;
  }
}
