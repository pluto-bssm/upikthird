import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const tokenBaseUrl = process.env.NEXT_PUBLIC_OAUTH_URL || "http://localhost:8080/auth/code?code=";
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
      const tokenData = await tokenResponse.json();
      accessToken = tokenData?.data?.accessToken ||
        tokenData?.accessToken ||
        tokenData?.access_token ||
        "";
      refreshToken = tokenData?.data?.refreshToken ||
        tokenData?.refreshToken ||
        tokenData?.refresh_token ||
        "";

    if (!accessToken) {
      accessToken = tokenResponse.headers.get("access-token") ||
        tokenResponse.headers.get("accessToken") ||
        tokenResponse.headers.get("x-access-token") ||
        tokenResponse.headers.get("authorization") ||
        "";
    }

    if (!refreshToken) {
      const setCookieHeader = tokenResponse.headers.get("set-cookie");
      if (setCookieHeader && setCookieHeader.includes("refreshToken=")) {
        const match = setCookieHeader.match(/refreshToken=([^;]+)/);
        if (match) {
          refreshToken = match[1];
        }
      }
    }

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const redirectUrl = new URL("/oauth2/callback", request.url);
    redirectUrl.searchParams.append("accessToken", accessToken);
    if (refreshToken) {
      redirectUrl.searchParams.append("refreshToken", refreshToken);
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
