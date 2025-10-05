import * as React from "react";

type BackProps = {
width: string;
height: string;
onClick?: () => void;
};

const Back = ({ width, height, onClick }: BackProps) => (
<svg
  width={width}
  height={height}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  onClick={onClick}
>
  <path
    d="M15 18L9 12L15 6"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
);

export default Back;