"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useMyVoteResponses } from "@/hooks/useVoteResponses";

interface DisplayVote {
  id: string;
  title: string;
  category: string;
  status: string;
  finishedAt: string | number;
}

const VoteResponsesListPage = () => {
  const router = useRouter();
  const { responses, loading, error } = useMyVoteResponses();
  void error;

  const handleClose = () => {
    router.back();
  };

  const handleVoteClick = (voteId: string) => {
    router.push(`/my/vote-responses/${voteId}`);
  };

  if (loading) {
    return (
      <StyledPage>
        <Header types="close" text="투표 응답 내역" onClose={handleClose} />
        <LoadingText>로딩 중...</LoadingText>
      </StyledPage>
    );
  }

  if (error) {
    return (
      <StyledPage>
        <Header types="close" text="투표 응답 내역" onClose={handleClose} />
        <ErrorText>투표 응답을 불러올 수 없습니다.</ErrorText>
      </StyledPage>
    );
  }

  const displayVotes: DisplayVote[] = responses.map((vote) => ({
    id: vote.id,
    title: vote.title,
    category: vote.category,
    status: vote.status,
    finishedAt: vote.finishedAt || "",
  }));

  return (
    <StyledPage>
      <Header types="close" text="투표 응답 내역" onClose={handleClose} />
      <Content>
        <VotesList>
          {displayVotes.length === 0 ? (
            <EmptyText>응답한 투표가 없습니다.</EmptyText>
          ) : (
            displayVotes.map((vote) => (
              <VoteItem key={vote.id} onClick={() => handleVoteClick(vote.id)}>
                <VoteCategory>{vote.category}</VoteCategory>
                <VoteTitle>{vote.title}</VoteTitle>
                <VoteInfo>
                  <InfoTag status={vote.status}>
                    {vote.status === "OPEN" ? "진행중" : "마감됨"}
                  </InfoTag>
                  <InfoDate>{vote.finishedAt}</InfoDate>
                </VoteInfo>
              </VoteItem>
            ))
          )}
        </VotesList>
      </Content>
    </StyledPage>
  );
};

export default VoteResponsesListPage;

const StyledPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const VotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const VoteItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${color.gray100};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${color.gray50};
    border-color: ${color.primary};
  }
`;

const VoteCategory = styled.span`
  ${font.H3};
  color: ${color.primary};
`;

const VoteTitle = styled.p`
  ${font.D1};
  color: ${color.black};
  margin: 0;
  padding: 0;
  word-break: break-word;
  line-height: 1.4;
`;

const VoteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

interface InfoTagProps {
  status: string;
}

const InfoTag = styled.span<InfoTagProps>`
  ${font.P2};
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.status === "OPEN" ? "rgba(255, 159, 28, 0.1)" : color.gray100};
  color: ${(props) =>
    props.status === "OPEN" ? color.primary : color.gray600};
`;

const InfoDate = styled.span`
  ${font.P2};
  color: ${color.gray600};
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #e71d36;
  padding: 40px 20px;
  margin: 0;
`;

const EmptyText = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const StyledVoteResponsePage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
`;
void StyledVoteResponsePage;

const VoteResponseContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;
void VoteResponseContent;

const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
void VoteSection;

const SectionTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${color.primary};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
void SectionTitle;

const VoteQuestion = styled.p`
  font-size: 22px;
  font-weight: 700;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.3;
  word-break: break-word;
`;
void VoteQuestion;

const SelectedOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 2px solid ${color.primary};
  background-color: rgba(255, 159, 28, 0.1);
  border-radius: 12px;
`;
void SelectedOptionBox;

const OptionLabel = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray500};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
void OptionLabel;

const OptionText = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
void OptionText;

const Divider = styled.div`
  height: 1px;
  background-color: ${color.gray50};
  margin: 0;
`;
void Divider;

const TailQuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
void TailQuestionSection;

const TailQuestionTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${color.primary};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
void TailQuestionTitle;

const TailQuestion = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.3;
  word-break: break-word;
`;
void TailQuestion;

const TailAnswerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid ${color.gray100};
  background-color: ${color.white};
  border-radius: 12px;
  min-height: 120px;
`;
void TailAnswerBox;

const AnswerText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${color.gray700};
  margin: 0;
  padding: 0;
  line-height: 1.4;
  word-break: break-word;
`;
void AnswerText;

const SeparatorBox = styled.div`
  height: 8px;
  background-color: ${color.gray50};
`;
void SeparatorBox;

const ResponseInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${color.white};
`;
void ResponseInfoSection;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
void InfoGroup;

const InfoLabel = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray500};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
void InfoLabel;

const InfoValue = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
void InfoValue;
