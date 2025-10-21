import type { SVGProps } from "react";
import React from "react";

const Eye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3.25C4.55 3.25 1.62 5.55 0.5 8.75C1.62 11.95 4.55 14.25 8 14.25C11.45 14.25 14.38 11.95 15.5 8.75C14.38 5.55 11.45 3.25 8 3.25ZM8 12.25C6.07 12.25 4.5 10.68 4.5 8.75C4.5 6.82 6.07 5.25 8 5.25C9.93 5.25 11.5 6.82 11.5 8.75C11.5 10.68 9.93 12.25 8 12.25ZM8 6.75C6.9 6.75 6 7.65 6 8.75C6 9.85 6.9 10.75 8 10.75C9.1 10.75 10 9.85 10 8.75C10 7.65 9.1 6.75 8 6.75Z"
      fill="#B3B3B3"
    />
  </svg>
);

export default Eye;
