"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import { useMyPosts } from "@/hooks/useMyPosts";
import { QuestionList } from "@/components/question/QuestionList";

const UserPostsPage = () => {
  const router = useRouter();
  const { posts, loading, error } = useMyPosts();

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

  return (
    <StyledUserPostsPage>
      <Header types="close" text="작성 내역" onClose={handleClose} />
      <UserPostsPageContent>
        {posts.length === 0 ? (
          <EmptyText>작성한 게시글이 없습니다.</EmptyText>
        ) : (
          <QuestionList questions={posts} />
        )}
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
  background-color: ${color.gray50};
  min-height: 100vh;
`;

const UserPostsPageContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;

const EmptyText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 14px;
  color: #e71d36;
  padding: 40px 20px;
  margin: 0;
`;
