import color from "@/packages/design-system/src/color";
import styled from "@emotion/styled";
import font from "@/packages/design-system/src/font";
import { Check } from "@/../public/svg/svg";

type BallotProps = {
  content: string;
  letter?: string;
  isSelected?: boolean;
  onClick: () => void;
  type: "report" | "vote";
};

const Ballot = ({
  content,
  letter,
  isSelected,
  onClick,
  type,
}: BallotProps) => {
  return (
    <BallotLayout onClick={onClick} isSelected={isSelected}>
      <BallotInfo type={type}>
        {letter && (
          <LatterBox isSelected={isSelected}>
            <Letter>
              {isSelected && <Check width="20px" height="20px" />}
              {!isSelected && letter}
            </Letter>
          </LatterBox>
        )}
        <Label>{content}</Label>
      </BallotInfo>
    </BallotLayout>
  );
};

export default Ballot;

const BallotLayout = styled.div<{ isSelected?: boolean }>`
  width: 100%;
  padding: 12px 0px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(props) => (props.isSelected ? color.primary : color.gray100)};
  background-color: ${(props) => (props.isSelected ? "#FFDEB2" : color.white)};
`;

const BallotInfo = styled.div<{ type?: string }>`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.type == "vote" ? "start" : "center")};
  gap: 12px;
`;

const Letter = styled.p`
  color: ${color.gray600};
  ${font.D3};
`;

const LatterBox = styled.div<{ isSelected?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isSelected ? color.primary : color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span`
  ${font.D3};
  color: ${color.gray600};
`;
