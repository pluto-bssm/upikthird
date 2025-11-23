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
  ${font.D3};
  color: ${color.black};
`;

const Infomation = styled.p`
  ${font.P2};
  color: ${color.gray600};
  padding-top: 4px;
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  gap : 12px;
`;
const CancelOption = styled.p`
  ${font.Btn2};
  color: ${color.black};
  background-color: ${color.gray200};
  width : 90%;
  text-align: center;
  padding : 16px 0px;
  border-radius: 12px;
`;

const PasslOption = styled.p`
  ${font.Btn2};
  color: ${color.white};
  background-color: ${color.primary};
  width : 90%;
  text-align: center;
  padding : 16px 0px;
  border-radius: 12px;
`;
