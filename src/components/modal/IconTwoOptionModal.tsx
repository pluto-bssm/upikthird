'use client'

import React from 'react';
import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import font from '@/packages/design-system/src/font';
import { Question, Exclamation } from '../../../public/svg/svg';

type IconTwoOptionModalProps = {
  icon: 'question' | 'exclamation';
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;

};

const IconTwoOptionModal = ({
  icon,
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: IconTwoOptionModalProps) => {
  return (
    <Overlay>
      <IconTwoOptionModalLayout>
        <IconBox>
          {icon === 'question' ? (
            <Question width="80px" height="80px" />
          ) : (
            <Exclamation width="80px" height="80px" />
          )}
        </IconBox>

        <TextBox>
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </TextBox>

        <ButtonBox>
          <PrimaryButton onClick={onPrimaryClick}>
            {primaryButtonText}
          </PrimaryButton>
          <SecondaryButton onClick={onSecondaryClick}>
            {secondaryButtonText}
          </SecondaryButton>
        </ButtonBox>
      </IconTwoOptionModalLayout>
    </Overlay>
  );
};

export default IconTwoOptionModal;

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

const IconTwoOptionModalLayout = styled.div`
  background-color: ${color.white};
  border: 2px solid ${color.gray200};
  border-radius: 24px;
  padding: 50px 20px;
  width: 90%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`;

const Title = styled.p`
  ${font.D1};
  color: ${color.black};
  line-height: 1.4;
`;

const SubTitle = styled.p`
  ${font.H2};
  color: ${color.gray500};
  white-space: pre-line;
  line-height: 1.5;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 14px;
  background-color: ${color.primary};
  color: ${color.white};
  ${font.H3};
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 14px;
  background-color: ${color.gray200};
  color: ${color.black};
  ${font.H3};
  cursor: pointer;
`;
