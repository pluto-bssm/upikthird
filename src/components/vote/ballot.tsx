import color from "@/packages/design-system/src/color";
import styled from "@emotion/styled";
import font from "@/packages/design-system/src/font";

type BallotProps = {
  content: string;
  letter: string;
};

const Ballot = ({content,letter} : BallotProps) => {
  return (
      <BallotLayout>
        <BallotInfo>

            <LatterBox>
                <Letter>{letter}</Letter>
            </LatterBox>

        <Label>{content}</Label>
        </BallotInfo>
      </BallotLayout>

  );
};

export default Ballot;


const BallotLayout = styled.div`
  width: 100%;
  height: 7vh;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border : 1px solid ${color.gray100};
`;

const BallotInfo = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap : 12px;
`

const Letter = styled.p`
  color: ${color.gray600};
  ${font.D3};
`;

const LatterBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.span`
  ${font.D3};
  color: ${color.gray600};
`;
