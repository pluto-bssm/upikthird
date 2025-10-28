import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    console.log('🔐 OAuth2 Code received:', code);

    if (!code) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 백엔드에 code를 보내서 token 받기
    const tokenResponse = await fetch(`https://upik-659794985248.asia-northeast3.run.app/auth/code?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!tokenResponse.ok) {
      console.error('❌ Token exchange failed:', tokenResponse.status);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const tokenData = await tokenResponse.json();
    console.log('✅ Token received from backend:', JSON.stringify(tokenData, null, 2));

    // 클라이언트 페이지로 리다이렉트하면서 토큰 전달
    const accessToken = tokenData.data?.accessToken || tokenData.accessToken || tokenData.access_token;
    const refreshToken = tokenData.data?.refreshToken || tokenData.refreshToken || tokenData.refresh_token;

    console.log('🔍 Extracted accessToken:', accessToken ? '✅' : '❌');
    console.log('🔍 Extracted refreshToken:', refreshToken ? '✅' : '❌');

    if (!accessToken) {
      console.error('❌ No access token in response. Response structure:', tokenData);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 쿼리 파라미터로 클라이언트 페이지로 리다이렉트
    const redirectUrl = new URL('/oauth2/callback', request.url);
    redirectUrl.searchParams.append('accessToken', accessToken);
    if (refreshToken) {
      redirectUrl.searchParams.append('refreshToken', refreshToken);
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
