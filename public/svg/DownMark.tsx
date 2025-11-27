import type { SVGProps } from "react";
import React from "react";

const DownMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10L12.0008 14.58L17 10"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DownMark;
