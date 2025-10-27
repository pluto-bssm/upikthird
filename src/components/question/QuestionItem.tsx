'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import type { Board } from '@/types/graphql';

interface QuestionItemProps {
  question: Board;
}

export const QuestionItem = ({ question }: QuestionItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getCategoryEmoji = (category?: string) => {
    switch (category) {
      case '학교생활':
        return '🏫';
      case '기숙사':
        return '🏠';
      case '유머':
        return '😂';
    }
  };

  return (
    <StyledLink href={`/question/${question.id}`}>
      <StyledQuestionItem>
        <QuestionContent>
          <QuestionTitle>{question.title}</QuestionTitle>
          <QuestionMeta>
            <MetaItem>{question.author.name}</MetaItem>
            <MetaItem>{formatDate(question.createdAt)}</MetaItem>
            <MetaItem>| {question.commentCount}</MetaItem>
          </QuestionMeta>
        </QuestionContent>
        <CommentBox>
          <CommentNumber>{question.commentCount}</CommentNumber>
          <CommentLabel>댓글</CommentLabel>
        </CommentBox>
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
  border-bottom: 1px solid ${color.gray300};
  background-color: ${color.white};
`;

const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

const QuestionTitle = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  line-height: 1;
  word-break: break-word;
  white-space: normal;
  margin: 0;
`;

const QuestionMeta = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray700};
  white-space: nowrap;

  &:not(:last-child)::after {
    content: ' ';
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 51px;
  height: 49px;
  background-color: ${color.gray100};
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
`;

const CommentNumber = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${color.gray700};
  line-height: 1;
  margin: 0;
`;

const CommentLabel = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray700};
  line-height: 1;
  margin: 0;
`;

const LikeCount = styled.span`
  display: none;
`;

const LikeIcon = styled.span`
  display: none;
`;
