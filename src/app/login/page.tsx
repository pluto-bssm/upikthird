"use client";

import React, { Suspense, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "next/navigation";
import color from "@/packages/design-system/src/color";
import UpikLogo from "@/../public/svg/UpikLogo";
import { GoogleIcon } from "@/../public/svg/GoogleIcon";

const LoginContent = () => {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      const errorMap: Record<string, string> = {
        access_denied: "로그인이 거부되었습니다",
        no_code: "인증 코드를 받지 못했습니다",
        token_failed: "토큰 발급에 실패했습니다",
        token_api_failed: "백엔드 토큰 API 호출 실패",
        no_access_token: "응답에 액세스 토큰이 없습니다",
        no_token: "토큰을 받지 못했습니다",
        server_error: "서버 오류가 발생했습니다",
        network_error: "네트워크 연결 오류",
        invalid_response: "유효하지 않은 응답 형식",
      };
      setErrorMessage(errorMap[error] || `오류: ${error}`);
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth2`);
    const authUrl = `https://heodongun.com/oauth2/authorization/google?redirect_uri=${redirectUri}`;

    window.location.href = authUrl;
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

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

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

const LoginPage = () => {
  return (
    <Suspense fallback={<Container><Content /></Container>}>
      <LoginContent />
    </Suspense>
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

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
  max-width: 300px;
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
