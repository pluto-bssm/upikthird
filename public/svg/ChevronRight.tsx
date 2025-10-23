'use client';

import type { SVGProps } from 'react';
import color from '@/packages/design-system/src/color';

type ChevronRightIconProps = SVGProps<SVGSVGElement>;

const ChevronRightIcon = (props: ChevronRightIconProps) => (
  <svg
    {...props}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 12L10 8L6 4"
      stroke={color.gray300}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { ChevronRightIcon };
