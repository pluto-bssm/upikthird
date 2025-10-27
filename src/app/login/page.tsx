'use client';

import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import color from '@/packages/design-system/src/color';
import UpikLogo from '@/../public/svg/UpikLogo';
import { GoogleIcon } from '@/../public/svg/GoogleIcon';

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    router.push('/vote');
  };

  return (
    <Container>
      <Content>
        <LogoSection>
          <Logo>
            <UpikLogo width="137" height="auto" />
          </Logo>
          <Tagline>재학생이 만드는 학교 가이드</Tagline>
        </LogoSection>

        <GoogleLoginButton onClick={handleGoogleLogin}>
          <GoogleIconWrapper>
            <GoogleIcon width="20" height="20" />
          </GoogleIconWrapper>
          <GoogleLoginText>구글로 로그인</GoogleLoginText>
        </GoogleLoginButton>
      </Content>

      <Footer>
        <FooterText>PLUTO</FooterText>
      </Footer>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 160px;
  flex: 1;
  width: 100%;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.div`
  width: 137px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tagline = styled.p`
  font-family: Sacheon_Hanggong_OTF, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.black};
  text-align: center;
  line-height: 1;
  margin: 0;
`;

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 165px;
  height: 36px;
  border: 1px solid ${color.gray300};
  border-radius: 16px;
  background-color: ${color.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${color.gray50};
  }

  &:active {
    opacity: 0.8;
  }
`;

const GoogleIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const GoogleIconImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const GoogleLoginText = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${color.gray300};
  line-height: 1;
  margin: 0;
  white-space: nowrap;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
`;

const FooterText = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.gray200};
  text-align: center;
  line-height: 1;
  margin: 0;
`;
