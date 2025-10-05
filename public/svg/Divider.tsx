type IconProps = { width: string; height: string; onClick?: () => void };

const Divider = ({ width, height, onClick }: IconProps) => (
  <svg width={width} height={height} viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
    <path d="M1 0V10" stroke="#C8C8C8"/>
  </svg>
);

export default Divider;
