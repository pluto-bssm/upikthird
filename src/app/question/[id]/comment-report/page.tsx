'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from '@emotion/styled';
import Header from '@/components/common/header';
import NavigationBar from '@/components/common/navigationbar';
import color from '@/packages/design-system/src/color';
import { CheckComplete } from '@/../public/svg/svg';
import * as boardApi from '@/services/board/api';

type ReportReason = 
  | '유해한 내용을 포함하고 있어요'
  | '명예훼손 또는 저작권이 침해되었어요'
  | '욕설/생명경시/혐오 표현이 사용되었어요'
  | '질문이 아니에요'
  | '기타';

const reportReasons: ReportReason[] = [
  '유해한 내용을 포함하고 있어요',
  '명예훼손 또는 저작권이 침해되었어요',
  '욕설/생명경시/혐오 표현이 사용되었어요',
  '질문이 아니에요',
  '기타',
];

const CommentReportPage = () => {
  const router = useRouter();
  const params = useParams();
  const commentId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [selectedReason, setSelectedReason] = React.useState<ReportReason | null>(null);
  const [detailText, setDetailText] = React.useState('');
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [showCompleteModal, setShowCompleteModal] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!selectedReason || !detailText.trim()) return;

    try {
      setSubmitting(true);
      await boardApi.reportComment(commentId as string, selectedReason, detailText);
      setShowCompleteModal(true);
    } catch (error) {
      console.error('댓글 신고 제출 실패:', error);
      alert('신고 제출에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteClose = () => {
    setShowCompleteModal(false);
    router.back();
  };

  const handleCloseClick = () => {
    console.log('handleCloseClick called, setting showCancelModal to true');
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    router.back();
  };

  const handleCancelModal = () => {
    setShowCancelModal(false);
  };

  return (
    <StyledPage>
      <Header types="close" text="신고하기" onClose={handleCloseClick} />
      <Container>
        <Section>
          <SubTitle>신고할 내용</SubTitle>
          <Title>게시판 댓글 신고하기</Title>
        </Section>

        <ReasonSection>
          <LabelWithRequired>
            <Label>신고 사유 선택</Label>
            <Required>*</Required>
          </LabelWithRequired>

          <ReasonList>
            {reportReasons.map((reason) => (
              <ReasonButton
                key={reason}
                isSelected={selectedReason === reason}
                onClick={() => setSelectedReason(reason)}
              >
                {reason}
              </ReasonButton>
            ))}
          </ReasonList>
        </ReasonSection>

        <DetailSection>
          <LabelWithRequired>
            <Label>상세 내용</Label>
            <Required>*</Required>
          </LabelWithRequired>

          <DetailTextarea
            placeholder="신고 사유를 더 자세히 작성해주세요"
            value={detailText}
            onChange={(e) => setDetailText(e.target.value.slice(0, 500))}
          />
          <CharCount>{detailText.length}/500</CharCount>
        </DetailSection>

        <SubmitButton onClick={handleSubmit} disabled={!selectedReason || !detailText.trim()}>
          신고 접수하기
        </SubmitButton>
      </Container>

      {showCancelModal && (
        <>
          {console.log('Rendering cancel modal, showCancelModal =', showCancelModal)}
          <ModalOverlay onClick={handleCancelModal} />
          <ModalContainer>
            <ModalContent>
              <ModalTextContainer>
                <ModalTitle>신고를 <CancelText>취소</CancelText>하시겠어요?</ModalTitle>
                <ModalSubtitle>지금까지 작성한 내용은 저장되지 않습니다.</ModalSubtitle>
              </ModalTextContainer>
              <ModalButtonContainer>
                <ModalCancelButton onClick={handleCancelModal}>취소</ModalCancelButton>
                <ModalConfirmButton onClick={handleConfirmCancel}>확인</ModalConfirmButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalContainer>
        </>
      )}

      {showCompleteModal && (
        <>
          <ModalOverlay onClick={handleCompleteClose} />
          <ModalContainer>
            <CompleteModalContent>
              <CheckComplete width="83" height="83" />
              <CompleteModalTextContainer>
                <CompleteModalTitle>신고가 <SuccessText>성공적</SuccessText>으로 접수됐어요</CompleteModalTitle>
                <CompleteModalSubtitle>
                  <p>지속적으로 정상적인 투표를 신고하는 경우</p>
                  <p>제재의 대상이 될 수 있어요</p>
                </CompleteModalSubtitle>
              </CompleteModalTextContainer>
              <CompleteModalButton onClick={handleCompleteClose}>확인</CompleteModalButton>
            </CompleteModalContent>
          </ModalContainer>
        </>
      )}

      <NavigationBar />
    </StyledPage>
  );
};

export default CommentReportPage;

const StyledPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  flex: 1;
  padding: 20px 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`;

const SubTitle = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray700};
  line-height: 1;
  margin: 0;
`;

const Title = styled.h1`
  font-family: Pretendard, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: ${color.black};
  line-height: 1;
  margin: 0;
`;

const ReasonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`;

const LabelWithRequired = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Label = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.gray700};
  line-height: 1;
  margin: 0;
`;

const Required = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #e71d36;
  line-height: 1;
  margin: 0;
`;

const ReasonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`;

const ReasonButton = styled.button<{ isSelected: boolean }>`
  border: 1px solid ${props => props.isSelected ? color.primary : color.gray100};
  border-radius: 16px;
  padding: 19px 20px;
  background-color: ${props => props.isSelected ? color.primary : color.white};
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.isSelected ? color.white : color.gray600};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`;

const DetailTextarea = styled.textarea`
  border: 1px solid ${color.gray100};
  border-radius: 16px;
  padding: 20px;
  min-height: 120px;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.black};
  background-color: ${color.white};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${color.gray300};
  }
`;

const CharCount = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${color.gray300};
  line-height: 1;
  margin: 0;
  padding: 0 20px;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.disabled ? color.gray200 : color.gray600};
  border: none;
  border-radius: 100px;
  padding: 16px 20px;
  margin: 0 20px;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${color.white};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
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

const CancelText = styled.span`
  color: ${color.primary};
`;

const ModalSubtitle = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  line-height: 1;
  margin: 0;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 84px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalCancelButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const ModalConfirmButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const CompleteModalContent = styled.div`
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

const CompleteModalTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  text-align: center;
`;

const CompleteModalTitle = styled.h2`
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

const CompleteModalSubtitle = styled.div`
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

const CompleteModalButton = styled.button`
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
