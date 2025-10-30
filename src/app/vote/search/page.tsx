"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { useState } from "react";
import { useVotes } from "@/hooks/useVote";
import { useRouter } from "next/navigation";
import VoteBlock from "@/components/vote/voteblock";

const Search = () => {
  const [searchitem, setSearchitem] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const { votes, loading, error, refetch } = useVotes();
  const router = useRouter();

  const filteredVotes = searchQuery.trim() === "" 
    ? votes 
    : votes.filter(vote => vote.title.includes(searchQuery));
    

  const handleSearchChange = (value: string) => {
    setSearchitem(value);
  };

  const handleSearchSubmit = () => {

    setSearchQuery(searchitem);
  };

  return (
    <VoteLayout>
      <Header 
        types={"search"} 
        placeholers="원하는 투표를 검색해주세요" 
        searchitem={searchitem} 
        onSearchChange={handleSearchChange} 
        onSubmit={handleSearchSubmit} 
      />
      <VoteContent>
        {filteredVotes.length == 0 ? (
          <IsNotFound>검색 결과가 없습니다.</IsNotFound>
        ) :(
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
    </VoteLayout>
  );
};

export default Search;

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

const IsNotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: ${color.gray300};
`;