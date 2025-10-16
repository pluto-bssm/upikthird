import type { SVGProps } from "react";
import React from "react";

const RequestCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 -960 960 960"
    fill="#1f1f1f"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Zm534 440L512-342l56-56 86 84 170-170 56 58-226 226Z" />
  </svg>
);

export default RequestCheck;
