import font from "@/packages/design-system/src/font";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";

type ButtonProps = {
    onCkick: () => void;
    text : string;
    icon?: React.ReactNode;

}


const Button = ({text, onCkick,icon} : ButtonProps) => {
  return (
    <ButtonLayout onClick={onCkick}>
        {icon && <ButtonIcon>{icon}</ButtonIcon>}
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
    gap : 8px;
`

const ButtonText = styled.p`
    ${font.D2};
    color: ${color.white};
`

const ButtonIcon = styled.div`
    object-fit: fill;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;

`