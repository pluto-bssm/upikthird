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

    const formatDate = (timestamp: string) => {
        return timestamp; // 이미 "YYYY-MM-DD" 형식
    };

    const formatTime = (timestamp: string) => {
        // finishedAt이 "YYYY-MM-DD" 형식이면 시간 정보가 없을 수 있습니다
        // 필요시 백엔드에서 timestamp를 받아오거나 기본값 설정
        return "23:59"; // 기본 종료 시간
    };

    // hasVoted가 true이고 myOptionId가 있으면 해당 옵션을 선택된 것으로 표시
    const selectedOptionId = detail.hasVoted ? detail.myOptionId : null;
    const selectedOptionContent = detail.hasVoted ? detail.myOptionContent : null;

    const tailResponse =
        detail.myTailResponse || "네!!!! 꼬리 질문에! 무조건 응답합니다에!!!!!!!!!!!!!";

    return (
        <VoteResponseLayout>
            <Header types="close" onClose={handleClose} />
            <VoteBlock>
                <VoteInfo>
                    <MenuText>투표하기</MenuText>
                    <Title>{detail.title}</Title>
                    {selectedOptionContent && (
                        <SubTitle>선택한 답변: {selectedOptionContent}</SubTitle>
                    )}
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
                        선지를 고른 이유는 무엇인가요?
                    </TailQuestionSubtitle>

                    <TailResponseBox>
                        <TailResponseText>{tailResponse}</TailResponseText>
                    </TailResponseBox>
                </TailQuestionSection>

                <DateTimeSection>
                    <DateTimeItem>
                        <DateTimeLabel>응답일자</DateTimeLabel>
                        <DateTimeValue>{detail.finishedAt}</DateTimeValue>
                    </DateTimeItem>

                    <DateTimeItem>
                        <DateTimeLabel>응답시간</DateTimeLabel>
                        <DateTimeValue>{detail.finishedAt}</DateTimeValue>
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
  ${font.H2};
  color: ${color.black};
`;
