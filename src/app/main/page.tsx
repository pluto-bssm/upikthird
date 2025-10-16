"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import PopularVote from "@/components/main/PopularVote";
import GuideComponent from "@/components/guide/GuideComponent";
import RecoVoteCard from "@/components/main/RecoVoteCard";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import { Book, VoteMain } from "../../../public/svg/svg";

export default function Main() {
  return (
    <GuideLayout>
      <Header types="default and no navi" />
      <MainContent>
        <Section>
          <GuideList>
            <RecoVoteCard />
          </GuideList>
        </Section>

        <Section>
          <SectionHeader>
            <Book width="24" height="24" />
            <SectionTitle>인기 가이드</SectionTitle>
          </SectionHeader>
          <GuideList>
            <GuideComponent sortBy="like" limit={3} />
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
            <GuideComponent sortBy="date" limit={3} />
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

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 70px;
  padding-bottom: 100px;
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

const SectionTitle = styled.h2`
  margin: 0;
  font-family: "Pretendard";
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
    background: ${color.white};
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
