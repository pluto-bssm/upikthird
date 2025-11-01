"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Header from "@/components/common/header";
import Ballot from "@/components/votemake/ballot";
import { useVoteStore } from "@/store/useMakeVoteStore";
import { Plus, Bad } from "../../../../public/svg/svg";
import Button from "@/packages/ui/src/button/Button";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import TwoOptionModal from "@/components/modal/TwoOptionModal";
import IconTwoOptionModal from "@/components/modal/IconTwoOptionModal";
import LoadingModal from "@/components/modal/LoadingModal";
import AccentModal from "@/components/modal/AccentModal";
import { useSearchSimilarGuides } from "@/hooks/useGuides";
import { searchSimilarGuides as apiSearchSimilarGuides } from "@/services/guide/api";
import { useCheckBadWord } from "@/hooks/useVotes";
import { useCreateVote } from "@/hooks/useVotes";
import { VoteClosureType } from "@/types/api";

const Latterlist = ["A", "B", "C", "D", "E"];

const Detail = () => {
  const {
    ballots,
    setBallots,
    title,
    setTitle,
    resetVoteData,
    category,
    closureType,
    customDays,
    participantThreshold,
  } = useVoteStore();
  const maxPossibleBallots = Latterlist.length;
  const router = useRouter();
  const path = usePathname();

  const [IsOpen_1, setIsOpen_1] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [IsOpen_2, setIsOpen_2] = useState(false);
  const [IsOpen_3, setIsOpen_3] = useState(false);
  const [IsOpen_4, setIsOpen_4] = useState(false);

  const {
    guides: similarGuides,
    loading: searchLoading,
    searchSimilarGuides,
  } = useSearchSimilarGuides(title, { autoFetch: false });

  const {
    checkBadWord,
    loading: badWordLoading,
    result: badWordResult,
  } = useCheckBadWord();

  const {
    createVote,
    loading: createLoading,
    error: createError,
  } = useCreateVote();

  function CanCelMakeVote() {
    resetVoteData();
    router.replace("/vote");
  }

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

  const handleVoteSubmit = async () => {
    setIsOpen(false);
    setIsOpen_2(true);

    try {
      const currentTextToCheck = `${title} ${ballots.join(" ")}`;
      const badWordCheckResult = await checkBadWord(currentTextToCheck);

      setIsOpen_2(false);

      if (badWordCheckResult?.containsBadWord === true) {
        setIsOpen_3(true);
        return;
      }

      setIsOpen_4(true);


      const guides = await apiSearchSimilarGuides(title);

      if (guides && guides.length > 0) {
        setIsOpen_4(false);
        router.push(`${path}/likeguide`);
        return;
      } else if (guides && guides.length === 0) {
        const voteInput = {
          title: title.trim(),
          category: category,
          options: ballots,
          closureType: closureType,
          ...(closureType === VoteClosureType.CUSTOM_DAYS &&
            customDays && { customDays }),
          ...(closureType === VoteClosureType.PARTICIPANT_COUNT &&
            participantThreshold && { participantThreshold }),
        };

        

        const createResult = await createVote(voteInput);

        setIsOpen_4(false);

        if (createResult) {
         
          resetVoteData();
          router.push("/vote");
        }
      }
    } catch (error) {
     
      setIsOpen_2(false);
      setIsOpen_4(false);
      alert("투표 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const CheckVote = () => {
    if (title.trim() === "" || ballots.some((b) => b.trim() === "")) {
      alert("질문과 선지를 모두 작성해주세요.");
      return;
    }
    setIsOpen(true);
  };

  return (
    <DetailLayout>
      <Header
        types="close and option"
        onSubmit={() => {
          router.push(`${path}/option`);
        }}
        onSecondSubmit={() => {
          setIsOpen_1(true);
        }}
      />

      <DetailSection>
        <DetailInformation>
          <SubTitle>투표제작하기</SubTitle>
          <Title
            placeholder="질문을 작성해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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

      <Button
        icon={<Plus width={24} height={24} />}
        onCkick={() => {
          CheckVote();
        }}
        text="투표 제작하기"
      />

      {IsOpen_1 && (
        <TwoOptionModal
          title="투표 제작을 취소하시겠어요?"
          info="지금까지 작성한 내용은 저장되지 않습니다."
          passfunction={CanCelMakeVote}
          isOpen={IsOpen_1}
          setIsOpen={setIsOpen_1}
        />
      )}
      {IsOpen && (
        <IconTwoOptionModal
          icon="exclamation"
          title="제출하시겠어요?"
          subtitle="투표 질문 또는 선지에 욕설/ 상대를 비방하는 내용이 담긴 경우
투표가 사전고지 없이 삭제되거나, 불이익을 받을 수 있습니다."
          primaryButtonText="제출하기"
          secondaryButtonText="투표 수정하기"
          onPrimaryClick={handleVoteSubmit}
          onSecondaryClick={() => {
            setIsOpen(false);
          }}
        />
      )}
      {IsOpen_2 && (
        <LoadingModal
          title="욕설이 있는지 확인하고 있어요"
          info="욕설이 포함된 투표는 제작될 수 없어요."
        />
      )}
      {IsOpen_3 && (
        <AccentModal
          icon={<Bad />}
          leftText="투표 내용을"
          accentText="수정"
          rightText="해주세요"
          subText={`질문 또는 선지에 욕설/ 상대를 비방하는 내용이 담긴 투표는${"\n"}
제작할 수 없어요. 내용을 수정해주세요.`}
          onClick={() => {
            setIsOpen_3(false);
          }}
        />
      )}
      {IsOpen_4 && (
        <LoadingModal
          title={`유사한 내용의 가이드가 있는지\n확인하고 있어요`}
          info="유사한 내용의 가이드가 있다면, 기다리지 않아도 돼요"
        />
      )}
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
  gap: 10vh;
`;

const DetailSection = styled.div`
  margin-top: 100px;
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
  width: 100%;
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
  display: flex;

  &:active {
    transform: translateY(1px);
  }
`;
