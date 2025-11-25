"use client";

import styled from "@emotion/styled";
import { QuestionItem } from "./QuestionItem";
import type { Board } from "@/types/graphql";

interface QuestionListProps {
  questions: Board[];
}

export const QuestionList = ({ questions }: QuestionListProps) => {
  return (
    <StyledQuestionList>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </StyledQuestionList>
  );
};

const StyledQuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 95%;
`;
