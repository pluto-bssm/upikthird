"use client";

import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import styled from "@emotion/styled";
import { useState } from "react";
import AccentModal from "@/components/modal/AccentModal";
import {Completevote} from "../../../../../public/svg";

type VoteOption = {
    id: string;
    content: string;
    percentage?: number;
    responseCount?: number;
};

type VoteResponseCardProps = {
    voteId: string;
    title: string;
    category: string;
    options: VoteOption[];
    selectedOptionId: string;
    respondedAt: number;
    respondedTime: number;
    onClick?: () => void;
};

const MyVoteResponseCard = ({
                              voteId,
                              title,
                              category,
                              options,
                              selectedOptionId,
                              respondedAt,
                              respondedTime,
                              onClick,
                          }: VoteResponseCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateStr: string) => {
        return dateStr;
    };

    const getOptionLabel = (index: number) => {
        const labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
        return labels[index] || String(index + 1);
    };

    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else {
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <CardContainer onClick={handleCardClick}>
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
                                            <CheckIcon>✓</CheckIcon>
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

                <Divider />

                <ResponseInfoSection>
                    <InfoRow>
                        <InfoLabel>응답일자</InfoLabel>
                        <InfoValue>{respondedAt}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>응답시간</InfoLabel>
                        <InfoValue>{respondedTime}</InfoValue>
                    </InfoRow>
                </ResponseInfoSection>
            </CardContainer>

            {isModalOpen && (
                <AccentModal
                    icon={<Completevote width="30" height="30" />}
                    leftText="투표를"
                    accentText="완료"
                    rightText="했어요!"
                    subText={"마이페이지에서 투표 참여내역\n을 확인할 수 있습니다."}
                    onClick={handleModalClose}
                    voteId={voteId}
                />
            )}
        </>
    );
};

export default MyVoteResponseCard;

const CheckIcon = styled.span`
  color: ${color.white};
  font-size: 16px;
  font-weight: bold;
`;

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

const SectionLabel = styled.span`
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