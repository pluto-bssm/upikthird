import * as React from "react";

type RequestCheckProps = {
  width: string;
  height: string;
  onClick?: () => void;
};

const RequestCheck = ({ width, height, onClick }: RequestCheckProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 -960 960 960"
    fill="#1f1f1f"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path d="M120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Zm534 440L512-342l56-56 86 84 170-170 56 58-226 226Z"/>
  </svg>
);

export default RequestCheck;
