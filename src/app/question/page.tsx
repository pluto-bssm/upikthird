'use client';

import React from 'react';
import styled from '@emotion/styled';
import Header from '@/components/common/header';
import { QuestionList } from '@/components/question/QuestionList';
import color from '@/packages/design-system/src/color';

interface Question {
  id: string;
  title: string;
  author: string;
  date: string;
  category: '학교생활' | '기숙사' | '유머';
  categoryEmoji: string;
  likeCount: number;
  commentCount: number;
}

const mockQuestions: Question[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  title: '질문 제목 예시 ' + (i + 1),
  author: '작성자' + (i % 3 + 1),
  date: '2025-08-31 21:31',
  category: (['학교생활', '기숙사', '유머'] as const)[i % 3],
  categoryEmoji: ['🏫', '⛺️', '😁'][i % 3],
  likeCount: (i + 1) * 5,
  commentCount: (i + 1) * 2,
}));

const QuestionPage = () => {
  const [activeTab, setActiveTab] = React.useState<'all' | 'popular'>('all');

  return (
    <StyledQuestionPage>
      <Header types="question" text="질문 게시판" />
      <TabContainer>
        <Tab
          isActive={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
        >
          전체
        </Tab>
        <Divider />
        <Tab
          isActive={activeTab === 'popular'}
          onClick={() => setActiveTab('popular')}
        >
          인기
        </Tab>
      </TabContainer>
      <QuestionPageContent>
        <QuestionList
          questions={mockQuestions}
        />
      </QuestionPageContent>
    </StyledQuestionPage>
  );
};

export default QuestionPage;

const StyledQuestionPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
`;

const QuestionPageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 15px;
  height: 50px;
  align-items: center;
  padding: 15px 20px;
  background-color: ${color.white};
  border-bottom: 1px solid ${color.gray300};
  position: sticky;
  top: 80px;
  z-index: 10;
`;

interface TabProps {
  isActive: boolean;
}

const Tab = styled.button<TabProps>`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: ${props => props.isActive ? 600 : 400};
  color: ${props => props.isActive ? color.primary : color.black};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Divider = styled.div`
  width: 0;
  height: 10px;
  border-left: 1px solid ${color.black};
`;
