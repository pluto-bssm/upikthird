'use client';

import styled from '@emotion/styled';
import Header from '@/components/common/header';
import { PostListByUser } from '@/components/my/posts/PostListByUser';
import color from '@/packages/design-system/src/color';

interface UserPost {
  id: string;
  title: string;
  author: string;
  date: string;
  bookmarkCount: number;
  commentCount: number;
}

const mockPosts: UserPost[] = [
  {
    id: '1',
    title: '게시판 질문게시판 질문게시판 질문게시판 질문게시판 질문',
    author: '박땡땡',
    date: '2025-08-31 21:31',
    bookmarkCount: 16,
    commentCount: 10,
  },
  {
    id: '2',
    title: '게시판 질문',
    author: '박땡땡',
    date: '2025-08-31 21:31',
    bookmarkCount: 16,
    commentCount: 4,
  },
  {
    id: '3',
    title: '게시판 질문',
    author: '박땡땡',
    date: '2025-08-31 21:31',
    bookmarkCount: 16,
    commentCount: 4,
  },
];

const UserPostsPage = () => {
  const handlePostClick = (postId: string) => {
    console.log('Post clicked:', postId);
    // TODO: Implement post navigation
  };

  return (
    <StyledUserPostsPage>
      <Header types="close" text="" />
      <UserPostsPageContent>
        <PostListByUser posts={mockPosts} onPostClick={handlePostClick} />
      </UserPostsPageContent>
    </StyledUserPostsPage>
  );
};

export default UserPostsPage;

const StyledUserPostsPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
`;

const UserPostsPageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
