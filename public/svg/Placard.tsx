import type { SVGProps } from "react";
import React from "react";

const Placard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="55"
    height="55"
    viewBox="0 0 55 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1893_343)">
      <path
        d="M30.9392 3.25146H24.2173C23.7122 3.25146 23.3027 3.66093 23.3027 4.16604V51.1987C23.3027 51.7038 23.7122 52.1133 24.2173 52.1133H30.9392C31.4443 52.1133 31.8538 51.7038 31.8538 51.1987V4.16604C31.8538 3.66093 31.4443 3.25146 30.9392 3.25146Z"
        fill="#FFB47F"
      />
      <path
        d="M48.4415 9.59766H6.7153C5.68329 9.59766 4.84668 10.4343 4.84668 11.4663V34.9404C4.84668 35.9724 5.68329 36.809 6.7153 36.809H48.4415C49.4735 36.809 50.3101 35.9724 50.3101 34.9404V11.4663C50.3101 10.4343 49.4735 9.59766 48.4415 9.59766Z"
        fill="#FFEDE1"
      />
      <path
        d="M23.3027 36.8091L31.8538 40.6729V36.8091H23.3027Z"
        fill="#FF8B37"
      />
    </g>
    <defs>
      <clipPath id="clip0_1893_343">
        <rect width="54.4391" height="54.4391" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Placard;
