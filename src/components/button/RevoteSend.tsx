"use client";
import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

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
  ${font.H1};
  background-color: ${({ disabled }) =>
    disabled ? color.gray200 : color.primary};
  color: ${color.white};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
