type BackProps = { width: string; height: string; onClick?: () => void }

const Domitory = ({ width, height, onClick }: BackProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 93 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
<rect x="0.5" y="0.5" width="92" height="92" rx="46" stroke="#C8C8C8"/>
<path d="M17 71.2H77V11.2H17V71.2Z" fill="url(#pattern0_447_6408)"/>
<defs>
<pattern id="pattern0_447_6408" patternContentUnits="objectBoundingBox" width="1" height="1">
<use href="#image0_447_6408" transform="scale(0.00625)"/>
</pattern>
<image id="image0_447_6408" width="160" height="160" preserveAspectRatio="none" href="/svg/images/Domitory.png"/>
</defs>
</svg>
)

export default Domitory
