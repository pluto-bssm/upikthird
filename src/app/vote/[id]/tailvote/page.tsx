"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Button from "@/packages/ui/src/button/Button";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import AccentModal from "@/components/modal/AccentModal";
import { Completevote } from "../../../../../public/svg/svg";
import { useCreateTailVote } from "@/hooks/useVotes";


const TailVote = () => {
  const router = useRouter();
  const path = usePathname();
  const newPath = path.replace("tailvote", "");
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const { createTailVote, loading, error } = useCreateTailVote();
  void error;
  const voteId = newPath.split("/").filter(Boolean).pop() || "";

  const HandleTailVoteMake = async () => {
    try {
    
      if (!content.trim()) {
        const result = createTailVote("선지가 마음에 들어서", voteId);
        setIsOpen(true);
        return;
      }

      const result = await createTailVote(content, voteId);

      if (result) {
        setIsOpen(true);
      }
    } catch (err) {
      void err;
      alert("투표 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <TailVoteLayout>
      <Header
        types={"report and close"}
        onSubmit={() => {
          router.push(`${newPath}/report`);
        }}
      />

      <TailVoteBlock>
        <TailInfo>
          <MenuText>꼬리질문 응답하기</MenuText>
          <Title>선지를 고른 이유는 무엇인가요?</Title>
          <SubTitle>꼬리질문은 응답하지 않고 넘어갈 수 있어요</SubTitle>
        </TailInfo>

        <TextAreaContainer>
          <TextArea
            placeholder="응답을 작성해주세요! 꼬리 질문 응답은 더 질 높은 가이드를 제작하는데 도움이 됩니다."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </TextAreaContainer>
      </TailVoteBlock>
      <Button
        text={loading ? "투표 중..." : "투표 완료하기"}
        onCkick={HandleTailVoteMake}
      />

      {isOpen && (
        <AccentModal
          icon={<Completevote width="30" height="30" />}
          leftText="투표를"
          accentText="완료"
          rightText="했어요!"
          subText={"마이페이지에서 투표 참여내역\n을확인할 수 있습니다."}
          onClick={() => {
            router.push("/vote");
          }}
          voteId={voteId}
        />
      )}
    </TailVoteLayout>
  );
};

export default TailVote;

const TailVoteLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`;

const TailVoteBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  height: 60%;
`;

const TailInfo = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 4px;
`;

const MenuText = styled.p`
  ${font.H3};
  color: ${color.primary};
`;

const Title = styled.p`
  ${font.D2};
  color: ${color.black};
`;

const SubTitle = styled.p`
  ${font.H3};
  color: ${color.gray400};
`;

const TextAreaContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  padding: 16px;
  ${font.P1};
  background-color: ${color.white};
  color: ${color.black};
  resize: none;
  outline: none;

  ::placeholder {
    color: ${color.gray300};
  }
`;
