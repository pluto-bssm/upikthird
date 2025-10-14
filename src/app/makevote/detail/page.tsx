'use client'

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Header from "@/components/common/header";
import Ballot from "@/components/votemake/ballot";
import { useVoteStore } from "@/store/useMakeVoteStore";
import {Plus} from "../../../../public/svg/svg";
import Button from "@/packages/ui/src/button/Button";
import { useRouter , usePathname } from "next/navigation";

const Latterlist = ["A", "B", "C", "D", "E"];


const Detail = () => {
    const { ballots, setBallots, title, setTitle } = useVoteStore();
    const maxPossibleBallots = Latterlist.length;
    const router = useRouter();
    const path = usePathname();

    const handleRemoveBallot = (idx: number) => {
    if (ballots.length > 2) {
      setBallots(ballots.filter((_, i) => i !== idx));
    }
  };

 
  const handleAddBallot = () => {
    if (ballots.length < Latterlist.length) {
      setBallots([...ballots, ""]);
    }
  };

  return (
    <DetailLayout>
      <Header types="close and option" onSubmit={() => {router.push(`${path}/option`)}}/>

      <DetailSection>
        <DetailInformation>
          <SubTitle>투표제작하기</SubTitle>
          <Title placeholder="질문을 작성해주세요" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </DetailInformation>

        <BallotList>
          {ballots.map((b, idx) => (
            <Ballot
              key={idx}
              info={Latterlist[idx]}
              value={b}
              onChange={(v) => {
                const newBallots = [...ballots];
                newBallots[idx] = v;
                setBallots(newBallots);
              }}
              onRemove={() => handleRemoveBallot(idx)}
            />
          ))}
        </BallotList>

        {ballots.length < maxPossibleBallots && (
          <AddBallotButton onClick={handleAddBallot}>
            <Plus width={24} height={24} />
          </AddBallotButton>
        )}

      </DetailSection>

      <Button icon={<Plus width={24} height={24} />} onCkick={() => {}} text="투표 제작하기" />
    </DetailLayout>
  );
};

export default Detail;

const DetailLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  gap : 10vh;
`;

const DetailSection = styled.div`
  margin-top : 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-direction: column;
`;

const DetailInformation = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
  width: 90%;
`;

const Title = styled.input`
  color: ${color.black};
  ${font.D1};
  outline: none;
  background-color: ${color.white};
  border: none;

  ::placeholder {
    color: ${color.gray300};
  }
`;

const SubTitle = styled.div`
  color: ${color.primary};
  ${font.H1};
`;


const BallotList = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AddBallotButton = styled.div`
  cursor: pointer;
  font-weight: 500;
  padding: 8px 8px;
  border-radius: 50%;
  background-color: ${color.primary};
  transition: all 0.2s ease;
  aspect-ratio: 1;
  display : flex;

  &:active {
    transform: translateY(1px);
  }
`;
