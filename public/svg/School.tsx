type BackProps = { width: string; height: string; onClick?: () => void }

const School = ({ width, height, onClick }: BackProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
<path d="M0 27.96H28V-0.0400391H0V27.96Z" fill="url(#pattern0_757_6914)"/>
<defs>
<pattern id="pattern0_757_6914" patternContentUnits="objectBoundingBox" width="1" height="1">
<use href="#image0_757_6914" transform="scale(0.00625)"/>
</pattern>
<image id="image0_757_6914" width="160" height="160" preserveAspectRatio="none" href="/svg/images/School.png"/>
</defs>
</svg>
)

export default School
