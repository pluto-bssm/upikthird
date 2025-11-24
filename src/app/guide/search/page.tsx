"use client";

import { useMemo, useState } from "react";
import Header from "@/components/common/header";
import GuideComponent from "@/components/guide/GuideComponent";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useGuides } from "@/hooks/useGuides";

const GuideSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { guides, loading, error } = useGuides();

  const filteredGuides = useMemo(() => {
    if (!hasSearched || searchQuery === "") {
      return [];
    }
    return guides.filter((guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [guides, hasSearched, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (value.trim() === "") {
      setHasSearched(false);
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = () => {
    const trimmed = searchInput.trim();
    setSearchQuery(trimmed);
    setHasSearched(trimmed !== "");
  };

  if (loading) {
    return (
      <GuideLayout>
        <Header
          types={"search"}
          placeholers="원하는 가이드를 검색하기"
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <FeedbackBox>가이드를 불러오는 중...</FeedbackBox>
      </GuideLayout>
    );
  }

  if (error) {
    return (
      <GuideLayout>
        <Header
          types={"search"}
          placeholers="원하는 가이드를 검색하기"
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <FeedbackBox>가이드를 불러오는 중 오류가 발생했습니다.</FeedbackBox>
      </GuideLayout>
    );
  }

  return (
    <GuideLayout>
      <Header
        types={"search"}
        placeholers="원하는 가이드를 검색하기"
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      <SearchContent>
        {!hasSearched ? (
          <EmptyState>
            <EmptyStateText>검색어를 입력해주세요</EmptyStateText>
          </EmptyState>
        ) : filteredGuides.length === 0 ? (
          <EmptyState>
            <EmptyStateText>검색 결과가 없습니다</EmptyStateText>
          </EmptyState>
        ) : (
          <>
            <ResultHeader>
              <ResultCount>
                결과{" "}
                <span style={{ color: color.primary }}>
                  {filteredGuides.length}
                </span>
              </ResultCount>
            </ResultHeader>
            <GuideContainer>
              <GuideComponent searchQuery={searchQuery} />
            </GuideContainer>
          </>
        )}
      </SearchContent>
    </GuideLayout>
  );
};

export default GuideSearch;

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
  font-family: ${font.P1};
  font-size: 14px;
`;

const GuideContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
`;

const FeedbackBox = styled.div`
  width: 90%;
  margin: 120px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${color.gray500};
  font-family: ${font.D3};
  font-size: 16px;
`;
