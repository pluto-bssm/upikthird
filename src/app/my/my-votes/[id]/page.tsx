"use client";

import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import styled from "@emotion/styled";
import Vote from "@/app/vote/page";

type VoteOption = {
  id: string;
  content: string;
  percentage?: number;
  responseCount?: number;
};

type VoteResponseCardProps = {
  title: string;
  category: string;
  options: VoteOption[];
  selectedOptionId: string;
  followUpQuestion?: string;
  followUpAnswer?: string;
  respondedAt: string; // ISO date string "2025-07-19"
  respondedTime: string; // "12:34"
  onClick?: () => void;
};

const VoteResponseCard = ({
  title,
  category,
  options,
  selectedOptionId,
  followUpQuestion,
  followUpAnswer,
  respondedAt,
  respondedTime,
  onClick,
}: VoteResponseCardProps) => {
  const formatDate = (dateStr: string) => {
    return dateStr;
  };

  const getOptionLabel = (index: number) => {
    const labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
    return labels[index] || String(index + 1);
  };

  return (
    <CardContainer onClick={onClick}>
      <VoteSection>
        <SectionLabel>투표하기</SectionLabel>
        <QuestionTitle>{title}</QuestionTitle>
        <HelperText>부적절한 투표는 신고버튼을 이용해 신고해주세요</HelperText>

        <OptionsContainer>
          {options.map((option, index) => {
            const isSelected = option.id === selectedOptionId;
            return (
              <OptionItem key={option.id} isSelected={isSelected}>
                {isSelected ? (
                  <SelectedIndicator>
                    <Vote />
                  </SelectedIndicator>
                ) : (
                  <OptionLabel>{getOptionLabel(index)}</OptionLabel>
                )}
                <OptionContent>{option.content}</OptionContent>
              </OptionItem>
            );
          })}
        </OptionsContainer>
      </VoteSection>

      {(followUpQuestion || followUpAnswer) && (
        <FollowUpSection>
          <SectionLabel color="orange">꼬리질문 응답하기</SectionLabel>
          <FollowUpTitle>
            {followUpQuestion || "선지를 고른 이유는 무엇인가요?"}
          </FollowUpTitle>
          <FollowUpHelper>
            꼬리질문은 응답하지 않고 넘어갈 수 있어요
          </FollowUpHelper>

          {followUpAnswer && (
            <FollowUpAnswerBox>
              <FollowUpAnswerText>{followUpAnswer}</FollowUpAnswerText>
            </FollowUpAnswerBox>
          )}
        </FollowUpSection>
      )}

      <Divider />

      <ResponseInfoSection>
        <InfoRow>
          <InfoLabel>응답일자</InfoLabel>
          <InfoValue>{formatDate(respondedAt)}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>응답시간</InfoLabel>
          <InfoValue>{respondedTime}</InfoValue>
        </InfoRow>
      </ResponseInfoSection>
    </CardContainer>
  );
};

export default VoteResponseCard;

const CardContainer = styled.div`
  width: 100%;
  background-color: ${color.white};
  border-radius: 16px;
  padding: 24px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const VoteSection = styled.div`
  margin-bottom: 24px;
  margin-top: 20px;
`;

const SectionLabel = styled.span<{ color?: string }>`
  ${font.P2};
  color: ${color.primary};
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
`;

const QuestionTitle = styled.h2`
  ${font.H1};
  color: ${color.black};
  margin-bottom: 8px;
  line-height: 1.4;
`;

const HelperText = styled.p`
  ${font.P3};
  color: ${color.gray400};
  margin-bottom: 16px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid
    ${(props) => (props.isSelected ? color.primary : color.gray100)};
  background-color: ${(props) =>
    props.isSelected ? color.background : color.white};
  transition: all 0.2s ease;
`;

const OptionLabel = styled.span`
  ${font.P2};
  color: ${color.gray500};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.gray50};
  border-radius: 50%;
  flex-shrink: 0;
`;

const SelectedIndicator = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.primary};
  border-radius: 50%;
  flex-shrink: 0;
`;

const OptionContent = styled.span`
  ${font.P1};
  color: ${color.black};
`;

const FollowUpSection = styled.div`
  margin-bottom: 24px;
`;

const FollowUpTitle = styled.h3`
  ${font.H2};
  color: ${color.black};
  margin-bottom: 6px;
`;

const FollowUpHelper = styled.p`
  ${font.P3};
  color: ${color.gray400};
  margin-bottom: 16px;
`;

const FollowUpAnswerBox = styled.div`
  background-color: ${color.gray50};
  border-radius: 12px;
  padding: 16px;
  min-height: 80px;
`;

const FollowUpAnswerText = styled.p`
  ${font.P1};
  color: ${color.gray700};
  line-height: 1.6;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${color.gray100};
  margin: 20px 0;
`;

const ResponseInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  ${font.P3};
  color: ${color.gray400};
`;

const InfoValue = styled.span`
  ${font.P1};
  color: ${color.black};
  font-weight: 500;
`;
