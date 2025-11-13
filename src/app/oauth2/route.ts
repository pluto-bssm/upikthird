import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${error}`, request.url),
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/login?error=no_code", request.url),
      );
    }

    const tokenUrl = `https://heodongun.com/auth/code?code=${code}`;

    let tokenResponse;
    try {
      tokenResponse = await fetch(tokenUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (fetchError) {
      void fetchError;
      return NextResponse.redirect(
        new URL("/login?error=network_error", request.url),
      );
    }

    if (!tokenResponse.ok) {
      return NextResponse.redirect(
        new URL(`/login?error=token_api_failed`, request.url),
      );
    }

    let tokenData;
    try {
      tokenData = await tokenResponse.json();
    } catch (parseError) {
      void parseError;
      return NextResponse.redirect(
        new URL("/login?error=invalid_response", request.url),
      );
    }

    const accessToken =
      tokenData?.accessToken ||
      tokenData?.data?.accessToken ||
      tokenData?.access_token ||
      tokenData?.data?.access_token ||
      tokenData?.token ||
      tokenData?.data?.token ||
      "";

    const refreshToken =
      tokenData?.refreshToken ||
      tokenData?.data?.refreshToken ||
      tokenData?.refresh_token ||
      tokenData?.data?.refresh_token ||
      "";

    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/login?error=no_access_token", request.url),
      );
    }

    const callbackUrl = new URL("/oauth2/callback", request.url);
    callbackUrl.searchParams.append("accessToken", accessToken);
    if (refreshToken) {
      callbackUrl.searchParams.append("refreshToken", refreshToken);
    }

    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    void error;
    return NextResponse.redirect(
      new URL("/login?error=server_error", request.url),
    );
  }
}
