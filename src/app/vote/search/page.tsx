"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { useState } from "react";
import { useVotes } from "@/hooks/useVotes";
import { useRouter } from "next/navigation";
import VoteBlock from "@/components/vote/voteblock";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { votes, loading, error } = useVotes();
  void error;
  const router = useRouter();

  const filteredVotes =
    searchQuery.trim() === ""
      ? []
      : votes.filter((vote) =>
          vote.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchValue.trim());
  };

  if (loading) {
    return (
      <VoteLayout>
        <Header
          types={"search"}
          placeholers="원하는 투표를 검색해주세요"
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <LoadingContainer>
          <div>Loading...</div>
        </LoadingContainer>
      </VoteLayout>
    );
  }

  if (error) {
    return (
      <VoteLayout>
        <Header
          types={"search"}
          placeholers="원하는 투표를 검색해주세요"
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <VoteContent>
          <IsNotFound>투표를 불러오는 중 오류가 발생했습니다.</IsNotFound>
        </VoteContent>
      </VoteLayout>
    );
  }

  return (
    <VoteLayout>
      <Header
        types={"search"}
        placeholers="원하는 투표를 검색해주세요"
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />
      <VoteContent>
        {searchQuery.trim() === "" ? (
          <IsNotFound>검색어를 입력해주세요.</IsNotFound>
        ) : filteredVotes.length === 0 ? (
          <IsNotFound>검색 결과가 없습니다.</IsNotFound>
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
  min-height: 100vh;
  background-color: ${color.white};
  margin-bottom: 100px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: ${color.gray300};
`;

const IsNotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: ${color.gray300};
`;
