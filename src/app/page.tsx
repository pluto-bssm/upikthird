'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from "@emotion/styled";
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constant';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = Storage.getItem(TOKEN.ACCESS);
    if (!token) {
      router.push('/login');
    }
  }, [router]);

    return (
      <MainLayout>
      </MainLayout>
    );
}

const MainLayout = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
`