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
import { useRouter } from "next/navigation";
import { Completevote } from "../../../../../public/svg/svg";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen_1, setIsOpen_1] = useState(false);

  useEffect(() => {
    if (selectedOption && detail.trim().length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [selectedOption, detail]);

  const handleSubmit = () => {
    if (!isActive) return;
    setIsOpen_1(true);
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
                onChange={(e) => setDetail(e.target.value)}
              />
            </TextAreaContainer>

            <TextMaxAlertText>500자 이내로 입력해주세요</TextMaxAlertText>
          </ReportReasonBottomBox>
        </ReportBallotBox>

        <SelectButton
          text="신고 접수하기"
          active={isActive}
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
            router.push("/");
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
  ${font.D1};
  color: ${color.black};
`;

const SubTitle = styled.p`
  ${font.H1};
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
  ${font.D3};
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
  ${font.H3};
  background-color: ${color.white};
  color: ${color.gray300};
  resize: none;
  outline: none;

  ::placeholder {
    color: ${color.gray300};
  }
`;

const TextMaxAlertText = styled.p`
  ${font.H2};
  color: ${color.gray300};
`;
