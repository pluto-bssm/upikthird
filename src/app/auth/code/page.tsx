'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constant';

const AuthCodeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    console.log('🔐 Auth Code - Received code:', code ? '✅ Found' : '❌ Not found');
    console.log('🔐 Auth Code - Received accessToken:', accessToken ? '✅ Found' : '❌ Not found');

    if (accessToken) {
      Storage.setItem(TOKEN.ACCESS, accessToken);
      console.log('✅ Access token stored in localStorage');
    }

    if (refreshToken) {
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      console.log('✅ Refresh token stored in localStorage');
    }

    if (accessToken || refreshToken) {
      console.log('✅ Tokens saved, redirecting to /my');
      router.push('/my');
    } else if (code) {
      console.log('⏳ Code received, exchanging for token...');
      // 여기서 code를 백엔드에 보내서 token을 받을 수 있음
      router.push('/my');
    } else {
      console.log('❌ No tokens or code found in URL, redirecting to /login');
      router.push('/login');
    }
  }, [searchParams, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>로그인 처리 중...</p>
    </div>
  );
};

const AuthCodePage = () => {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <AuthCodeContent />
    </Suspense>
  );
};

export default AuthCodePage;
