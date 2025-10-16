import type { SVGProps } from "react";
import React from "react";

const MakeSchool = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 93 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="92" height="92" rx="46" stroke="#C8C8C8" />
    <path d="M17 72.2H77V12.2H17V72.2Z" fill="url(#pattern0_447_6341)" />
    <defs>
      <pattern
        id="pattern0_447_6341"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use href="#image0_447_6341" transform="scale(0.00625)" />
      </pattern>
      <image
        id="image0_447_6341"
        width="160"
        height="160"
        preserveAspectRatio="none"
        href="/svg/images/MakeSchool.png"
      />
    </defs>
  </svg>
);

export default MakeSchool;
