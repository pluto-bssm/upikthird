"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
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
  gap: 4px;
  width: 100%;
`;
