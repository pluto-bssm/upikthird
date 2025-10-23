'use client';

import type { SVGProps } from 'react';
import color from '@/packages/design-system/src/color';

type CheckIconProps = SVGProps<SVGSVGElement>;

const CheckIcon = (props: CheckIconProps) => (
  <svg
    {...props}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke={color.white}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { CheckIcon };
