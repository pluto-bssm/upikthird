"use client";

import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import VoteBarChart from "@/components/guide/VoteBarChart";

type AccentModalProps = {
  icon?: React.ReactNode;
  leftText: string;
  accentText: string;
  rightText: string;
  subText?: string;
  onClick: () => void;
  voteId?: string;
  type? : string;
};

const AccentModal = ({
  leftText,
  accentText,
  rightText,
  subText,
  voteId,
  onClick,
  type
}: AccentModalProps) => {
  return (
    <Overlay>
      <AccentModalLayout type={type}>
        <TextBox>
          <Title>
            {leftText} <Accent>{accentText}</Accent> {rightText}
          </Title>
          {subText && <SubTitle>{subText}</SubTitle>}
        </TextBox>

        {voteId && <VoteBarChart voteId={voteId}/>}

        <ConfirmButton onClick={onClick}>확인</ConfirmButton>
      </AccentModalLayout>
    </Overlay>
  );
};

export default AccentModal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  top: 0;
`;

const AccentModalLayout = styled.div<{type?: string}>`
  background-color: ${color.white};
  border:  ${props => props.type === "wide" ? "none" : `2px solid ${color.gray200}`};
  border-radius: ${props => props.type === "wide" ? "0px" : "24px"};
  padding: 50px 20px;
  width: ${props => props.type === "wide" ? "100%" : "80%"};
  max-width: 600px;
  height: ${props => props.type === "wide" ? "100vh" : "auto"};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  overflow : scroll;

`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;

const Title = styled.p`
  ${font.D3};
  color: ${color.black};
  white-space: pre-line;
`;

const Accent = styled.span`
  color: ${color.primary};
  ${font.D3};
`;

const SubTitle = styled.p`
  ${font.P2};
  color: ${color.gray500};
  white-space: pre-line;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 14px 10px;
  border: none;
  border-radius: 10px;
  background-color: ${color.primary};
  color: white;
  ${font.Btn2};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e07600;
  }
`;
