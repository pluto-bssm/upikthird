import type { SVGProps } from "react";
import React from "react";

const School = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 27.96H28V-0.0400391H0V27.96Z" fill="url(#pattern0_757_6914)" />
    <defs>
      <pattern
        id="pattern0_757_6914"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use href="#image0_757_6914" transform="scale(0.00625)" />
      </pattern>
      <image
        id="image0_757_6914"
        width="160"
        height="160"
        preserveAspectRatio="none"
        href="/svg/images/School.png"
      />
    </defs>
  </svg>
);

export default School;
