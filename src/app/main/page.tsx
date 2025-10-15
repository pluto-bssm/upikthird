'use client'

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import PopularVote from "@/components/main/PopularVote";
import GuideComponent from "@/components/guide/GuideComponent";
import VoteCard from "@/components/main/VoteCard";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import { Book, VoteMain } from '../../../public/svg/svg';

export default function Main() {
  return (
    <GuideLayout>
      <Header types="default and no navi" />
      <MainContent>
        <FeaturedVote>
          <FeaturedVoteContent>
            <VoteHeader>
              <VoteLabel>오늘의 추천 투표는?</VoteLabel>
              <VoteTitle>이중에 뭐가 더 싫어?</VoteTitle>
            </VoteHeader>
            <VoteOptions>
              <VoteOption>최병준쌤과 헬스 3시간</VoteOption>
              <VoteVS>VS</VoteVS>
              <VoteOption>규봉쌤과 수학풀이 5시간</VoteOption>
            </VoteOptions>
          </FeaturedVoteContent>
          <VoteLink>
            투표하러 가기
            <Arrow>
              <svg width="4" height="6" viewBox="0 0 4 6" fill="none">
                <path d="M0.5 0.5L3.5 3L0.5 5.5" stroke="#FF9F1C" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Arrow>
          </VoteLink>
        </FeaturedVote>

        
        <Section>
          <SectionHeader>
            <Book width="24" height="24" />
            <SectionTitle>인기 가이드</SectionTitle>
          </SectionHeader>
          <GuideList>
            <PopularVote />
          </GuideList>
        </Section>

        
        <Section>
          <SectionHeader>
            <VoteMain width="24" height="24" />
            <SectionTitle>인기 투표</SectionTitle>
          </SectionHeader>
          <VoteScrollContainer>
            <PopularVote />
          </VoteScrollContainer>
        </Section>

        <Section>
          <SectionHeader>
          <Book width="24" height="24" />
            <SectionTitle>오늘의 가이드</SectionTitle>
          </SectionHeader>
          <GuideList>
            <GuideComponent />
          </GuideList>
        </Section>
      </MainContent>
      <NavigationBar />
    </GuideLayout>
  );
}

const GuideLayout = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex; 
    justify-content: center;
    background-color: ${color.white};
    min-height: 100vh;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 20px;
  color: ${color.black};
  margin: 0;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;
`;

const FeaturedVote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  padding: 16px 20px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`;

const FeaturedVoteContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const VoteHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VoteLabel = styled.p`
  margin: 0;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  color: ${color.gray300};
`;

const VoteTitle = styled.p`
  margin: 0;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 15px;
  line-height: normal;
  color: ${color.black};
`;

const VoteOptions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const VoteOption = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 13px;
  line-height: normal;
  color: ${color.black};
  white-space: pre;
`;

const VoteVS = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 13px;
  line-height: normal;
  color: ${color.primary};
  white-space: pre;
`;

const VoteLink = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  color: ${color.primary};
  cursor: pointer;
  white-space: pre;
`;

const Arrow = styled.div`
  width: 4px;
  height: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 37px;
  color: ${color.gray700};
`;

const SectionIcon = styled.div`
  width: 24px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  color: ${color.gray600};
  text-align: center;
  white-space: pre;
`;

const GuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VoteScrollContainer = styled.div`
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.gray300};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${color.gray400};
  }

  > * {
    min-width: 313px;
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  padding: 10px 36px 20px;
  background-color: ${color.white};
  position: sticky;
  bottom: 0;
  box-sizing: border-box;
`;

const FooterButton = styled.button<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 35px;
`;

const FooterIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLabel = styled.span<{ active?: boolean }>`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  color: ${props => props.active ? color.black : color.gray300};
  text-align: center;
  min-width: min-content;
`;
