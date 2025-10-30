"use client";

import type { SVGProps } from "react";
import color from "@/packages/design-system/src/color";

type ArrowLeftIconProps = SVGProps<SVGSVGElement>;

const ArrowLeftIcon = (props: ArrowLeftIconProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke={color.black}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { ArrowLeftIcon };
