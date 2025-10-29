"use client";

import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import VoteBlock from "@/components/vote/voteblock";
import VoteMakeButton from "@/components/vote/votemakebutton";
import { useRouter } from "next/navigation";
import { useVotes } from "@/hooks/useVote";

const VoteData = [
  {
    category: "학교생활",
    title: "2024학년도 1학기 교내 폭력 실태 조사",
    viewCount: 1234,
    finishDate: "2024-07-15",
  },
  {
    category: "기숙사",
    title: "2024학년도 1학기 기숙사 식단 만족도 조사",
    viewCount: 5678,
    finishDate: "2024-07-20",
  },
  {
    category: "유머",
    title: "2024학년도 1학기 교내 유머 게시판 인기글 투표",
    viewCount: 91011,
    finishDate: "2024-07-25",
  },
];

const vote = () => {
  const router = useRouter();
  const { votes, loading, error, refetch } = useVotes();


  return (
    <VoteLayout>
      <Header types={"default"} />
      <VoteContent>
        {votes.map((vote, id) => (
          <VoteBlock
            key={id}
            category={vote.category}
            title={vote.title}
            viewCount={vote.totalResponses}
            finishDate={vote.finishedAt}
            onClick={() => router.push(`/vote/${vote.id}`)}
          />
        ))}
      </VoteContent>

      <VoteMakeButtonLayout>
        <VoteMakeButton onClick={() => router.push("/makevote")} />
      </VoteMakeButtonLayout>

      <NavigationBar />
    </VoteLayout>
  );
};

export default vote;

const VoteLayout = styled.div`
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
  height: 100vh;
  background-color: ${color.white};
  margin-bottom: 200px;
`;

const VoteMakeButtonLayout = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 80px;
  width: 90%;
  max-width: 500px;
  display: flex;
  justify-content: flex-end;
`;
