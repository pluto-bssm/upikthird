"use client";
import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

interface DetailProps {
  value: string;
  onChange: (next: string) => void;
}

const DetailBox = ({ value, onChange }: DetailProps) => {
  return (
    <Section>
      <GuideCard
        as="textarea"
        placeholder="상세 내용을 입력해 주세요 (최대 500자)"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
      />
    </Section>
  );
};

export default DetailBox;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const GuideCard = styled.textarea`
  display: flex;
  align-items: center;
  gap: 14px;
  height: 120px;
  border: 1px solid ${color.gray100};
  border-radius: 16px;
  padding: 16px;
  background-color: ${color.white};
  resize: none;
  outline: none;
  ${font.P1};
  line-height: 20px;
  color: ${color.gray700};
  ::placeholder {
    color: ${color.gray300};
  }
  &:focus {
    border-color: ${color.gray200};
  }
`;
