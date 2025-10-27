'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/common/header"
import NavigationBar from "@/components/common/navigationbar"
import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constant';

const VotePage = () =>{
    const router = useRouter();

    React.useEffect(() => {
      const token = Storage.getItem(TOKEN.ACCESS);
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return (
        <VoteLayout>
            <Header types={'default'}/>
            <NavigationBar />
        </VoteLayout>
    )   

}

export default VotePage;

const VoteLayout = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex; 
    justify-content: center;
    background-color: ${color.white};
    min-height: 100vh;
`