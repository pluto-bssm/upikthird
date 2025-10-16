'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import { LikeIcon } from '../../../../../public/svg/Like';

interface SavedPostItemProps {
  title: string;
  author: string;
  date: string;
  likeCount: number;
  commentCount: number;
  onCommentClick?: () => void;
}

const SavedPostItem = ({
  title,
  author,
  date,
  likeCount,
  commentCount,
  onCommentClick,
}: SavedPostItemProps) => {
  return (
    <StyledPostItem>
      <PostContent>
        <PostTitle>{title}</PostTitle>
        <PostMeta>
          <MetaItem>{author}</MetaItem>
          <MetaItem>{date}</MetaItem>
          <LikeCount>
            <LikeIcon />
            {likeCount}
          </LikeCount>
        </PostMeta>
      </PostContent>
      <CommentBox onClick={onCommentClick}>
        <CommentNumber>{commentCount}</CommentNumber>
        <CommentLabel>댓글</CommentLabel>
      </CommentBox>
    </StyledPostItem>
  );
};

export { SavedPostItem };

const StyledPostItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 40px;
  border-bottom: 1px solid ${color.gray300};
  background-color: ${color.white};
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

const PostTitle = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  line-height: 1;
  word-break: break-word;
  white-space: normal;
  margin: 0;
`;

const PostMeta = styled.div`
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
    content: '';
    width: 1px;
    height: 10px;
    background-color: ${color.gray700};
    margin-left: 6px;
  }
`;

const LikeCount = styled.span`
  display: flex;
  gap: 2px;
  align-items: center;
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray700};
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 49px;
  background-color: ${color.gray50};
  border-radius: 8px;
  gap: 2px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${color.gray100};
  }
`;

const CommentNumber = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray700};
  margin: 0;
  line-height: 1;
`;

const CommentLabel = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray700};
  margin: 0;
  line-height: 1;
`;
