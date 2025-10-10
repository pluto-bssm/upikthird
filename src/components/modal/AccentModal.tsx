'use client'

import React from 'react';
import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import font from '@/packages/design-system/src/font';

type AccentModalProps = {
  icon?: React.ReactNode;
  leftText: string;
  accentText: string;
  rightText: string;
  subText?: string;
  onClick?: () => void;

};

const AccentModal = ({
  icon,
  leftText,
  accentText,
  rightText,
  subText,
  onClick
}: AccentModalProps) => {
  return (
    <Overlay>
      <AccentModalLayout>
        {icon && <IconBox>{icon}</IconBox>}

        <TextBox>
          <Title>
            {leftText} <Accent>{accentText}</Accent> {rightText}
          </Title>
          {subText && <SubTitle>{subText}</SubTitle>}
        </TextBox>

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

const AccentModalLayout = styled.div`
  background-color: ${color.white};
  border: 2px solid ${color.gray200};
  border-radius: 24px;
  padding: 50px 20px;
  width: 80%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 64px;
    height: 64px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;

const Title = styled.p`
  ${font.D2};
  color: ${color.black};
  white-space: pre-line;
`;

const Accent = styled.span`
  color: ${color.primary};
  font-weight: 600;
`;

const SubTitle = styled.p`
  ${font.caption};
  color: ${color.gray500};
  white-space: pre-line;
  line-height: 1.4;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 14px 10px;
  border: none;
  border-radius: 18px;
  background-color: ${color.primary};
  color: white;
  ${font.H3};
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 16px;

  &:hover {
    background-color: #E07600;
  }
`;
