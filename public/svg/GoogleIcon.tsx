'use client';

import type { SVGProps } from 'react';

type GoogleIconProps = SVGProps<SVGSVGElement>;

const GoogleIcon = (props: GoogleIconProps) => (
  <svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      href="http://localhost:3845/assets/8abaee3f7c5ed2419eae6f53e8ab42da86452b3c.png"
      width="20"
      height="20"
    />
  </svg>
);

export { GoogleIcon };
