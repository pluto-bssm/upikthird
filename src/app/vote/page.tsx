"use client";

import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import VoteBlock from "@/components/vote/voteblock";
import VoteMakeButton from "@/components/vote/votemakebutton";
import { useRouter } from "next/navigation";
import { useAllVotes } from "@/hooks/useVotes";
import { useState } from "react";
import VoteSort from "@/components/vote/VoteSort";

const Vote = () => {
  const router = useRouter();
  const { votes, loading, error, refetch } = useAllVotes();
  void error;
  void refetch;
  const categories = ["전체", "학교생활", "기숙사", "유머"];
  const [sortStandard, setSortStandard] = useState("투표 제작일 기준");
  const [activeIdx, setActiveIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <LoadingLayout>
        <div>Loading...</div>
      </LoadingLayout>
    );
  }

  if (error) {
    return (
      <LoadingLayout>
        <IsNotFound>투표를 불러오는 중 오류가 발생했습니다.</IsNotFound>
      </LoadingLayout>
    );
  }

  let filteredVotes =
    activeIdx === 0
      ? votes
      : votes.filter((vote) => vote.category === categories[activeIdx]);

  filteredVotes = [...filteredVotes].sort((a, b) => {
    switch (sortStandard) {
      case "투표 제작일 기준":
        const dateA =
          new Date(a.finishedAt).getTime() - 7 * 24 * 60 * 60 * 1000;
        const dateB =
          new Date(b.finishedAt).getTime() - 7 * 24 * 60 * 60 * 1000;
        return dateB - dateA;

      case "투표 종료일 기준":
        return (
          new Date(a.finishedAt).getTime() - new Date(b.finishedAt).getTime()
        );

      case "투표 참여율 기준":
        return (b.totalResponses || 0) - (a.totalResponses || 0);

      default:
        return 0;
    }
  });

  return (
    <VoteLayout>
      <Header
        types={"default"}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        onSubmit={() => setIsModalOpen(true)}
        onOptionClick={() => setIsModalOpen(true)}
      />

      <VoteContent>
        {filteredVotes.length === 0 ? (
          <IsNotFound>진행중인 투표가 없습니다.</IsNotFound>
        ) : (
          filteredVotes.map((vote) => (
            <VoteBlock
              key={vote.id}
              category={vote.category}
              title={vote.title}
              viewCount={vote.totalResponses}
              finishDate={vote.finishedAt}
              onClick={() => router.push(`/vote/${vote.id}`)}
            />
          ))
        )}
      </VoteContent>

      <VoteMakeButtonLayout>
        <VoteMakeButton onClick={() => router.push("/makevote")} />
      </VoteMakeButtonLayout>

      <NavigationBar />

      <VoteSort
        sortstandard={sortStandard}
        setsortstandard={setSortStandard}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </VoteLayout>
  );
};

export default Vote;

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
  min-height: 100vh;
  background-color: ${color.white};
  margin-bottom: 100px;
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

const IsNotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: ${color.gray300};
`;
