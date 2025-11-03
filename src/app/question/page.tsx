"use client";

import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import { QuestionList } from "@/components/question/QuestionList";
import color from "@/packages/design-system/src/color";
import { useQuestions } from "@/hooks/useBoard";
import VotemakeButton from "@/../public/svg/VotemakeButton";

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
        <ErrorText>질문 목록을 불러올 수 없습니다.</ErrorText>
      </StyledQuestionPage>
    );
  }

  return (
    <StyledQuestionPage>
      <Header types="question" text="질문 게시판" />
      <TabContainer>
        <Tab isActive={activeTab === "all"} onClick={() => setActiveTab("all")}>
          전체
        </Tab>
        <Divider />
        <Tab
          isActive={activeTab === "popular"}
          onClick={() => setActiveTab("popular")}
        >
          인기
        </Tab>
      </TabContainer>
      <QuestionPageContent>
        {loading ? (
          <LoadingText>로딩 중...</LoadingText>
        ) : (
          <QuestionList questions={questions} />
        )}
      </QuestionPageContent>
      <FloatingButton onClick={handleCreateQuestion}>
        <VotemakeButton width="24" height="24" />
      </FloatingButton>
    </StyledQuestionPage>
  );
};

export default QuestionPage;

const StyledQuestionPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
`;

const QuestionPageContent = styled.div`
  display: flex;
  flex-direction: column;
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

const FloatingButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${color.primary};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;
