"use client";

import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import color from "@/packages/design-system/src/color";
import { validateQuestionCreate } from "@/schemas/question";
import { ValidationErrorIcon, CheckComplete } from "../../../../public/svg/svg";
import { createQuestion } from "@/services/board/api";

const QuestionCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [validationError, setValidationError] = React.useState<string | null>(
    null,
  );
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const handleSubmit = async () => {
    console.log("Submitting question with title:", title, "and content:", content);
    const result = validateQuestionCreate({ title, content });

    if (!result.success) {
      const firstError = result.error.issues[0];
      setValidationError(firstError.message);
      return;
    }

    try {
      const newQuestion = await createQuestion({
        title,
        content,
      });
      console.log("Question created successfully:", newQuestion); 
      setShowSuccessModal(true);
    } catch (error) {
      setValidationError("질문 생성에 실패했습니다. 다시 시도해주세요.");
      console.log(error);
    }
  };


  const handleValidationClose = () => {
    setValidationError(null);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.back();
  };

  return (
    <StyledPage>
      <Header types="register" text="" onSubmit={handleSubmit} />
      <Container>
        <Divider />

        <Section>
          <TitleInput
            placeholder="질문 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Section>

        <Divider />

        <Section>
          <ContentTextarea
            placeholder="질문 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Section>
      </Container>

      {validationError && (
        <>
          <ModalOverlay onClick={handleValidationClose} />
          <ModalContainer>
            <ModalContent>
              <ModalIconContainer>
                <ValidationErrorIcon width="83" height="83" />
              </ModalIconContainer>
              <ModalTitle>
                {validationError.includes("제목") ? (
                  <>
                    <HighlightText>제목</HighlightText>을 작성하지 않았어요
                  </>
                ) : (
                  <>
                    <HighlightText>내용</HighlightText>을 작성하지 않았어요
                  </>
                )}
              </ModalTitle>
              <ModalSubtitle>
                {validationError.includes("제목")
                  ? "질문을 게시판에 작성할 때는 제목을 꼭 작성해야 해요"
                  : "질문을 게시판에 작성할 때는 내용을 꼭 작성해야 해요"}
              </ModalSubtitle>
              <ModalButton onClick={handleValidationClose}>확인</ModalButton>
            </ModalContent>
          </ModalContainer>
        </>
      )}

      {showSuccessModal && (
        <>
          <ModalOverlay onClick={handleSuccessClose} />
          <ModalContainer>
            <ModalContent>
              <ModalIconContainer>
                <CheckComplete width="83" height="83" />
              </ModalIconContainer>
              <ModalTitle>
                질문 작성을 <HighlightText>완료</HighlightText>했어요!
              </ModalTitle>
              <ModalSubtitle>
                마이페이지에서 지금까지 한 게시판 질문 내역을 확인할 수 있어요
              </ModalSubtitle>
              <ModalButton onClick={handleSuccessClose}>확인</ModalButton>
            </ModalContent>
          </ModalContainer>
        </>
      )}

      <NavigationBar />
    </StyledPage>
  );
};

export default QuestionCreatePage;

const StyledPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 72px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${color.gray200};
  width: 100%;
`;


const TitleInput = styled.input`
  border: none;
  background: transparent;
  font-family: Pretendard, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: ${color.black};
  outline: none;
  padding: 10px 0;
  line-height: 1;
  width: 100%;

  &::placeholder {
    color: ${color.gray300};
  }
`;
const ContentTextarea = styled.textarea`
  border: none;
  background: transparent;
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: ${color.black};
  outline: none;
  resize: none;
  min-height: 200px;
  padding: 10px 0;
  line-height: 24px;
  width: 100%;

  &::placeholder {
    color: ${color.gray300};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 24px;
  padding: 52px 32px;
  max-width: 320px;
  width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const ModalIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 83px;
  height: 83px;
  color: ${color.primary};
`;

const ModalTitle = styled.h2`
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${color.black};
  line-height: 1;
  margin: 0;
  text-align: center;
`;

const HighlightText = styled.span`
  color: ${color.primary};
`;

const ModalSubtitle = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  line-height: 1;
  margin: 0;
  text-align: center;
`;

const ModalButton = styled.button`
  background-color: ${color.primary};
  border: none;
  border-radius: 16px;
  padding: 13px 20px;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.white};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  display: inline-block;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
`;
