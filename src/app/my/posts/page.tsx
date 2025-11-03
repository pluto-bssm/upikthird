"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import { QuestionList } from "@/components/question/QuestionList";
import color from "@/packages/design-system/src/color";
import { useMyPosts } from "@/hooks/useMyPosts";

const UserPostsPage = () => {
  const router = useRouter();
  const { posts, loading, error } = useMyPosts();

  const handleClose = () => {
    router.back();
  };

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
        {loading ? (
          <LoadingText>로딩 중...</LoadingText>
        ) : posts.length === 0 ? (
          <NoPostsText>작성한 게시글이 없습니다.</NoPostsText>
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
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
`;

const UserPostsPageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const NoPostsText = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;
