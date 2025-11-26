"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import { useMyVotes } from "@/hooks/useVotes";
import VoteBlock from "@/components/vote/voteblock";
import MyVoteResponseCard from "@/app/my/my-votes/[id]/page";

const MyVotesPage = () => {
    const router = useRouter();
    const { myVotes, loading, error } = useMyVotes();

    const handleClose = () => {
        router.back();
    };

    if (loading) {
        return (
            <LoadingLayout>
                <Header types="close" text="내가 만든 투표" onClose={handleClose} />
                <div>Loading...</div>
            </LoadingLayout>
        );
    }

    if (error) {
        return (
            <StyledMyVotesPage>
                <Header types="close" text="내가 만든 투표" onClose={handleClose} />
                <IsNotFound>투표 목록을 불러올 수 없습니다.</IsNotFound>
            </StyledMyVotesPage>
        );
    }

    return (
        <StyledMyVotesPage>
            <Header types="close" text="내가 만든 투표" onClose={handleClose} />
            <VoteContent>
                {myVotes.length === 0 ? (
                    <IsNotFound>만든 투표가 없습니다.</IsNotFound>
                ) : (
                    myVotes.map((vote) => {
                        if (vote.hasVoted) {
                            return (
                                <MyVoteResponseCard
                                    key={vote.id}
                                    voteId={vote.id}
                                    title={vote.title}
                                    category={vote.category}
                                    options={vote.options || []}
                                    selectedOptionId={vote.myOptionId || ""}
                                    respondedAt={vote.finishedAt}
                                    respondedTime={vote.finishedAt}
                                />
                            );
                        }

                        return (
                            <VoteBlock
                                key={vote.id}
                                category={vote.category}
                                title={vote.title}
                                viewCount={vote.totalResponses}
                                finishDate={vote.finishedAt}
                                onClick={() => router.push(`/vote/${vote.id}`)}
                            />
                        );
                    })
                )}
            </VoteContent>
        </StyledMyVotesPage>
    );
};

export default MyVotesPage;

const StyledMyVotesPage = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
`;

const VoteContent = styled.div`
  width: 90%;
  margin-top: 100px;
  min-height: 100vh;
  background-color: ${color.white};
  margin-bottom: 100px;
`;

const LoadingLayout = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${color.white};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IsNotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: ${color.gray300};
`;