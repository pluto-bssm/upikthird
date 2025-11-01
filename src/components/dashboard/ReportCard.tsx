"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import React from "react";

type Variant = "white" | "gray";

type ReportCardProps = React.PropsWithChildren<{
  title: string;
  variant?: Variant;
  titleAlign?: "left" | "center";
  scrollable?: boolean;
  maxHeight?: number;
  maxWidth?: number;
  style?: React.CSSProperties;
  className?: string;
}>;

const ReportCard = ({
  title,
  variant = "white",
  titleAlign = "left",
  scrollable = false,
  maxHeight,
  maxWidth,
  children,
  style,
  className,
}: ReportCardProps) => {
  return (
    <CardRoot
      variant={variant}
      style={{ maxWidth, ...style }}
      className={className}
    >
      <CardTitle titleAlign={titleAlign}>{title}</CardTitle>
      <CardBody scrollable={scrollable} maxHeight={maxHeight}>
        {children}
      </CardBody>
    </CardRoot>
  );
};

export default ReportCard;

const CardRoot = styled.div<{ variant: Variant }>`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  border-radius: 20px;
  ${(p) =>
    p.variant === "white"
      ? `background-color: ${color.white};
         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
         padding: 32px 24px;`
      : `background-color: ${color.gray50};
         border-radius: 32px;
         border: 1px solid ${color.gray300};
         padding: 32px;`}
`;

const CardTitle = styled.h1<{ titleAlign: "left" | "center" }>`
  ${font.D1};
  color: ${color.black};
  margin: 0 0 24px 0;
  text-align: ${(p) => p.titleAlign};
`;

const CardBody = styled.div<{ scrollable: boolean; maxHeight?: number }>`
  display: flex;
  flex-direction: column;
  gap: 0;
  ${(p) =>
    p.scrollable
      ? `overflow-y: auto; ${p.maxHeight ? `max-height: ${p.maxHeight}px;` : ""}`
      : ""}
`;
