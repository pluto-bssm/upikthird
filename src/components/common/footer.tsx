'use client';

import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';
import color from '@/packages/design-system/src/color';

const homeIcon = 'http://localhost:3845/assets/e7b88aa4ac4b416ec86c4ea71c3a1bb442b68bdd.svg';
const voteIcon = 'http://localhost:3845/assets/aa3c3db24af2a127ae8b91c785279f056201d7c1.svg';
const guideIcon = 'http://localhost:3845/assets/59ea10440f2023777c00417d535e4eb8c0464c48.svg';
const dashboardIcon = 'http://localhost:3845/assets/f17744c41d0ed4aaaf22adae6861befd7ef81599.svg';

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.includes(path);

  return (
    <StyledFooter>
      <FooterItem onClick={() => router.push('/')} isActive={isActive('/')}>
        <IconWrapper>
          <img src={homeIcon} alt="home" width="24" height="24" />
        </IconWrapper>
        <Label>메인</Label>
      </FooterItem>
      <FooterItem onClick={() => router.push('/vote')} isActive={isActive('vote')}>
        <IconWrapper>
          <img src={voteIcon} alt="vote" width="24" height="24" />
        </IconWrapper>
        <Label>투표</Label>
      </FooterItem>
      <FooterItem onClick={() => router.push('/guide')} isActive={isActive('guide')}>
        <IconWrapper>
          <img src={guideIcon} alt="guide" width="24" height="24" />
        </IconWrapper>
        <Label>가이드</Label>
      </FooterItem>
      <FooterItem onClick={() => router.push('/question')} isActive={isActive('question')}>
        <IconWrapper>
          <img src={dashboardIcon} alt="question" width="24" height="24" />
        </IconWrapper>
        <Label>질문게시판</Label>
      </FooterItem>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div`
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
  padding: 10px 36px 20px;
  background-color: ${color.white};
  box-shadow: -4px -4px 10px 0px rgba(0, 0, 0, 0.03),
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
