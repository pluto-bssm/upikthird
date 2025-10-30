"use client";

import styled from "@emotion/styled";
import { SavedPostItem } from "./SavedPostItem";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  likeCount: number;
  commentCount: number;
}

interface SavedPostListProps {
  posts: Post[];
  onCommentClick?: (postId: string) => void;
}

const SavedPostList = ({ posts, onCommentClick }: SavedPostListProps) => {
  return (
    <StyledPostList>
      {posts.map((post) => (
        <SavedPostItem
          key={post.id}
          title={post.title}
          author={post.author}
          date={post.date}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          onCommentClick={() => onCommentClick?.(post.id)}
        />
      ))}
    </StyledPostList>
  );
};

export { SavedPostList };

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;
