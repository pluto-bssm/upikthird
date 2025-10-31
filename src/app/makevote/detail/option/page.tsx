"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Nexts, Completevote, Bad } from "../../../../../public/svg/svg";
import MemberChoseBottomSheet from "@/components/votemake/MemberChoseBottomSheet";
import IconTwoOptionModal from "@/components/modal/IconTwoOptionModal";
import LoadingModal from "@/components/modal/LoadingModal";
import AccentModal from "@/components/modal/AccentModal";
import { useVoteStore } from "@/store/useMakeVoteStore";
import { useGenerateAiOptions } from "@/hooks/useVotes";

const Options = () => {
  const router = useRouter();
  const [IsOpen, setIsOpen] = useState(false);
  const [IsOpen_1, setIsOpen_1] = useState(false);
  const [IsOpen_2, setIsOpen_2] = useState(false);
  const [IsOpen_3, setIsOpen_3] = useState(false);
  const [IsOpen_4, setIsOpen_4] = useState(false);
  const [aiUsageCount, setAiUsageCount] = useState(0);
  const { ballots, title, setBallots } = useVoteStore();

  const { generateAiOptions, loading, options, error } = useGenerateAiOptions();

  // AI 옵션 생성 함수
  async function MakeAiBallot() {
    if (aiUsageCount < 3) {
      setAiUsageCount(aiUsageCount + 1);
      setIsOpen_1(false);
      setIsOpen_2(true);

      try {
        // AI 옵션 생성 호출
        const result = await generateAiOptions(ballots.length || 4, title);

        if (result && result.options.length > 0) {
          setBallots(result.options);
          setIsOpen_2(false);
          setIsOpen_3(true);
        }
      } catch (err) {
        console.error("AI 옵션 생성 실패:", err);
        setIsOpen_2(false);
        // 에러 처리 모달을 추가할 수 있습니다
      }
    } else {
      setIsOpen_1(false);
      setIsOpen_4(true);
    }
  }

  return (
    <OptionsLayout>
      <Header
        types="title"
        text="투표 설정하기"
        onSubmit={() => {
          router.back();
        }}
      />

      <OptionSection>
        <OptionCard onClick={() => setIsOpen(true)}>
          <OptionCardContent>
            <OptionTitleRow>
              <OptionTitleText>투표 종료 조건</OptionTitleText>
            </OptionTitleRow>
            <OptionActionRow>
              <OptionSubtitleText>투표 종료 조건 설정하기</OptionSubtitleText>
              <Nexts width={20} height={20} />
            </OptionActionRow>
          </OptionCardContent>
        </OptionCard>

        <OptionCard
          onClick={() => {
            setIsOpen_1(true);
          }}
        >
          <OptionCardContent>
            <OptionTitleRow>
              <OptionTitleText>선지 작성하기</OptionTitleText>
            </OptionTitleRow>
            <OptionActionRow>
              <OptionSubtitleText>
                AI 자동 선지 추천 기능 사용하기
              </OptionSubtitleText>
              <Nexts width={20} height={20} />
            </OptionActionRow>
          </OptionCardContent>
        </OptionCard>
      </OptionSection>

      {IsOpen && (
        <MemberChoseBottomSheet isOpen={IsOpen} setIsOpen={setIsOpen} />
      )}
      {IsOpen_1 && (
        <IconTwoOptionModal
          icon="exclamation"
          title="AI 선지 추천 기능 사용하기"
          subtitle="투표를 제작할 때 선지 작성에 어려움을 겪는 경우 
이 기능을 사용하여 AI가 선지를 작성하도록 할 수 있습니다."
          primaryButtonText={`사용하기 ${aiUsageCount}/3`}
          secondaryButtonText="뒤로가기"
          onPrimaryClick={() => {
            MakeAiBallot();
          }}
          onSecondaryClick={() => {
            setIsOpen_1(false);
          }}
        />
      )}
      {IsOpen_2 && (
        <LoadingModal
          title="AI가 선지를 작성하는 중..."
          info="AI가 선지를 작성하는데 약 1분정도의 시간이 소요됩니다."
        />
      )}
      {IsOpen_3 && (
        <AccentModal
          icon={<Completevote />}
          leftText="AI가 선지 작성을"
          accentText="완료"
          rightText="했어요!"
          onClick={() => {
            setIsOpen_3(false);
          }}
        />
      )}
      {IsOpen_4 && (
        <AccentModal
          icon={<Bad />}
          leftText="오늘은 더 이상 AI 선지 추천기능을 "
          accentText="이용"
          rightText="할 수 없어요"
          subText="AI 선지 추천 기능은 하루에 3번만 사용할 수 있고, 사용 기능 횟수는 매일밤 12시에 초기화 돼요."
          onClick={() => {
            setIsOpen_4(false);
          }}
        />
      )}
    </OptionsLayout>
  );
};

export default Options;

const OptionsLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: start;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`;

const OptionSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const OptionCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${color.gray100};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.gray50};
  }
`;

const OptionCardContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const OptionTitleRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OptionActionRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionTitleText = styled.p`
  color: ${color.gray400};
  ${font.caption};
`;

const OptionSubtitleText = styled.p`
  color: ${color.black};
  ${font.D3};
`;
