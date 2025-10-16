"use client";

import type { SVGProps } from "react";
import color from "@/packages/design-system/src/color";

type LikeIconProps = SVGProps<SVGSVGElement>;

const IconLike = (props: LikeIconProps) => (
  <svg
    {...props}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 10.5L1.5 7.2C0.9 6.8 0.6 6 0.6 5.1C0.6 3.6 1.8 2.4 3.3 2.4C4.2 2.4 5.1 2.8 5.7 3.5C6.3 2.8 7.2 2.4 8.1 2.4C9.6 2.4 10.8 3.6 10.8 5.1C10.8 6 10.5 6.8 9.9 7.2L6 10.5Z"
      fill={color.primary}
    />
  </svg>
);

export default IconLike ;
