"use client";
import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";

interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const RevoteSend = ({ disabled, children, onClick }: ButtonProps) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
};

export default RevoteSend;

const Button = styled.button<{ disabled?: boolean }>`
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 100%;
  border: none;
  outline: none;
  background-color: ${({ disabled }) =>
    disabled ? color.gray200 : color.primary};
  font-size: 20px;
  color: ${color.white};
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
