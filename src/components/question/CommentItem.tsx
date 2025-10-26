'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';

interface CommentItemProps {
  author: string;
  date: string;
  content: string;
  showSubmit?: boolean;
}

export const CommentItem = ({
  author,
  date,
  content,
  showSubmit = false,
}: CommentItemProps) => {
  return (
    <StyledCommentItem>
      <AuthorName>{author}</AuthorName>
      <CommentContent>{content}</CommentContent>
      <CommentFooter>
        <CommentDate>{date}</CommentDate>
        {showSubmit && <SubmitButton>등록</SubmitButton>}
      </CommentFooter>
    </StyledCommentItem>
  );
};

const StyledCommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px;
  border-bottom: 1px solid ${color.gray100};
`;

const AuthorName = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${color.black};
  line-height: 1;
  margin: 0;
`;

const CommentContent = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${color.black};
  line-height: 1;
  margin: 0;
  word-break: break-word;
  white-space: normal;
`;

const CommentFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

const CommentDate = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray300};
  line-height: 1;
  margin: 0;
`;

const SubmitButton = styled.button`
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.primary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

