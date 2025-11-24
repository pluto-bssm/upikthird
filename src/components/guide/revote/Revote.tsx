"use client";
import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

const revoteReasons = [
  "유해한 내용을 포함하고 있어요",
  "명예훼손 또는 저작권이 침해되었어요",
  "욕설/생명경시/혐오 표현이 사용되었어요",
  "가이드의 내용이 현재 학교생활과 달라요",
  "기타",
];

interface RevoteProps {
  selectedIndex: number | null;
  onSelect: (idx: number) => void;
}

const Revote = ({ selectedIndex, onSelect }: RevoteProps) => {
  return (
    <Section>
      <SectionBody>
        {revoteReasons.map((text, idx) => (
          <GuideCard
            key={idx}
            isSelected={selectedIndex === idx}
            onClick={() => onSelect(idx)}
          >
            <GuideTextWrap>
              <GuideTitle>{text}</GuideTitle>
            </GuideTextWrap>
          </GuideCard>
        ))}
      </SectionBody>
    </Section>
  );
};

export default Revote;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GuideCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  height: 67px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? color.primary : color.gray100)};
  border-radius: 16px;
  background-color: ${({ isSelected }) =>
    isSelected ? `${color.primary}33` : color.white};
  padding: 0 16px;
  box-shadow:
    -4px -4px 10px 0 rgba(0, 0, 0, 0.03),
    4px 4px 10px 0 rgba(0, 0, 0, 0.03);
`;

const GuideTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const GuideTitle = styled.div`
  color: ${color.gray600};
  ${font.P1};
  text-align: center;
`;
