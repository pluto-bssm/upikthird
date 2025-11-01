import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const tokenBaseUrl =
      process.env.NEXT_PUBLIC_OAUTH_URL ||
      "http://localhost:8080/auth/code?code=";
    const tokenUrl = `${tokenBaseUrl}${code}`;

    const tokenResponse = await fetch(tokenUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    let accessToken = "";
    let refreshToken = "";

    try {
      const responseText = await tokenResponse.text();

      if (responseText) {
        const responseBody = JSON.parse(responseText);
        accessToken =
          responseBody?.data?.accessToken ||
          responseBody?.accessToken ||
          responseBody?.access_token ||
    } catch (parseError) {
      console.error("Failed to parse token response:", parseError);
          "";
      }
    } catch (parseError) {}

    if (!accessToken) {
      accessToken =
        tokenResponse.headers.get("access-token") ||
        tokenResponse.headers.get("accessToken") ||
        tokenResponse.headers.get("x-access-token") ||
        tokenResponse.headers.get("authorization") ||
    const setCookieHeader = tokenResponse.headers.get("set-cookie");
    if (setCookieHeader && setCookieHeader.includes("refreshToken=")) {
      const match = setCookieHeader.match(/refreshToken=([^;]+)/);
      if (match) {
        refreshToken = match[1];
        if (match) {
          refreshToken = match[1];
        }
      }
    }

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const redirectUrl = new URL("/oauth2/callback/success", request.url);

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("accessToken", accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    if (refreshToken) {
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
