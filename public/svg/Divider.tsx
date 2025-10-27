import type { SVGProps } from "react";
import React from "react";

const Divider = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 2 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 0V10" stroke="#C8C8C8" />
  </svg>
);

export default Divider;
