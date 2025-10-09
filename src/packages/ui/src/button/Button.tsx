import font from "@/packages/design-system/src/font";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";

type ButtonProps = {
    onCkick: () => void;
    text : string;
}


const Button = ({text, onCkick} : ButtonProps) => {
  return (
    <ButtonLayout onClick={onCkick}>
        <ButtonText>{text}</ButtonText>
    </ButtonLayout>
  );
}

export default Button;

const ButtonLayout = styled.div`
    max-width : 600px;
    width: 90%;
    height: 56px;
    background-color: ${color.primary};
    border-radius: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ButtonText = styled.p`
    ${font.D2};
    color: ${color.white};
`