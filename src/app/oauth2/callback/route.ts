import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    console.log('🔐 OAuth2 Callback - Code received:', code);

    if (!code) {
      console.error('❌ No code in callback');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 백엔드에 code를 보내서 token 받기
    console.log('🔄 Exchanging code for token at /auth/code');
    const tokenResponse = await fetch(`https://upik-659794985248.asia-northeast3.run.app/auth/code?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Token response status:', tokenResponse.status);

    if (!tokenResponse.ok) {
      console.error('❌ Token exchange failed:', tokenResponse.status);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 1. authorization 헤더에서 accessToken 추출
    let accessToken = tokenResponse.headers.get('authorization') || '';
    console.log('✅ accessToken from authorization header:', accessToken ? '✅ Found' : '❌ Not found');

    // 2. set-cookie 헤더에서 refreshToken 추출
    let refreshToken = '';
    const setCookieHeader = tokenResponse.headers.get('set-cookie') || '';
    if (setCookieHeader.includes('refreshToken=')) {
      const match = setCookieHeader.match(/refreshToken=([^;]+)/);
      if (match) {
        refreshToken = match[1];
        console.log('✅ refreshToken from set-cookie header:', refreshToken ? '✅ Found' : '❌ Not found');
      }
    }

    if (!accessToken) {
      console.error('❌ No access token found');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 쿼리 파라미터로 클라이언트 페이지로 리다이렉트
    const redirectUrl = new URL('/oauth2/callback/success', request.url);
    redirectUrl.searchParams.append('accessToken', accessToken);
    if (refreshToken) {
      redirectUrl.searchParams.append('refreshToken', refreshToken);
    }

    console.log('🎯 Redirecting to success page with tokens');
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
