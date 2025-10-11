import font from "@/packages/design-system/src/font";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";

type ButtonProps = {
    onCkick: () => void;
    text : string;
    active?: boolean;
}


const SelectButton = ({text, onCkick,active = false} : ButtonProps) => {
  return (
    <ButtonLayout onClick={onCkick} active={active}>
        <ButtonText>{text}</ButtonText>
    </ButtonLayout>
  );
}

export default SelectButton;

const ButtonLayout = styled.div<{active : boolean}>`
    max-width : 600px;
    width: 90%;
    height: 56px;
    background-color: ${({ active }) => active ? color.primary : color.gray200}; 
    border-radius: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ButtonText = styled.p`
    ${font.D2};
    color: ${color.white};
`