"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

type ModalProps = {
  title: string;
  info: string;
  passfunction: () => void;

  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const TwoOptionModal = ({
  title,
  info,
  passfunction,
  isOpen,
  setIsOpen,
}: ModalProps) => {
  return (
    <Overlay>
      <TwoOptionModalLayout>
        <TwoOptionInfo>
          <Title>{title}</Title>
          <Infomation>{info}</Infomation>
        </TwoOptionInfo>

        <OptionBox>
          <CancelOption
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            취소
          </CancelOption>
          <PasslOption onClick={passfunction}>확인</PasslOption>
        </OptionBox>
      </TwoOptionModalLayout>
    </Overlay>
  );
};

export default TwoOptionModal;

const TwoOptionModalLayout = styled.div`
  max-width: 400px;
  width: 90%;
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 28px;
  padding: 50px 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4vh;
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0px;
`;

const TwoOptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  ${font.D2};
  color: ${color.black};
`;

const Infomation = styled.p`
  ${font.D3};
  color: ${color.gray600};
  padding-top: 4px;
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
`;
const CancelOption = styled.p`
  ${font.D3};
  color: ${color.black};
`;

const PasslOption = styled.p`
  ${font.D3};
  color: ${color.primary};
`;
