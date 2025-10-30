"use client";

import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import VoteBlock from "@/components/vote/voteblock";
import VoteMakeButton from "@/components/vote/votemakebutton";
import { useRouter } from "next/navigation";
import { useVotes } from "@/hooks/useVote";

const vote = () => {
  const router = useRouter();
  const { votes, loading, error, refetch } = useVotes();

  if(loading){
    return (
      <LoadingLayout>
          <div>Loading...</div>
      </LoadingLayout>
    );

  }
  else{
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
  }
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

const LoadingLayout = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${color.white};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;