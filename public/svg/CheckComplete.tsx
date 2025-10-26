const checkCompleteImage = "http://localhost:3845/assets/189b34beb1c2433b3dd3024e03ce9c39fb69c97e.svg";

function CheckComplete({ width = "83", height = "83" }: { width?: string; height?: string }) {
  return (
    <img 
      src={checkCompleteImage}
      alt="신고 완료"
      width={width}
      height={height}
      style={{ width, height }}
    />
  );
}

export { CheckComplete };
