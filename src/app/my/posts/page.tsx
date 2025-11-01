"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import { PostListByUser } from "@/components/my/posts/PostListByUser";
import color from "@/packages/design-system/src/color";
import { useMyPosts } from "@/hooks/useMyPosts";

interface UserPost {
  id: string;
  title: string;
  author: string;
  date: string;
  bookmarkCount: number;
  commentCount: number;
}

const UserPostsPage = () => {
  const router = useRouter();
  const { posts, loading, error } = useMyPosts();

  const handlePostClick = (postId: string) => {};

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <StyledUserPostsPage>
        <Header types="close" text="작성 내역" onClose={handleClose} />
        <LoadingText>로딩 중...</LoadingText>
      </StyledUserPostsPage>
    );
  }

  if (error) {
    return (
      <StyledUserPostsPage>
        <Header types="close" text="작성 내역" onClose={handleClose} />
        <ErrorText>게시글을 불러올 수 없습니다.</ErrorText>
      </StyledUserPostsPage>
    );
  }

  const displayPosts: UserPost[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    author: post.author?.name || "알 수 없음",
    date: new Date(post.createdAt).toLocaleString("ko-KR"),
    bookmarkCount: post.likes || 0,
    commentCount: post.commentCount || 0,
  }));

  return (
    <StyledUserPostsPage>
      <Header types="close" text="작성 내역" onClose={handleClose} />
      <UserPostsPageContent>
        <PostListByUser posts={displayPosts} onPostClick={handlePostClick} />
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

const LoadingText = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #e71d36;
  padding: 40px 20px;
  margin: 0;
`;
