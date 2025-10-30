"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { UserPostItem } from "./UserPostItem";

interface UserPost {
  id: string;
  title: string;
  author: string;
  date: string;
  bookmarkCount: number;
  commentCount: number;
}

interface PostListByUserProps {
  posts: UserPost[];
  onPostClick: (postId: string) => void;
}

export const PostListByUser = ({ posts, onPostClick }: PostListByUserProps) => {
  return (
    <PostListWrapper>
      {posts.map((post) => (
        <UserPostItem
          key={post.id}
          post={post}
          onClick={() => onPostClick(post.id)}
        />
      ))}
    </PostListWrapper>
  );
};

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
