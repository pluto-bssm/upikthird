"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import { useLikedQuestions } from "@/hooks/useSaved";
import { QuestionList } from "@/components/question/QuestionList";

const LikedQuestionsPage = () => {
  const router = useRouter();
  const {
    questions: boardQuestions,
    loading,
    error,
  } = useLikedQuestions(0, 20);

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <StyledLikedQuestionsPage>
        <Header types="close" text="좋아요한 질문" onClose={handleClose} />
        <LoadingText>로딩 중...</LoadingText>
      </StyledLikedQuestionsPage>
    );
  }

  if (error) {
    return (
      <StyledLikedQuestionsPage>
        <Header types="close" text="좋아요한 질문" onClose={handleClose} />
        <ErrorText>질문을 불러올 수 없습니다.</ErrorText>
      </StyledLikedQuestionsPage>
    );
  }

  return (
    <StyledLikedQuestionsPage>
      <Header types="close" text="좋아요한 질문" onClose={handleClose} />
      <LikedQuestionsPageContent>
        {boardQuestions.length === 0 ? (
          <EmptyText>좋아요한 질문이 없습니다.</EmptyText>
        ) : (
          <QuestionList questions={boardQuestions} />
        )}
      </LikedQuestionsPageContent>
    </StyledLikedQuestionsPage>
  );
};

export default LikedQuestionsPage;

const StyledLikedQuestionsPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
  background-color: ${color.white};
  min-height: 100vh;
`;

const LikedQuestionsPageContent = styled.div`
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
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;
