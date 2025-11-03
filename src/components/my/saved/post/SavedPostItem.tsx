"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";

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
  padding: 20px;
  border-bottom: 1px solid ${color.gray300};
  background-color: ${color.white};
  box-shadow:
    -4px -4px 10px 0px rgba(0, 0, 0, 0.03),
    4px 4px 10px 0px rgba(0, 0, 0, 0.03);
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
    content: "";
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

const LikeIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 10.5L1.5 7.2C0.9 6.8 0.6 6 0.6 5.1C0.6 3.6 1.8 2.4 3.3 2.4C4.2 2.4 5.1 2.8 5.7 3.5C6.3 2.8 7.2 2.4 8.1 2.4C9.6 2.4 10.8 3.6 10.8 5.1C10.8 6 10.5 6.8 9.9 7.2L6 10.5Z"
      fill={color.primary}
    />
  </svg>
);
