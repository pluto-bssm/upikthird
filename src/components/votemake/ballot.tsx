import React from "react";
import styled from "@emotion/styled";
import font from "@/packages/design-system/src/font";
import color from "@/packages/design-system/src/color";
import { GrayClose } from "../../../public/svg/svg";

type BallotInputProps = {
  info: string;
  value: string;
  onChange: (v: string) => void;
  onRemove: () => void;
};

const Ballot = ({ info, value, onChange, onRemove }: BallotInputProps) => {
  return (
    <BallotLayout>
      <BallotRow>
        <BallotIndexCircle>
          <BallotIndexText>{info}</BallotIndexText>
        </BallotIndexCircle>
        <BallotTextInput
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="선지를 입력해주세요"
        />
        <BallotRemoveIcon width={24} height={24} onClick={onRemove} />
      </BallotRow>
    </BallotLayout>
  );
};

export default Ballot;


const BallotLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 0px;
  border-radius: 16px;
  border: 1px solid ${color.gray300};
`;

const BallotRow = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

const BallotIndexCircle = styled.div`
  background-color: ${color.gray100};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 50%;
`;

const BallotIndexText = styled.span`
  font-weight: 500;
  color: ${color.gray400};
  width: 20px;
  height: 20px;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const BallotTextInput = styled.input`
  width: 80%;
  background-color: ${color.white};
  border: none;
  outline: none;
  color: ${color.gray600};
  ${font.H2};
  padding: 0px 8px;

  ::placeholder {
    color: ${color.gray400};
  }
`;

const BallotRemoveIcon = styled(GrayClose)`
  filter: invert(86%) sepia(5%) saturate(0%) hue-rotate(284deg) brightness(88%)
    contrast(78%);
  cursor: pointer;
`;
