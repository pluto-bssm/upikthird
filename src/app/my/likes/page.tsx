"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import { useLikedQuestions } from "@/hooks/useSaved";

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    id: string;
    name: string;
  };
  likes: number;
  comments: number;
  responses: number;
  createdAt: string;
}

const LikedQuestionsPage = () => {
  const router = useRouter();
  const {
    questions: boardQuestions,
    loading,
    error,
  } = useLikedQuestions(0, 20);

  const questions: Question[] = boardQuestions.map((board) => ({
    id: board.id,
    title: board.title,
    content: board.content,
    category: board.category || "일반",
    author: board.author || { id: "", name: "Unknown" },
    likes: board.likes ?? 0,
    comments: board.commentCount ?? 0,
    responses: 0,
    createdAt: board.createdAt,
  }));

  const handleQuestionClick = (questionId: string) => {
    router.push(`/question/${questionId}`);
  };

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
        {questions.length === 0 ? (
          <EmptyText>좋아요한 질문이 없습니다.</EmptyText>
        ) : (
          <QuestionList>
            {questions.map((question) => (
              <QuestionItem
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
              >
                <QuestionHeader>
                  <QuestionTitle>{question.title}</QuestionTitle>
                  <QuestionCategory>{question.category}</QuestionCategory>
                </QuestionHeader>
                <QuestionContent>{question.content}</QuestionContent>
                <QuestionFooter>
                  <AuthorName>{question.author.name}</AuthorName>
                  <QuestionStats>
                    <Stat>👍 {question.likes}</Stat>
                    <Stat>💬 {question.comments}</Stat>
                  </QuestionStats>
                </QuestionFooter>
              </QuestionItem>
            ))}
          </QuestionList>
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
`;

const LikedQuestionsPageContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QuestionItem = styled.div`
  padding: 16px;
  border: 1px solid ${color.gray200};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${color.gray400};
    background-color: ${color.gray50};
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
`;

const QuestionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${color.gray700};
  margin: 0;
  flex: 1;
`;

const QuestionCategory = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  background-color: ${color.gray100};
  border-radius: 4px;
  color: ${color.gray600};
  white-space: nowrap;
`;

const QuestionContent = styled.p`
  font-size: 12px;
  color: ${color.gray600};
  margin: 8px 0;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const QuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

const AuthorName = styled.span`
  font-size: 12px;
  color: ${color.gray500};
`;

const QuestionStats = styled.div`
  display: flex;
  gap: 12px;
`;

const Stat = styled.span`
  font-size: 12px;
  color: ${color.gray500};
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
