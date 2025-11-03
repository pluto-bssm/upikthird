"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import color from "@/packages/design-system/src/color";
import { InquiryHeader } from "@/components/inquiry/InquiryHeader";
import {
  InquiryForm,
  type InquiryFormType,
} from "@/components/inquiry/InquiryForm";
import { useRouter } from "next/navigation";
import { sendInquiry } from "@/services/inquiry/api";
import { CheckComplete } from "@/../public/svg/svg";

const InquiryPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  void isLoading;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (data: InquiryFormType) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await sendInquiry({
        type: data.type || "기타",
        content: data.content,
        email: data.email,
        agreePrivacy: data.agreePrivacy,
      });
      setShowSuccessModal(true);
    } catch (error) {
      void error;
      setErrorMessage("문의 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.back();
  };

  return (
    <StyledInquiryPage>
      <InquiryHeader onBack={handleBack} />
      <InquiryForm onSubmit={handleSubmit} />

      {errorMessage && <ErrorNotification>{errorMessage}</ErrorNotification>}

      {showSuccessModal && (
        <>
          <ModalOverlay onClick={handleSuccessClose} />
          <ModalContainer>
            <ModalContent>
              <CheckComplete width="83" height="83" />
              <ModalTextContainer>
                <ModalTitle>
                  문의가 <SuccessText>성공적으로</SuccessText> 접수됐어요
                </ModalTitle>
                <ModalSubtitle>
                  <p>입력하신 이메일로 답변을 드릴게요</p>
                  <p>평균 7일 정도 소요됩니다</p>
                </ModalSubtitle>
              </ModalTextContainer>
              <ModalButton onClick={handleSuccessClose}>확인</ModalButton>
            </ModalContent>
          </ModalContainer>
        </>
      )}
    </StyledInquiryPage>
  );
};

export default InquiryPage;

const StyledInquiryPage = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  position: relative;
`;

const ErrorNotification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #e71d36;
  color: ${color.white};
  padding: 16px 20px;
  border-radius: 8px;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 600;
  z-index: 1000;
  max-width: 90vw;
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

const ModalTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${color.black};
  line-height: 1;
  margin: 0;
`;

const SuccessText = styled.span`
  color: ${color.primary};
`;

const ModalSubtitle = styled.div`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  line-height: 1.4;
  margin: 0;

  p {
    margin: 0;
    padding: 0;
  }
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
