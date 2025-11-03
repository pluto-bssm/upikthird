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

  const isActive = (path: string) => pathname?.includes(path);

  return (
    <StyledFooter>
      <FooterItem onClick={() => router.push("/")} isActive={isActive("/")}>
        <IconWrapper>
          <HomeIcon width="24" height="24" />
        </IconWrapper>
        <Label>메인</Label>
      </FooterItem>
      <FooterItem
        onClick={() => router.push("/vote")}
        isActive={isActive("vote")}
      >
        <IconWrapper>
          <VoteIcon width="24" height="24" />
        </IconWrapper>
        <Label>투표</Label>
      </FooterItem>
      <FooterItem
        onClick={() => router.push("/guide")}
        isActive={isActive("guide")}
      >
        <IconWrapper>
          <GuideIcon width="24" height="24" />
        </IconWrapper>
        <Label>가이드</Label>
      </FooterItem>
      <FooterItem
        onClick={() => router.push("/question")}
        isActive={isActive("question")}
      >
        <IconWrapper>
          <DashboardIcon width="24" height="24" />
        </IconWrapper>
        <Label>질문게시판</Label>
      </FooterItem>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div`
  z-index : 100;
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

const FooterItem = styled.button<{ isActive: boolean }>`
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

const Label = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray300};
  line-height: 1;
  margin: 0;
  white-space: nowrap;
`;
