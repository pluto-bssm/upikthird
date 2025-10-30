import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const tokenResponse = await fetch(
      `https://upik-659794985248.asia-northeast3.run.app/auth/code?code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );


    if (!tokenResponse.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const tokenData = await tokenResponse.json();
    const accessToken =
      tokenData.accessToken ||
      tokenData.data?.accessToken ||
      tokenData.access_token;
    const refreshToken =
      tokenData.refreshToken ||
      tokenData.data?.refreshToken ||
      tokenData.refresh_token;

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const redirectUrl = new URL("/oauth/callback/success", request.url);
    redirectUrl.searchParams.append("accessToken", accessToken);
    if (refreshToken) {
      redirectUrl.searchParams.append("refreshToken", refreshToken);
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
