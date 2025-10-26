import type { SVGProps } from 'react';
import React from 'react';

const VoteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 15H9v2h2v-2zm4-4H9v2h6V11zm3-4H9v2h9V7zm0-3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H5V4h14v16z" />
  </svg>
);

export default VoteIcon;
