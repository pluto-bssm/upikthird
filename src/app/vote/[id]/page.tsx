"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/packages/ui/src/button/Button";
import Ballot from "@/components/vote/ballot";
import { useState } from "react";

const BallotData = [
  {
    content: "내용1",
    letter: "A",
    id: "1",
  },
  {
    content: "내용2",
    letter: "B",
    id: "2",
  },
  {
    content: "내용3",
    letter: "C",
    id: "3",
  },
  {
    content: "내용4",
    letter: "D",
    id: "4",
  },
  {
    content: "내용5",
    letter: "E",
    id: "5",
  },
];

const DesVote = () => {
  const router = useRouter();
  const path = usePathname();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  return (
    <DesVoteLayout>
      <Header
        types={"report and close"}
        onSubmit={() => {
          router.push(`${path}/report`);
        }}
      />

      <VoteBlock>
        <VoteInfo>
          <MenuText>투표하기</MenuText>
          <Title>
            투표 질문투표 질문투표 질문투표 질문투표 질문투표 질문투표 질문투표
            질문
          </Title>
          <SubTitle>
            부적절한 투표는 위에 있는 신고버튼을 이용해 신고해주세요
          </SubTitle>
        </VoteInfo>

        <VoteContent>
          {BallotData.map((ballot, index) => (
            <Ballot
              key={index}
              content={ballot.content}
              letter={ballot.letter}
              isSelected={selectedOption === ballot.id}
              type="vote"
              onClick={() =>
                setSelectedOption((prev) =>
                  prev === ballot.id ? null : ballot.id,
                )
              }
            />
          ))}
        </VoteContent>

        <Button
          text="투표 완료하기"
          onCkick={() => router.push(`${path}/tailvote`)}
        />
      </VoteBlock>
    </DesVoteLayout>
  );
};

export default DesVote;

const DesVoteLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`;

const VoteContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MenuText = styled.p`
  ${font.H1};
  color: ${color.primary};
`;

const Title = styled.p`
  ${font.D1};
  color: ${color.black};
`;

const SubTitle = styled.p`
  ${font.H2};
  color: ${color.gray400};
`;

const VoteInfo = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 2px;
`;

const VoteBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  margin-top: 100px;
`;
