"use client";

import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import { QuestionList } from "@/components/question/QuestionList";
import color from "@/packages/design-system/src/color";
import { useQuestions } from "@/hooks/useBoard";
import VoteMakeButton from "@/components/vote/votemakebutton";
import Footer from "@/components/common/footer";
import NavigationBar from "@/components/common/navigationbar";

const QuestionPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"all" | "popular">("all");
  const { questions, loading, error } = useQuestions({ page: 0, size: 10 });

  const handleCreateQuestion = () => {
    router.push("/question/create");
  };

  if (error) {
    return (
      <StyledQuestionPage>
        <Header types="question" text="질문 게시판" />
        <ErrorText>문제가 생겼어요! 잠시 기다려주세요 🥺</ErrorText>
      </StyledQuestionPage>
    );
  }

  return (
    <StyledQuestionPage>
      <Header types="question" text="질문 게시판" />
      <QuestionPageContent>
        {loading ? (
          <LoadingText> </LoadingText>
        ) : (
          <QuestionList questions={questions} />
        )}
      </QuestionPageContent>
      <FloatingButton>
        <VoteMakeButton onClick={handleCreateQuestion} />
      </FloatingButton>
      <NavigationBar/>
    </StyledQuestionPage>
  );
};

export default QuestionPage;

const StyledQuestionPage = styled.div`
  width: 100%;
  background-color: #fcfcfc;
  max-width: 600px;
  margin: 20px;
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionPageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 15px;
  height: 50px;
  align-items: center;
  padding: 15px 20px;
  background-color: ${color.white};
  border-bottom: 1px solid ${color.gray300};
  position: sticky;
  top: 80px;
  z-index: 10;
`;

interface TabProps {
  isActive: boolean;
}

const Tab = styled.button<TabProps>`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: ${(props) => (props.isActive ? 600 : 400)};
  color: ${(props) => (props.isActive ? color.primary : color.black)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Divider = styled.div`
  width: 0;
  height: 10px;
  border-left: 1px solid ${color.black};
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

const FloatingButton = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 80px;
  width: 90%;
  max-width: 500px;
  display: flex;
  justify-content: flex-end;
`;
