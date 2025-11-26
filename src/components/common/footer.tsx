"use client";

import styled from "@emotion/styled";
import { useRouter, usePathname } from "next/navigation";
import color from "@/packages/design-system/src/color";
import {
  HomeIcon,
  VoteIcon,
  GuideIcon,
  DashboardIcon,
} from "../../../public/svg/svg";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    const result = pathname.includes(path);
    console.log(`경로: ${pathname}, 체크: ${path}, 결과: ${result}`);
    return result;
  };

  console.log("현재 pathname:", pathname);

  return (
    <StyledFooter>
      <FooterItem onClick={() => router.push("/main")}>
        <IconWrapper>
          <HomeIcon 
            width="24" 
            height="24"
            fill={isActive("main") ? color.black : color.gray300}
          />
        </IconWrapper>
        <Label isActive={isActive("main")}>메인</Label>
      </FooterItem>
      
      <FooterItem onClick={() => router.push("/vote")}>
        <IconWrapper>
          <VoteIcon 
            width="24" 
            height="24"
            fill={isActive("vote") ? color.black : color.gray300}
          />
        </IconWrapper>
        <Label isActive={isActive("vote")}>투표</Label>
      </FooterItem>
      
      <FooterItem onClick={() => router.push("/guide")}>
        <IconWrapper>
          <GuideIcon 
            width="24" 
            height="24"
            fill={isActive("guide") ? color.black : color.gray300}
          />
        </IconWrapper>
        <Label isActive={isActive("guide")}>가이드</Label>
      </FooterItem>
      
      <FooterItem onClick={() => router.push("/question")}>
        <IconWrapper>
          <DashboardIcon 
            width="24" 
            height="24"
            fill={isActive("question") ? color.black : color.gray300}
          />
        </IconWrapper>
        <Label isActive={isActive("question")}>질문게시판</Label>
      </FooterItem>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  display: flex;
  gap: 69px;
  align-items: flex-end;
  justify-content: center;
  padding: 20px 36px 60px;
  background-color: ${color.white};
  box-shadow:
    -4px -4px 10px 0px rgba(0, 0, 0, 0.03),
    4px 4px 10px 0px rgba(0, 0, 0, 0.03);
  border-top: 1px solid ${color.gray300};
`;

const FooterItem = styled.button`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 35px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Label = styled.p<{ isActive?: boolean }>`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${({ isActive }) => (isActive ? color.black : color.gray300)};
  line-height: 1;
  margin: 0;
  white-space: nowrap;
`;
