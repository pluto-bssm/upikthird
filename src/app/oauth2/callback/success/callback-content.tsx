'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constant';

export default function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    console.log('🔐 OAuth Callback');
    console.log('📍 Access Token:', accessToken ? '✅ Received' : '❌ Not found');
    console.log('📍 Refresh Token:', refreshToken ? '✅ Received' : '❌ Not found');

    if (accessToken) {
      Storage.setItem(TOKEN.ACCESS, accessToken);
      console.log('💾 Access token saved to localStorage');
    }

    if (refreshToken) {
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      console.log('💾 Refresh token saved to localStorage');
    }

    if (accessToken && refreshToken) {
      console.log('✅ Both tokens saved, redirecting to /my');
      router.push('/my');
    } else if (accessToken) {
      console.log('✅ Access token saved, redirecting to /my');
      router.push('/my');
    } else {
      console.log('❌ No tokens received, redirecting to /login');
      router.push('/login');
    }
  }, [searchParams, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>로그인 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
