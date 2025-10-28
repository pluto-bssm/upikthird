"use client";

import { useState } from "react";
import Header from "@/components/common/header";
import GuideComponent from "@/components/guide/GuideComponent";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

const guide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() === "") {
      setHasSearched(false);
    }
  };

  return (
    <GuideLayout>
      <Header 
        types={"search"} 
        placeholers="원하는 가이드를 검색하기"
        onSearchChange={handleSearchChange}
        onSubmit={() => handleSearch(searchQuery)}
      />
      
      <SearchContent>
        {!hasSearched || searchQuery.trim() === "" ? (
          <EmptyState>
            <EmptyStateText>검색어를 입력해주세요</EmptyStateText>
          </EmptyState>
        ) : (
          <>
            <ResultHeader>
              <ResultCount>결과 <span style={{ color: color.primary }}>{resultCount}</span></ResultCount>
            </ResultHeader>
            <GuideContainer>
              <GuideComponent 
                searchQuery={searchQuery} 
                onResultCountChange={setResultCount}
              />
            </GuideContainer>
          </>
        )}
      </SearchContent>
    </GuideLayout>
  );
};

export default guide;

const GuideLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
`;

const SearchContent = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto;
  height: calc(100vh - 100px);
  overflow-y: auto;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const EmptyStateText = styled.div`
  color: ${color.black};
  font-family: ${font.D3};
  font-size: 16px;
  text-align: center;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  margin-top: 40px;
  position: sticky;
  top: 0;
  background-color: ${color.white};
  z-index: 10;
`;

const ResultCount = styled.div`
  color: ${color.gray600};
  font-family: ${font.caption};
  font-size: 14px;
`;

const GuideContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
`;
