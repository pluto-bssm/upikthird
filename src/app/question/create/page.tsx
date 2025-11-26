"use client";

import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import color from "@/packages/design-system/src/color";
import { validateQuestionCreate } from "@/schemas/question";
import { CheckComplete } from "../../../../public/svg/svg";
import { createQuestion } from "@/services/board/api";
import font from "@/packages/design-system/src/font";

const QuestionCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [validationError, setValidationError] = React.useState<string | null>(
    null,
  );
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    console.log("title:", title, "length:", title.length);
    console.log("content:", content, "length:", content.length);
    console.log("Data to validate:", { title, content });

    const result = validateQuestionCreate({ title, content });
    console.log("Validation result:", result);

    if (!result.success) {
      const firstError = result.error.issues[0];
      console.log("First error:", firstError);
      setValidationError(firstError.message);
      return;
    }

    setIsSubmitting(true);
    try {
      await createQuestion({
        title,
        content,
      });
      setShowSuccessModal(true);
    } catch (error) {
      setValidationError("질문 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidationClose = () => {
    setValidationError(null);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.back();
  };
  const handleClose = () => {
    router.push('/question');
  }

  return (
    <StyledPage>
      <Header types="close" text=" " onClose={handleClose} />
        <StyleQue>
      <Container>
        <Section>
          <Title>질문하기</Title>
          <SubTitle>궁금한 내용에 대해서 질문해주세요</SubTitle>
        </Section>

        <DetailSection>
          <LabelWithRequired>
            <Label>제목</Label>
            <Required>*</Required>
          </LabelWithRequired>
          <QuestionTextarea
            placeholder="질문제목을 입력해주세요 (2자이상)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DetailSection>
        <DetailSection>
          <LabelWithRequired>
            <Label>자세한 내용</Label>
            <Required>*</Required>
          </LabelWithRequired>
          <DetailTextarea
            placeholder="자세한 내용을 적어주세요(10자 이상)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DetailSection>
        <WarringText>
          질문 게시판에는 궁금한 내용을<br /> 질문하기 위해 이용해주세요.
          <br /> 질문이 아닌 글은 삭제될 수 있어요.
        </WarringText>
      </Container>
        <SubmitButton
            onClick={handleSubmit}
            disabled={title.trim().length < 2 || content.trim().length < 20 || isSubmitting}
        >
            {isSubmitting ? "등록 중..." : "질문 등록하기"}
        </SubmitButton>
        </StyleQue>


      {validationError && (
        <>
          <ModalOverlay onClick={handleValidationClose} />
          <ModalContainer>
            <ModalContent>
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

const StyleQue =styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 20%
`;



const StyledPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
`;

const WarringText = styled.p`
  ${font.P1}
  color: ${color.gray200};
  margin: 0;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
    gap:20%;
    margin-top: 70px;
  padding-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const SubTitle = styled.p`
  ${font.H3}
  color: ${color.gray700};
  line-height: 1;
  margin: 0;
`;

const Title = styled.h1`
  ${font.D2}
  color: ${color.black};
  line-height: 1;
  margin: 0;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px 20px;
`;

const DetailTextarea = styled.textarea`
  border: 1px solid ${color.gray100};
  border-radius: 16px;
  padding: 20px;
  min-height: 200px;
  ${font.P1}
  font-weight: 400;
  color: ${color.black};
  background-color: ${color.white};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${color.gray300};
  }

  &:focus {
    border-color: ${color.primary};
  }
`;

const QuestionTextarea = styled.textarea`
  border: 1px solid ${color.gray100};
  border-radius: 16px;
  height: 60px;
  padding: 20px;
  ${font.P1}
  color: ${color.black};
  background-color: ${color.white};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${color.gray300};
  }

  &:focus {
    border-color: ${color.primary};
  }
`;

const CharCount = styled.p`
  ${font.P1}
  color: ${color.gray300};
  line-height: 1;
  margin: 0;
  text-align: right;
`;

const LabelWithRequired = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Label = styled.p`
  ${font.H2}
  color: ${color.gray700};
  margin: 0;
`;

const Required = styled.span`
  ${font.P1}
  margin: 0;
  color: ${color.accent};
`;

const SubmitButton = styled.button`
  background-color: ${color.primary};
  border: none;
  border-radius: 16px;
  padding: 16px 20px;
  ${font.H2}
  color: ${color.white};
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 20px;

  &:disabled {
    background-color: ${color.gray200};
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
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

const ModalTitle = styled.p`
  ${font.D3}
  color: ${color.black};
  line-height: 1;
  margin: 0;
  text-align: center;
`;

const HighlightText = styled.span`
  color: ${color.primary};
`;

const ModalSubtitle = styled.p`
  ${font.P3}
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
