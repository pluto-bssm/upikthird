"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";

interface UserPost {
  id: string;
  title: string;
  author: string;
  date: string;
  bookmarkCount: number;
  commentCount: number;
}

interface UserPostItemProps {
  post: UserPost;
  onClick: () => void;
}

export const UserPostItem = ({ post, onClick }: UserPostItemProps) => {
  return (
    <PostItemWrapper>
      <PostItemButton onClick={onClick}>
        <PostContentWrapper>
          <PostTitle>{post.title}</PostTitle>
          <PostMetaWrapper>
            <PostAuthor>{post.author}</PostAuthor>
            <PostDate>{post.date}</PostDate>
            <BookmarkInfo>
              <BookmarkIcon>📌</BookmarkIcon>
              <BookmarkCount>{post.bookmarkCount}</BookmarkCount>
            </BookmarkInfo>
          </PostMetaWrapper>
        </PostContentWrapper>

        <CommentCountBox>
          <CommentNumber>{post.commentCount}</CommentNumber>
          <CommentLabel>댓글</CommentLabel>
        </CommentCountBox>
      </PostItemButton>
    </PostItemWrapper>
  );
};

const PostItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItemButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 20px;
  background-color: ${color.white};
  border: none;
  border-bottom: 1px solid ${color.gray300};
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: ${color.gray50};
  }

  &:active {
    background-color: ${color.gray100};
  }
`;

const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  text-align: left;
`;

const PostTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  word-break: break-word;
`;

const PostMetaWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
`;

const PostAuthor = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  white-space: nowrap;
`;

const PostDate = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  white-space: nowrap;
`;

const BookmarkInfo = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const BookmarkIcon = styled.span`
  font-size: 10px;
`;

const BookmarkCount = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  white-space: nowrap;
`;

const CommentCountBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 49px;
  background-color: ${color.gray50};
  border-radius: 8px;
  flex-shrink: 0;
`;

const CommentNumber = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const CommentLabel = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
