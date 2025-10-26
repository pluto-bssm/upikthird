'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/header';
import { SavedPostList } from '@/components/my/saved/post/SavedPostList';
import color from '@/packages/design-system/src/color';

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  likeCount: number;
  commentCount: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: '게시판 질문게시판 질문게시판 질문게시판 질문게시판 질문',
    author: '박땡땡',
    date: '2025-08-31 21:31',
    likeCount: 16,
    commentCount: 4,
  },
  {
    id: '2',
    title: '게시판 질문게시판 질문게시판 질문게시판 질문게시판 질문',
    author: '박땡땡',
    date: '2025-08-31 21:31',
    likeCount: 16,
    commentCount: 4,
  },
  {
    id: '3',
    title: '게시판 질문게시판 질문게시판 질문게시판 질문게시판 질문',
    author: '박땡땡',
    date: '2025-08-31 21:31',
    likeCount: 16,
    commentCount: 4,
  },
];

const SavedPostPage = () => {
  const router = useRouter();

  const handleCommentClick = (postId: string) => {
    console.log('Comment clicked for post:', postId);
    // TODO: Implement comment navigation
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <StyledSavedPostPage>
      <Header types="close" text="좋아요한 질문" onClose={handleClose} />
      <SavedPostContent>
        <SavedPostList
          posts={mockPosts}
          onCommentClick={handleCommentClick}
        />
      </SavedPostContent>
    </StyledSavedPostPage>
  );
};

export default SavedPostPage;

const StyledSavedPostPage = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
`;

const SavedPostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
