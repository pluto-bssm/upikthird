"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { useState } from "react";
import { useGuides } from "@/hooks/useGuides";
import GuideComponent from "@/components/guide/GuideComponent";

const GuideSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const { guides, loading, error } = useGuides();
  void error;
  void guides;

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setSearchQuery(value.trim());
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchValue.trim());
  };

  if (loading) {
    return (
      <GuideLayout>
        <Header
          types={"search"}
          placeholers="원하는 가이드를 검색하기"
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <LoadingContainer>
          <div>Loading...</div>
        </LoadingContainer>
      </GuideLayout>
    );
  }

  if (error) {
    return (
      <GuideLayout>
        <Header
          types={"search"}
          placeholers="원하는 가이드를 검색하기"
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <GuideContent>
          <IsNotFound>가이드를 불러오는 중 오류가 발생했습니다.</IsNotFound>
        </GuideContent>
      </GuideLayout>
    );
  }

  return (
    <GuideLayout>
      <Header
        types={"search"}
        placeholers="원하는 가이드를 검색하기"
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />
      <GuideContent>
        {searchQuery.trim() === "" ? (
          <IsNotFound>검색어를 입력해주세요.</IsNotFound>
        ) : (
          <GuideComponent
            searchQuery={searchQuery}
            onResultCountChange={setResultCount}
          />
        )}
      </GuideContent>
    </GuideLayout>
  );
};

export default GuideSearch;

const GuideLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
`;

const GuideContent = styled.div`
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
