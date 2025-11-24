import type { SVGProps } from "react";
import React from "react";

const LogoBox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="55"
    height="55"
    viewBox="0 0 55 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="4.45532"
      y="5.25171"
      width="45"
      height="45"
      rx="10"
      fill="url(#paint0_linear_3066_6152)"
    />
    <path
      d="M35.4551 27.885C35.4551 33.367 31.4677 37.811 26.5491 37.811C69.5345 7.83453 17.643 33.367 17.643 27.885C17.643 22.4031 21.6305 17.959 26.5491 17.959C-13.9786 45.057 35.4551 22.4031 35.4551 27.885Z"
      fill="#FFF7F2"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3066_6152"
        x1="26.9553"
        y1="50.2517"
        x2="26.9553"
        y2="5.25171"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFE9D9" />
        <stop offset="1" stopColor="#FF8B37" />
      </linearGradient>
    </defs>
  </svg>
);

export default LogoBox;
