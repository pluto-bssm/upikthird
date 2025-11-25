"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import { useMyVoteResponses } from "@/hooks/useVoteResponses";
import VoteBlock from "@/components/vote/voteblock";

const VoteResponsesListPage = () => {
    const router = useRouter();
    const { responses, loading, error } = useMyVoteResponses();

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

    return (
        <StyledPage>
            <Header types="close" text="투표 응답 내역" onClose={handleClose} />
            <Content>
                <VotesList>
                    {responses.length === 0 ? (
                        <EmptyText>응답한 투표가 없습니다.</EmptyText>
                    ) : (
                        responses.map((vote) => (
                            <VoteBlock
                                key={vote.id}
                                category={vote.category}
                                title={vote.title || "제목 없음"}
                                viewCount={vote.totalResponses || 0}
                                finishDate={vote.finishedAt}
                                onClick={() => handleVoteClick(vote.id)}
                            />
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
  min-height: 100vh;
  background-color: ${color.white};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const VotesList = styled.div`
  display: flex;
  flex-direction: column;
    gap:8px;
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