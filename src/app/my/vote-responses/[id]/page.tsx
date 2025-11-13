"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useVoteResponseDetail } from "@/hooks/useVoteResponses";
import Ballot from "@/components/vote/ballot";

const VoteResponseDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const router = useRouter();
  const { id } = use(params);

  const { detail, loading, error } = useVoteResponseDetail({ id });
  void error;

  const handleClose = () => {
    router.back();
  };

  const labels = ["A", "B", "C", "D", "E"];

  if (loading) {
    return (
      <VoteResponseLayout>
        <Header types="close" onClose={handleClose} />
        <VoteBlock>
          <Title>투표를 불러오는 중...</Title>
        </VoteBlock>
      </VoteResponseLayout>
    );
  }

  if (error || !detail) {
    return (
      <VoteResponseLayout>
        <Header types="close" onClose={handleClose} />
        <VoteBlock>
          <Title>투표를 불러올 수 없습니다.</Title>
          <SubTitle>{error || "투표 정보가 없습니다."}</SubTitle>
        </VoteBlock>
      </VoteResponseLayout>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toTimeString().split(" ")[0].substring(0, 5);
  };

  const selectedOptionId =
    detail.mySelectedOptionId ||
    (detail.hasVoted && detail.options.length > 0
      ? detail.options.reduce((prev, current) =>
          prev.percentage > current.percentage ? prev : current,
        ).id
      : null);

  const tailResponse =
    detail.myTailResponse ||
    (detail.hasVoted
      ? "네!!!! 꼬리 질문에! 무조건 응답합니다에!!!!!!!!!!!!!"
      : "응답하지 않았습니다.");

  return (
    <VoteResponseLayout>
      <Header types="close" onClose={handleClose} />
      <VoteBlock>
        <VoteInfo>
          <MenuText>투표하기</MenuText>
          <Title>{detail.title}</Title>
        </VoteInfo>

        <VoteContent>
          {detail.options?.map((option, index) => (
            <Ballot
              key={option.id}
              content={option.content}
              letter={labels[index] ?? ""}
              isSelected={option.id === selectedOptionId}
              onClick={() => {}}
              type="vote"
            />
          ))}
        </VoteContent>

        <TailQuestionSection>
          <TailQuestionTitle>꼬리질문 응답하기</TailQuestionTitle>
          <TailQuestionSubtitle>
            해당 선지를 고른 이유는 무엇인가요?
          </TailQuestionSubtitle>

          <TailResponseBox>
            <TailResponseText>{tailResponse}</TailResponseText>
          </TailResponseBox>
        </TailQuestionSection>

        <DateTimeSection>
          <DateTimeItem>
            <DateTimeLabel>종료일자</DateTimeLabel>
            <DateTimeValue>{formatDate(detail.finishedAt)}</DateTimeValue>
          </DateTimeItem>

          <DateTimeItem>
            <DateTimeLabel>종료시간</DateTimeLabel>
            <DateTimeValue>{formatTime(detail.finishedAt)}</DateTimeValue>
          </DateTimeItem>
        </DateTimeSection>
      </VoteBlock>
    </VoteResponseLayout>
  );
};

export default VoteResponseDetailPage;

const VoteResponseLayout = styled.div`
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
  gap: 40px;
  padding-bottom: 60px;
`;

const TailQuestionSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TailQuestionTitle = styled.p`
  ${font.D3};
  color: ${color.primary};
`;

const TailQuestionSubtitle = styled.p`
  ${font.D3};
  color: ${color.black};
`;

const TailResponseBox = styled.div`
  width: 100%;
  min-height: 120px;
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  padding: 16px;
  background-color: ${color.gray50};
  margin-top: 8px;
`;

const TailResponseText = styled.p`
  ${font.H3};
  color: ${color.gray600};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`;

const DateTimeSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DateTimeItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DateTimeLabel = styled.p`
  ${font.H3};
  color: ${color.gray400};
`;

const DateTimeValue = styled.p`
  ${font.D3};
  color: ${color.black};
`;
