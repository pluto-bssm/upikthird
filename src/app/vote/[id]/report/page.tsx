"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Ballot from "@/components/vote/ballot";
import { useState, useEffect } from "react";
import SelectButton from "@/packages/ui/src/button/SelectButton";
import TwoOptionModal from "@/components/modal/TwoOptionModal";
import AccentModal from "@/components/modal/AccentModal";
import { useRouter, usePathname } from "next/navigation";
import { Completevote } from "../../../../../public/svg/svg";
import { useReportQuestion } from "@/hooks/useReportQuestion";

const ReportReason = [
  { id: "1", reason: "유해한 내용을 포함하고 있어요" },
  { id: "2", reason: "명예훼손 또는 저작권이 침해되었어요" },
  { id: "3", reason: "욕설/생명경시/혐오 표현이 사용되었어요" },
  { id: "4", reason: "기타" },
];

const Report = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [detail, setDetail] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  let path = usePathname();
  path = path.replace("/report", "");
  path = path.replace("/vote/", "");

  const voteId = path;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen_1, setIsOpen_1] = useState(false);

  const { reportQuestion, loading, error, reset } = useReportQuestion();

  useEffect(() => {
    if (selectedOption && detail.trim().length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [selectedOption, detail]);

  const handleSubmit = async () => {
    if (!isActive || loading) return;

    if (!voteId) {
      alert("투표 ID를 찾을 수 없습니다.");
      router.push("/");
      return;
    }

    const selectedReason = ReportReason.find((r) => r.id === selectedOption);
    if (!selectedReason) {
      alert("신고 사유를 선택해주세요.");
      return;
    }

    const fullReason = `${selectedReason.reason}\n\n상세 내용: ${detail}`;

    try {
      const result = await reportQuestion(voteId, fullReason);

      if (result.success) {
        setDetail("");
        setSelectedOption(null);
        setIsOpen_1(true);
      } else {
        alert("신고 접수에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      alert(error || "신고 접수 중 오류가 발생했습니다.");
      console.error("Report submission error:", err);
    }
  };

  return (
    <ReportLayout>
      <Header
        types="title"
        text="신고하기"
        onSubmit={() => {
          setIsOpen(true);
        }}
      />

      <ReportBlock>
        <ReportInfoBox>
          <SubTitle>신고할 내용</SubTitle>
          <Title>투표 신고하기</Title>
        </ReportInfoBox>

        <ReportBallotBox>
          <ReportReasonTopBox>
            <ReportReasonChoiceText>
              신고 사유 선택{" "}
              <ReportReasonChoiceAccentText>*</ReportReasonChoiceAccentText>
            </ReportReasonChoiceText>

            {ReportReason.map((ballot) => (
              <Ballot
                key={ballot.id}
                content={ballot.reason}
                isSelected={selectedOption === ballot.id}
                type="report"
                onClick={() =>
                  setSelectedOption((prev) =>
                    prev === ballot.id ? null : ballot.id,
                  )
                }
              />
            ))}
          </ReportReasonTopBox>

          <ReportReasonBottomBox>
            <ReportReasonChoiceText>
              상세 내용{" "}
              <ReportReasonChoiceAccentText>*</ReportReasonChoiceAccentText>
            </ReportReasonChoiceText>

            <TextAreaContainer>
              <TextArea
                placeholder="신고 사유에 대해서 더 자세히 설명해주세요."
                value={detail}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setDetail(e.target.value);
                  }
                }}
                maxLength={500}
                disabled={loading}
              />
            </TextAreaContainer>

            <TextMaxAlertText>{detail.length}/500자</TextMaxAlertText>
          </ReportReasonBottomBox>
        </ReportBallotBox>

        <SelectButton
          text={loading ? "신고 접수 중..." : "신고 접수하기"}
          active={isActive && !loading}
          onCkick={handleSubmit}
        />
      </ReportBlock>

      {isOpen && (
        <TwoOptionModal
          title="신고를 취소하시겠어요?"
          info="지금까지 작성한 내용은 저장되지 않습니다."
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          passfunction={() => {
            reset();
            router.back();
          }}
        />
      )}

      {isOpen_1 && (
        <AccentModal
          icon={<Completevote width="30" height="30" />}
          leftText="신고가"
          accentText="성공적"
          rightText="으로 접수됐어요"
          subText="지속적으로 정상적인 투표를 신고하는 경우
제재의 대상이 될 수 있어요"
          onClick={() => {
            reset();
            router.push("/vote");
          }}
        />
      )}
    </ReportLayout>
  );
};

export default Report;

const ReportLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`;

const ReportInfoBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 4px;
`;

const Title = styled.p`
  ${font.D2};
  color: ${color.black};
`;

const SubTitle = styled.p`
  ${font.H3};
  color: ${color.gray700};
`;

const ReportBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const ReportBallotBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 64px;
`;

const ReportReasonChoiceText = styled.p`
  ${font.H2};
  color: ${color.gray700};
`;

const ReportReasonChoiceAccentText = styled.span`
  color: ${color.accent};
`;

const ReportReasonTopBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReportReasonBottomBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  padding: 16px;
  ${font.P1};
  background-color: ${color.white};
  color: ${color.gray700};
  resize: none;
  outline: none;

  ::placeholder {
    color: ${color.gray300};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TextMaxAlertText = styled.p`
  ${font.P1};
  color: ${color.gray300};
`;
