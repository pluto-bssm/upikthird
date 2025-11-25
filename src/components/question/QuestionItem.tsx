"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import type { Board } from "@/types/graphql";
import font from "@/packages/design-system/src/font";
import Comments from "../../../public/svg/Comments";
import { Bookmark } from "../../../public/svg";

interface QuestionItemProps {
  question: Board;
}

export const QuestionItem = ({ question }: QuestionItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <StyledLink href={`/question/${question.id}`}>
      <StyledQuestionItem>
        <QuestionContent>
          <QuestionTitle>Q. {question.title}</QuestionTitle>
          <QuestionInnerContent>{question.content}</QuestionInnerContent>
          <QuestionMeta>
            <MetaItem>{formatDate(question.createdAt)}</MetaItem>
            <UnderIconWrapper>
              <UnderCommentWrapper>
                <Comments width={20} />
                <MetaItem>{question.commentCount}</MetaItem>
              </UnderCommentWrapper>
              <UnderCommentWrapper>
                <Bookmark width={20} />
                <MetaItem>{question.bookmarkCount}</MetaItem>
              </UnderCommentWrapper>
            </UnderIconWrapper>
          </QuestionMeta>
        </QuestionContent>
      </StyledQuestionItem>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
`;

const StyledQuestionItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${color.white};
`;

const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
const QuestionInnerContent = styled.div`
  ${font.P2}
  color: ${color.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
`;

const QuestionTitle = styled.p`
  ${font.H2}
  color: ${color.black};
  line-height: 1;
  word-break: break-word;
  white-space: normal;
  margin: 0;
`;

const QuestionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
  color: ${color.black};
  align-items: center;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  font-family: Pretendard, sans-serif;
  ${font.P4}
  font-weight: 400;
  color: ${color.black};
  white-space: nowrap;

  &:not(:last-child)::after {
    content: " ";
  }
`;

const UnderCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${color.black};
  gap: 4px;
`;

const UnderIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.black};
  gap: 4px;
`;
