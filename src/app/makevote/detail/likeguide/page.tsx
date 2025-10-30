"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/packages/ui/src/button/Button";
import GuideBlock from "@/components/votemake/guideblock";
import { Plus } from "../../../../../public/svg/svg";
import { useState } from "react";
import TwoOptionModal from "@/components/modal/TwoOptionModal";
import LoadingModal from "@/components/modal/LoadingModal";
import AccentModal from "@/components/modal/AccentModal";
import { Completevote } from "../../../../../public/svg/svg";
import { useSearchSimilarGuides } from "@/hooks/useGuides";
import { useVoteStore } from "@/store/useMakeVoteStore";
import { useCreateVote } from "@/hooks/useVote";
import { CreateVoteInput } from "@/types/api";



const LikeGuide = () => {
  const router = useRouter();
  const path = usePathname();
  const [IsOpen, setIsOpen] = useState(false);
  const [IsOpen_1, setIsOpen_1] = useState(false);
  const [IsOpen_2, setIsOpen_2] = useState(false);

  const { title , ballots, category, resetVoteData } = useVoteStore();
  const { createVote } = useCreateVote();

  const { data } = useSearchSimilarGuides(title);
  
  

  const HandleSubmit = () => {
      setIsOpen_1(true);
      const voteInput: CreateVoteInput = {
            title: title.trim(),
            category: category,
            options: ballots 
        };  
      const result =  createVote(voteInput);
      if(result != null ){
        setIsOpen_1(false);
        setIsOpen_2(true);
      }
      resetVoteData();

  };

  return (
    <LikeGuideLayout>
      <Header types="close" onClose={() => {setIsOpen(true);resetVoteData()}} />

      <LikeGuideSection>
        <LikeGuideInfoArea>
          <LikeGuideMainText>유사한 내용의 가이드가 있어요!</LikeGuideMainText>
          <LikeGuideTitle>
            아래의 가이드에 원하는 내용이 있다면, 상단의 엑스 버튼을
            선택해주세요!
          </LikeGuideTitle>
          <LikeGuideSubText>
            가이드 제목을 클릭하면 내용 전부를 확인할 수 있어요.
          </LikeGuideSubText>
        </LikeGuideInfoArea>

        <LikeGuideListArea>
          {data?.keywordGuide.searchSimilarByTitle.map((ballot, index) => (
            <GuideBlock
              key={index}
              title={ballot.title}
              category={ballot.category}
              viewCount={ballot.likeCount}
            />
          ))}
        </LikeGuideListArea>

        <Button
          icon={<Plus width={20} height={20} />}
          text="계속 진행하기"
          onCkick={HandleSubmit}
        />
      </LikeGuideSection>

      {IsOpen && (
        <TwoOptionModal
          title="투표 제작을 취소하시겠어요?"
          info="지금까지 작성한 내용은 저장되지 않습니다."
          passfunction={() => {
            router.replace("/vote");
          }}
          setIsOpen={setIsOpen}
          isOpen={IsOpen}
        />
      )}

      {IsOpen_1 && (
        <LoadingModal
          title="투표를 제작하고 있어요."
          info="유픽에서는 재학생들로부터 더 정확한 정보를 제공받을 수 있어요."
        />
      )}

      {IsOpen_2 && (
        <AccentModal
          icon={<Completevote />}
          leftText="투표 제작을"
          rightText="했어요!"
          accentText="완료"
          onClick={() => {
            router.push("/vote");
          }}
          subText="투표 제작 이후 투표 내용은 변경될 수 없어요."
        />
      )}
    </LikeGuideLayout>
  );
};

export default LikeGuide;

const LikeGuideLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  margin-top: -50px;
`;

const LikeGuideSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 150px;
  margin-bottom: 30px;
`;

const LikeGuideInfoArea = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const LikeGuideMainText = styled.p`
  ${font.H1};
  color: ${color.primary};
`;

const LikeGuideTitle = styled.p`
  ${font.D1};
  color: ${color.black};
`;

const LikeGuideSubText = styled.p`
  ${font.H2};
  color: ${color.gray400};
`;

const LikeGuideListArea = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
`;
