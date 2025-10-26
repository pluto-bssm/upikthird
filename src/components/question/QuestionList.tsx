'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import { QuestionItem } from './QuestionItem';

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

interface QuestionListProps {
  questions: Question[];
}

export const QuestionList = ({
  questions,
}: QuestionListProps) => {
  return (
    <StyledQuestionList>
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
        />
      ))}
    </StyledQuestionList>
  );
};

const StyledQuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;
