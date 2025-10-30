import type { SVGProps } from "react";
import React from "react";

const UpikLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 200 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="64"
      fontWeight="900"
      fill="#011627"
      style={{ fontStyle: "italic" }}
    >
      upik
    </text>
  </svg>
);

export default UpikLogo;
