"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useRouter } from "next/navigation";
import Button from "@/packages/ui/src/button/Button";
import GuideBlock from "@/components/votemake/guideblock";
import { Plus, Completevote } from "../../../../../public/svg/svg";
import { useState } from "react";
import TwoOptionModal from "@/components/modal/TwoOptionModal";
import LoadingModal from "@/components/modal/LoadingModal";
import AccentModal from "@/components/modal/AccentModal";
import { useSearchSimilarGuides } from "@/hooks/useGuides";
import { useVoteStore } from "@/store/useMakeVoteStore";
import { useCreateVote } from "@/hooks/useVotes";
import type { SimilarGuide } from "@/services/guide/api";

const LikeGuide = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const { 
    title, 
    ballots, 
    category, 
    resetVoteData, 
    closureType, 
    customDays, 
    participantThreshold 
  } = useVoteStore();
  
  const { createVote, loading, error } = useCreateVote();
  
  // 훅 사용법 수정: data가 아니라 guides 사용
  const { 
    guides: similarGuides, 
    loading: guidesLoading, 
    error: guidesError 
  } = useSearchSimilarGuides(title);

  const handleSubmit = async () => {
  try {
    setIsLoadingOpen(true);

    // 기본 input
    const voteInput: any = {
      title: title.trim(),
      category: category,
      options: ballots,
      closureType: closureType,
    };

    // closureType에 따라 조건부로 추가
    if (closureType === "CUSTOM_DAYS" && customDays) {
      voteInput.customDays = customDays;
    } else if (closureType === "PARTICIPANT_COUNT" && participantThreshold) {
      voteInput.participantThreshold = participantThreshold;
    }

    console.log("Creating vote with input:", voteInput);
    console.log("=== 투표 생성 디버깅 ===");
    console.log("closureType:", closureType);
    console.log("customDays:", customDays);
    console.log("participantThreshold:", participantThreshold);
    console.log("voteInput:", voteInput);


    const result = await createVote(voteInput);

    setIsLoadingOpen(false);

    if (result) {
      setIsCompleteOpen(true);
      resetVoteData();
    } else {
      alert("투표 생성에 실패했습니다. 다시 시도해주세요.");
    }
  } catch (err) {
    setIsLoadingOpen(false);
    console.error("Vote creation error:", err);
    alert("투표 생성 중 오류가 발생했습니다.");
  }
};


  const handleClose = () => {
    setIsOpen(true);
  };

  const handleCancelConfirm = () => {
    resetVoteData();
    router.replace("/vote");
  };

  const handleCompleteConfirm = () => {
    setIsCompleteOpen(false);
    router.push("/vote");
  };

  // 가이드 로딩 상태
  if (guidesLoading) {
    return (
      <LikeGuideLayout>
        <Header types="close" onClose={handleClose} />
        <LoadingContainer>
          <LoadingText>유사한 가이드를 찾고 있어요...</LoadingText>
        </LoadingContainer>
      </LikeGuideLayout>
    );
  }

  // 가이드 에러 상태
  if (guidesError) {
    return (
      <LikeGuideLayout>
        <Header types="close" onClose={handleClose} />
        <ErrorContainer>
          <ErrorText>가이드를 불러오는 중 오류가 발생했습니다.</ErrorText>
          <RetryButton onClick={() => window.location.reload()}>
            다시 시도
          </RetryButton>
        </ErrorContainer>
      </LikeGuideLayout>
    );
  }

  return (
    <LikeGuideLayout>
      <Header types="close" onClose={handleClose} />

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
          {similarGuides.length > 0 ? (
            similarGuides.map((guide: SimilarGuide, index: number) => ( // 타입 명시
              <GuideBlock
                key={guide?.id || index}
                title={guide?.title}
                category={guide?.category}
                viewCount={guide?.likeCount}
              />
            ))
          ) : (
            <NoGuideText>유사한 가이드가 없습니다.</NoGuideText>
          )}
        </LikeGuideListArea>

        <Button
          icon={<Plus width={20} height={20} />}
          text="계속 진행하기"
          onCkick={handleSubmit}
        />
      </LikeGuideSection>

      {/* 취소 확인 모달 */}
      {isOpen && (
        <TwoOptionModal
          title="투표 제작을 취소하시겠어요?"
          info="지금까지 작성한 내용은 저장되지 않습니다."
          passfunction={handleCancelConfirm}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      )}

      {/* 로딩 모달 */}
      {isLoadingOpen && (
        <LoadingModal
          title="투표를 제작하고 있어요."
          info="유픽에서는 재학생들로부터 더 정확한 정보를 제공받을 수 있어요."
        />
      )}

      {/* 완료 모달 */}
      {isCompleteOpen && (
        <AccentModal
          icon={<Completevote />}
          leftText="투표 제작을"
          rightText="했어요!"
          accentText="완료"
          onClick={handleCompleteConfirm}
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
`;

const LikeGuideSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 100px;
  margin-bottom: 30px;
  padding: 0 20px;
`;

const LikeGuideInfoArea = styled.div`
  width: 100%;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-height: 200px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const LoadingText = styled.p`
  ${font.H1};
  color: ${color.gray400};
`;

const ErrorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  gap: 20px;
`;

const ErrorText = styled.p`
  ${font.H1};
  color: ${color.gray400};
`;

const RetryButton = styled.button`
  ${font.D3};
  color: ${color.white};
  background-color: ${color.primary};
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const NoGuideText = styled.p`
  ${font.H2};
  color: ${color.gray400};
  text-align: center;
  padding: 40px 0;
`;
