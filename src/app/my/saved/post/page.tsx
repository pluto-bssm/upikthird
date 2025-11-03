"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import { SavedPostList } from "@/components/my/saved/post/SavedPostList";
import color from "@/packages/design-system/src/color";
import { useSavedPosts } from "@/hooks/useSaved";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  likeCount: number;
  commentCount: number;
}

const SavedPostPage = () => {
  const router = useRouter();
  const { posts: boardPosts, loading, error } = useSavedPosts(0, 20);
  void error;

  const posts: Post[] = boardPosts.map((board) => ({
    id: board.id,
    title: board.title,
    author: board.author?.name || "작성자 미상",
    date: new Date(board.createdAt).toLocaleString("ko-KR"),
    likeCount: board.likes ?? 0,
    commentCount: board.commentCount ?? 0,
  }));

  const handleCommentClick = (postId: string) => {
    router.push(`/question/${postId}`);
  };

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <StyledSavedPostPage>
        <Header types="close" text="좋아요한 질문" onClose={handleClose} />
        <LoadingText>로딩 중...</LoadingText>
      </StyledSavedPostPage>
    );
  }

  if (error) {
    return (
      <StyledSavedPostPage>
        <Header types="close" text="좋아요한 질문" onClose={handleClose} />
        <ErrorText>질문을 불러올 수 없습니다.</ErrorText>
      </StyledSavedPostPage>
    );
  }

  return (
    <StyledSavedPostPage>
      <Header types="close" text="좋아요한 질문" onClose={handleClose} />
      <SavedPostContent>
        <SavedPostList posts={posts} onCommentClick={handleCommentClick} />
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
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;
