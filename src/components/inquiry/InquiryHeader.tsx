"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { ArrowLeftIcon } from "../../../public/svg/ArrowLeft";

interface InquiryHeaderProps {
  onBack: () => void;
}

const InquiryHeader = ({ onBack }: InquiryHeaderProps) => {
  return (
    <StyledHeader>
      <BackButton onClick={onBack}>
        <ArrowLeftIcon width={24} height={24} />
      </BackButton>
      <Title>문의하기</Title>
      <div />
    </StyledHeader>
  );
};

export { InquiryHeader };

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${color.white};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  text-align: center;
  margin: 0;
`;
