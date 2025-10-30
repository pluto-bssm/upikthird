import type { SVGProps } from "react";

function CheckComplete({
  width = "83",
  height = "83",
  ...props
}: { width?: string; height?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CheckComplete;

export { CheckComplete };
