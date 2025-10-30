import type { SVGProps } from "react";
import React from "react";

const ValidationErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 7v5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

export default ValidationErrorIcon;
