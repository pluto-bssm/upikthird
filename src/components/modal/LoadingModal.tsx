"use client";

import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { Loading } from "../../../public/svg/svg";

type LoadingProps = {
  title: string;
  info: string;
};

const LoadingModal = ({ title, info }: LoadingProps) => {
  return (
    <Overlay>
      <LoadingModalLayout>
        <SpinnerBox>
          <RotatingIcon>
            <Loading width="80px" height="80px" />
          </RotatingIcon>
        </SpinnerBox>

        <Title>{title}</Title>
        <Description>{info}</Description>
      </LoadingModalLayout>
    </Overlay>
  );
};

export default LoadingModal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0;
`;

const LoadingModalLayout = styled.div`
  max-width: 400px;
  width: 90%;
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 28px;
  padding: 40px 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1vh;
`;

const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const RotatingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${color.black};
`;

const Description = styled.p`
  font-size: 14px;
  color: ${color.gray600};
  text-align: center;
  line-height: 1.5;
  width: 80%;
`;
