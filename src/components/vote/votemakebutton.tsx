import color from "@/packages/design-system/src/color";
import styled from "@emotion/styled";
import VotemakeButton from "../../../public/svg/VotemakeButton";

type VoteMakeButtonProps = {
  onClick: () => void;
};

const VoteMakeButton = ({ onClick }: VoteMakeButtonProps) => {
  return (
    <VoteMakeButtonLayout onClick={onClick}>
      <VotemakeButton width="20px" height="20px" />
    </VoteMakeButtonLayout>
  );
};

export default VoteMakeButton;

const VoteMakeButtonLayout = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${color.primary};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
